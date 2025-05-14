import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook"
import { compare, hash } from "bcrypt"
import { accountsUser } from "@/lib/data/users"

export const authOptions = {
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

        // Check if the input is an email or username
        const isEmail = credentials.emailOrUsername.includes("@")

        // Find user by email or username
        const user = accountsUser.find((user) =>
          isEmail ? user.email === credentials.emailOrUsername : user.username === credentials.emailOrUsername,
        )

        if (!user) {
          return null
        }

        const isPasswordValid = await compare(credentials.password, user.password)

        if (!isPasswordValid) {
          return null
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          avatar: user.avatar,
          username: user.username,
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
        token.username = user.username
        token.avatar = user.avatar;
      }
      // Store the provider used to sign in
      if (account) {
        token.provider = account.provider
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id
        session.user.username = token.username
        session.user.avatar = token.avatar;
        session.provider = token.provider
      }
      return session
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || "your-secret-key-for-development",
}

// Registration server action
export async function register(formData) {
  const email = formData.get("email")
  const password = formData.get("password")
  const name = formData.get("name")
  const username = formData.get("username")

  if (!email || !password || !name || !username) {
    return { error: "Missing required fields" }
  }

  // Check if user already exists (by email or username)
  if (accountsUser.some((user) => user.email === email)) {
    return { error: "Email already in use" }
  }

  if (accountsUser.some((user) => user.username === username)) {
    return { error: "Username already taken" }
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
  }

  accountsUser.push(newUser)

  return { success: true }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }