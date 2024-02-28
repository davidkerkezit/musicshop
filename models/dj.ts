import mongoose, { Schema } from "mongoose";
const djSchema = new Schema(
  {
    name: String,
    price: Number,
    imageUrl: String,
    about: String,
    description: String,
    aboutSeller: String,
    category: String,
    inStock: Number,
    access: Boolean,
  },
  {
    timestamps: true,
  }
);

const DJ = mongoose.models.DJ || mongoose.model("DJ", djSchema);
export default DJ;
