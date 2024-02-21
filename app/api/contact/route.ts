import Contact from "@/models/contact";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();
    await Contact.create({
      name,
      email,
      message,
    });
    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.log("Error message: Error with POST images API");
    return NextResponse.json({ error });
  }
}
