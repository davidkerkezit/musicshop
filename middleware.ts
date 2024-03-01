import { NextRequest, NextResponse } from "next/server";
const jwt = require("jsonwebtoken");
import { cookies } from "next/headers";
import { loginAuthAction, logoutAuthAction, verify } from "./libs/actions";
import { serialize } from "cookie";

export default async function middleware(request: NextRequest) {
  const cookieStore = cookies();
  const token = cookieStore.get("OursiteJWT");
  const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY || "";
  const verifiedToken =
    token &&
    (await verify(token.value, secretKey).catch((err) => {
      console.log(err);
    }));

  try {
    if (request.url.includes("/admin")) {
      if (!token) {
        return;
      }

      if (!verifiedToken) {
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
      } else if (verifiedToken) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
    }
    if (request.url.includes("/dashboard")) {
      if (!token) {
        return NextResponse.redirect(new URL("/admin", request.url));
      }
      if (!verifiedToken) {
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
      } else if (verifiedToken) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
    }
  } catch (error) {
    console.log(error);
  }
}
export const config = {
  middleware: "on",
};
