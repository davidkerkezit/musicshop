import mongoose, { Schema } from "mongoose";
const softwereSchema = new Schema(
  {
    name: String,
    price: Number,
    imageUrl: String,
    about: String,
    description: String,
    aboutSeller: String,
    category: String,
  },
  {
    timestamps: true,
  }
);
const Softwere =
  mongoose.models.Softwere || mongoose.model("Softwere", softwereSchema);
export default Softwere;
