import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGO_URI || ''

if (!MONGODB_URI) throw new Error('Please define the DATABASE_URL in .env')
//@ts-ignore
let cached = global.mongoose as {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
}

if (!cached) {
  //@ts-ignore
  cached = global.mongoose = { conn: null, promise: null }
}

export async function connectToMongoDB() {
  if (cached.conn) return cached.conn
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI)
  }
  cached.conn = await cached.promise
  return cached.conn
}
