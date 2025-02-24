import mongoose, { isValidObjectId } from "mongoose";
import { Video } from "../models/video.models.js";
import { User } from "../models/user.models.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { uploadonCloudinary, deleteonCloudinary } from "../utils/cloudinary.js";

const getAllVideos = asyncHandler(async (req, res) => {
  let  { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query;
  //TODO: get all videos based on query, sort, pagination

  if (!query && !userId) {
    throw new ApiError(400, "Query or userId is required");
  }
  //Validate the userId only if provided
  if (userId && !isValidObjectId(userId)) {
    throw new ApiError(400, "Invalid user id");
  }

  // Add filters based on whatever is provided and fetch results based on that
  const filters = {};

  // If query is provided, filter by title
  if (query) {
    filters.title = { $regex: query, $options: "i" }; // case-insensitive search
  }
  // If userId is provided, filter by owner
  if (userId) {
    filters.owner = userId;
  }

  // Set default values if not provided
  sortBy = sortBy || "createdAt";
  sortType = sortType || "desc";

  // Fetch videos using find methods
  const videos = await Video.find(filters)
    .sort({ [sortBy]: sortType }) // sortby will be timestamp and sorttype can be asc or desc OR 1 or -1
    .skip((parseInt(page) - 1) * limit) // skip will be (page-1)*limit means skip the first page as it is already fetched and we want to fetch the next page
    .limit(parseInt(limit)); // skip and limit method of mongoose should be used together to show pagination

  const totalVideos = await Video.countDocuments(filters); // count the total number of videos
  return res.status(200).json(
    new ApiResponse(200, "OK", "Videos fetched successfully", {
      videos,
      totalVideos,
      totalPages: Math.ceil(totalVideos / limit),
      currentPage: page,
    })
  );
});

const publishAVideo = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  const { videoFile, thumbnail } = req.files;
  // TODO: get video, upload to cloudinary, create video
  if (!title || !description) {
    throw new ApiError(400, "Both title and description are required");
  }
  if (!videoFile) {
    throw new ApiError(400, "Video file is required");
  }

  const videoLocalPath = videoFile?.[0]?.path;
  const video = await uploadonCloudinary(videoLocalPath);

  const thumbnailLocalPath = thumbnail?.[0].path;
  const thumbnailOnCloud = await uploadonCloudinary(thumbnailLocalPath);

  if (!video || !video?.secure_url) {
    throw new ApiError(500, "Error uploading video to cloudinary");
  }

  if (!thumbnailOnCloud || !thumbnailOnCloud?.secure_url) {
    throw new ApiError(500, "Error uploading thumbnail to cloudinary");
  }

  const user = await User.findById(req.user._id);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const newVideo = await Video.create({
    videofile: video?.secure_url,
    title,
    description,
    thumbnail: thumbnailOnCloud?.secure_url,
    owner: user._id,
    duration: video.duration || 0,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, "Video created successfully", newVideo));
});

const getVideoById = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  //TODO: get video by id

  // Validate if the videoId is a valid MongoDB ObjectId
  if (!isValidObjectId(videoId)) {
    throw new ApiError(400, "Invalid video id");
  }

  const video = await Video.findById(videoId);
  if (!video) {
    throw new ApiError(404, "Video not found");
  }
  return res.status(200).json(new ApiResponse(200, "OK", video));
});

const updateVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  //TODO: update video details like title, description, thumbnail
  const { title, description, thumbnail } = req.body; // get title, description and thumbnail from request body

  if (!title && !description && !thumbnail) {
    throw new ApiError(400, "At least one field is required");
  }

  if (!isValidObjectId(videoId)) {
    // Validate if the videoId is a valid MongoDB ObjectId
    throw new ApiError(400, "Invalid video id");
  }

  const video = await Video.findById(videoId); // find video by id
  if (!video) {
    throw new ApiError(404, "Video not found");
  }

  // update video fields that are provided in the request body
  if (title) video.title = title;
  if (description) video.description = description;
  if (thumbnail) video.thumbnail = thumbnail;

  await video.save(); // save the updated video

  return res
    .status(200)
    .json(new ApiResponse(200, "Video updated successfully", video));
});

const deleteVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  //TODO: delete video

  // Validate if the videoId is a valid MongoDB ObjectId
  if (!isValidObjectId(videoId)) {
    throw new ApiError(400, "Invalid video id");
  }

  const video = await Video.findById(videoId); // find video by id
  if (!video) {
    throw new ApiError(404, "Video not found");
  }

  const publicId = video.videofile.split("/").pop().split(".")[0]; // Extract public ID from the URL, because deleteonCloudinary expects public ID

  // delete video from cloudinary
  await deleteonCloudinary(publicId);

  // delete video from database
  const deletedVideo = await video.deleteOne();

  //deleted.One returns number of documents deleted as result object with deletedCount
  if (deletedVideo.deletedCount !== 1) {
    throw new ApiError(500, "Error deleting video");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Video deleted successfully", video));
});

const togglePublishStatus = asyncHandler(async (req, res) => {
  const { videoId } = req.params;

  if (!isValidObjectId(videoId)) {
    throw new ApiError(400, "Invalid video id");
  }

  // Find the video first to get the current status
  const video = await Video.findById(videoId);
  if (!video) {
    throw new ApiError(404, "Video not found");
  }

  // Toggle isPublished using $set
  const updatedVideo = await Video.findByIdAndUpdate(
    videoId,
    { $set: { isPublished: !video.isPublished } }, // Toggle the boolean value
    { new: true } // Return the updated document
  );

  return res
    .status(200)
    .json(new ApiResponse(200, "Video status updated successfully", updatedVideo));
});


export {
  getAllVideos,
  publishAVideo,
  getVideoById,
  updateVideo,
  deleteVideo,
  togglePublishStatus,
};