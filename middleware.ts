import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const isAuthenticated = false;

const protectedPaths = ["/dashboard"];

export { default } from "next-auth/middleware";

// export default function middleware() {}

export const config = { matcher: ["/dashboard/:path*"] };
