import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  if (!token) {
    return NextResponse.redirect(new URL("admin", request.url));
  }
}
export const config = {
  matcher: "/dashboard",
};
