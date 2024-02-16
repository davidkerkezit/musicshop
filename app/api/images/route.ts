import { NextRequest, NextResponse } from "next/server";
import {
  uploadFileToS3,
  deleteFileFromS3,
  uploadImageFromUrlToS3,
} from "../../../libs/s3-functions";

export async function POST(request: NextRequest) {
  const file = await request.json();
  let name = Math.floor(Math.random() * 100000000);
  try {
    if (!file) {
      console.log("Error message: File is required in POST images API");
      return NextResponse.json({ error: "File is required." }, { status: 400 });
    }
    let fileName;
    if (file.format === "png") {
      const dataUrlParts = file.image.split(",");
      const base64Data = dataUrlParts[1];

      const buffer = Buffer.from(base64Data, "base64");

      fileName = await uploadFileToS3(
        buffer,
        name.toString(),
        `${file.categoryPath}`,
        file.subCategoryPath !== null && `${file.subCategoryPath}`
      );
    } else if (file.format === "url") {
      fileName = await uploadImageFromUrlToS3(
        file.image,
        name,
        file.categoryPath,
        file.subCategoryPath !== null && `${file.subCategoryPath}`
      );
    }
    console.log("Success image POST API");

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
    console.log("Error message: Error with POST images API");
    return NextResponse.json({ error });
  }
}

export async function DELETE(request: NextRequest) {
  const img = await request.json();
  console.log("Image deleted successfully");

  try {
    const deletedFile = await deleteFileFromS3(img.image);
    return NextResponse.json({
      success: true,
      message: "succes",
    });
  } catch (error) {
    console.log("Error message: Error with DELETE Image API");
    return NextResponse.json({ error });
  }
}
