"use server";
import { v2 as cloudinary } from "cloudinary";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const handleLogoAction = async (base64Image: string) => {
  try {
    const result = await cloudinary.uploader.upload(base64Image, {
      folder: "ai_local_directory",
      transformation: [{ width: 300, height: 300, crop: "limit" }],
    });
    return result.secure_url;
  } catch (error) {
    console.log(error);
    return null;
  }
};
