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
  } else if (
    routes.some((route) => {
      return pathname.startsWith(route);
    })
  ) {
    if (isLoggedIn) {
      return NextResponse.next();
    }
  }
  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  /*
   * Match all request paths except for the ones starting with:
   * - api (API routes)
   * - _next/static (static files)
   * - _next/image (image optimization files)
   * - favicon.ico, sitemap.xml, robots.txt (metadata files)
   */

  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
