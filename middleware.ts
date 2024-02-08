import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  
  if (request.url.includes("/admin")) {
    if (token) {
      return NextResponse.redirect(new URL("/dashboard", request.url).toString());
    }
  } else if (request.url.includes("/dashboard")) {
    if (!token) {
      return NextResponse.redirect(new URL("/admin", request.url).toString());
    }
  }
}

export const config = {
  middleware: "on",
};