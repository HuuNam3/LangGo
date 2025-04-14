import { NextResponse } from "next/server"
import { register } from "../../auth/[...nextauth]/route"

export async function POST(request: { formData: () => unknown }) {
  try {
    const formData = await request.formData()
    const result = await register(formData)

    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 400 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}
