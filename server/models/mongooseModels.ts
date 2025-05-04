import { ObjectId } from 'mongodb'
import mongoose, { Schema } from 'mongoose'

const userSchema = new Schema({
  _id: { type: ObjectId, default: () => new ObjectId() },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: String,
  cell: Number,
  date: { type: Date, default: Date.now },
})

export const MongoUserModel = mongoose.model('user', userSchema)
