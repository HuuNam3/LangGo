import { NextResponse } from 'next/server'
import { put, patch, del } from '@/lib/actions'
import { getDb } from '@/lib/mongodb'

export async function GET() {
  try {
    const db = await getDb()
    
    const pipeline = [
      {
        $lookup: {
          from: "lessons",
          localField: "_id",
          foreignField: "courseId",
          as: "lessons"
        }
      }
    ]
    
    const combinedData = await db.collection('courses').aggregate(pipeline).toArray()
    return NextResponse.json(combinedData)
  } catch (error) {
    console.error('GET lessons error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch lessons' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const db = await getDb()
    const lessons = db.collection('courses')

    // Check for existing lesson ID
    const existingLesson = await lessons.findOne({ id: body.id })
    if (existingLesson) {
      return NextResponse.json(
        { error: 'Lesson ID already exists' },
        { status: 409 }
      )
    }

    // Create new lesson
    const result = await lessons.insertOne(body)
    
    return NextResponse.json({
      success: true,
      insertedId: result.insertedId.toString()
    })
  } catch (error) {
    console.error('POST lesson error:', error)
    return NextResponse.json(
      { error: 'Failed to create lesson' },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const result = await put('courses', body._id, body)
    return NextResponse.json(result)
  } catch (error) {
    console.error('PUT lesson error:', error)
    return NextResponse.json(
      { error: 'Failed to update lesson' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json()
    const result = await patch('courses', body._id, body)
    return NextResponse.json(result)
  } catch (error) {
    console.error('PATCH lesson error:', error)
    return NextResponse.json(
      { error: 'Failed to update lesson' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json()
    const result = await del('courses', body)
    return NextResponse.json(result)
  } catch (error) {
    console.error('DELETE lesson error:', error)
    return NextResponse.json(
      { error: 'Failed to delete lesson' },
      { status: 500 }
    )
  }
}
