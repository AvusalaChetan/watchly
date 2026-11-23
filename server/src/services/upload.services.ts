import cloudinary from "../config/cloudnary.config.js";
import type {UploadApiResponse} from "cloudinary";

export const uploadToCloudinary = (
  fileBuffer: Buffer,
  resourceType: "video" | "image",
  folder: string,
): Promise<UploadApiResponse> => {
  console.log("Buffer size:", fileBuffer.length);
  console.log("Cloudinary config:", cloudinary.config().cloud_name);
  console.log("Sending to Cloudinary...");
  try {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          resource_type: resourceType,
          folder,
        },
        (error, result:any) => {
          console.log("Cloudinary callback fired");

          if (error) {
            console.error("Cloudinary error:", error);
            return reject(error);
          }

          resolve(result);
        },
      );

      stream.on("error", reject);

      console.log("Sending buffer to Cloudinary");
      stream.end(fileBuffer);
    });
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw new Error("Failed to upload file to Cloudinary");
  }
};
