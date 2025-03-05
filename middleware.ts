import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { logout } from "@/components/globals/auth";

export async function middleware(request: NextRequest) {
  const routes = [
    "/accounts",
    "/dashboard",
    "/transaction-history",
    "/collection-monitoring",
    "/listings",
    "/tools",
  ];

  const isLoggedIn = request.cookies.get("isLoggedIn");
  const pathname = request.nextUrl.pathname;

  if (pathname == "/") {
    await logout();
    return NextResponse.next();
  } else if (routes.includes(pathname)) {
    if (isLoggedIn) {
      return NextResponse.next();
    }
  }
  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
