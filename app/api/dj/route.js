import { NextResponse } from "next/server";
import connectMongoDB from "../../../libs/mongodb";
import DJ from "../../../models/dj";

export async function POST(request) {
  const { name, price, imageUrl, brand } = await request.json();
  await connectMongoDB();
  await DJ.create({ name, price, imageUrl, brand });
  return NextResponse.json({ message: "DJ equipment added" }, { status: 201 });
}
export async function GET() {
  await connectMongoDB();
  const djs = await DJ.find();
  return NextResponse.json({ djs });
}

// const aws = require("aws-sdk");
// const multer = require("multer");
// const multerS3 = require("multer-s3");

// const s3 = new aws.S3({
//   accessKeyId: process.env.S3_ACCESS_KEY,
//   secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
//   region: process.env.S3_BUCKET_REGION,
// });
// const upload = () =>
//   multer({
//     storage: multerS3({
//       s3,
//       bucket: "musicshop-product-image",
//       metadata: function (req, file, cb) {
//         cb(null, { fieldName: file.fieldname });
//       },
//       key: function (req, file, cb) {
//         cb(null, `image-${Date.now()}.jpeg`);
//       },
//     }),
//   });
// exports.setProfilePic = (req, res, next) => {
//   const uploadSingle = upload().single("croppedImage");

//   uploadSingle(req, res, async (err) => {
//     if (err)
//       return res.status(400).json({ success: false, message: err.message });

//     await User.create({ photoUrl: req.file.location });

//     res.status(200).json({ data: req.file.location });
//   });
// };
