import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    provider?: string;
    user: {
      id: string;
      username?: string;
      avatar?: string;
      role: string;
    } & DefaultSession["user"];
  }

  interface User {
    username?: string;
    avatar?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    username?: string;
    avatar?: string;
    provider?: string;
  }
}
