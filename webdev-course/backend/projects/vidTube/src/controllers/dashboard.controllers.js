import mongoose from "mongoose";
import { User } from "../models/user.models.js";
import { Video } from "../models/video.models.js";
import { Subscription } from "../models/subscription.models.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const getChannelStats = asyncHandler(async (req, res) => {
  // TODO: Get the channel stats like total video views, total subscribers, total videos, total likes etc.
  const user = await User.findById(req.user._id);
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  
  const videos = await Video.find({ owner: user._id });
  const totalSubscribers = await Subscription.countDocuments({
    channel: user._id,
  });


  let totalViews = 0,
    totalLikes = 0,
    totalVideos = 0;

  videos.forEach((video) => {
    totalViews += video.views;
    totalLikes += video.likeCount;
    totalVideos += 1;
  });

  return res.status(200).json(
    new ApiResponse(200, "Channel stats fetched successfully", {
      totalViews,
      totalLikes,
      totalVideos,
      totalSubscribers,
    })
  );
});

const getChannelVideos = asyncHandler(async (req, res) => {
  // TODO: Get all the videos uploaded by the channel
  const user = await User.findById(req.user._id);
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  const videos = await Video.find({ owner: user._id });

  return res.status(200).json(
    new ApiResponse(200, videos.length ? "Videos fetched successfully" : "No videos found", videos)
  );
});

export { getChannelStats, getChannelVideos };
