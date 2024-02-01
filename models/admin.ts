import mongoose, { Schema } from "mongoose";
const AdminSchema = new Schema(
  {
    username: String,
    password: String,
  },
  {
    timestamps: true,
  }
);
const Admin = mongoose.models.Admin || mongoose.model("Admin", AdminSchema);
export default Admin;
