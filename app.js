const shipViaCodes = {
  'ADUIE':'A. DUIE PYLE',
  'AAA':'AAA COOPER TRANSPORTATION',
  'ABFCOL':'ABF FREIGHT COLLECT',
  'ABFS':'ABF FREIGHT SYSTEM',
  'ACE EXPRESS':'ACE EXPRESS',
  'ALPTRUCK':'ALPHA TRUCK',
  'AMA':'AMA TRANSPORTATION',
  'AVERITT PPD-FFA':'AVERITT',
  'AVERITT EXPRESS':'AVERITT EXPRESS',
  'BAILEYS':'BAILEYS EXPRESS',
  'BEST WAY':'BEST WAY',
  'CENTRAL':'CENTRAL TRANSPORT',
  'CTII':'CENTRAL TRANSPORT',
  'CST':'CONTACT STELLAR',
  'CUSTRK':"CUSTOMER'S TRUCK",
  'DAYLIGHT':'DAYLIGHT TRANSPORT',
  'DAYTON':'DAYTON FREIGHT',
  'DHL':'DHL',
  'DHLWWDC':'DHL EXP WORLDWIDE COLLECT',
  'EMAIL':'E-MAIL',
  'ESTES':'ESTES EXPRESS',
  'ESTESC':'ESTES EXPRESS COLLECT',
  'ESTES PPD&ADD':'ESTES PPD&ADD',
  'ROUTING GUIDE':'ETS ROUTING GUIDE',
  'FASTFRATE':'FASTFRATE',
  'FEDEX PPD-FFA':'FEDEX',
  'FEDEX2DAY':'FEDEX 2 DAY',
  'FEDEX2DAYAM':'FEDEX 2 DAY AM',
  'FEDEX2DAYAMR':'FEDEX 2 DAY AM RECIPIENT',
  'FEDEX2DAYR':'FEDEX 2 DAY RECIPIENT',
  'FEDEX2DAY3RD':'FEDEX 2DAY 3RD PARTY',
  'FEDEXEXP':'FEDEX EXPRESS',
  'FEDEXEXPSAVER':'FEDEX EXPRESS SAVER',
  'FEDEXPSAVER':'FEDEX EXPRESS SAVER',
  'FEDEXEXPSAVERR':'FEDEX EXPRESS SAVER RECIPIENT',
  'FEDEXFIRSTOVER':'FEDEX FIRST OVERNIGHT',
  'FEDEXFIRSTOVERR':'FEDEX FIRST OVERNIGHT RECIPIENT',
  'FEDEX FREIGHT':'FEDEX FREIGHT',
  'FEDEXF3':'FEDEX FREIGHT  3RD PARTY',
  'FEDEXF':'FEDEX FREIGHT ECONOMY',
  'FEDEXFC':'FEDEX FREIGHT ECONOMY COLLECT',
  'FEDEXFP':'FEDEX FREIGHT PRIORITY',
  'FEDEXFPC':'FEDEX FREIGHT PRIORITY COLLECT',
  'FEDEXR':'FEDEX GRND RECIPIENT',
  'FEDEX':'FEDEX GROUND',
  'FEDEX PPD&ADD':'FEDEX GROUND',
  'FEDEXCOD':'FEDEX GROUND C.O.D.',
  'FEDEXGRDCODR':'FEDEX GROUND COD REC',
  'FEDEXGRDHAZ':'FEDEX GROUND HAZMAT',
  'FEDEXGRDHAZCOD':'FEDEX GROUND HAZMAT C.O.D.',
  'FEDEXGRDHAZR':'FEDEX GROUND HAZMAT RECIPIENT',
  'FEDEX3RD':'FEDEX GROUND THIRD PARTY',
  'FEDEXHP':'FEDEX HAZMAT PREPAID',
  'FEDEXHR':'FEDEX HAZMAT RECIPIENT',
  'FEDEXINTLEC3':"FEDEX INT'L ECON 3RD PARTY",
  'FEDEXINTLEC':"FEDEX INT'L ECONOMY",
  'FEDEXINTLFR':"FEDEX INT'L FIRST REC",
  'FEDEXINTLGRD':"FEDEX INT'L GROUND",
  'FEDEXINTLPRTY':"FEDEX INT'L PRIORITY",
  'FEDEXINTLPRTY3':"FEDEX INT'L PRIORITY 3RD PARTY",
  'FEDEXINTLPRE':"FEDEX INT'L PRIORITY EXPRESS",
  'FEDEXINTLPR':"FEDEX INT'L PRIORITY RECIPIENT",
  'FEDEXINTLECREC':'FEDEX INTL ECON RECIPIENT',
  'FEDEXINTLGRDR':'FEDEX INTL GROUND RECIPIENT',
  'FEDEXINTLPRER':'FEDEX INTL PRIORITY EXP RECIPIENT',
  'FEDEX PRIORITY':'FEDEX PRIORITY',
  'FEDEXPROVER':'FEDEX PRIORITY OVERNIGHT',
  'FEDEXPRTYOVER3':'FEDEX PRIORITY OVERNIGHT 3RD PARTY',
  'FEDEXPROVERR':'FEDEX PRIORITY OVERNIGHT RECIPIENT',
  'FEDEXPROVERS':'FEDEX PRIORITY OVERNIGHT SAT',
  'FEDEXPROVERRS':'FEDEX PRIORITY OVERNIGHT SAT RECIPIENT',
  'FEDEXSTDOVER':'FEDEX STANDARD OVERNIGHT',
  'FEDEXSTDOVER3':'FEDEX STANDARD OVERNIGHT 3RD PARTY',
  'FEDEXSTDOVERR':'FEDEX STD OVERNIGHT RECIPIENT',
  'FORT':'FORT TRANSPORTATION',
  'FORT TRANSPORT':'FORT TRANSPORTATION',
  'FORWARD AIR':'FORWARD AIR',
  'GLOBALTRANZ':'GLOBALTRANZ',
  'HERCULES FRT':'HERCULES FREIGHT',
  'WC':'HOLD FOR WILL CALL',
  'HOL':'HOLLAND',
  'HDS':'HOLLYWOOD DELIVERY',
  'HDS FFA':'HOLLYWOOD DELIVERY',
  'HDS PPD&ADD':'HOLLYWOOD DELIVERY',
  'HDSHAZ':'HOLLYWOOD DELIVERY HAZMAT',
  'HDSHAZ PPD&ADD':'HOLLYWOOD DELIVERY HAZMAT',
  'HDSCOL':'HOLLYWOOD DELIVERY SVC COLLECT',
  'J.M. TRANSIT':'J.M. TRANSIT',
  'LTL FREIGHT':'LTL FREIGHT',
  'N&M':'N & M TRANSFER CO.',
  'NEW ENGLAND':'NEW ENGLAND MOTOR FREIGHT',
  'NEW PENN':'NEW PENN',
  'NEW PENN COL':'NEW PENN COLLECT',
  'OAKHARBOR':'OAK HARBOR FREIGHT',
  'ODFL':'OLD DOMINION FREIGHT',
  'ODFL3':'OLD DOMINION FREIGHT 3RD PARTY',
  'ODFLC':'OLD DOMINION FREIGHT COLLECT',
  'ONTRAC':'ONTRAC',
  'PACE MOTOR':'PACE MOTOR LINES',
  'PITD':'PITT OHIO',
  'PITT OHIO':'PITT OHIO',
  'PREPAID':'PREPAID',
  'PREP&ADD':'PREPAID AND ADD',
  'PROTRANS':'PROTRANS',
  'R&L':'R & L CARRIERS',
  'R&LCOL':'R & L COLLECT',
  'RLCARRIERS':'R + L CARRIERS',
  'ROADIE':'ROADIE (SAME-DAY/RUSH)',
  'ROADRUNNER':'ROADRUNNER FREIGHT',
  'SAIA':'SAIA MOTOR FREIGHT',
  'SAIA - FFA':'SAIA MOTOR FREIGHT',
  'SAIA PPD-FFA':'SAIA MOTOR FREIGHT',
  'SOUTH FRT LINES':'SOUTHEASTERN FREIGHT LINES',
  'STD FORWARDING':'STANDARD FORWARDING',
  'ST':'STELLAR TRUCK',
  'STAL':'STELLAR TRUCK (AL)',
  'STALEX':'STELLAR TRUCK (ALEX)',
  'STJOHN':'STELLAR TRUCK (JOHN)',
  'STKEVIN':'STELLAR TRUCK (KEVIN)',
  'STMARIO':'STELLAR TRUCK (MARIO)',
  'SUTTON':'SUTTON TRANSPORT',
  'TA SERVICES':'TA SERVICES',
  'TFORCE':'TFORCE FREIGHT',
  'TFORCEFRTCOL':'TFORCE FREIGHT COLLECT',
  'TNTECON':'TNT ECONOMY',
  'TNTEXP':'TNT EXPRESS',
  'TRUCK':'TRUCK',
  'TRUCK PPD':'TRUCK PREPAID',
  'TS EXP SERVICES':'TS EXPEDITING SERVICES',
  'UNISHIPPERS':'UNISHIPPERS',
  'UPS2DAAMC':'UPS 2-DAY AIR AM COLLECT',
  'UPS2DAC':'UPS 2-DAY AIR COLLECT',
  'UPS2DA':'UPS 2ND DAY AIR',
  'UPS2DA3':'UPS 2ND DAY AIR 3RD PARTY',
  'UPS2DAAM':'UPS 2ND DAY AIR AM',
  'UPS3DAY':'UPS 3-DAY SELECT',
  'UPS3DAY3RDPARTY':'UPS 3-DAY SELECT 3RD PARTY',
  'UPS3DAYC':'UPS 3-DAY SELECT COLLECT',
  'UPSGRDC':'UPS COLLECT',
  'UPSGRDCCOD':'UPS COLLECT C.O.D.',
  'UPSFRT':'UPS FREIGHT',
  'UPSFRTC':'UPS FREIGHT COLLECT',
  'UPSGRD3RDPARTY':'UPS GRD 3RD PARTY',
  'UPSHAZMATCOD':'UPS GRND HAZMAT C.O.D.',
  'UPSG PPD-FFA':'UPS GROUND',
  'UPSGRD':'UPS GROUND',
  'UPSGRD FFA':'UPS GROUND',
  'UPSGRDCOD':'UPS GROUND C.O.D.',
  'UPSHAZ':'UPS GROUND HAZMAT',
  'UPSHAZ3RDPARTY':'UPS GROUND HAZMAT 3RD PARTY',
  'UPSHAZ3RDPTYSAT':'UPS GROUND HAZMAT 3RD PARTY SAT',
  'UPSHAZCODCOL':'UPS GROUND HAZMAT COD COLLECT',
  'UPSHAZCOL':'UPS HAZMAT COLLECT',
  'UPSNDAEARLY3RDP':'UPS NDA EARLY 3RD PARTY',
  'UPSNDA':'UPS NEXT DAY AIR',
  'UPSNDA3RDPARTY':'UPS NEXT DAY AIR 3RD PARTY',
  'UPSNDACOD':'UPS NEXT DAY AIR C.O.D.',
  'UPSNDAC':'UPS NEXT DAY AIR COLLECT',
  'UPSNDAEAM':'UPS NEXT DAY AIR EARLY',
  'UPSNDAEAMC':'UPS NEXT DAY AIR EARLY COLLECT',
  'UPSNDS3':'UPS NEXT DAY AIR SAT 3RD PARTY',
  'UPSNDSC':'UPS NEXT DAY AIR SAT COLLECT',
  'UPSNDSAM':'UPS NEXT DAY AIR SAT EARLY',
  'UPSNDAAMCS':'UPS NEXT DAY AIR SAT EARLY COLLECT',
  'UPSNDASAT':'UPS NEXT DAY AIR SATURDAY',
  'UPSNDAS':'UPS NEXT DAY AIR SAVER',
  'UPSNDASC':'UPS NEXT DAY AIR SAVER COLLECT',
  'UPSNDASAVE3RDP':'UPS NEXT DAY SAVER 3RD PARTY',
  'UPS PREP & ADD':'UPS PREPAID & ADD',
  'UPSG PPD&ADD':'UPS PREPAID & ADD',
  'UPSSTD':'UPS STANDARD',
  'UPSSTD3RDPTY':'UPS STANDARD 3RD PARTY',
  'UPSSTDC':'UPS STANDARD COLLECT',
  'UPSSTDHAZ':'UPS STANDARD HAZMAT',
  'UPSSTDHAZC':'UPS STANDARD HAZMAT COLLECT',
  'UPSWEXP':'UPS WORLDWIDE EXPEDITED',
  'UPSWEXP3':'UPS WORLDWIDE EXPEDITED 3RD PARTY',
  'UPSWEXPC':'UPS WORLDWIDE EXPEDITED COLLECT',
  'UPSWEXPRESS':'UPS WORLDWIDE EXPRESS',
  'UPSWEXPRESS3':'UPS WORLDWIDE EXPRESS 3RD PARTY',
  'UPSWWEXPRESSC':'UPS WORLDWIDE EXPRESS COLLECT',
  'UPSWEXPLUS':'UPS WORLDWIDE EXPRESS PLUS',
  'UPSWEXPP3':'UPS WORLDWIDE EXPRESS PLUS 3RD PARTY',
  'UPSWEXPS3':'UPS WORLDWIDE EXPRESS SAVER 3RD PARTY',
  'UPSWSAVER':'UPS WORLDWIDE SAVER',
  'UPSWSAVERCOL':'UPS WORLDWIDE SAVER COLLECT',
  'USF':'USF HOLLAND',
  'USPS':'USPS 1st CLASS MAIL',
  'USPSPRTY':'USPS PRIORITY',
  'USPSPRTY-FFA':'USPS PRIORITY',
  'USPSEXP':'USPS PRIORITY EXPRESS',
  'USPSINTL':"USPS PRIORITY INT'L",
  'WARD':'WARD TRUCKING',
  'XPO':'XPO LOGISTICS',
  'XPO PPD-FFA':'XPO LOGISTICS',
  'XPOCOL':'XPO LOGISTICS COLLECT',
  'YRC':'YRC',
};

// HELPERS
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
  return cleaned;
}
function normalizePhone(phoneStr) {
  if (!phoneStr) return '';

  let cleaned = phoneStr.toString().trim();
  if (!cleaned) return '';

  // Keep + and extract digits
  const hasPlus = cleaned.includes('+');
  const digitsOnly = cleaned.replace(/\D/g, '');

  if (!digitsOnly) return cleaned; // rare edge case

  // Case 1: Already has country code (international or explicit +1 / 1-)
  if (hasPlus || cleaned.startsWith('1-') || cleaned.startsWith('00') || digitsOnly.length > 10) {
    if (hasPlus) {
      // Preserve the + and remove other separators
      return cleaned.replace(/[\s()-]/g, '');
    }
    return '+' + digitsOnly;
  }

  // Case 2: No country code → assume US (+1)
  if (digitsOnly.length === 11 && digitsOnly.startsWith('1')) {
    return '+' + digitsOnly;
  }
  if (digitsOnly.length === 10) {
    return '+1' + digitsOnly;
  }

  // Fallback: try to make it E.164
  return '+1' + digitsOnly;
}
// metafield helpers
function parseJsonMetafield(value) {
  if (!value) return [];
  try {
    // Handle both stringified JSON and already-parsed
    const parsed = typeof value === 'string' ? JSON.parse(value) : value;
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.warn('⚠️ Failed to parse metafield JSON:', value);
    return [];
  }
}
function mergePromiseDates(existing, incoming) {
  const map = new Map(); // key is `productName|quantity|promiseDate` -- trying to keep as many unique line items/promise dates as possible

  // Existing first (preserve Shopify history)
  for (const item of existing) {
    const key = `${(item.productName || '').trim()}|${item.quantity || 0}|${(item.promiseDate || '').trim()}`;
    map.set(key, { ...item });
  }

  // Fresh Sage data wins on conflicts - overwrite with sage data if identical
  for (const item of incoming) {
    const key = `${(item.productName || '').trim()}|${item.quantity || 0}|${(item.promiseDate || '').trim()}`;
    map.set(key, { ...item });
  }

  const merged = Array.from(map.values());

  console.log(`🔄 Merged promise dates: ${existing.length} existing + ${incoming.length} incoming → ${merged.length} unique`);
  return merged;
}
function mergeTrackingNumbers(existing, incoming) {
  const map = new Map();

  for (const t of existing) {
    const key = (t.trackingId || '').trim() || JSON.stringify(t);
    map.set(key, { ...t });
  }
  for (const t of incoming) {
    const key = (t.trackingId || '').trim() || JSON.stringify(t);
    map.set(key, { ...t });
  }

  return Array.from(map.values());
}
// matching helpers - does a sage order already have a corresponding shopify order
function sageLineExistsInShopify(sageLine, shopifyLines) {
  // v1 - for now, we're doing a simple match: either metafield custom.sageOrderNumber OR match my qty + line price
  // future - can try to use SKU or product names for matching

  const sageSku = (sageLine.sku || '').trim().toUpperCase();
  const sageName = (sageLine.productName || '').trim().toLowerCase();

  return shopifyLines.some(shLine => {
    const shSku = (shLine.lineSku || '').trim().toUpperCase();
    const shName = (shLine.lineName || '').trim().toLowerCase();

    const skuMatch = sageSku && shSku && sageSku === shSku;
    const nameMatch = sageName && shName && shName.includes(sageName) || sageName.includes(shName);

    const qtyMatch = Math.abs(sageLine.quantity - shLine.lineQuantity) <= 0.01;
    const priceMatch = Math.abs(sageLine.unitPrice - shLine.linePrice) <= 1;

    return (skuMatch || nameMatch) && qtyMatch && priceMatch;
    // return qtyMatch && priceMatch;
  });
}
function allSageLinesAreInShopify(sageOrder, shopifyOrder) {
  if (!sageOrder.productLineItems.length) return true; // edge case

  return sageOrder.productLineItems.every(sageLine =>
    sageLineExistsInShopify(sageLine, shopifyOrder.lineItems)
  );
}






// 1. SHOPIFY OPEN ORDERS
function buildShopifyOpenOrders(shopifyRows) {
  const shopifyOpenOrders = {};

  for (const row of shopifyRows) {
    const id = parseInt(row['ID']); // shopify orders' "ID" is an auto-generated uid integer
    if (!id) continue;

    if (!shopifyOpenOrders[id]) {
      shopifyOpenOrders[id] = {
        metaSageOrderNumber: row['Metafield: custom.sage_order_number [single_line_text_field]'] || '',
        metaSagePromiseDates: row['Metafield: custom.promise_dates [json]'] || '',
        metaSageTrackingNumbers: row['Metafield: custom.tracking_numbers [json]'] || '',
        metaSageCustomerNumber: row['Metafield: custom.sage_order_customer_number [single_line_text_field]'] || '',
        metaSageCustomerPONumber: row['Metafield: custom.sage_order_customer_po_number [single_line_text_field]'] || '',
        shopifyOrderName: row['Name'] || '',
        email: row['Email'] || row['Customer: Email'] || '',
        phone: row['Phone'] || row['Customer: Phone'] || '',
        processedAt: row['Processed At'] || '',
        lineItems: [],
        totalOfLineItems: 0,
        orderSource: row['Source'],
      };
    }

    const order = shopifyOpenOrders[id];


    // Line Items (products) only, we don't need fulfillments, payments, etc here
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

  // Calculate total of all line items, after all lines items are collected
  Object.values(shopifyOpenOrders).forEach(order => {
    order.totalOfLineItems = order.lineItems.reduce((sum, item) => sum + item.lineTotal, 0);
  });

  return shopifyOpenOrders;
}
// 2. SAGE CUSTOMERS
function buildSageCustomers(customerRows) {
  const sageCustomers = {};

  for (const row of customerRows) {
    const customerId = row['Customer']?.trim();
    if (!customerId) continue;

    const email = (row['E-mail Address'] || '').trim();

    // Origin logic: Sage or Shopify
    const hasLetters = /[a-zA-Z]/.test(customerId);
    const origin = hasLetters ? 'sage' : 'shopify';

    sageCustomers[customerId] = {
      email,
      sageCustomerName: row['Name'] || '',
      sageCustomerPhone: normalizePhone(row['Telephone'] || ''),
      origin
    };
  }

  return sageCustomers;
}
// 3. TRACKING NUMBERS
function buildTrackingNumbers(trackingRows) {
  const trackingNumbers = {};

  for (const row of trackingRows) {
    const soNumber = parseInt(row['Sales Order Number']?.trim());
    if (!soNumber) continue;

    if (!trackingNumbers[soNumber]) {
      trackingNumbers[soNumber] = [];
    }

    let shipViaCode = row['Ship Via']?.trim() || '';
    let shipViaDisplay = shipViaCodes[shipViaCode] || shipViaCode; // full name or fallback to code

    trackingNumbers[soNumber].push({
      sageCustomerNumber: row['Customer Number']?.trim() || '',
      invoiceDate: row['Invoice Date']?.trim() || '',
      trackingId: row['Tracking ID']?.trim() || '',
      shipVia: shipViaDisplay,
    });
  }
  return trackingNumbers;
}
// 4. SAGE ORDERS -- depends on previous/requires sageCustomers and trackingNumbers, i.e. this must be done in order, after buildTrackingNumbers()
function buildSageOrders(lineItemsRows, sageCustomers, trackingNumbers) {
  const sageOrders = {};

  for (const row of lineItemsRows) {
    const soId = parseInt(row['Sales Order']?.trim());
    if (!soId) continue;

    if (!sageOrders[soId]) {
      const custNumber = row['Customer Number']?.trim() || '';
      const custInfo = sageCustomers[custNumber] || {email: ''};

      sageOrders[soId] = {
        sageCustomerNumber: custNumber,
        sageCustomerPONumber: (row['Customer PO Number'] || '').trim(),
        sageCustomerEmail: custInfo.email || '',
        sageCustomerName: custInfo.sageCustomerName || '',
        sageCustomerPhone: custInfo.sageCustomerPhone || '',
        orderDate: row['Order Date']?.trim() || '',
        productLineItems: [],
        promiseDates: [],
        trackingNumbers: trackingNumbers[soId] || [],
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


// ORDER MATCHING
// buildMatchingMaps() RETURNS:
//   sageOrdersAlreadyInShopifyMap - input sageOrderNumber, receive shopify order id (long uid)
//   importableSageOrdersThatAlreadyExistInShopify, // just sage order metadata
//   importableNewSageOrders // sage-origin orders that need to be created in shopify to display sage order metadata
function buildMatchingMaps(shopifyOpenOrders, sageOrders) {

  const sageOrdersAlreadyInShopifyMap = {};

  // create sageOrdersAlreadyInShopifyMap
  Object.entries(shopifyOpenOrders).forEach(([shopifyId, order]) => {
    const sageNum = order.metaSageOrderNumber?.trim();
    if (sageNum) {
      sageOrdersAlreadyInShopifyMap[sageNum] = shopifyId;
    }
  });

  // create importableSageOrdersThatAlreadyExistInShopify, importableNewSageOrders
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

        // i.e. all Sage line items must also be in the Shopify order to be considered a match
        if (allSageLinesAreInShopify(sageOrder, shopifyOrder)) {
          importableSageOrdersThatAlreadyExistInShopify[soId] = {
            ...sageOrder,
            shopifyOrderId: shopifyId,
            shopifyOrderName: shopifyOrder.shopifyOrderName,
            customerEmail: sageEmail,

          };

          sageOrdersAlreadyInShopifyMap[soId] = shopifyId;
          matched = true;
          break;
        }
      }
    }

    if (!matched) {
      importableNewSageOrders[soId] = sageOrder;
      // importableNewSageOrders[soId].customerEmail = sageEmail;
    }
  });

  console.log(`✅ Matching complete:`);
  console.log(`   Already in Shopify: ${Object.keys(importableSageOrdersThatAlreadyExistInShopify).length}`);
  console.log(`   New Sage-origin orders to import: ${Object.keys(importableNewSageOrders).length}`);

  return {
    sageOrdersAlreadyInShopifyMap,
    importableSageOrdersThatAlreadyExistInShopify,
    importableNewSageOrders
  };
}


// GENERATE MATRIXIFY-IMPORTABLE CSV
function generateMatrixifyImportCSV(
  importableSageOrdersThatAlreadyExistInShopify,
  importableNewSageOrders,
  sageOrdersAlreadyInShopifyMap,
  shopifyOpenOrders
) {

  const sageOriginString = 'Sage-origin';
  const importRows = [];

  // today in Pacific Time
  const today = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Los_Angeles',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(new Date()).replace(/\//g, '-');   // → YYYY-MM-DD

  // Helper to format date for Shopify
  function formatShopifyDate(dateStr) {
    if (!dateStr) return '';
    return normalizeDate(dateStr); // reuse our normalizer → YYYY-MM-DD
  }


  // 1. EXISTING ORDERS - Merge metafields
  Object.entries(importableSageOrdersThatAlreadyExistInShopify).forEach(([soId, sageOrder]) => {
    const shopifyOrder = shopifyOpenOrders[sageOrder.shopifyOrderId]; // we have this from param

    const existingPromiseDates = parseJsonMetafield(shopifyOrder?.metaPromiseDates);
    const existingTracking = parseJsonMetafield(shopifyOrder?.metaTrackingNumbers);

    const mergedPromiseDates = mergePromiseDates(existingPromiseDates, sageOrder.promiseDates || []);
    const mergedTracking = mergeTrackingNumbers(existingTracking, sageOrder.trackingNumbers || []);

    importRows.push({
      "ID": sageOrder.shopifyOrderId || '',
      "Name": sageOrder.shopifyOrderName || '',
      "Number": '',
      "Command": "MERGE",
      "Processed At": "",
      "Closed At": "",
      "Source": "",
      "Customer:Email": sageOrder.sageCustomerEmail || '',
      "Customer: Phone": "",
      "Customer: First Name": "",
      "Customer: Last Name": "",
      "Line: Type": "Ignore",
      "Line: Command": "",
      "Line: Name": "",
      "Line: SKU": "",
      "Line: Quantity": "",
      "Line: Price": "",
      "Metafield: custom.sage_order_number": soId,
      "Metafield: custom.promise_dates": mergedPromiseDates.length ? JSON.stringify(mergedPromiseDates) : '',
      "Metafield: custom.tracking_numbers": mergedTracking.length ? JSON.stringify(mergedTracking) : '',
      "Metafield: custom.sage_order_customer_number": sageOrder.sageCustomerNumber || '',
      "Metafield: custom.sage_order_customer_po_number": sageOrder.sageCustomerPONumber || '',
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
        "Source": sageOriginString,
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
        "Metafield: custom.sage_order_number": soId,
        "Metafield: custom.promise_dates": order.promiseDates.length ? JSON.stringify(order.promiseDates) : '',
        "Metafield: custom.tracking_numbers": order.trackingNumbers.length ? JSON.stringify(order.trackingNumbers) : '',
        "Metafield: custom.sage_order_customer_number": order.sageCustomerNumber || '',
        "Metafield: custom.sage_order_customer_po_number": order.sageCustomerPONumber || '',
      };

      // Put customer info & metafields on the first line item only (Matrixify best practice)
      if (index > 0) {
        row["Customer:Email"] = "";
        row["Customer: Phone"] = "";
        row["Customer: First Name"] = "";
        row["Customer: Last Name"] = "";
        row["Metafield: custom.sage_order_number"] = "";
        row["Metafield: custom.promise_dates"] = "";
        row["Metafield: custom.tracking_numbers"] = "";
        row["Metafield: custom.sage_order_customer_number"] = "";
        row["Metafield: custom.sage_order_customer_po_number"] = "";
      }

      importRows.push(row);
    });
  });

  // 3. CLOSED ORDERS (exist in Shopify but no longer in Sage)
  const closedOrders = [];
  Object.entries(sageOrdersAlreadyInShopifyMap).forEach(([sageSoId, shopifyId]) => {

    // use merged metafields
    const shopifyOrder = shopifyOpenOrders[shopifyId]; // we have this from param
    const orderSource = shopifyOrder.orderSource.trim() || '';

    const existingPromiseDates = parseJsonMetafield(shopifyOrder?.metaPromiseDates);
    const mergedPromiseDates = mergePromiseDates(existingPromiseDates, []);

    const existingTracking = parseJsonMetafield(shopifyOrder?.metaTrackingNumbers);
    const mergedTracking = mergeTrackingNumbers(existingTracking, []);


    // If this order-that's-already-in-shopify is NOT in the "already exists"/updateable-importable bucket AND &&
    // also NOT in the "new"-importable bucket →
    // then this order should be closed
    if (
      !importableSageOrdersThatAlreadyExistInShopify[sageSoId] &&
      !importableNewSageOrders[sageSoId] &&
      shopifyOrder.orderSource === sageOriginString
    ) {

      const shopifyOrder = shopifyOpenOrders[shopifyId];
      if (shopifyOrder) {
        closedOrders.push({
          "ID": shopifyId,
          "Name": shopifyOrder.shopifyOrderName || '',
          "Number": '',
          "Command": "MERGE",
          "Processed At": "",
          "Closed At": today,                    // This archives the order
          "Source": orderSource,
          "Customer:Email": "",
          "Customer: Phone": "",
          "Customer: First Name": "",
          "Customer: Last Name": "",
          "Line: Type": "Ignore",
          "Line: Command": "",
          "Line: Name": "",
          "Line: SKU": "",
          "Line: Quantity": "",
          "Line: Price": "",
          "Metafield: custom.sage_order_number": sageSoId,
          "Metafield: custom.promise_dates": JSON.stringify(mergedPromiseDates), // retain metadata for customer history
          "Metafield: custom.tracking_numbers": JSON.stringify(mergedTracking), // retain metadata for customer history
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


// DOWNLOAD & PREVIEW THE MATRIXIFY-IMPORTABLE CSV
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
  // const fileName = `Stellar_Orders_Import_${new Date().toISOString().slice(0,10)}.csv`;
  const fileName = `Stellar_Orders_Import_${new Date().toISOString()}.csv`;

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
  return csvContent;
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


// MAIN PROCESSOR -- read all input files && generate objects
async function processAllFiles(shopifyFile, sageCustomersFile, sageTrackingFile, sageLinesFile) {
  console.log('*** processAllFiles() -- 🚀 Starting: create a shopify/matrixify importable CSV ***');

  // read all the uploaded files/csv's
  const [
    shopifyRows,
    customerRows,
    trackingRows,
    lineItemsRows
  ] = await Promise.all([
    parseCSV(shopifyFile),
    parseCSV(sageCustomersFile),
    parseCSV(sageTrackingFile),
    parseCSV(sageLinesFile)
  ]);


  // Build iterable js objects, in the correct dependency order, i.e. keep this block in the same order
  const shopifyOpenOrders = buildShopifyOpenOrders(shopifyRows); // shopifyOpenOrders = shopify data about the order, including sage metadata if available
  const sageCustomersMap = buildSageCustomers(customerRows); // sageCustomersMap = input sage customer id, receive customer email, etc
  const trackingMap = buildTrackingNumbers(trackingRows);
  const sageOrders = buildSageOrders(lineItemsRows, sageCustomersMap, trackingMap);
  console.log('✅ Processing complete!');
  console.log(`Shopify Open Orders: ${Object.keys(shopifyOpenOrders).length}`);
  console.log(`Sage Customers: ${Object.keys(sageCustomersMap).length}`);
  console.log(`Sage Orders: ${Object.keys(sageOrders).length}`);


  // === MATCHING ===
  // returns 3 types of objects to use in the creation of the matrixify-importable csv:
  //   (1) sage->shopify order id converter,
  //   (2) shopify orders (any-origin) that already have sage metadata,
  //   (3) sage-origin orders that need to be created in shopify
  //
  // matchingResult = {
  //     sageOrdersAlreadyInShopifyMap, // input sageOrderNumber, receive shopify order id (long uid)
  //     importableSageOrdersThatAlreadyExistInShopify,
  //     importableNewSageOrders
  //   };
  const matchingResult = buildMatchingMaps(shopifyOpenOrders, sageOrders);


  // === GENERATE MATRIXIFY-IMPORTABLE CSV ===
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



// ====================== UI BUTTONS ======================
let lastMatrixifyRows = [];
// onclick="processAll"
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


