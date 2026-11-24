import "server-only";
import { MongoClient, type Db } from "mongodb";

// Reuse one client across hot reloads and serverless invocations.
const globalForMongo = globalThis as unknown as {
  mongoClient?: Promise<MongoClient>;
};

/** Returns the CMS database, or null when MONGODB_URI is not configured. */
export async function getDb(): Promise<Db | null> {
  const uri = process.env.MONGODB_URI;
  if (!uri) return null;
  globalForMongo.mongoClient ??= new MongoClient(uri).connect();
  const client = await globalForMongo.mongoClient;
  return client.db(process.env.MONGODB_DB ?? "royal-longevity");
}
