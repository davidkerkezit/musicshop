import { NextResponse } from "next/server";
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: process.env.AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY_ID,
  },
});

async function uploadFileToS3(file, fileName, path, subPath) {
  const fileBuffer = file;

  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: `${path}${subPath !== false ? `/${subPath}` : ""}/${fileName}.png`,
    Body: fileBuffer,
    ContentType: "image/png",
  };

  const command = new PutObjectCommand(params);
  await s3Client.send(command);

  return fileName;
}
async function deleteFileFromS3(img) {
  const url = new URL(img);
  // Extracting the pathname, removing the leading slash '/'
  const key = url.pathname.slice(1);
  console.log(key);
  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: key,
  };

  // Delete the file
  const deleteCommand = new DeleteObjectCommand(params);
  await s3Client.send(deleteCommand);

  return `Successfully deleting`;
}

export async function POST(request) {
  const file = await request.json();
  let name = Math.floor(Math.random() * 100000000);
  const dataUrlParts = file.image.split(",");
  const base64Data = dataUrlParts[1];

  try {
    if (!file) {
      return NextResponse.json({ error: "File is required." }, { status: 400 });
    }
    const buffer = Buffer.from(base64Data, "base64");

    const fileName = await uploadFileToS3(
      buffer,
      name.toString(),
      `${file.categoryPath}`,
      file.subCategoryPath !== null && `${file.subCategoryPath}`
    );

    return NextResponse.json({
      success: true,
      fileName,
      url: `https://music-shop-storage.s3.eu-west-3.amazonaws.com/${
        file.categoryPath
      }${
        file.subCategoryPath !== null ? `/${file.subCategoryPath}` : ""
      }/${name}.png`,
    });
  } catch (error) {
    console.log("error");
    return NextResponse.json({ error });
  }
}

export async function DELETE(request) {
  const img = await request.json();

  try {
    const deletedFile = await deleteFileFromS3(img.image);
    console.log(deletedFile);
    return NextResponse.json({
      success: true,
      message: "succes",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error });
  }
}
