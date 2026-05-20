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
    const id = parseInt(row['ID']);
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

    // Only Line Items; we don't need fulfillments, payments here
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
  // console.log('*** these are the shopify open orders ***', shopifyOpenOrders);
  return shopifyOpenOrders;
}

// ====================== 2. SAGE CUSTOMERS ======================
function buildSageCustomers(customerRows) {
  const sageCustomers = {};

  for (const row of customerRows) {
    const customerId = parseInt(row['Customer']?.trim());
    if (!customerId) continue;

    const email = (row['E-mail Address'] || '').trim();

    // Origin logic: Sage or Shopify
    const hasLetters = /[a-zA-Z]/.test(customerId);
    const origin = hasLetters ? 'sage' : 'shopify';

    sageCustomers[customerId] = {
      email,
      sageCustomerName: row['Name'] || '',
      sageCustomerPhone: row['Telephone'] || '',
      origin
    };
  }

  return sageCustomers;
}

// ====================== 3. TRACKING NUMBERS ======================
function buildTrackingNumbers(trackingRows) {
  const trackingNumbers = {};

  for (const row of trackingRows) {
    const soNumber = parseInt(row['Sales Order Number']?.trim());
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
  console.log('*** these are the tracking numbers ***', trackingNumbers);
  return trackingNumbers;
}

// ====================== 4. SAGE ORDERS (depends on previous) ======================
function buildSageOrders(lineItemsRows, sageCustomers, trackingNumbers) {
  const sageOrders = {};

  for (const row of lineItemsRows) {
    const soId = parseInt(row['Sales Order']?.trim());
    if (!soId) continue;

    if (!sageOrders[soId]) {
      const custNumber = row['Customer Number']?.trim() || '';
      const custInfo = sageCustomers[custNumber] || { email: '' };

      sageOrders[soId] = {
        sageCustomerNumber: custNumber,
        sageCustomerEmail: custInfo.email || '',
        sageCustomerName: custInfo.sageCustomerName || '',
        sageCustomerPhone: custInfo.sageCustomerPhone || '',
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

  // console.log('*** these are the sage orders ***', sageOrders);
  return sageOrders;
}

// ====================== MATCHING LOGIC ======================
function normalizeDate(dateStr) {
  if (!dateStr) return '';

  const cleaned = dateStr.toString().trim();

  // Try direct YYYY-MM-DD or MM/DD/YYYY patterns first
  let match = cleaned.match(/^(\d{4})[-/](\d{1,2})[-/](\d{1,2})/) ||
    cleaned.match(/^(\d{1,2})[-/](\d{1,2})[-/](\d{4})/);

  if (match) {
    let [_, y1, m1, d1] = match.map(Number);
    // Swap if MM/DD/YYYY
    if (y1 > 31) { // year first
      [y1, m1, d1] = [y1, m1, d1];
    } else {
      [m1, d1, y1] = [y1, m1, d1]; // assume MM/DD/YYYY
    }
    return `${y1}-${String(m1).padStart(2, '0')}-${String(d1).padStart(2, '0')}`;
  }

  // Fallback: let JS Date try to parse anything (unix, excel serial, etc.)
  const parsed = new Date(cleaned);
  if (!isNaN(parsed.getTime())) {
    const y = parsed.getFullYear();
    const m = String(parsed.getMonth() + 1).padStart(2, '0');
    const d = String(parsed.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  console.warn(`⚠️ Could not normalize date: "${dateStr}"`);
  return cleaned; // last resort for weird date formats
}

// ====================== LINE ITEM MATCHING HELPERS ======================
function sageLineExistsInShopify(sageLine, shopifyLines) {
  // v1 - for now, we're doing a simple match: either metafield custom.sageOrderNumber OR match my qty + line price
  // future - can try to use SKU or product names for matching

  // const sageSku = (sageLine.sku || '').trim().toUpperCase();
  // const sageName = (sageLine.productName || '').trim().toLowerCase();

  return shopifyLines.some(shLine => {
    // const shSku = (shLine.lineSku || '').trim().toUpperCase();
    // const shName = (shLine.lineName || '').trim().toLowerCase();

    // const skuMatch = sageSku && shSku && sageSku === shSku;
    // const nameMatch = sageName && shName && shName.includes(sageName) || sageName.includes(shName);

    const qtyMatch = Math.abs(sageLine.quantity - shLine.lineQuantity) <= 0.01;
    const priceMatch = Math.abs(sageLine.unitPrice - shLine.linePrice) <= 1;

    // return (skuMatch || nameMatch) && qtyMatch && priceMatch;
    return qtyMatch && priceMatch;
  });
}

function allSageLinesAreInShopify(sageOrder, shopifyOrder) {
  if (!sageOrder.productLineItems.length) return true; // edge case

  return sageOrder.productLineItems.every(sageLine =>
    sageLineExistsInShopify(sageLine, shopifyOrder.lineItems)
  );
}


function buildMatchingMaps(shopifyOpenOrders, sageOrders) {
  const sageOrdersAlreadyInShopifyMap = {};

  Object.entries(shopifyOpenOrders).forEach(([shopifyId, order]) => {
    const sageNum = order.metaSageOrderNumber?.trim();
    if (sageNum) {
      sageOrdersAlreadyInShopifyMap[sageNum] = shopifyId;
    }
  });

  const importableSageOrdersThatAlreadyExistInShopify = {};
  const importableNewSageOrders = {};

  Object.entries(sageOrders).forEach(([soId, sageOrder]) => {
    const sageDateNorm = normalizeDate(sageOrder.orderDate);

    // PRIMARY MATCH - metafield sage order number
    if (sageOrdersAlreadyInShopifyMap[soId]) {
      importableSageOrdersThatAlreadyExistInShopify[soId] = sageOrder;
      importableSageOrdersThatAlreadyExistInShopify[soId].shopifyOrderId = sageOrdersAlreadyInShopifyMap[soId];
      return;
    }

    // SECONDARY MATCH - email + date + line item subset check
    let matched = false;

    for (const [shopifyId, shopifyOrder] of Object.entries(shopifyOpenOrders)) {
      const shopifyEmail = (shopifyOrder.email || '').toLowerCase().trim();
      const sageEmail = (sageOrder.sageCustomerEmail || '').toLowerCase().trim();

      const shopifyDateNorm = normalizeDate(shopifyOrder.processedAt);

      if (
        shopifyEmail && sageEmail &&
        shopifyEmail === sageEmail &&
        shopifyDateNorm && sageDateNorm &&
        shopifyDateNorm === sageDateNorm
      ) {

        // Sage lines must be a subset of Shopify lines -- i.e. all Sage line items must be in the Shopify order
        if (allSageLinesAreInShopify(sageOrder, shopifyOrder)) {
          importableSageOrdersThatAlreadyExistInShopify[soId] = {
            ...sageOrder,
            shopifyOrderId: shopifyId,
            shopifyOrderName: shopifyOrder.shopifyOrderName
          };

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


// ====================== MATRIXIFY IMPORT CSV GENERATOR ======================
function generateMatrixifyImportCSV(
  importableSageOrdersThatAlreadyExistInShopify,
  importableNewSageOrders,
  sageOrdersAlreadyInShopifyMap,
  shopifyOpenOrders
) {
  const importRows = [];
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

  // Helper to format date for Shopify
  function formatShopifyDate(dateStr) {
    if (!dateStr) return '';
    return normalizeDate(dateStr); // reuse our normalizer → YYYY-MM-DD
  }

  // 1. EXISTING ORDERS - Just update metafields (MERGE)
  Object.entries(importableSageOrdersThatAlreadyExistInShopify).forEach(([soId, order]) => {
    importRows.push({
      "ID": order.shopifyOrderId || '',
      "Name": order.shopifyOrderName || '',
      "Number": '',
      "Command": "MERGE",
      "Processed At": formatShopifyDate(order.orderDate),
      "Closed At": "",
      "Source": "",
      "Customer:Email": order.sageCustomerEmail || '',
      "Customer: Phone": "",
      "Customer: First Name": "",
      "Customer: Last Name": "",
      "Line: Type": "",
      "Line: Command": "",
      "Line: Name": "",
      "Line: SKU": "",
      "Line: Quantity": "",
      "Line: Price": "",
      "Metafield: custom.sage_order_number": soId,
      "Metafield: custom.promise_dates": JSON.stringify(order.promiseDates || []),
      "Metafield: custom.tracking_numbers": JSON.stringify(order.trackingNumbers || [])
    });
  });

  // 2. NEW SAGE ORDERS - Full order creation with line items
  Object.entries(importableNewSageOrders).forEach(([soId, order]) => {
    const firstNameParts = (order.sageCustomerName || '').trim().split(' ');
    const firstName = firstNameParts[0] || '';
    const lastName = firstNameParts.slice(1).join(' ') || '';

    // Create one row per line item
    order.productLineItems.forEach((lineItem, index) => {
      const row = {
        "ID": "",                                    // blank for orders going into Shopify for the first time
        "Name": `S ${soId}`,                         // Sage-origin prefix
        "Number": `${soId}`,                         // Sage-origin prefix
        "Command": "MERGE",
        "Processed At": formatShopifyDate(order.orderDate),
        "Closed At": "",
        "Source": "Sage-origin order",
        "Customer:Email": order.sageCustomerEmail || '',
        "Customer: Phone": order.sageCustomerPhone || '',
        "Customer: First Name": firstName,
        "Customer: Last Name": lastName,
        "Line: Type": "Line Item",
        "Line: Command": "DEFAULT",
        "Line: Name": lineItem.productName || '',
        "Line: SKU": lineItem.sku || '',
        "Line: Quantity": lineItem.quantity || '',
        "Line: Price": lineItem.unitPrice || '',
        "Metafield: custom.sage_order_customer_number": order.sageCustomerNumber || '',
        "Metafield: custom.sage_order_number": soId,
        "Metafield: custom.promise_dates": JSON.stringify(order.promiseDates || []),
        "Metafield: custom.tracking_numbers": JSON.stringify(order.trackingNumbers || [])
      };

      // Put customer info & metafields on the first line item only (Matrixify best practice)
      if (index > 0) {
        row["Customer:Email"] = "";
        row["Customer: Phone"] = "";
        row["Customer: First Name"] = "";
        row["Customer: Last Name"] = "";
        row["Metafield: custom.sage_order_customer_number"] = "";
        row["Metafield: custom.sage_order_number"] = "";
        row["Metafield: custom.promise_dates"] = "";
        row["Metafield: custom.tracking_numbers"] = "";
      }

      importRows.push(row);
    });
  });

  // 3. CLOSED ORDERS (exist in Shopify but no longer in Sage)
  const closedOrders = [];

  Object.entries(sageOrdersAlreadyInShopifyMap).forEach(([sageSoId, shopifyId]) => {
    // If it's NOT in the "already exist" bucket AND NOT in the "new" bucket → it should be closed
    if (!importableSageOrdersThatAlreadyExistInShopify[sageSoId] &&
      !importableNewSageOrders[sageSoId]) {

      const shopifyOrder = shopifyOpenOrders[shopifyId];
      if (shopifyOrder) {
        closedOrders.push({
          "ID": shopifyId,
          "Name": shopifyOrder.shopifyOrderName || '',
          "Number": '',
          "Command": "MERGE",
          "Processed At": "",
          "Closed At": today,                    // This archives the order
          "Source": "",
          "Customer:Email": "",
          "Customer: Phone": "",
          "Customer: First Name": "",
          "Customer: Last Name": "",
          "Line: Type": "",
          "Line: Command": "",
          "Line: Name": "",
          "Line: SKU": "",
          "Line: Quantity": "",
          "Line: Price": "",
          "Metafield: custom.sage_order_number": "",
          "Metafield: custom.promise_dates": "",
          "Metafield: custom.tracking_numbers": ""
        });
      }
    }
  });

  importRows.push(...closedOrders);

  console.log(`✅ Matrixify CSV generated:`);
  console.log(`   Updates to existing orders: ${Object.keys(importableSageOrdersThatAlreadyExistInShopify).length}`);
  console.log(`   New Sage orders: ${Object.keys(importableNewSageOrders).length}`);
  console.log(`   Orders to close in Shopify: ${closedOrders.length}`);

  return importRows;
}


// ====================== DOWNLOAD & PREVIEW HELPERS ======================

function generateAndDownloadCSV(matrixifyRows) {
  if (!matrixifyRows || matrixifyRows.length === 0) {
    console.error("No rows to export");
    return;
  }

  // Convert to CSV using PapaParse
  const csvContent = Papa.unparse(matrixifyRows, {
    delimiter: ",",
    quoteChar: '"',
    escapeChar: '"',
    header: true
  });

  // Create blob and trigger download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const fileName = `Stellar_Orders_Import_${new Date().toISOString().slice(0,10)}.csv`;

  // Modern way (works in all current browsers)
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  console.log(`✅ Downloaded ${matrixifyRows.length} rows as ${fileName}`);
  return csvContent; // also return string if you want to preview
}

function previewMatrixifyRows(matrixifyRows, maxRows = 10) {
  console.log(`\n=== MATRIXIFY PREVIEW (first ${maxRows} rows) ===`);
  const preview = matrixifyRows.slice(0, maxRows);
  console.table(preview);

  // Optional: also log summary
  const updates = matrixifyRows.filter(r => r["ID"] && r["Command"] === "MERGE").length;
  const news = matrixifyRows.filter(r => !r["ID"] && r["Line: Type"] === "Line Item").length;
  const closes = matrixifyRows.filter(r => r["Closed At"]).length;

  console.log(`Summary: ${updates} updates | ${news} new orders | ${closes} closes`);
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


  // === MATCHING ===
  const matchingResult = buildMatchingMaps(shopifyOpenOrders, sageOrders);


  // === GENERATE MATRIXIFY IMPORT ===
  const matrixifyRows = generateMatrixifyImportCSV(
    matchingResult.importableSageOrdersThatAlreadyExistInShopify,
    matchingResult.importableNewSageOrders,
    matchingResult.sageOrdersAlreadyInShopifyMap,
    shopifyOpenOrders
  );

  // === PREVIEW + AUTO DOWNLOAD (for now) ===
  previewMatrixifyRows(matrixifyRows);
  // generateAndDownloadCSV(matrixifyRows);   // remove this line later when you have UI buttons

  return {
    shopifyOpenOrders,
    sageCustomers: sageCustomersMap,
    trackingNumbers: trackingMap,
    sageOrders,
    matchingResult,
    matrixifyRows
  };

}



// ====================== UI GLUE + ENHANCEMENTS ======================
let lastMatrixifyRows = [];

async function processAll() {
  const statusEl = document.getElementById('status');
  const previewEl = document.getElementById('preview');
  const processBtn = document.getElementById('processBtn');
  const downloadBtn = document.getElementById('downloadBtn');

  processBtn.disabled = true;
  statusEl.innerHTML = '<span class="spinner"></span> Processing files...';

  const shopifyFile = document.getElementById('shopifyFile').files[0];
  const sageLinesFile = document.getElementById('sageLinesFile').files[0];
  const sageTrackingFile = document.getElementById('sageTrackingFile').files[0];
  const sageCustomersFile = document.getElementById('sageCustomersFile').files[0];

  if (!shopifyFile || !sageLinesFile || !sageTrackingFile || !sageCustomersFile) {
    statusEl.className = 'error';
    statusEl.textContent = '❌ Please upload all 4 files';
    processBtn.disabled = false;
    return;
  }

  try {
    const result = await processAllFiles(
      shopifyFile,
      sageCustomersFile,
      sageTrackingFile,
      sageLinesFile
    );

    lastMatrixifyRows = result.matrixifyRows;

    statusEl.className = 'success';
    statusEl.innerHTML = `
      ✅ Processing Complete!<br>
      • Updates to existing orders: ${Object.keys(result.matchingResult.importableSageOrdersThatAlreadyExistInShopify).length}<br>
      • New Sage orders: ${Object.keys(result.matchingResult.importableNewSageOrders).length}<br>
      • Orders closed in Shopify: ${result.matrixifyRows.filter(r => r["Closed At"]).length}
    `;

    previewMatrixifyRows(result.matrixifyRows, 8);
    generateAndDownloadCSV(result.matrixifyRows);

    downloadBtn.style.display = 'inline-block';

    previewEl.textContent = `Generated ${result.matrixifyRows.length} rows.\nFile downloaded automatically.`;

  } catch (err) {
    console.error(err);
    statusEl.className = 'error';
    statusEl.textContent = `❌ Error: ${err.message}`;
  } finally {
    processBtn.disabled = false;
  }
}

function downloadAgain() {
  if (lastMatrixifyRows && lastMatrixifyRows.length > 0) {
    generateAndDownloadCSV(lastMatrixifyRows);
  } else {
    alert("No file to download yet. Please process files first.");
  }
}


