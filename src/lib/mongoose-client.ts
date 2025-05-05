import mongoose from 'mongoose'

const MONGODB_URI = process.env.DATABASE_URL!

if (!MONGODB_URI) {
  throw new Error('DATABASE_URL is not defined in the environment variables.')
}

// Prevent multiple connections in development
let isConnected: boolean = false

export async function connectToMongo() {
  if (isConnected) return

  try {
    await mongoose.connect(MONGODB_URI, {
      dbName: 'service', // optional if embedded in URI
    })

    isConnected = true
    console.log('✅ Connected to MongoDB')
  } catch (error) {
    console.error('❌ MongoDB connection error:', error)
    throw error
  }
}
