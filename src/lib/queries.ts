"use server";
import { getDb } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function countCourses(): Promise<number> {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      console.error("no login");
      return 0;
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

export async function countLessonCompletedOfCourses(
  idCourses: string
): Promise<number> {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      throw new Error("Unauthorized");
    }

    const db = await getDb();
    const count = await db.collection("user_courses").countDocuments({
      user_id: new ObjectId(session.user.id),
      course_id: new ObjectId(idCourses),
      progress: 100,
    });
    return count;
  } catch (error) {
    console.error("countLessonCompleted error:", error);
    throw error;
  }
}

export async function countLessionsOfCourses(
  idCourses: string
): Promise<number> {
  try {
    const db = await getDb();
    const count = await db.collection("lessons").countDocuments({
      course_id: new ObjectId(idCourses),
    });

    return count;
  } catch (error) {
    console.error("countCourses error:", error);
    throw error;
  }
}

export async function getNameUser(): Promise<string> {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return "user";
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
      return 0;
    }

    const db = await getDb();
    const count = await db.collection("user_courses").countDocuments({
      user_id: new ObjectId(session.user.id),
      course_id: new ObjectId(courses_id),
    });

    return count;
  } catch (error) {
    console.error("countLessonCompleted error:", error);
    throw error;
  }
}

export async function getLessonIdBySlug(slug: string): Promise<string>  {
  try {
    const db = await getDb();
    const courses = await db.collection("courses").findOne({ slug });
    if (!courses) {
      throw new Error("courses not found");
    }
    const lessons = await db.collection("lessons").findOne({ course_id: courses._id})
    if (!lessons) {
      throw new Error("courses not found");
    }
    return lessons._id.toString();
  } catch (error) {
    console.error("countLessonCompleted error:", error);
    throw error;
  }
}

// export async function getLessonByCoursesId(id: string): Promise<string>  {
//   try {
//     const db = await getDb();
//     const lessons = await db.collection("lessons").findOne({ course_id: id})
//     if (!lessons) {
//       throw new Error("courses not found");
//     }
//     return lessons._id.toString();
//   } catch (error) {
//     console.error("countLessonCompleted error:", error);
//     throw error;
//   }
// }
