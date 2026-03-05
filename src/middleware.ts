import { NextRequest, NextResponse } from "next/server";

// Routes always accessible without admin cookie
const PUBLIC_PREFIXES = [
  "/api/",
  "/_next/",
  "/favicon",
  "/fonts/",
];

const PUBLIC_EXACT = ["/"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Always pass through Next.js internals and API routes
  if (PUBLIC_PREFIXES.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  // Always pass through exact public pages
  if (PUBLIC_EXACT.includes(pathname)) {
    return NextResponse.next();
  }

  // Allow admin cookie holders through everywhere
  const adminCookie = request.cookies.get("brewify_admin");
  if (adminCookie?.value === "granted") {
    return NextResponse.next();
  }

  // Everyone else → coming soon
  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
