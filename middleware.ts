import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const isLoggedIn = request.cookies.get("isLoggedIn");

  if (isLoggedIn) {
    return NextResponse.next();
  }
  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: [
    "/accounts",
    "/dashboard",
    "/transaction-history",
    "/transaction-history/clients",
    "/transaction-history/clients/:id",
    "/transaction-history/transactions",
    "/collection-monitoring",
    "/collection-monitoring/clients",
    "/collection-monitoring/clients/:id",
    "/collection-monitoring/collections",
    "/listings",
    "/tools/acknowledgment-receipt",
    "/tools/billing-statement",
    "/tools/currency-converter",
    "/tools/loan-calculator",
    "/tools/tax-computation",
  ],
};
