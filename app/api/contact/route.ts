import Contact from "@/models/contact";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();
    await Contact.create({
      name,
      email,
      message,
      read: false,
      answer: "",
    });
    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.log("Error message: Error with POST images API");
    return NextResponse.json({ error });
  }
}
export async function GET(request: NextRequest) {
  try {
    const questions = await Contact.find().sort({ createdAt: -1 });

    return NextResponse.json({
      questions,
    });
  } catch (error) {
    console.log("Error message: Error with POST images API");
    return NextResponse.json({ error });
  }
}
export async function PATCH(request: NextRequest) {
  try {
    const { id, isRead, answer } = await request.json();

    const data = await Contact.findByIdAndUpdate(id, {
      read: !isRead,
      answer: answer,
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.log("Error message: Error with POST images API");
    return NextResponse.json({ error });
  }
}
