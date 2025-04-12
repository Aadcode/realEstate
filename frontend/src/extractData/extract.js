// import { google } from 'googleapis';
// import fs from 'fs-extra';
// async function authorize() {
//   const auth = new google.auth.GoogleAuth({
//     keyFile: "service-account.json",
//     scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
//   });
//   return auth.getClient();
// }


// const cleanEmptyFields = (obj) => {
//   Object.keys(obj).forEach((key) => {
//     if (obj[key] === "" || obj[key] === 0) {
//       delete obj[key];
//     } else if (typeof obj[key] === "object" && !Array.isArray(obj[key])) {
//       cleanEmptyFields(obj[key]);
//     }
//   });
// };

// const convertToNumber = (value) => {
//   if (typeof value === "string") {
//     const num = parseFloat(value.replace(/[^0-9.-]/g, ""));
//     return isNaN(num) ? value : num;
//   }
//   return value;
// };

// const transformOtherIncome = (otherIncome) => {
//   const transformed = [];
//   for (const date in otherIncome) {
//     otherIncome[date].forEach(item => {
//       transformed.push({
//         type: item.type,
//         date: date,
//         amount: item.amount
//       });
//     });
//   }
//   return transformed;
// };

// const transformExpensesByMonth = (expenses) => {
//   const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
//                  "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
//   const transformed = {};
  
//   months.forEach(month => {
//     transformed[month] = {};
//   });

//   for (const expenseType in expenses) {
//     if (!expenseType || expenseType.trim() === "") continue;
    
//     for (const month in expenses[expenseType]) {
//       const amount = expenses[expenseType][month];
//       if (amount > 0) {
//         transformed[month][expenseType] = amount;
//       }
//     }
//   }

//   Object.keys(transformed).forEach(month => {
//     if (Object.keys(transformed[month]).length === 0) {
//       delete transformed[month];
//     }
//   });

//   return transformed;
// };

// const transformOtherExpenses = (otherExpenses) => {
//   const transformed = [];
//   for (const expenseType in otherExpenses) {
//     if (!expenseType || expenseType.trim() === "") continue;
    
//     otherExpenses[expenseType].forEach(expense => {
//       if (expense.amount > 0) {
//         transformed.push({
//           type: expenseType,
//           date: expense.date,
//           amount: expense.amount,
//           description: expense.description
//         });
//       }
//     });
//   }
//   return transformed;
// };

// const transformPropertyStructure = (property) => {
//   return {
//     propertyCode: property.propertyCode,
//     address: property.address,
//     rentAmount: property.rentAmount,
//     tenantName: property.tenantName,
//     phone: property.phone,
//     moveInDate: property.moveInDate,
//     renewalDate: property.renewalDate,
//     propertyValue: property.propertyValue,
//     downPayment: property.downPayment,
//     securityDeposit: property.securityDeposit,
//     rentalIncomeByMonth: property.rentalIncomeByMonth,
//     yearlyRentalIncome: property.yearlyRentalIncome,
//     otherIncome: transformOtherIncome(property.otherIncome),
//     otherExpenses: transformOtherExpenses(property.otherExpenses),
//     totals: property.totals
//   };
// };

// const processExpenses = (rows, months) => {
//   const expensesByType = {};
  
//   if (rows) {
//     for (let i = 1; i < rows.length - 1; i++) {
//       const row = rows[i];
//       const expenseType = row[0]?.trim();
      
//       if (!expenseType) continue;

//       ["A", "B", "C", "D", "E"].forEach((code, idx) => {
//         months.forEach((month, mIdx) => {
//           const amountStr = row[mIdx + 1 + idx * 12]?.replace(/[^0-9.]/g, "") || "0";
//           const amount = parseFloat(amountStr) || 0;

//           if (amount > 0) {
//             if (!expensesByType[expenseType]) {
//               expensesByType[expenseType] = {};
//             }
//             expensesByType[expenseType][month] = amount;
//           }
//         });
//       });
//     }
//   }

//   return expensesByType;
// };

// async function extractPropertyData(spreadsheetId) {
//   try {
//     const auth = await authorize();
//     const sheets = google.sheets({ version: "v4", auth });


//     const propertyData = await sheets.spreadsheets.values.get({
//       spreadsheetId,
//       range: "Data Sheet!B3:R95",
//     });

//     console.log(propertyData.data.values)

//     const securityDeposits = await sheets.spreadsheets.values.get({
//       spreadsheetId,
//       range: "Data Sheet!B14:M18",
//     });

//     const rentalIncome = await sheets.spreadsheets.values.get({
//       spreadsheetId,
//       range: "Data Sheet!B22:R35",
//     });

//     const otherIncome = await sheets.spreadsheets.values.get({
//       spreadsheetId,
//       range: "Data Sheet!B38:R46",
//     });

//     const monthlyExpenses = await sheets.spreadsheets.values.get({
//       spreadsheetId,
//       range: "Data Sheet!B49:R59",
//     });

//     const operatingExpenses = await sheets.spreadsheets.values.get({
//       spreadsheetId,
//       range: "Data Sheet!B62:R74",
//     });

//     const otherExpenses = await sheets.spreadsheets.values.get({
//       spreadsheetId,
//       range: "Data Sheet!B77:R95",
//     });

//     const incomeProfitability = await sheets.spreadsheets.values.get({
//       spreadsheetId,
//       range: "Data Sheet!B98:C108",
//     });

   
//     const properties = {};
//     const globalData = {
//       monthlyExpenses: {},
//       operatingExpenses: {},
//       incomeProfitability: {}
//     };

//     const months = [
//       "Jan", "Feb", "Mar", "Apr", "May", "Jun",
//       "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"
//     ];

  
//     const rows = propertyData.data.values;
//     if (rows && rows.length) {
//       for (const row of rows) {
//         const propertyCode = row[0];
//         if (!propertyCode) continue;

//         properties[propertyCode] = {
//           propertyCode,
//           address: row[1],
//           rentAmount: row[4],
//           tenantName: row[5],
//           phone: row[7],
//           moveInDate: row[9],
//           renewalDate: row[11],
//           propertyValue: row[14],
//           downPayment: row[15],
//           securityDeposit: [],
//           rentalIncomeByMonth: {},
//           yearlyRentalIncome: { totalIncome: 0, totalLateFee: 0 },
//           otherIncome: {},
//           otherExpenses: {},
//           totals: {
//             securityDepositTotal: 0,
//             rentalIncomeTotal: { amount: 0, lateFee: 0 },
//             otherIncomeTotal: 0,
//             otherExpenseTotal: 0,
//           },
//         };
//       }
//     }


//     const depositRows = securityDeposits.data.values;
//     if (depositRows) {
//       for (let i = 1; i < depositRows.length; i++) {
//         const row = depositRows[i];
//         const isTotalRow = row[0]?.toLowerCase().includes("total");

//         ["A", "B", "C", "D", "E"].forEach((code, idx) => {
//           if (!properties[code]) return;

//           const date = row[idx * 2 + 1]?.trim();
//           const amountStr = row[idx * 2 + 2]?.replace(/[^0-9.]/g, "") || "0";
//           const amount = parseFloat(amountStr) || 0;

//           if (isTotalRow) {
//             properties[code].totals.securityDepositTotal = amount;
//           } else if (date && amount > 0) {
//             properties[code].securityDeposit.push({
//               type: row[0],
//               date,
//               amount,
//             });
//           }
//         });
//       }
//     }

//     // Process rental income
//     const incomeRows = rentalIncome.data.values;
//     if (incomeRows) {
//       const incomeMonths = [
//         "Jan.", "Feb.", "Mar.", "Apr.", "May", "Jun.",
//         "Jul.", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."
//       ];

//       for (let i = 1; i < incomeRows.length; i++) {
//         const row = incomeRows[i];

//         if (!row[0] || !incomeMonths.includes(row[0])) continue;

//         const month = row[0].replace(/\.$/, "");

//         ["A", "B", "C", "D", "E"].forEach((code, idx) => {
//           if (!properties[code]) return;

//           const incomeStr = row[idx * 3 + 2]?.replace(/[^0-9.]/g, "") || "0";
//           const lateFeeStr = row[idx * 3 + 3]?.replace(/[^0-9.]/g, "") || "0";
          
//           const income = parseFloat(incomeStr) || 0;
//           const lateFee = parseFloat(lateFeeStr) || 0;

//           if (!properties[code].rentalIncomeByMonth[month]) {
//             properties[code].rentalIncomeByMonth[month] = {
//               totalIncome: 0,
//               lateFee: 0,
//             };
//           }

//           properties[code].rentalIncomeByMonth[month].totalIncome += income;
//           properties[code].rentalIncomeByMonth[month].lateFee += lateFee;
//         });
//       }
//     }

//     const otherIncomeRows = otherIncome.data.values;
//     if (otherIncomeRows) {
//       for (let i = 2; i < otherIncomeRows.length; i++) {
//         const row = otherIncomeRows[i];

//         ["A", "B", "C", "D", "E"].forEach((code, idx) => {
//           if (!properties[code]) return;

//           const date = row[idx * 3 + 1]?.trim();
//           const amountStr = row[idx * 3 + 2]?.replace(/[^0-9.]/g, "") || "0";
//           const amount = parseFloat(amountStr) || 0;

//           if (date && amount > 0) {
//             if (!properties[code].otherIncome[date]) {
//               properties[code].otherIncome[date] = [];
//             }

//             properties[code].otherIncome[date].push({
//               type: row[0] || "Other",
//               amount,
//             });
            
//             properties[code].totals.otherIncomeTotal += amount;
//           }
//         });
//       }
//     }

//     const monthlyExpensesRows = monthlyExpenses.data.values;
//     globalData.monthlyExpenses = processExpenses(monthlyExpensesRows, months);

//     const operatingExpensesRows = operatingExpenses.data.values;
//     globalData.operatingExpenses = processExpenses(operatingExpensesRows, months);

//     const otherExpensesRows = otherExpenses.data.values;
//     if (otherExpensesRows) {
//       for (let i = 2; i < otherExpensesRows.length - 1; i++) {
//         const row = otherExpensesRows[i];
//         const expenseType = row[0]?.trim();

//         if (!expenseType) continue;

//         ["A", "B", "C", "D", "E"].forEach((code, idx) => {
//           if (!properties[code]) return;

//           if (!properties[code].otherExpenses[expenseType]) {
//             properties[code].otherExpenses[expenseType] = [];
//           }

//           const date = row[1 + idx * 3]?.trim() || null;
//           const amountStr = row[2 + idx * 3]?.replace(/[^0-9.]/g, "") || "0";
//           const amount = parseFloat(amountStr) || 0;
//           const description = row[3 + idx * 3]?.trim() || null;

//           if (amount > 0) {
//             properties[code].otherExpenses[expenseType].push({
//               date,
//               amount,
//               description
//             });

//             properties[code].totals.otherExpenseTotal += amount;
//           }
//         });
//       }
//     }

//     for (const code of Object.keys(properties)) {
//       let yearlyTotalIncome = 0;
//       let yearlyLateFee = 0;

//       for (const month of Object.keys(properties[code].rentalIncomeByMonth)) {
//         yearlyTotalIncome += properties[code].rentalIncomeByMonth[month].totalIncome;
//         yearlyLateFee += properties[code].rentalIncomeByMonth[month].lateFee;
//       }

//       properties[code].yearlyRentalIncome = {
//         totalIncome: yearlyTotalIncome,
//         totalLateFee: yearlyLateFee,
//       };

//       properties[code].totals.rentalIncomeTotal = {
//         amount: yearlyTotalIncome,
//         lateFee: yearlyLateFee,
//       };
//     }

//     const profitabilityRows = incomeProfitability.data.values;
//     if (profitabilityRows) {
//       profitabilityRows.forEach((row) => {
//         const metric = row[0]?.trim();
//         const value = row[1]?.trim();
//         if (!metric || !value) return;

//         globalData.incomeProfitability[metric] = convertToNumber(value);
//       });
//     }

//     const result = {
//       ...Object.fromEntries(
//         Object.entries(properties).map(([code, property]) => [
//           code, 
//           transformPropertyStructure(property)
//         ])
//       ),
//       monthlyExpenses: transformExpensesByMonth(globalData.monthlyExpenses),
//       operatingExpenses: transformExpensesByMonth(globalData.operatingExpenses),
//       incomeProfitability: globalData.incomeProfitability
//     };

//     cleanEmptyFields(result.monthlyExpenses);
//     cleanEmptyFields(result.operatingExpenses);

//     writeFileSync("property_management_data.json", JSON.stringify(result, null, 2));
//     console.log("Property management data saved to property_management_data.json");

//     return result;

//   } catch (error) {
//     console.error("Error extracting property data:", error);
//     throw error;
//   }
// }

// const spreadsheetId = "1dcocrw9Ezj2WxgrXu_eA7W9ZtYuO-W84mhNSQmqWe6s";

// extractPropertyData(spreadsheetId)
//   .then((data) => {
//     console.log(`Successfully processed ${Object.keys(data).filter(k => !['monthlyExpenses', 'operatingExpenses', 'incomeProfitability'].includes(k)).length} properties`);
//   })
//   .catch((error) => {
//     console.error("Error:", error);
//   });



// function parsePropertyData(data) {
//   const result = {
//     year: null,
//     summary: {},
//     properties: [],
//     securityDeposits: {
//       deposits: [],
//       petDeposits: [],
//       other: 0,
//       total: 0,
//     },
//     rentalIncome: [],
//     otherIncome: [],
//     monthlyExpenses: [],
//     operatingExpenses: [],
//   };

//   let i = 0;

//   // Parse Year & Summary
//   for (; i < data.length; i++) {
//     if (data[i][0] === 'Year:') {
//       result.year = data[i][1];
//       result.summary = {
//         grossIncome: data[i][4],
//         totalExpenses: data[i][8],
//         netIncome: data[i][12],
//         deposits: data[i][15]
//       };
      
//       break;
//     }
//   }

//   // Parse Properties
//   for (; i < data.length; i++) {
//     if (data[i][0] === 'Property Code') {
//       i++;
//       while (data[i] && data[i][0]) {
//         const row = data[i];
//         result.properties.push({
//           code: row[0],
//           address: row[1],
//           rent: row[4],
//           tenant: row[5],
//           phone: row[7],
//           moveIn: row[9],
//           renewal: row[11],
//           value: row[13],
//           downPayment: row[14]
//         });
//         i++;
//       }
//       break;
//     }
//   }

//   // Parse Security Deposits
//   for (; i < data.length; i++) {
//     if (data[i][0] === 'Security Deposits') {
//       const depositRow = data[i + 2];
//       const petRow = data[i + 3];
//       const otherRow = data[i + 4];
//       const totalRow = data[i + 5];

//       for (let j = 1; j < depositRow.length - 1; j += 2) {
//         result.securityDeposits.deposits.push({
//           date: depositRow[j],
//           amount: depositRow[j + 1]
//         });
//       }

//       for (let j = 1; j < petRow.length - 1; j += 2) {
//         if (petRow[j]) {
//           result.securityDeposits.petDeposits.push({
//             date: petRow[j],
//             amount: petRow[j + 1]
//           });
//         }
//       }

//       result.securityDeposits.other = otherRow[otherRow.length - 1];
//       result.securityDeposits.total = totalRow[totalRow.length - 1];
//       break;
//     }
//   }

//   // Parse Rental Income
//   for (; i < data.length; i++) {
//     if (data[i][0] === 'Rental Income') {
//       while (data[i + 2] && data[i + 2][0] && data[i + 2][0].endsWith('.')) {
//         const row = data[i + 2];
//         result.rentalIncome.push({
//           month: row[0],
//           A: row[2],
//           B: row[5],
//           C: row[8],
//           D: row[11],
//           E: row[14],
//           total: row[16]
//         });
//         i++;
//       }
//       break;
//     }
//   }

//   // Parse Other Income
//   for (; i < data.length; i++) {
//     if (data[i][0] === 'Other Income') {
//       while (data[i + 2] && data[i + 2][0] && data[i + 2][0] !== 'Total:') {
//         const row = data[i + 2];
//         result.otherIncome.push({
//           type: row[0],
//           A: { date: row[1], amount: row[2] },
//           B: { date: row[4], amount: row[5] },
//           C: { date: row[7], amount: row[8] },
//           D: { date: row[10], amount: row[11] },
//           E: { date: row[13], amount: row[14] },
//           total: row[16]
//         });
//         i++;
//       }
//       break;
//     }
//   }

//   // Parse Monthly Expenses
//   for (; i < data.length; i++) {
//     if (data[i][0] === 'Monthly Expenses') {
//       while (data[i + 1] && data[i + 1][0] && data[i + 1][0] !== 'Total:') {
//         const row = data[i + 1];
//         const name = row[0];
//         const monthly = row.slice(1, 13);
//         const total = row[row.length - 1];
//         result.monthlyExpenses.push({ name, monthly, total });
//         i++;
//       }
//       break;
//     }
//   }

//   // Parse Operating Expenses
//   for (; i < data.length; i++) {
//     if (data[i][0] === 'Operating Expenses') {
//       while (data[i + 1] && data[i + 1][0] && data[i + 1][0] !== 'Total:') {
//         const row = data[i + 1];
//         const name = row[0];
//         const monthly = row.slice(1, 13);
//         const total = row[row.length - 1];
//         result.operatingExpenses.push({ name, monthly, total });
//         i++;
//       }
//       break;
//     }
//   }

//   return result;
// }

// // Main runner
// const spreadsheetId = "1dcocrw9Ezj2WxgrXu_eA7W9ZtYuO-W84mhNSQmqWe6s";

// extractPropertyData(spreadsheetId)
//   .then((data) => {
//     const structuredJson = parsePropertyData(data);

//     const output = `export const propertyData = ${JSON.stringify(structuredJson, null, 2)};`;

//     fs.writeFileSync(path.resolve('property-data.js'), output, 'utf8');

//     console.log('✅ Data written to property-data.js');
//   })
//   .catch((error) => {
//     console.error('❌ Error:', error);
//   });


import { google } from "googleapis";
import fs from "fs-extra";

// === Google Sheets Authorization ===
async function authorize() {
  const auth = new google.auth.GoogleAuth({
    keyFile: "service-account.json",
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });
  return auth.getClient();
}

const spreadsheetId = "1dcocrw9Ezj2WxgrXu_eA7W9ZtYuO-W84mhNSQmqWe6s";

// === Fetch Google Sheet Data ===
async function extractPropertyData(spreadsheetId) {
  try {
    const auth = await authorize();
    const sheets = google.sheets({ version: "v4", auth });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "Data Sheet!B3:R95",
    });

    return response.data.values;
  } catch (error) {
    console.error("Error extracting property data:", error);
    throw error;
  }
}

// === Extract Gross Income from First Row ===
function extractGrossIncome(row) {
  const index = row.findIndex(cell =>
    typeof cell === "string" && cell.toLowerCase().includes("gross income")
  );

  if (index === -1) {
    console.warn("⚠️ 'Gross Income' label not found.");
    return 0;
  }

  for (let i = index + 1; i <= index + 3 && i < row.length; i++) {
    const value = row[i];
    if (typeof value === "string" && /\d/.test(value)) {
      const parsed = parseFloat(value.replace(/[^\d.-]/g, ""));
      if (!isNaN(parsed)) return parsed;
    }
  }

  console.warn("⚠️ 'Gross Income' value not found after label.");
  return 0;
}

// === Process Sheet into Desired Format ===
function processRentalData(data) {
  const rentalIncomeStart = data.findIndex(row => row[0] === 'Rental Income') + 2;
  const rentalIncomeSection = data.slice(rentalIncomeStart, rentalIncomeStart + 12);

  const monthlyRentals = rentalIncomeSection.map(row => ({
    month: row[0].replace('.', '').substring(0, 3),
    revenue: parseFloat(row[row.length - 1].replace(/[^\d.-]/g, '')),
  }));

  const grossIncome = extractGrossIncome(data[0]);

  return {
    grossIncome,
    yearlyData: {
      2025: monthlyRentals,
    },
  };
}

// === Main Runner ===
async function main() {
  const data = await extractPropertyData(spreadsheetId);
  const result = processRentalData(data);

  const fileContent = `export const grossIncome = ${result.grossIncome};

export const yearlyData = {
  2025: ${JSON.stringify(result.yearlyData[2025], null, 2)}
};
`;

  fs.writeFileSync("rentalData.js", fileContent);
  console.log("✅ rentalData.js written successfully!");
}

main();
