import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export async function GET() {
  try {
    const db = await getDb();

    const pipeline = [
      {
        $lookup: {
          from: "courses",
          localField: "_id",
          foreignField: "course_categories_id",
          as: "courses",
        },
      },
    ];

    const combinedData = await db
      .collection("course_categories")
      .aggregate(pipeline)
      .toArray();
    return NextResponse.json(combinedData);
  } catch (error) {
    console.error("GET courses error:", error);
    return NextResponse.json(
      { error: "Failed to fetch courses" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const db = await getDb();
    const course = db.collection("course_categories");

    const { title, description } = body;

    const result = await course.insertOne({
      title,
      description,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

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
