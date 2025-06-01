import { NextRequest, NextResponse } from "next/server";
import { put, patch, del } from '@/lib/actions'
import { getDb } from '@/lib/mongodb'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params

  if (!slug || typeof slug !== "string") {
    return NextResponse.json({ message: "Invalid slug" }, { status: 400 });
  }

  const db = await getDb();
  const lesson = await db.collection("lessons").findOne({ slug });

  if (!lesson) {
    return NextResponse.json({ message: "Lesson not found" }, { status: 404 });
  }

  return NextResponse.json(lesson);
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const db = await getDb()
    const lessons = db.collection('lessons')

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
    const result = await put('lessons', body._id, body)
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
    const result = await patch('lessons', body._id, body)
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
    const result = await del('lessons', body)
    return NextResponse.json(result)
  } catch (error) {
    console.error('DELETE lesson error:', error)
    return NextResponse.json(
      { error: 'Failed to delete lesson' },
      { status: 500 }
    )
  }
}
