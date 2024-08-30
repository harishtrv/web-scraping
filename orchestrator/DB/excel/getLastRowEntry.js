const XLSX = require('xlsx');
const fs = require('fs');

function getLastRowEntry(filePath, columnIndex) {
  if (!fs.existsSync(filePath)) {
    console.error('File does not exist.');
    return 1;
  }

  // Read the Excel file
  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];

  // Convert worksheet to JSON
  const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

  // Check if data is available
  if (data.length === 0 || !data[0] || data[0].length < columnIndex + 1) {
    console.log('Column index out of bounds or empty data.');
    return 1;
  }

  // Get the last row entry for the specified column index
  const lastRow = data[data.length - 1];
  const lastEntry = lastRow[columnIndex];
  return lastEntry;
}

module.exports = getLastRowEntry;
