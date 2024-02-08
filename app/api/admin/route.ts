import connectMongoDB from "@/libs/mongodb";
import Admin from "@/models/admin";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
interface CustomNextApiResponse<T = any> extends NextApiResponse<T> {
  cookie: (name: string, value: string, options?: any) => void;
}

export async function POST(req: NextRequest, res: CustomNextApiResponse) {
  const { username, password } = await req.json();


  await connectMongoDB();
  const user = await Admin.findOne({ username: username });
 

  if (!user) {
    return NextResponse.json({ message: "Wrong username" }, { status: 401 });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return NextResponse.json({ message: "Wrong password" }, { status: 401 });
  }

  const secretKey = require("crypto").randomBytes(32).toString("hex");
  const token = jwt.sign({ username: user.username }, secretKey, {
    expiresIn: "1h",
  });
  const cookieStore = cookies();
  cookieStore.set("token", token, {
    httpOnly: true,
  });

  return NextResponse.json({ message: "Succes login" }, { status: 201 });
}

// export async function GET(request: NextRequest) {
//   const cookieStore = cookies();

//   // const token = cookieStore.get("token");
//   const token = "///";
//   if (token) {
//     return NextResponse.json(
//       { message: "Token exists", token },
//       { status: 201 }
//     );
//   } else {
//     return NextResponse.json(
//       { message: "Token does not exist" },
//       { status: 401 }
//     );
//   }
// }

// ADDING ADMIN

// export async function POST(request: NextResponse) {
//   const { username, password } = await request.json();
//   await connectMongoDB();
//   await Admin.create({ username, password });
//   return NextResponse.json({ message: "Admin added" }, { status: 201 });
// }
