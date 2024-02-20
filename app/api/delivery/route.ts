import Order from "@/models/order";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const { id, isChecked } = await request.json();

    const product = await Order.findByIdAndUpdate(id, {
      isChecked: !isChecked,
    });
    return NextResponse.json(
      { message: "Order added successfully", product },
      { status: 201 }
    );
  } catch (error) {
    console.log("Error message: Error with POST order API");
    return NextResponse.json({ error: "Error adding order" }, { status: 500 });
  }
}
