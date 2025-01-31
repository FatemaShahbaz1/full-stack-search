import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import { MongoClient } from "mongodb";

dotenv.config();

if (process.env.NODE_ENV !== 'production' && !process.env.DATABASE_URL) {
  await import('./db/startAndSeedMemoryDB');
}

const PORT = process.env.PORT || 3001;
if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not set');
const DATABASE_URL = process.env.DATABASE_URL;

const app = express();

app.use(cors())
app.use(express.json());

app.get('/hotels', async (req, res) => {
  const mongoClient = new MongoClient(DATABASE_URL);
  console.log('Connecting to MongoDB...');

  try {
    await mongoClient.connect();
    console.log('Successfully connected to MongoDB!');
    const db = mongoClient.db();


    let hotels, cities, countries = [];

    const searchText = req.query.search ?? "";

    if (!searchText) {
      const data = { data: { hotels: [], cities: [], countries: [] }, error: "Missing argument: search" };
      res.send(data);
      return;
    }

    const hotelCollection = db.collection('hotels');
    const cityCollection = db.collection('cities');
    const countryCollection = db.collection('countries');

    hotels = await hotelCollection.find({
      "$or": [
        { "chain_name": { "$regex": searchText, "$options": "i" } },
        { "hotel_name": { "$regex": searchText, "$options": "i" } },
        { "city": { "$regex": searchText, "$options": "i" } },
        { "country": { "$regex": searchText, "$options": "i" } }
      ]
    }).toArray();

    cities = await cityCollection.find({ "name": { "$regex": searchText, "$options": "i" } }).toArray();

    countries = await countryCollection.find({
      "$or": [
        { "country": { "$regex": searchText, "$options": "i" } },
        { "countryisocode": { "$regex": searchText, "$options": "i" } }
      ]
    }).toArray();

    const data = { hotels, cities, countries }

    res.send({ data });

  } finally {
    await mongoClient.close();
  }
})

app.listen(PORT, () => {
  console.log(`API Server Started at ${PORT}`)
})
