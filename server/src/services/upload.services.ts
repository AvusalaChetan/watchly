import cloudinary from "../config/cloudnary.config.js";
import fs from "fs/promises";

export const uploadToCloudinary = async (
  filePath: string,
  resourceType: "video" | "image",
  folder: string,
) => {
  console.log(await cloudinary.api.ping());
  try {
    const fileUpload = await cloudinary.uploader.upload(filePath, {
      resource_type: resourceType,
      folder,
    });
    return fileUpload;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw new Error("Failed to upload file to Cloudinary");
  } finally {
    await fs.unlink(filePath).catch((e) => console.error("unlink failed:", e));
  }
};
