import mongoose, { Schema } from "mongoose";
const OrderSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    city: String,
    postalCode: String,
    streetName: String,
    houseNumber: String,
    phoneNumber: String,
    moreInformation: String,
    order: [
      {
        productId: String,
        quantity: Number,
        price: Number,
        name: String,
      },
    ],
    totalPrice: Number,
    isChecked: Boolean,
  },
  {
    timestamps: true,
  }
);
const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema);
export default Order;
