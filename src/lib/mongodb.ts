import { MongoClient, ServerApiVersion } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your Mongo URI to .env.local");
}

if (!process.env.MONGODB_DB) {
  throw new Error("Please add your Mongo Database name to .env.local");
}

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;
let cachedDb: ReturnType<MongoClient['db']> | null = null

const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  // Add connection timeout options
  connectTimeoutMS: 60000,
  socketTimeoutMS: 60000,
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

try {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
  // Test the connection
  clientPromise.then(() => {
    console.log('Successfully connected to MongoDB.');
  }).catch((error) => {
    console.error('MongoDB connection error:', error);
  });
} catch (error) {
  console.error('Failed to initialize MongoDB client:', error);
  throw error;
}

export async function getDb() {
  try {
    if (cachedDb) return cachedDb

    const client = await clientPromise
    cachedDb = client.db(dbName)
    return cachedDb
  } catch (error) {
    console.error('Error getting database:', error)
    throw error
  }
}

export async function closeDB(): Promise<void> {
  try {
    if (client) {
      await client.close();
      console.log('MongoDB connection closed successfully.');
    }
    cachedDb = null;
  } catch (error) {
    console.error('Error closing MongoDB connection:', error);
    throw error;
  }
}

export default clientPromise;