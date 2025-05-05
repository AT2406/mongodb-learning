import { MongoUserModel } from '@/lib/models/mongooseModels'
import { connectToMongo } from '@/lib/mongoose-client'
import { User } from '@/types/user-types'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  try {
    await connectToMongo()
    const dbUsers = await MongoUserModel.find()
    return NextResponse.json({ message: dbUsers }, { status: 200 })
  } catch (error) {
    console.error('Mongoose Get Failed', error)
    return NextResponse.json(
      { message: 'There was an error fetching the users' },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectToMongo()
    const body: User = await req.json()
    const newUserDetails = new MongoUserModel(body)
    newUserDetails.validateSync()
    await newUserDetails.save()
    return NextResponse.json(
      { message: `${body.first_name} added to DB` },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating user:', error)
    return NextResponse.json(
      { message: 'There was an error creating the user:' + `${error}` },
      { status: 400 }
    )
  }
}
