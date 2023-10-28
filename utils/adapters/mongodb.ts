import { MongoClient, MongoClientOptions } from "mongodb";

const uri = process.env.MONGODB_URI as string;
const options: MongoClientOptions = {
  // databaseName: process.env.MONGODB_DB_NAME as string,
};

let client;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  let globalWithMongoClientPromise = global as typeof globalThis & {
    _mongoClientPromise: Promise<MongoClient>;
  };
  if (!globalWithMongoClientPromise._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongoClientPromise._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongoClientPromise._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;