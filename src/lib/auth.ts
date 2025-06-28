import NextAuth, { NextAuthOptions, User, Session, DefaultSession } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook"
import { getServerSession as getSession } from "next-auth"
import { compare, hash } from "bcrypt"
import { JWT } from "next-auth/jwt"
import { getDb } from "@/lib/mongodb"

// Extend User type
interface ExtendedUser extends User {
  username?: string;
  role:string;
}

// Extend Session type
interface ExtendedSession extends Session {
  provider?: string;
  user: {
    id: string;
    username?: string;
    role: string
  } & DefaultSession["user"];
}

// Extend JWT type
interface ExtendedToken extends JWT {
  username?: string;
  role:string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID || "",
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        emailOrUsername: { label: "Email or Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.emailOrUsername || !credentials?.password) {
          return null
        }

        try {
          const db = await getDb()
          const users = db.collection('user_accounts')

          const isEmail = credentials.emailOrUsername.includes("@")

          const user = await users.findOne(
            isEmail 
              ? { email: credentials.emailOrUsername }
              : { username: credentials.emailOrUsername }
          )

          if (!user) {
            return null
          }

          const isPasswordValid = await compare(credentials.password, user.password)

          if (!isPasswordValid) {
            return null
          }

          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            username: user.username,
            role: user.role,
          } as ExtendedUser
        } catch (error) {
          console.error("Error in authorize:", error)
          return null
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    signOut: "/",
    error: "/login",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id
        token.username = (user as ExtendedUser).username
        token.role = (user as ExtendedUser).role
      }
      if (account) {
        token.provider = account.provider
      }
      return token
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id as string,
          username: (token as ExtendedToken).username,
          role: (token as ExtendedToken).role,
        },
        provider: (token as ExtendedToken).provider,
      } as ExtendedSession
    },
  },
  session: {
    strategy: "jwt" as const,
  },
  secret: process.env.NEXTAUTH_SECRET || "your-secret-key-for-development",
}

// Registration server action
export async function register(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const name = formData.get("name") as string
  const username = formData.get("username") as string

  if (!email || !password || !name || !username) {
    return { error: "Missing required fields" }
  }

  try {
    const hashedPassword = await hash(password, 10)

    const response = await fetch('/api/user_accounts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password: hashedPassword,
        name,
        username,
        createdAt: new Date(),
      })
    })

    const data = await response.json()

    if (!response.ok) {
      if (response.status === 409) {
        return { error: "Email or username already exists" }
      }
      throw new Error('Failed to create user')
    }

    return { success: true, userId: data.insertedId }
  } catch (error) {
    console.error("Error in register:", error)
    return { error: "Failed to create user" }
  }
}

export function getServerSession() {
  return getSession(authOptions)
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
