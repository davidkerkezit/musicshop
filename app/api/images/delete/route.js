const {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");

// Create an S3 client
const s3Client = new S3Client({ region: process.env.AWS_REGION });

async function uploadFileToS3(file, fileName, path, subPath) {
  const fileBuffer = file;
  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: `${path}${subPath !== null && `/${subPath}`}/${fileName}.png`,
    Body: fileBuffer,
    ContentType: "image/png",
  };

  // Upload the file
  const putCommand = new PutObjectCommand(params);
  await s3Client.send(putCommand);

  return fileName;
}

async function deleteFileFromS3(fileName, path, subPath) {
  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: `${path}${subPath !== null && `/${subPath}`}/${fileName}.png`,
  };

  // Delete the file
  const deleteCommand = new DeleteObjectCommand(params);
  await s3Client.send(deleteCommand);

  return `${fileName} deleted successfully`;
}
