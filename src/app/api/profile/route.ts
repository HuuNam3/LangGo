import { NextResponse, NextRequest } from 'next/server'
import { put, patch, del } from '@/lib/actions'
import { getDb } from '@/lib/mongodb'
import { ObjectId } from "mongodb";

export async function GET(req: NextRequest) {
  try {
    const userId = req.headers.get("user-id");

    if (!userId || !ObjectId.isValid(userId)) {
      return NextResponse.json({ error: "Invalid or missing user-id" }, { status: 400 });
    }

    const db = await getDb();

    const result = await db.collection("user_information").findOne({
      user_accounts_id: new ObjectId(userId),
    });

    if (!result) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("❌ Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const db = await getDb()
    const lessons = db.collection('user_information')

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
