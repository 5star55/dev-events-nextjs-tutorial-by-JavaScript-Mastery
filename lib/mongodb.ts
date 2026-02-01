import mongoose, { type Mongoose } from "mongoose"

/**
 * Server-side MongoDB connection helper.
 *
 * In development, Next.js can reload server modules frequently (HMR). Without caching,
 * each reload could create a new MongoDB connection and quickly exhaust the pool.
 *
 * We cache the connection/promise on `globalThis` so it persists across module reloads.
 * (In production, the module is typically loaded once per server process.)
 */

const MONGODB_URI =process.env.MONGODB_URL



type MongooseCache = {
  conn: Mongoose | null
  promise: Promise<Mongoose> | null
}

declare global {
  var __mongooseCache: MongooseCache | undefined
}

const cached: MongooseCache =
  globalThis.__mongooseCache ?? (globalThis.__mongooseCache = { conn: null, promise: null })

export async function connectToDatabase(): Promise<Mongoose> {
  if (!MONGODB_URI) {
  throw new Error(
    "Missing MongoDB connection string. Set MONGODB_URI (preferred) or MONGODB_URL in your environment."
  )
}
  // Reuse an existing connection if we already established one.
  if (cached.conn) return cached.conn

  // Reuse the in-flight connection promise if a connection attempt is already happening.
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI as string, {
      bufferCommands: false,
      // Keep the pool modest by default; tune for your workload.
      maxPoolSize: 10,
    })
  }

  try {
    cached.conn = await cached.promise
  } catch (err) {
    // If the connection failed, clear the cached promise so future calls can retry.
    cached.promise = null
    throw err
  }

  return cached.conn
}
