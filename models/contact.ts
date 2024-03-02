import mongoose, { Schema } from "mongoose";
const ContactSchema = new Schema(
  {
    name: String,
    email: String,
    message: String,
    read: Boolean,
  },
  {
    timestamps: true,
  }
);
const Contact =
  mongoose.models.Contact || mongoose.model("Contact", ContactSchema);
export default Contact;
