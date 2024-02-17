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
// Upload image to AWS
export async function uploadFileToS3(file, fileName, path, subPath) {
  const fileBuffer = file;
  console.log("AWS S3 Bucket Name:", process.env.AWS_S3_BUCKET_NAME);
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
// Delete image from AWS
export async function deleteFileFromS3(img) {
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
export async function uploadImageFromUrlToS3(
  imageUrl,
  fileName,
  path,
  subPath
) {
  try {
    const response = await fetch(imageUrl);
    console.log(response);
    if (!response.ok) {
      throw new Error(`Failed to fetch image from URL: ${imageUrl}`);
    }

    const fileBuffer = await response.arrayBuffer();

    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: `${path}${subPath !== false ? `/${subPath}` : ""}/${fileName}.png`,
      Body: Buffer.from(fileBuffer),
      ContentType: "image/png",
    };

    const command = new PutObjectCommand(params);
    await s3Client.send(command);

    const imageUrlInS3 = `https://music-shop-storage.s3.eu-west-3.amazonaws.com/${params.Key}`;

    return imageUrlInS3;
  } catch (error) {
    console.error("Error uploading image to S3:", error);
    throw error;
  }
}
