import { User } from "../models/user.models.js";
import ApiError from "../utils/ApiError.js";
import { uploadonCloudinary, deleteonCloudinary } from "../utils/cloudinary.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const registerUser = asyncHandler(async (req, res) => {
  const { username, fullname, email, password } = req.body;

  //validation + business logic
  if ([username, fullname, email, password].some((field) => field === "")) {
    throw new ApiError(400, "All fields are required");
  }

  //existing user
  const existingUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existingUser) {
    throw new ApiError(400, "User already exists");
  }
  console.log("Uploaded Avatar Path:", req.files?.avatar?.[0]?.path);

  console.warn(req.files);
  //handle images
  const avatarLocalPath = req.files?.avatar?.[0]?.path;
  const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar is required");
  }

  //upload to cloudinary
  let avatar;
  try {
    avatar = await uploadonCloudinary(avatarLocalPath);
    console.log("Uploaded Avatar", avatar);
  } catch (error) {
    console.log("Error uploading avatar", error);
    throw new ApiError(400, "Image upload failed");
  }

  let coverImage;
  try {
    coverImage = await uploadonCloudinary(coverImageLocalPath);
    console.log("Uploaded Cover Image", coverImage);
  } catch (error) {
    console.log("Error uploading cover image", error);
    throw new ApiError(400, "Image upload failed");
  }

  try {
    //create user
    const user = await User.create({
      username: username.toLowerCase(),
      fullname,
      email,
      password,
      avatar: avatar.url,
      coverImage: coverImage.url || "",
    });

    const createdUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );
    if (!createdUser) {
      throw new ApiError(500, "User registration failed");
    }

    //send response
    return res
      .status(201)
      .json(new ApiResponse(201, "User registered successfully", createdUser));
  } catch (error) {
    console.error("Error registering user:", error);
    if (avatarLocalPath) {
      deleteonCloudinary(avatar.public_id);
    }
    if (coverImageLocalPath) {
      deleteonCloudinary(coverImage.public_id);
    }
    console.log("Deleted images from Cloudinary");
    throw new ApiError(500, "User registration failed");
  }
});

export { registerUser };