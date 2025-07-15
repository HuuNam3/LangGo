import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(req: NextRequest) {
  const db = await getDb();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ message: "Missing ID" }, { status: 400 });
  }

  const lesson = db.collection("lesson_videos");

  const lessonVideo = await lesson.findOne({ lesson_id: new ObjectId(id) });
  if (!lessonVideo) {
    return NextResponse.json({ message: "courses not found" }, { status: 404 });
  }

  return NextResponse.json(lessonVideo)
}
