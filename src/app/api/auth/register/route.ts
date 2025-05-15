import { NextResponse } from "next/server"
import { hash } from "bcrypt"
import { accountsUser } from "@/lib/data/users"

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

    // Check if user already exists (by email or username)
    if (accountsUser.some((user) => user.email === email)) {
      return NextResponse.json({ error: "Email already in use" }, { status: 400 })
    }

    if (accountsUser.some((user) => user.username === username)) {
      return NextResponse.json({ error: "Username already taken" }, { status: 400 })
    }

    // Hash password
    const hashedPassword = await hash(password, 10)

    // Create user
    const newUser = {
      id: `user-${Date.now()}`,
      email,
      password: hashedPassword,
      name,
      username,
      avatar: "/images/avatar.png", // Default avatar
    }

    accountsUser.push(newUser)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}
