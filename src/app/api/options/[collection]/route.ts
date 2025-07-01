import { type NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

type RouteContext = { params: Promise<{ collection: string }> };

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const db = await getDb();
    const { collection } = await context.params;
    const collections = db.collection(collection);
  
    let options: Array<{ value: string; label: string }> = [];
    console.log(collection)
    switch (collection) {
      case "course_categories":
        const categories = await collections
          .find({}, { projection: { _id: 1, title: 1 } })
          .toArray();
        options = categories.map((cat) => ({
          value: cat._id.toString(),
          label: cat.title,
        }));
        break;

      case "courses":
        const courses = await collections
          .find({}, { projection: { _id: 1, title: 1 } })
          .toArray();
        options = courses.map((course) => ({
          value: course._id.toString(),
          label: course.title,
        }));
        break;

      case "lessons":
        const lessons = await collections
          .find({}, { projection: { _id: 1, title: 1 } })
          .toArray();
        options = lessons.map((lesson) => ({
          value: lesson._id.toString(),
          label: lesson.title,
        }));
        break;

      case "user_accounts":
        const users = await collections
          .find({}, { projection: { _id: 1, full_name: 1, email: 1 } })
          .toArray();
        options = users.map((user) => ({
          value: user._id.toString(),
          label: `${user.full_name} (${user.email})`,
        }));
        break;

      default:
        return NextResponse.json(
          { success: false, error: "Collection not supported" },
          { status: 400 }
        );
    }

    return NextResponse.json({
      success: true,
      data: options,
    });
  } catch (error) {
    console.error("Error fetching options:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch options" },
      { status: 500 }
    );
  }
}
