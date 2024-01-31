import { NextResponse } from "next/server";
import connectMongoDB from "../../../libs/mongodb";
import Softwere from "../../../models/softwere";

export async function POST(request) {
  const { name, price, imageUrl } = await request.json();
  await connectMongoDB();
  await Softwere.create({ name, price, imageUrl });
  return NextResponse.json({ message: "Softwere added" }, { status: 201 });
}
