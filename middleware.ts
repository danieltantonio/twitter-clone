import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "./lib/supabase/middleware";

export async function middleware(req: NextRequest) {
  const { supabase, response } = createClient(req);

  await supabase.auth.getSession();

  // Modify the Access-Control-Allow-Origin header
  response.headers.set("Access-Control-Allow-Origin", "*");

  response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  response.headers.set("Access-Control-Max-Age", "86400");

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
    "/api/:path*"
  ],
};