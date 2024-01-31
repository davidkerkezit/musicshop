import { NextResponse } from "next/server";
import connectMongoDB from "../../../libs/mongodb";
import Vinyl from "../../../models/vinyl";

export async function POST(request) {
  const { name, price, imageUrl } = await request.json();
  await connectMongoDB();
  await Vinyl.create({ name, price, imageUrl });
  return NextResponse.json({ message: "Vinyl added" }, { status: 201 });
}
