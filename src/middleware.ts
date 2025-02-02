import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { siteConfig } from "./config/site";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(siteConfig.cookies.token.name);

  if (pathname.startsWith("/dashboard") && !token) {
    const signInUrl = new URL("/sign-in", request.url);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/dashboard/:path*",
};
