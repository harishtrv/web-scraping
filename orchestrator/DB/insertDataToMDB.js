
const { MongoClient, ServerApiVersion } = require('mongodb');
const url = "mongodb+srv://harisht26698:5vl09STuGYR8CyIB@cluster0.m7tutbv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const dbName = 'landdetails';

const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

async function insertData() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(dbName);
    const collection = db.collection('OWNERS_DETAILS'); 

    const data = [
      { owner_full_name: 'Alice Johnson', total_extent: '500 sq ft', surveyno: '000001', surnoc: 'XYZ', hissa: '01A', village_name: 'Greenville' },
      { owner_full_name: 'Bob Smith', total_extent: '750 sq ft', surveyno: '000002', surnoc: 'ABC', hissa: '02B', village_name: 'Hometown' },
    ];

    const result = await collection.insertMany(data);
    console.log('Inserted documents:', result.insertedIds);
  } catch (err) {
    console.error('Error inserting data:', err);
  } finally {
    await client.close();
  }
}

insertData();
