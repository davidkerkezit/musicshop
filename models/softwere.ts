import mongoose, { Schema } from "mongoose";
const softwereSchema = new Schema(
  {
    name: String,
    price: Number,
    about: String,
    description: String,
    imageUrl: String,
  },
  {
    timestamps: true,
  }
);
const Softwere =
  mongoose.models.Softwere || mongoose.model("Softwere", softwereSchema);
export default Softwere;
