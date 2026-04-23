import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { roleFromToken } from "@/lib/role-from-token";

const AUTH_ROUTES = ["/login", "/signup"];
const ADMIN_PATH = "/admin";

function isProtectedAdminPath(pathname: string): boolean {
  return pathname === ADMIN_PATH || pathname.startsWith(`${ADMIN_PATH}/`);
}

export function proxy(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;
  const isAuthRoute = AUTH_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  if (isAuthRoute && token) {
    const role = roleFromToken(token);
    const home = role === "admin" ? "/admin" : "/login";
    return NextResponse.redirect(new URL(home, request.url));
  }

  if (isProtectedAdminPath(pathname)) {
    if (!token) {
      const login = new URL("/login", request.url);
      login.searchParams.set("from", pathname);
      return NextResponse.redirect(login);
    }

    const role = roleFromToken(token);
    if (role !== "admin") {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*", "/login", "/signup"],
};
