const XLSX = require('xlsx');
const fs = require('fs');

function createExcelFile(filePath, columns, columnWidths) {
    if (fs.existsSync(filePath)) {
        console.log('File already exists. Skipping creation.');
        return;
    }

    // Create a new workbook and add a worksheet
    const workbook = XLSX.utils.book_new();
    const worksheetData = [columns];
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

    worksheet['!cols'] = columnWidths.map(width => ({ wpx: width * 10 })); // Convert to pixels

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    // Write the workbook to a file
    XLSX.writeFile(workbook, filePath);

    console.log(`Excel file created at ${filePath}`);
}

module.exports = createExcelFile;
