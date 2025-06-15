import { NextResponse } from "next/server";
import { put, patch, del } from '@/lib/actions'
import { getDb } from '@/lib/mongodb'
import { ObjectId } from "mongodb"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function GET() {
  try {
    // 1. Lấy session từ request
    const session = await getServerSession(authOptions)

    if (!session || !session.user || !session.user.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const userId = new ObjectId(session.user.id)

    const db = await getDb()
    const userCourses = await db.collection("user_courses").aggregate([
      { $match: { user_id: userId } },
      {
        $lookup: {
          from: "courses",
          localField: "course_id",
          foreignField: "_id",
          as: "course"
        }
      },
      { $unwind: "$course" }
    ]).toArray()

    return NextResponse.json(userCourses)
  } catch (error) {
    console.error("GET user_courses error:", error)
    return NextResponse.json(
      { error: "Failed to fetch user courses" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user || !session.user.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const userId = new ObjectId(session.user.id)
    const body = await request.json()
    const db = await getDb()
    const collection = db.collection("user_courses")

    const  {course_id, enrolled_at, progress } = body

    if ( !course_id) {
      return NextResponse.json(
        { error: "!course_id" },
        { status: 400 }
      )
    }

    const result = await collection.insertOne({
      user_id: userId,
      course_id: new ObjectId(course_id),
      enrolled_at: enrolled_at ? new Date(enrolled_at) : new Date(),
      progress: progress ?? 0,
    })

    return NextResponse.json({
      success: true,
      insertedId: result.insertedId.toString(),
    })
  } catch (error) {
    console.error("POST /user_courses error:", error)
    return NextResponse.json(
      { error: "Không thể tạo bản ghi user_courses" },
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
