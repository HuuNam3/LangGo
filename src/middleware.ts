import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const protectedPaths = [
    "/profile",
    "/lessons/:path*",
    "/courses/:path*",
    "/my-courses",
    "/dashboard",
  ];
  

  const isPathProtected = protectedPaths.some(
    (path) => pathname === path || pathname.startsWith(`${path.split(":")[0]}`)
  );

  if (pathname === "/lessons" || pathname === "/courses") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (isPathProtected && !token) {
    const url = new URL(`/login`, req.url);
    url.searchParams.set("callbackUrl", encodeURI(pathname));
    return NextResponse.redirect(url);
  }

  if (token && (pathname === "/login" || pathname === "/register")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if(token) {
    if (pathname === "/dashboard" && token.role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/register",
    "/profile",
    "/lessons/:path*",
    "/courses/:path*",
    "/my-courses",
    "/dashboard",
    "/api",
  ],
};
