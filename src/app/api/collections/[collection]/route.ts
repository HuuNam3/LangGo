import { type NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

type RouteContext = { params: Promise<{ collection: string }> };

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const db = await getDb();
    const { collection } = await context.params;
    const collections = db.collection(collection);
    const documents = await collections.find({}).toArray();

    return NextResponse.json({
      success: true,
      data: documents.map((doc) => ({
        ...doc,
        _id: doc._id.toString(),
      })),
    });
  } catch (error) {
    console.error("Error fetching documents:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch documents" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest, context: RouteContext) {
  try {
    const body = await request.json();
    const db = await getDb();
    const { collection } = await context.params;
    const collections = db.collection(collection);

    if (body.course_categories_id) {
      body.course_categories_id = new ObjectId(body.course_categories_id);
    } else if (body.course_id) {
      body.course_id = new ObjectId(body.course_id);
    } else if (body.lesson_id) {
      body.lesson_id = new ObjectId(body.lesson_id);
    } else if (body.user_id) {
      body.user_id = new ObjectId(body.user_id);
    }

    const document = {
      ...body,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await collections.insertOne(document);

    return NextResponse.json({
      success: true,
      data: {
        ...document,
        _id: result.insertedId.toString(),
      },
    });
  } catch (error) {
    console.error("Error creating document:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create document" },
      { status: 500 }
    );
  }
}
