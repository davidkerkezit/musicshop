import { NextRequest, NextResponse } from "next/server";
const jwt = require("jsonwebtoken");
import { cookies } from "next/headers";
import { logoutAuthAction, verify } from "./libs/actions";
import { serialize } from "cookie";

export default async function middleware(request: NextRequest) {
  const cookieStore = cookies();
  const token = cookieStore.get("OursiteJWT");
  const secretKey = process.env.SECRET_KEY || "";

  try {
    if (request.url.includes("/admin")) {
      if (!token) {
        return;
      }

      await verify(token.value, secretKey);

      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    if (request.url.includes("/dashboard")) {
      if (!token) {
        return NextResponse.redirect(new URL("/admin", request.url));
      }
      await verify(token.value, secretKey);
      return;
    }
  } catch (error: any) {
    if (error.name === "JWTExpired") {
      const emptyToken = ""; // Or any other value you prefer for an empty token
      const serialised = serialize("OursiteJWT", emptyToken, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: -1, // Setting maxAge to a negative value will make the cookie expire immediately
        path: "/",
      });

      return NextResponse.redirect(new URL("/admin", request.url), {
        headers: { "Set-Cookie": serialised },
      });
    } else {
      console.error("Token verification failed:", error);
      return NextResponse.error();
    }
  }
}
export const config = {
  middleware: "on",
};
