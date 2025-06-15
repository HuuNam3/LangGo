import { NextResponse,NextRequest } from "next/server";
import { put, patch, del } from "@/lib/actions";
import { getDb } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// GET /api/courses/[slug]
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {

  const { slug } = await params;

  if (!slug || typeof slug !== "string") {
    return NextResponse.json({ message: "Invalid slug" }, { status: 400 });
  }
  
  const db = await getDb();

  // Lấy course theo slug
  const pipeline = [
    { $match: { slug } },
    {
      $lookup: {
        from: "course_introduction",
        localField: "_id",
        foreignField: "course_id",
        as: "introduction",
      },
    },
    {
      $addFields: {
        introduction: { $arrayElemAt: ["$introduction", 0] },
      },
    },
  ];

  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const data = await db.collection("courses").aggregate(pipeline).toArray();
  const course = data[0] || null;

  if (!course) {
    return NextResponse.json({ message: "Course not found" }, { status: 404 });
  }

  // Giả sử bạn lấy userId từ header hoặc cookie
  const userId = new ObjectId(session.user.id);
  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // Kiểm tra enrollment
  const enrollment = await db.collection("user_courses").findOne({
    user_id: userId,
    course_id: new ObjectId(course._id),
  });

  if (enrollment) {
    return NextResponse.json(true);
  }

  return NextResponse.json(course);
}

// POST /api/courses/[slug]
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const db = await getDb();
    const lessons = db.collection("lessons");

    const existingLesson = await lessons.findOne({ id: body.id });
    if (existingLesson) {
      return NextResponse.json(
        { error: "Lesson ID already exists" },
        { status: 409 }
      );
    }

    const result = await lessons.insertOne(body);

    return NextResponse.json({
      success: true,
      insertedId: result.insertedId.toString(),
    });
  } catch (error) {
    console.error("POST lesson error:", error);
    return NextResponse.json(
      { error: "Failed to create lesson" },
      { status: 500 }
    );
  }
}

// PUT /api/courses/[slug]
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const result = await put("lessons", body._id, body);
    return NextResponse.json(result);
  } catch (error) {
    console.error("PUT lesson error:", error);
    return NextResponse.json(
      { error: "Failed to update lesson" },
      { status: 500 }
    );
  }
}

// PATCH /api/courses/[slug]
export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const result = await patch("lessons", body._id, body);
    return NextResponse.json(result);
  } catch (error) {
    console.error("PATCH lesson error:", error);
    return NextResponse.json(
      { error: "Failed to update lesson" },
      { status: 500 }
    );
  }
}

// DELETE /api/courses/[slug]
export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const result = await del("lessons", body);
    return NextResponse.json(result);
  } catch (error) {
    console.error("DELETE lesson error:", error);
    return NextResponse.json(
      { error: "Failed to delete lesson" },
      { status: 500 }
    );
  }
}
