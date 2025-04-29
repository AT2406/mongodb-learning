import express from 'express'
import mongoose from 'mongoose'
import mongooseRoutes from './routes/mongooseRoutes'
import prismaRoutes from './routes/prismaRoutes'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(mongooseRoutes)
app.use(prismaRoutes)

mongoose
  .connect(process.env.MONGO_URI || '', {})
  .then(() => console.log('DB Connection Available'))
  .catch(err => {
    console.error('DB Connection Error: ', err)
  })

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
