import { NextRequest, NextResponse } from "next/server";
import Order from "@/models/order";
export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const {
      firstName,
      lastName,
      city,
      houseNumber,
      streetName,
      totalPrice,
      order,
      isChecked,
      moreInformation,
      postalCode,
      phoneNumber,
    } = await request.json();
    await Order.create({
      firstName,
      lastName,
      city,
      houseNumber,
      streetName,
      totalPrice,
      order,
      isChecked,
      moreInformation,
      postalCode,
      phoneNumber,
    });
    return NextResponse.json(
      { message: "Order added successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.log("Error message: Error with POST order API");
    return NextResponse.json({ error: "Error adding order" }, { status: 500 });
  }
}
export async function GET(request: NextRequest, response: NextResponse) {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    return NextResponse.json(
      { message: "Order added successfully", orders },
      { status: 201 }
    );
  } catch (error) {
    console.log("Error message: Error with POST order API");
    return NextResponse.json({ error: "Error adding order" }, { status: 500 });
  }
}
