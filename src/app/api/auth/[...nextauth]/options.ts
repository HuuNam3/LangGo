import { NextAuthOptions, DefaultUser, DefaultSession, Account, User } from "next-auth"
import { JWT } from "next-auth/jwt"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook"
import { compare } from "bcrypt"
import { accountsUser } from "@/lib/data/users"

declare module "next-auth" {
  interface User extends DefaultUser {
    username?: string
    avatar?: string
  }
  interface Session extends DefaultSession {
    user: {
      id: string
      username?: string
      avatar?: string
    } & DefaultSession["user"]
    provider?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string
    username?: string
    avatar?: string
    provider?: string
  }
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

        const isEmail = credentials.emailOrUsername.includes("@")
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
          id: user.id.toString(),
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
    async jwt({ token, user, account }: { token: JWT; user: User | undefined; account: Account | null }) {
      if (user) {
        token.id = user.id
        token.username = user.username
        token.avatar = user.avatar
      }
      if (account) {
        token.provider = account.provider
      }
      return token
    },
    async session({ session, token }: { session: DefaultSession; token: JWT }) {
      const updatedSession = {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          username: token.username,
          avatar: token.avatar,
        },
        provider: token.provider,
      } as DefaultSession & {
        user: {
          id: string;
          username?: string;
          avatar?: string;
        };
        provider?: string;
      }
      return updatedSession
    },
  },
  session: {
    strategy: "jwt" as const,
  },
  secret: process.env.NEXTAUTH_SECRET || "your-secret-key-for-development",
} 