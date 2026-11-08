import cloudinary from "../config/cloudnary.config.js";

export const deleteFromCloudinary = async (
  publicId: string,
  resourceType: "video" | "image",
 ) => {
  try {
    const fileDelete = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
     });
    return fileDelete;
  } catch (error) {
    console.error("Error deleting to Cloudinary:", error);
    throw new Error("Failed to delete file from Cloudinary");
  }  
};
