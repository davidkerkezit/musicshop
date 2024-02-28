import mongoose, { Schema } from "mongoose";
const ProductSchema = new Schema(
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
const Product =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);
export default Product;
