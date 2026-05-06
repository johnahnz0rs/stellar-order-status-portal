// ====================== CSV PROCESSING HELPERS ======================
async function parseCSV(file) {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: false,           // keep everything as string for safety
      complete: (results) => resolve(results.data),
      error: (err) => reject(err)
    });
  });
}

// ====================== 1. SHOPIFY OPEN ORDERS ======================
function buildShopifyOpenOrders(shopifyRows) {
  const shopifyOpenOrders = {};

  for (const row of shopifyRows) {
    const id = row['ID'];
    if (!id) continue;

    if (!shopifyOpenOrders[id]) {
      shopifyOpenOrders[id] = {
        metaSageOrderNumber: row['Metafield: custom.sage_order_number [single_line_text_field]'] || '',
        shopifyOrderName: row['Name'] || '',
        email: row['Email'] || row['Customer: Email'] || '',
        phone: row['Phone'] || row['Customer: Phone'] || '',
        processedAt: row['Processed At'] || '',
        lineItems: [],
        totalOfLineItems: 0
      };
    }

    const order = shopifyOpenOrders[id];

    // Only Line Items
    if (row['Line: Type'] === 'Line Item') {
      const line = {
        lineName: row['Line: Name'] || '',
        lineSku: row['Line: SKU'] || '',
        lineQuantity: parseFloat(row['Line: Quantity']) || 0,
        linePrice: parseFloat(row['Line: Price']) || 0,
        lineTotal: parseFloat(row['Line: Total']) || 0
      };
      order.lineItems.push(line);
    }
  }

  // Calculate totals after all lines are collected
  Object.values(shopifyOpenOrders).forEach(order => {
    order.totalOfLineItems = order.lineItems.reduce((sum, item) => sum + item.lineTotal, 0);
  });

  return shopifyOpenOrders;
}

// ====================== 2. SAGE CUSTOMERS ======================
function buildSageCustomers(customerRows) {
  const sageCustomers = {};

  for (const row of customerRows) {
    const customerId = row['Customer']?.trim();
    if (!customerId) continue;

    const email = (row['E-mail Address'] || '').trim();

    // Origin logic
    const hasLetters = /[a-zA-Z]/.test(customerId);
    const origin = hasLetters ? 'sage' : 'shopify';

    sageCustomers[customerId] = {
      email,
      sageCustomerName: row['Name'] || '',
      origin
    };
  }

  return sageCustomers;
}

// ====================== 3. TRACKING NUMBERS ======================
function buildTrackingNumbers(trackingRows) {
  const trackingNumbers = {};

  for (const row of trackingRows) {
    const soNumber = row['Sales Order Number']?.trim();
    if (!soNumber) continue;

    if (!trackingNumbers[soNumber]) {
      trackingNumbers[soNumber] = [];
    }

    trackingNumbers[soNumber].push({
      sageCustomerNumber: row['Customer Number']?.trim() || '',
      invoiceDate: row['Invoice Date']?.trim() || '',
      trackingId: row['Tracking ID']?.trim() || '',
      shipVia: row['Ship Via']?.trim() || ''
    });
  }

  return trackingNumbers;
}

// ====================== 4. SAGE ORDERS (depends on previous) ======================
function buildSageOrders(lineItemsRows, sageCustomers, trackingNumbers) {
  const sageOrders = {};

  for (const row of lineItemsRows) {
    const soId = row['Sales Order']?.trim();
    if (!soId) continue;

    if (!sageOrders[soId]) {
      const custNumber = row['Customer Number']?.trim() || '';
      const custInfo = sageCustomers[custNumber] || { email: '' };

      sageOrders[soId] = {
        sageCustomerNumber: custNumber,
        sageCustomerEmail: custInfo.email || '',
        orderDate: row['Order Date']?.trim() || '',
        productLineItems: [],
        promiseDates: [],
        trackingNumbers: trackingNumbers[soId] || []
      };
    }

    const order = sageOrders[soId];

    // Product Line Items
    order.productLineItems.push({
      sku: row['Item Code']?.trim() || '',
      productName: row['Item Code Description']?.trim() || '',
      quantity: parseFloat(row['Qty Ordered']) || 0,
      unitPrice: parseFloat(row['Unit Price']?.replace(/[$,]/g, '')) || 0
    });

    // Promise Dates
    order.promiseDates.push({
      productName: row['Item Code Description']?.trim() || '',
      quantity: parseFloat(row['Qty Ordered']) || 0,
      uom: row['UOM']?.trim() || '',
      promiseDate: row['Promise Date']?.trim() || ''
    });
  }

  return sageOrders;
}

// ====================== MATCHING LOGIC ======================
function normalizeDate(dateStr) {
  if (!dateStr) return '';
  // Handle both Shopify (with time) and Sage (MM/DD/YYYY) formats
  const cleaned = dateStr.trim().split(' ')[0];           // remove time if present
  const parts = cleaned.split(/[-/]/);                    // handle - or /
  if (parts.length === 3) {
    const [m, d, y] = parts.length === 3 && parts[0].length === 2
      ? parts.map(Number)
      : [parts[1], parts[2], parts[0]].map(Number);     // try YYYY-MM-DD too
    return `${y}-${String(m).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
  }
  return cleaned;
}

function buildMatchingMaps(shopifyOpenOrders, sageOrders) {

  // 1. Quick lookup: Sage Order Number → Shopify Order ID (from existing metafield)
  const sageOrdersAlreadyInShopifyMap = {};

  Object.entries(shopifyOpenOrders).forEach(([shopifyId, order]) => {
    const sageNum = order.metaSageOrderNumber?.trim();
    if (sageNum) {
      sageOrdersAlreadyInShopifyMap[sageNum] = shopifyId;   // key = Sage SO, value = Shopify ID
    }
  });

  // 2. The two buckets we'll fill
  const importableSageOrdersThatAlreadyExistInShopify = {};   // Sage SOs that already live in Shopify
  const importableNewSageOrders = {};                        // Sage SOs that need to be created in Shopify

  // 3. Main matching loop
  Object.entries(sageOrders).forEach(([soId, sageOrder]) => {
    const sageOrderDateNorm = normalizeDate(sageOrder.orderDate || '');   // we'll add orderDate below

    // PRIMARY MATCH: Already has metaSageOrderNumber in Shopify
    if (sageOrdersAlreadyInShopifyMap[soId]) {
      importableSageOrdersThatAlreadyExistInShopify[soId] = sageOrder;
      return;
    }

    // SECONDARY MATCH: Fuzzy match on open Shopify orders
    let matched = false;

    for (const [shopifyId, shopifyOrder] of Object.entries(shopifyOpenOrders)) {
      const shopifyEmail = (shopifyOrder.email || '').toLowerCase().trim();
      const sageEmail = (sageOrder.sageCustomerEmail || '').toLowerCase().trim();

      const shopifyDateNorm = normalizeDate(shopifyOrder.processedAt);

      // Condition A + B (email + date)
      if (shopifyEmail && sageEmail && shopifyEmail === sageEmail &&
        shopifyDateNorm && sageOrderDateNorm && shopifyDateNorm === sageOrderDateNorm) {

        // Condition C (optional but recommended) - Line item sanity check
        const lineCountMatch = shopifyOrder.lineItems.length === sageOrder.productLineItems.length;

        let detailsMatch = true;
        if (lineCountMatch && sageOrder.productLineItems.length > 0) {
          // Simple qty + price check on first few items (can tighten later)
          for (let i = 0; i < Math.min(3, sageOrder.productLineItems.length); i++) {
            const sLine = sageOrder.productLineItems[i];
            const shLine = shopifyOrder.lineItems[i];
            if (!shLine ||
              Math.abs(sLine.quantity - shLine.lineQuantity) > 0.01 ||
              Math.abs(sLine.unitPrice - shLine.linePrice) > 1) {   // $1 tolerance for rounding
              detailsMatch = false;
              break;
            }
          }
        }

        if (lineCountMatch && detailsMatch) {
          importableSageOrdersThatAlreadyExistInShopify[soId] = sageOrder;

          // Also update the map so we have the Shopify ID for later import
          sageOrdersAlreadyInShopifyMap[soId] = shopifyId;

          matched = true;
          break;
        }
      }
    }

    if (!matched) {
      importableNewSageOrders[soId] = sageOrder;
    }
  });

  console.log(`✅ Matching complete:`);
  console.log(`   Already in Shopify (meta or fuzzy): ${Object.keys(importableSageOrdersThatAlreadyExistInShopify).length}`);
  console.log(`   New Sage orders to import: ${Object.keys(importableNewSageOrders).length}`);

  return {
    sageOrdersAlreadyInShopifyMap,
    importableSageOrdersThatAlreadyExistInShopify,
    importableNewSageOrders
  };
}



// ====================== MAIN PROCESSOR ======================
async function processAllFiles(shopifyFile, sageCustomersFile, sageTrackingFile, sageLinesFile) {
  console.log('🚀 Starting CSV processing...');

  const [shopifyRows, customerRows, trackingRows, lineItemsRows] = await Promise.all([
    parseCSV(shopifyFile),
    parseCSV(sageCustomersFile),
    parseCSV(sageTrackingFile),
    parseCSV(sageLinesFile)
  ]);

  // Build in correct dependency order
  const shopifyOpenOrders = buildShopifyOpenOrders(shopifyRows);
  const sageCustomersMap = buildSageCustomers(customerRows);
  const trackingMap = buildTrackingNumbers(trackingRows);
  const sageOrders = buildSageOrders(lineItemsRows, sageCustomersMap, trackingMap);

  console.log('✅ Processing complete!');
  console.log(`Shopify Open Orders: ${Object.keys(shopifyOpenOrders).length}`);
  console.log(`Sage Customers: ${Object.keys(sageCustomersMap).length}`);
  console.log(`Sage Orders: ${Object.keys(sageOrders).length}`);

  // Return everything so you can use it later
  return {
    shopifyOpenOrders,
    sageCustomers: sageCustomersMap,
    trackingNumbers: trackingMap,
    sageOrders
  };
}




