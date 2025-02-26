import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const routes = [
    "/accounts",
    "/dashboard",
    "/transaction-history",
    "/collection-monitoring",
    "/listings",
    "/tools",
  ];
  const isLoggedIn = request.cookies.get("isLoggedIn");

  if (routes.includes(request.nextUrl.pathname)) {
    if (isLoggedIn) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/", request.url));
  }
}
