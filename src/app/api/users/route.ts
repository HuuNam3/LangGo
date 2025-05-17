import { NextResponse } from 'next/server'
import { put, patch, del } from '@/lib/actions'
import { getDb } from '@/lib/mongodb'

export async function GET() {
  try {
    const db = await getDb()
    const users = await db.collection('users').find({}).toArray()
    return NextResponse.json(users)
  } catch (error) {
    console.error('GET users error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const db = await getDb()
    const users = db.collection('users')

    // Check for existing email
    const existingEmail = await users.findOne({ email: body.email })
    if (existingEmail) {
      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 409 }
      )
    }

    // Check for existing username
    const existingUsername = await users.findOne({ username: body.username })
    if (existingUsername) {
      return NextResponse.json(
        { error: 'Username already exists' },
        { status: 409 }
      )
    }

    // Create new user
    const result = await users.insertOne(body)
    
    return NextResponse.json({
      success: true,
      insertedId: result.insertedId.toString()
    })
  } catch (error) {
    console.error('POST user error:', error)
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const result = await put('users', body._id, body)
    return NextResponse.json(result)
  } catch (error) {
    console.error('PUT user error:', error)
    return NextResponse.json(
      { error: 'Failed to update user' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json()
    const result = await patch('users', body._id, body)
    return NextResponse.json(result)
  } catch (error) {
    console.error('PATCH user error:', error)
    return NextResponse.json(
      { error: 'Failed to update user' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json()
    const result = await del('users', body)
    return NextResponse.json(result)
  } catch (error) {
    console.error('DELETE user error:', error)
    return NextResponse.json(
      { error: 'Failed to delete user' },
      { status: 500 }
    )
  }
}
