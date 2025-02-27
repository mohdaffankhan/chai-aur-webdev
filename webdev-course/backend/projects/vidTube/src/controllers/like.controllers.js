import mongoose, { isValidObjectId } from "mongoose";
import { Like } from "../models/like.models.js";
import { Video } from "../models/video.models.js";
import { Comment } from "../models/comment.models.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { Tweet } from "../models/tweet.models.js";

const toggleVideoLike = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  //TODO: toggle like on video

  if (!isValidObjectId(videoId)) {
    throw new ApiError(400, "Invalid video id");
  }

  const video = await Video.findById(videoId);
  if (!video) {
    throw new ApiError(404, "Video not found");
  }

  const existingLike = await Like.findOneAndDelete({
    likedby: req.user._id,
    video: videoId,
  });

  if (existingLike) {
    await Video.findByIdAndUpdate(videoId, { $inc: { likeCount: -1 } });
    return res
      .status(200)
      .json(new ApiResponse(200, "Video unliked successfully"));
  }

  const like = await Like.create({
    likedby: req.user._id,
    video: videoId,
  });

  await Video.findByIdAndUpdate(videoId, { $inc: { likeCount: 1 } });
  return res
    .status(200)
    .json(new ApiResponse(200, "Video liked successfully", like));
});

const toggleCommentLike = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  //TODO: toggle like on comment
  if (!isValidObjectId(commentId)) {
    throw new ApiError(400, "Invalid comment id");
  }

  const comment = await Comment.findById(commentId);
  if (!comment) {
    throw new ApiError(404, "Comment not found");
  }

  const existingLike = await Like.findOneAndDelete({
    owner: req.user._id,
    comment: commentId,
  });

  if (existingLike) {
    await Comment.findByIdAndUpdate(commentId, { $inc: { likeCount: -1 } });
    return res
      .status(200)
      .json(new ApiResponse(200, "Comment unliked successfully"));
  }

  const like = await Like.create({
    owner: req.user._id,
    comment: commentId,
  });

  await Comment.findByIdAndUpdate(commentId, { $inc: { likeCount: 1 } });
  return res
    .status(200)
    .json(new ApiResponse(200, "Comment liked successfully", like));
});


const toggleTweetLike = asyncHandler(async (req, res) => {
  const { tweetId } = req.params;
  //TODO: toggle like on tweet

  if (!isValidObjectId(tweetId)) {
    throw new ApiError(400, "Invalid tweet id");
  }

  const tweet = await Tweet.findById(tweetId);
  if (!tweet) {
    throw new ApiError(404, "Tweet not found");
  }

  const existingLike = await Like.findOneAndDelete({
    owner: req.user._id,
    tweet: tweetId,
  });

  if (existingLike) {
    await Tweet.findByIdAndUpdate(tweetId, { $inc: { likeCount: -1 } });
    return res
      .status(200)
      .json(new ApiResponse(200, "Tweet unliked successfully"));
  }

  const like = await Like.create({
    owner: req.user._id,
    tweet: tweetId,
  });

  await Tweet.findByIdAndUpdate(tweetId, { $inc: { likeCount: 1 } });
  return res
    .status(200)
    .json(new ApiResponse(200, "Tweet liked successfully", like));

});

const getLikedVideos = asyncHandler(async (req, res) => {
  //TODO: get all liked videos
  const likedVideos = await Like.find({
    likedby: req.user._id,
    video: { $ne: null }, // Ensures only video likes are fetched
  }).populate("video", "title thumbnail");

return res.status(200).json(new ApiResponse(200, "OK", likedVideos));

});

export { toggleCommentLike, toggleTweetLike, toggleVideoLike, getLikedVideos };
