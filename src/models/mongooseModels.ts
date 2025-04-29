import { ObjectId } from 'mongodb'
import mongoose, { Schema } from 'mongoose'

const MongoUser = new Schema({
  _id: ObjectId,
  first_name: String,
  last_name: String,
  email: String,
  cell: String,
  date: Date,
})

export const MongoUserModel = mongoose.model('User', MongoUser)
