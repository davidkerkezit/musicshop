import mongoose, { Schema } from "mongoose";
const vinylSchema = new Schema(
  {
    name: String,
    price: Number,
    imageUrl: String,
    about: String,
    description: String,
    aboutSeller: String,
    category: String,
    inStock: Number,
  },
  {
    timestamps: true,
  }
);
const Vinyl = mongoose.models.Vinyl || mongoose.model("Vinyl", vinylSchema);
export default Vinyl;
