import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises"; // Use promise-based file system methods
import dotenv from "dotenv";

dotenv.config({
  path: "./src/.env",
});

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const uploadonCloudinary = async (localFilePath) => {
  try {
    // Check if the file exists
    await fs.access(localFilePath);

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    console.log("File uploaded to Cloudinary. File URL:", result.url);

    // Delete the local file after uploading
    await fs.unlink(localFilePath);

    return result; // Return the Cloudinary response
  } catch (error) {
    console.error("Error uploading file to Cloudinary:", error.message);

    // Attempt to delete the local file if it exists
    try {
      await fs.unlink(localFilePath);
    } catch (unlinkError) {
      console.error("Error deleting local file:", unlinkError.message);
    }

    return null; // Return null if upload fails
  }
};

const deleteonCloudinary = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId);
    console.log("File deleted from Cloudinary. PublicID:", publicId);
  } catch (error) {
    console.error("Error deleting file from Cloudinary:", error.message);
    return null;
  }
};

export { uploadonCloudinary, deleteonCloudinary };
