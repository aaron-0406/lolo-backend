import {
  DeleteObjectCommand,
  DeleteObjectCommandInput,
  GetObjectCommand,
  GetObjectCommandInput,
  PutObjectCommand,
  PutObjectCommandInput,
  S3Client,
} from "@aws-sdk/client-s3";
import fs from "fs";
import config from "../config/config";
import path from "path";
import { Readable } from "stream";

const { AWS_BUCKET_REGION, AWS_BUCKET_NAME, AWS_PUBLIC_KEY, AWS_SECRET_KEY } =
  config;

const client = new S3Client({
  region: AWS_BUCKET_REGION,
  credentials: { accessKeyId: AWS_PUBLIC_KEY, secretAccessKey: AWS_SECRET_KEY },
});

export const uploadFile = async (
  file: Express.Multer.File,
  pathname: string
) => {
  // Reading File
  const stream = fs.createReadStream(
    path.join(__dirname, "../public/docs/", file.filename)
  );

  const uploadParam: PutObjectCommandInput = {
    Bucket: AWS_BUCKET_NAME,
    Key: `${pathname}/${file.filename}`,
    Body: stream,
  };

  // UPLOAD TO AWS
  const command = new PutObjectCommand(uploadParam);

  return await client.send(command);
};

export const readFile = async (filename: string) => {
  const getParam: GetObjectCommandInput = {
    Bucket: AWS_BUCKET_NAME,
    Key: filename,
  };
  const pathName = filename.split("/");
  const command = new GetObjectCommand(getParam);
  const result = await client.send(command);
  if (result.Body) {
    const stream = result.Body as Readable;
    const newFile = fs.createWriteStream(
      path.join(__dirname, "../public/download", pathName[pathName.length - 1])
    );
    stream.pipe(newFile);
    let end = new Promise(function (resolve, reject) {
      stream.on("end", () => resolve(stream.read()));
      stream.on("error", reject); // or something like that. might need to close `hash`
    });
    await end;
    return 
  }
};

export const createFolder = async (folderName: string) => {
  const uploadParam: PutObjectCommandInput = {
    Bucket: AWS_BUCKET_NAME,
    Key: folderName,
  };
  const command = new PutObjectCommand(uploadParam);
  return await client.send(command);
};

export const deleteFileBucket = async (fileName: string) => {
  const uploadParam: DeleteObjectCommandInput = {
    Bucket: AWS_BUCKET_NAME,
    Key: fileName,
  };
  const command = new DeleteObjectCommand(uploadParam);
  return await client.send(command);
};
