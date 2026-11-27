import "server-only";
import { MongoClient, type Db } from "mongodb";

// Reuse one client across hot reloads and serverless invocations.
const globalForMongo = globalThis as unknown as {
  mongoClient?: Promise<MongoClient>;
};

export function isDbConfigured() {
  return Boolean(process.env.MONGODB_URI);
}

/** Returns the CMS database, or null when MONGODB_URI is not configured. */
export async function getDb(): Promise<Db | null> {
  const uri = process.env.MONGODB_URI;
  if (!uri) return null;
  // ignoreUndefined: optional fields left undefined are omitted, not stored as null.
  globalForMongo.mongoClient ??= new MongoClient(uri, { ignoreUndefined: true })
    .connect()
    .catch((error: unknown) => {
      // Forget the failed attempt so the next request can reconnect.
      globalForMongo.mongoClient = undefined;
      throw error;
    });
  const client = await globalForMongo.mongoClient;
  return client.db(process.env.MONGODB_DB ?? "royal-longevity");
}
