import mongoose, { Schema } from "mongoose";
const djSchema = new Schema(
  {
    name: String,
    price: Number,
    imageUrl: String,
    brand: String,
    about: String,
    description: String,
    aboutSeller: String,
  },
  {
    timestamps: true,
  }
);

const DJ = mongoose.models.DJ || mongoose.model("DJ", djSchema);
export default DJ;
