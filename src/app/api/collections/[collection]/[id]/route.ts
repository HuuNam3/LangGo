import { type NextRequest, NextResponse } from "next/server"
import { getDb } from "@/lib/mongodb";
import { ObjectId } from "mongodb"

type RouteContext = { params: Promise<{ collection: string; id: string }> }

export async function PUT(
  request: NextRequest, 
  context: RouteContext
) {
  try {
    const body = await request.json()
    const db = await getDb()
    const { collection, id } = await context.params
    const collectionss = db.collection(collection)

    const updateData = {
      ...body,
      updatedAt: new Date(),
    }

    const result = await collectionss.updateOne({ _id: new ObjectId(id) }, { $set: updateData })

    if (result.matchedCount === 0) {
      return NextResponse.json({ success: false, error: "Document not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: { _id: id, ...updateData },
    })
  } catch (error) {
    console.error("Error updating document:", error)
    return NextResponse.json({ success: false, error: "Failed to update document" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  try {
    const db = await getDb()
    const { collection, id } = await context.params
    const collections = db.collection(collection)

    const result = await collections.deleteOne({ _id: new ObjectId(id) })

    if (result.deletedCount === 0) {
      return NextResponse.json({ success: false, error: "Document not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting document:", error)
    return NextResponse.json({ success: false, error: "Failed to delete document" }, { status: 500 })
  }
}
