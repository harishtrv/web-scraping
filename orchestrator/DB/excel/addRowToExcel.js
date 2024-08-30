const XLSX = require('xlsx');
const fs = require('fs');

function addRowToExcel(filePath, jsonData, columnWidths) {
  if (!fs.existsSync(filePath)) {
    console.error('File does not exist. Please create the file first.');
    return;
  }

  // Read the existing workbook
  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];

  // Read existing data and append the new row
  const existingData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
  const columns = existingData[0];
  const newRow = columns.map(col => jsonData[col] || '');
  existingData.push(newRow);

  // Create a new worksheet with the updated data
  const updatedWorksheet = XLSX.utils.aoa_to_sheet(existingData);

  // Preserve column widths
  updatedWorksheet['!cols'] = columnWidths.map(width => ({ wpx: width * 10 })); // Convert to pixels

  // Append the updated worksheet to the workbook
  workbook.Sheets[sheetName] = updatedWorksheet;

  // Write the updated workbook to the file
  XLSX.writeFile(workbook, filePath);

  console.log('Row added successfully.');
}

module.exports = addRowToExcel;
