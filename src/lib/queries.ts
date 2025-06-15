"use server";
import { getDb } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function countCourses(): Promise<number> {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      throw new Error("Unauthorized");
    }

    const db = await getDb();
    const count = await db.collection("user_courses").countDocuments({
      user_id: new ObjectId(session.user.id),
    });

    return count;
  } catch (error) {
    console.error("countCourses error:", error);
    throw error;
  }
}

export async function countLessonCompleted(): Promise<number> {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      throw new Error("Unauthorized");
    }

    const db = await getDb();
    const count = await db.collection("user_courses").countDocuments({
      user_id: new ObjectId(session.user.id),
      progress: 100,
    });
    return count;
  } catch (error) {
    console.error("countLessonCompleted error:", error);
    throw error;
  }
}

export async function getNameUser(): Promise<string> {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      throw new Error("Unauthorized");
    }

    const db = await getDb();
    const user = await db
      .collection("user_information")
      .findOne(
        { user_accounts_id: new ObjectId(session.user.id) },
        { projection: { name: 1, _id: 0 } }
      );

    if (!user) {
      throw new Error("User not found");
    }
    return user.name;
  } catch (error) {
    console.error("getNameUser error:", error);
    throw error;
  }
}

export async function checkCourses(courses_id: string): Promise<number> {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      throw new Error("Unauthorized");
    }

    const db = await getDb();
    const count = await db.collection("user_courses").countDocuments({
      user_id: new ObjectId(session.user.id),
      course_id:  new ObjectId(courses_id),
    });

    return count;
  } catch (error) {
    console.error("countLessonCompleted error:", error);
    throw error;
  }
}

// export async function getCoursesIdBySlug(courses_id: string): Promise<number> {
//   try {
//     const session = await getServerSession(authOptions);
//     if (!session?.user?.id) {
//       throw new Error("Unauthorized");
//     }

//     const db = await getDb();
//     const count = await db.collection("user_courses").countDocuments({
//       user_id: new ObjectId(session.user.id),
//       course_id:  new ObjectId(courses_id),
//     });

//     return count;
//   } catch (error) {
//     console.error("countLessonCompleted error:", error);
//     throw error;
//   }
// }