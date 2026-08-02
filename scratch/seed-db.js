const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

async function seedDatabase() {
  try {
    const envContent = fs.readFileSync(path.join(__dirname, '..', '.env.local'), 'utf8');
    const uriMatch = envContent.match(/MONGODB_URI=(.+)/);
    if (!uriMatch) {
      console.log('No MONGODB_URI found in .env.local');
      return;
    }
    const uri = uriMatch[1].trim();

    const dataContent = fs.readFileSync(path.join(__dirname, '..', 'data', 'store.json'), 'utf8');
    const data = JSON.parse(dataContent);

    const client = new MongoClient(uri);
    await client.connect();
    console.log('Connected to MongoDB Atlas successfully.');

    const db = client.db('portfolio_db');
    const collection = db.collection('portfolio_data');

    await collection.updateOne(
      { _id: 'main_portfolio' },
      { $set: data },
      { upsert: true }
    );

    console.log('SUCCESS: Portfolio data uploaded to MongoDB Atlas collection!');
    await client.close();
  } catch (error) {
    console.error('Error seeding MongoDB Atlas:', error);
  }
}

seedDatabase();
