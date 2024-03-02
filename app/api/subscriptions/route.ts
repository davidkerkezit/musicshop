import Subscription from "@/models/subscription";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest) {
  try {
    const { email } = await request.json();
    const subscriptions = await Subscription.findOne();
    const mongoDBSubscriptions = subscriptions.subscriptions;

    const emailExists = mongoDBSubscriptions.includes(email);

    if (emailExists) {
      return NextResponse.json(
        {
          success: false,
          error: "Email already exists in subscriptions.",
        },
        { status: 409 }
      );
    }
    mongoDBSubscriptions.push(email);

    await Subscription.findByIdAndUpdate("65d5240a0aa671138424a234", {
      subscriptions: mongoDBSubscriptions,
    });
    return NextResponse.json(
      {
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error message: Error with POST images API");
    return NextResponse.json({ error }, { status: 400 });
  }
}
export async function GET() {
  try {
    const subscriptions = await Subscription.find();

    return NextResponse.json(
      {
        success: true,
        subscriptions: subscriptions[0].subscriptions,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error message: Error with POST images API");
    return NextResponse.json({ error }, { status: 400 });
  }
}
