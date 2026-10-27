import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
      teacherSlug: string | null;
    } & DefaultSession["user"];
  }

  interface User {
    role: string;
    teacherSlug: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
    teacherSlug?: string | null;
  }
}
