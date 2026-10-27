import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const role = req.auth?.user?.role;

  if (pathname.startsWith("/profe")) {
    if (!req.auth) {
      return NextResponse.redirect(new URL("/login?callbackUrl=/profe", req.url));
    }
    if (role !== "TEACHER" && role !== "ADMIN") {
      return NextResponse.redirect(new URL("/alumno", req.url));
    }
  }

  if (pathname.startsWith("/alumno")) {
    if (!req.auth) {
      return NextResponse.redirect(
        new URL("/login?callbackUrl=/alumno", req.url),
      );
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/profe/:path*", "/alumno/:path*"],
};
