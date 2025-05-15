import NextAuth from "next-auth"
import { authOptions } from "./options"

const handler = NextAuth(authOptions)

export const GET = handler.GET
export const POST = handler.POST