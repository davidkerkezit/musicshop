import mongoose, { Schema } from "mongoose";
const OrderSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    city: String,
    postalCode: Number,
    streetName: String,
    houseNumber: Number,
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
