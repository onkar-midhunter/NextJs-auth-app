import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublicPath =
    path === "/login" ||
    path === "/signup" ||
    path === "/verifyemail" || 
    path === "/resetPassword";

  const token = request.cookies.get("token")?.value || "";

  // If user is already logged in, block access to public routes
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // If not logged in, block access to private routes
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  // Apply to all routes except API, _next, static files
  matcher: ["/((?!_next|api|static|.*\\..*).*)"],
};
