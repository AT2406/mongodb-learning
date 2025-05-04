import { prisma } from '@/lib/prisma-client'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  try {
    const dbUsers = await prisma.users.findMany()
    return NextResponse.json({ message: dbUsers }, { status: 200 })
  } catch (error) {
    console.error('Prisma Get Failed', error)
    return NextResponse.json(
      { message: 'There was an error fetching the users' },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const newUserDetails = await prisma.users.create({
      data: {
        ...body,
        date: new Date(),
      },
    })
    return NextResponse.json({ message: newUserDetails }, { status: 201 })
  } catch (error) {
    console.error('Prisma Post Failed', error)
    return NextResponse.json(
      { message: 'There was an error creating the new users' },
      { status: 400 }
    )
  }
}
