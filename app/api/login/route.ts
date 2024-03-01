import connectMongoDB from "@/libs/mongodb";
import Admin from "@/models/admin";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { sign } from "@/libs/actions";
import { serialize } from "cookie";

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
interface CustomNextApiResponse<T = any> extends NextApiResponse<T> {
  cookie: (name: string, value: string, options?: string) => void;
}

// Your POST function
export async function POST(req: NextRequest, res: CustomNextApiResponse) {
  const { username, password, action } = await req.json();
  if (action === "login") {
    await connectMongoDB();
    const user = await Admin.findOne({ username: username });

    if (!user) {
      return NextResponse.json({ message: "Wrong username" }, { status: 401 });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return NextResponse.json({ message: "Wrong password" }, { status: 401 });
    }

    const secretKey = process.env.SECRET_KEY || "";
    const token = await sign(
      { username: user.username, password: user.password },
      secretKey
    );
    const serialised = serialize("OursiteJWT", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });

    return NextResponse.json(
      { message: "Succes login" },
      { status: 201, headers: { "Set-Cookie": serialised } }
    );
  } else if (action === "logout") {
    const emptyToken = ""; // Or any other value you prefer for an empty token
    const serialised = serialize("OursiteJWT", emptyToken, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: -1, // Setting maxAge to a negative value will make the cookie expire immediately
      path: "/",
    });

    return NextResponse.json(
      { message: "Token expired. Please log in again." },
      { status: 201, headers: { "Set-Cookie": serialised } }
    );
  }
}
