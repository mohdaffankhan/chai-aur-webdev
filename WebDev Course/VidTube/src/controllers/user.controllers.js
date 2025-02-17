import { User } from "../models/user.models.js";
import ApiError from "../utils/ApiError.js";
import { uploadonCloudinary, deleteonCloudinary } from "../utils/cloudinary.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

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

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    const AccessToken = user.generateAccessToken();
    const RefreshToken = user.generateRefreshToken();

    user.refreshToken = RefreshToken;
    await user.save({ validateBeforeSave: false });

    return { AccessToken, RefreshToken };
  } catch (error) {
    console.error("Error generating tokens:", error);
    throw new ApiError(500, "Token generation failed");
  }
};

const loginUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  //validate email or username
  if (!username && !email) {
    throw new ApiError(400, "Username or email is required");
  }

  //grab user from db
  const user = await User.findOne({
    $or: [{ username: username?.toLowerCase() }, { email }],
  });
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  //check user password from db
  const PasswordValid = await user.isPasswordcorrect(password);
  if (!PasswordValid) {
    throw new ApiError(401, "Invalid credentials");
  }

  //generate tokens after validation
  const { AccessToken, RefreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  //grab user from db after token generation to avoid sending password and refresh token
  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  if (!loggedInUser) {
    throw new ApiError(500, "Login failed");
  }

  //cookie options
  const options = {
    httpOnly: true, //cookie cannot be accessed by client side js
    secure: process.env.NODE_ENV === "production", //if production then true else false
  };

  //send response
  return res
    .status(200)
    .cookie("accessToken", AccessToken, options)
    .cookie("refreshToken", RefreshToken, options)
    .json(new ApiResponse(200, "User logged in successfully", loggedInUser));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;
  if (!incomingRefreshToken) {
    throw new ApiError(400, "Refresh token is required");
  }

  //verify refresh token
  try {
    //decode incoming token
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.JWT_SECRET
    );
    //find user with decoded token
    const user = await User.findById(decodedToken?._id);
    if (!user) {
      throw new ApiError(404, "Invalid refresh token");
    }
    //check if incoming token is same as user token
    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "Invalid refresh token");
    }

    //cookie options
    const options = {
      httpOnly: true, //cookie cannot be accessed by client side js
      secure: process.env.NODE_ENV === "production", //if production then true else false
    };

    //generate new tokens
    const { AccessToken, RefreshToken: NewRefreshToken } =
      await generateAccessAndRefreshToken(user._id);

    //send response
    return res
      .status(200)
      .cookie("accessToken", AccessToken, options)
      .cookie("refreshToken", NewRefreshToken, options)
      .json(
        new ApiResponse(200, "Access token refreshed successfully", {
          AccessToken,
          NewRefreshToken,
        })
      );
  } catch (error) {
    console.error("Error refreshing token:", error);
    throw new ApiError(500, "Token refresh failed");
  }
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: { refreshToken: undefined },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, "User logged out successfully", {}));
});

export { registerUser, loginUser, logoutUser, refreshAccessToken };