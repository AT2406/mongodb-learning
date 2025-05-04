import express from 'express'
import mongooseRoutes from './routes/mongooseRoutes'
import prismaRoutes from './routes/prismaRoutes'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(mongooseRoutes)
app.use(prismaRoutes)

app.get('/', (_req, res) => {
  res.send('Express server is working ✅')
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

console.log('Attempting DB connection...')
mongoose
  .connect(process.env.MONGO_URI || '')
  .then(() => console.log('✅ DB Connection Available'))
  .catch(err => console.error('❌ DB Connection Error: ', err))
