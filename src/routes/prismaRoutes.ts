import { PrismaClient } from '@prisma/client'
import express from 'express'

const router = express.Router()
const prisma = new PrismaClient()
const path = '/prisma/users'

router.get(path, async (req, res) => {
  try {
    const users = await prisma.mongoUser.findMany()
    res.status(200).json(users)
  } catch (error) {
    res.status(500).send(`There was an error fetching the users: ${error}`)
  }
})

router.post(path, async (req, res) => {
  try {
    const newUserDetails = await prisma.mongoUser.create({
      data: req.body,
    })
    res.status(201).json(newUserDetails)
  } catch (error) {
    res.status(400).send(`There was an error creating the user: ${error}`)
  }
})

export default router
