import { MongoClient } from "mongodb";

export const connectToDatabase = async () => {
  const URI = process.env.DATABASE_URL as string;
  const client = new MongoClient(URI);
  await client.connect();

  return client;
};
