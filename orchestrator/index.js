// const { Client } = require('pg');
const express = require('express');
const insertToDB = require('./DB/insertToDB');
const createExcelFile = require('./DB/excel/createExcelFile');
const addRowToExcel = require('./DB/excel/addRowToExcel');
const getLastRowEntry = require('./DB/excel/getLastRowEntry');

const app = express();
const port = 7777;
// const config = {
//   user: 'uioyjtz47tn74wlgia3v',
//   host: 'bqafluem5tg6iuitfklz-postgresql.services.clever-cloud.com',
//   database: 'bqafluem5tg6iuitfklz',
//   password: 'NqlIpiLZNLqRjsWIb14kb4GVQiibiW',
//   port: 50013,
// };
// const client = new Client(config);
const columns = ['owner_full_name', 'total_extent', 'surveyno', 'surnoc', 'hissa', 'village_name', 'liablities'];
const filePath = 'data.xlsx';
// const connectToDB = async () => await client.connect();
const defaultWidth = 8.43;
const columnWidths = [
  defaultWidth * 5,
  defaultWidth,
  defaultWidth * 0.6,
  defaultWidth * 0.4,
  defaultWidth * 0.5,
  defaultWidth,
  defaultWidth * 7
];

app.use(express.json());
// connectToDB();
createExcelFile(filePath, columns, columnWidths);
let surveyno = parseInt(getLastRowEntry(filePath, 2)) + 1;

app.get('/surveyno', (req, res) => {
  if (surveyno >= 1700) {
    return -1;
  }
  res.json({ surveyno });
  surveyno++;
});

app.post('/result', async (req, res) => {
  const data = req.body;
  if (!data || !data.owner_full_name || !data.surveyno) {
    return res.status(400).json({ error: 'Invalid data format' });
  }

  // await insertToDB(data, client);
  addRowToExcel(filePath, data, columnWidths);
  res.status(201).json(data);
});

// Start the server
const server = app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// // Cleanup function
// function cleanup() {
//   console.log('Performing cleanup operations...');
//   client.end();
//   setTimeout(() => {
//     console.log('Cleanup complete. Exiting now.');
//     process.exit(0);
//   }, 1000);
// }

// // Handle termination signals
// process.on('SIGTERM', () => {
//   console.log('SIGTERM signal received: closing HTTP server');
//   server.close(() => {
//     console.log('HTTP server closed');
//     cleanup();
//   });
// });

// process.on('SIGINT', () => {
//   console.log('SIGINT signal received: closing HTTP server');
//   server.close(() => {
//     console.log('HTTP server closed');
//     cleanup();
//   });
// });
