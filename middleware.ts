import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // Clean up callback URL if it's getting too long
    const url = new URL(req.url);
    if (url.searchParams.get("callbackUrl")?.includes("callbackUrl")) {
      // Reset to a simple callback
      url.searchParams.set("callbackUrl", "/");
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/login",
    },
  }
);

// Protect all routes except login, register, etc
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|login|register|favicon.ico|final.mp4).*)",
  ],
};