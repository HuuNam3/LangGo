"use server"

import { getDb } from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function hasUserEnrolledCourse(userId: string, courseId: string) {
  const db = await getDb()
  const enrollment = await db.collection("user_courses").findOne({
    user_id: new ObjectId(userId),
    course_id: new ObjectId(courseId),
  })
  return Boolean(enrollment)
}