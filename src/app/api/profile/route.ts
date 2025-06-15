import { NextResponse } from "next/server";
import { patch, del } from "@/lib/actions";
import { getDb } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      throw new Error("Unauthorized");
    }
    const userId = session.user.id;

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
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const db = await getDb();
    const lessons = db.collection("user_information");

    // Create new lesson
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

export async function PUT(request: Request) {
  try {
    const db = await getDb();

    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      throw new Error("Unauthorized");
    }
    const userId = new ObjectId(session.user.id);
    const body = await request.json();
    const result = await db.collection("user_information").updateOne(
      {
        user_accounts_id: userId,
      },
      { $set: body},
      { upsert: false }
    );
    return NextResponse.json(result);
  } catch (error) {
    console.error("PUT user_information error:", error);
    return NextResponse.json(
      { error: "Failed to update user_information" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const result = await patch("courses", body._id, body);
    return NextResponse.json(result);
  } catch (error) {
    console.error("PATCH lesson error:", error);
    return NextResponse.json(
      { error: "Failed to update lesson" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const result = await del("courses", body);
    return NextResponse.json(result);
  } catch (error) {
    console.error("DELETE lesson error:", error);
    return NextResponse.json(
      { error: "Failed to delete lesson" },
      { status: 500 }
    );
  }
}
