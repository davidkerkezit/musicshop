import mongoose, { Schema } from "mongoose";
const SubscriptionSchema = new Schema(
  {
    subscriptions: [String],
  },
  {
    timestamps: true,
  }
);
const Subscription =
  mongoose.models.Subscription ||
  mongoose.model("Subscription", SubscriptionSchema);
export default Subscription;
