import Subscription from "@/models/subscription";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest) {
  try {
    const { email } = await request.json();
    const subscriptions = await Subscription.findOne();
    const mongoDBSubscriptions = subscriptions.subscriptions;

    const existingSubscription = mongoDBSubscriptions.find(
      (email: string) => email === email
    );
    if (!existingSubscription) {
      return NextResponse.json({
        success: false,
        error: "Email already exists in subscriptions.",
      });
    }
    mongoDBSubscriptions.push(email);

    await Subscription.findByIdAndUpdate(existingSubscription._id, {
      subscriptions: mongoDBSubscriptions,
    });
    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.log("Error message: Error with POST images API");
    return NextResponse.json({ error });
  }
}
