import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";
import  ApiError  from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

// Middleware to check if the user is authenticated before accessing a protected route of logging out
export const authMiddleware = asyncHandler(async (req, _, next) => {
    const token =
      req.cookies.accessToken || req.headers.authorization?.replace("Bearer ", "");
      console.log("Extracted Token: ", token); // Add this line for debugging

    if (!token) {
      return next(new ApiError(401, "Unauthorized"));
    }
    
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        console.log("Decoded Token: ", decoded);
        const user = await User.findById(decoded?.id).select("-password -refreshToken");
        if (!user) {
            return next(new ApiError(401, "Unauthorized"));
        }
        req.user = user; // add the user to the request object
        next(); // continue to the next middleware or controller
    } catch (error) {
        throw new ApiError(401, error?.message || "Unauthorized");
    }
});