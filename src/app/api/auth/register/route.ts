import { NextResponse } from "next/server"
import { hash } from "bcrypt"
import { getDb } from "@/lib/mongodb"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const name = formData.get("name") as string
    const username = formData.get("username") as string

    if (!email || !password || !name || !username) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const db = await getDb()
    const users = db.collection('user_accounts')

    // Check if user already exists (by email)
    const existingEmail = await users.findOne({ email })
    if (existingEmail) {
      return NextResponse.json({ error: "Email already in use" }, { status: 400 })
    }

    // Check if username is taken
    const existingUsername = await users.findOne({ username })
    if (existingUsername) {
      return NextResponse.json({ error: "Username already taken" }, { status: 400 })
    }

    // Hash password
    const hashedPassword = await hash(password, 10)

    // Create user
    const newUser = {
      email,
      password: hashedPassword,
      name,
      username,
      createdAt: new Date()
    }

    const result = await users.insertOne(newUser)

    return NextResponse.json({ 
      success: true, 
      userId: result.insertedId.toString() 
    })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}
