import { ObjectId } from 'mongodb'
import mongoose, { Schema } from 'mongoose'

const NewUser = new Schema({
  _id: ObjectId,
  first_name: String,
  last_name: String,
  email: String,
  cell: String,
  date: Date,
})

export const NewUserModel = mongoose.model('NewUser', NewUser)
