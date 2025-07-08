import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    provider?: string;
    user: {
      id: string;
      username?: string;
      image?: string;
      role: string;
    } & DefaultSession["user"];
  }

  interface User {
    username?: string;
    image?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    username?: string;
    image?: string;
    provider?: string;
  }
}
