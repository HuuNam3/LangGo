"use server"

import { getDb } from "@/lib/mongodb"
import { ObjectId } from "mongodb"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function countCourses() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    throw new Error("Unauthorized")
  }

  const db = await getDb()
  const count = await db.collection("user_courses").countDocuments({
    user_id: new ObjectId(session.user.id),
  })
  return count
}

export async function countLessonCompleted() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    throw new Error("Unauthorized")
  }

  const db = await getDb()
  const count = await db.collection("user_courses").countDocuments({
    user_id: new ObjectId(session.user.id),
    progress: 100
  })
  return count
}