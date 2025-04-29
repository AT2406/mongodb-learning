import express, { Request, Response } from 'express'
import { MongoUserModel } from '../models/mongooseModels'

const router = express.Router()
const path = '/mongoose/users'

router.get(path, async (_req: Request, res: Response) => {
  try {
    const users = await MongoUserModel.find()
    res.status(200).json(users)
  } catch (error) {
    console.error('Error fetching users:', error)
    res.status(500).send(`There was an error fetching the users: ${error}`)
  }
})

router.post(path, async (req: Request, res: Response) => {
  try {
    const newUserDetails = new MongoUserModel(req.body)
    const error = newUserDetails.validateSync()
    if (error) {
      res
        .status(400)
        .json({ message: 'Validation failed', details: error.errors })
    }
    await newUserDetails.save()
    res.status(201).json(newUserDetails)
  } catch (error) {
    console.error('Error creating user:', error)
    res.status(400).send(`There was an error creating the user: ${error}`)
  }
})

export default router
