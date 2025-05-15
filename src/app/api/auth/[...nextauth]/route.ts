import NextAuth from "next-auth"
import { authOptions } from "./options"

const handler = NextAuth(authOptions)

// Export all required HTTP methods
export const GET = handler
export const POST = handler
export const PUT = handler
export const PATCH = handler
export const DELETE = handler