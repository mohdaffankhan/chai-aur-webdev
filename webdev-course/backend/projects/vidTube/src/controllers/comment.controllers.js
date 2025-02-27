import mongoose, { isValidObjectId } from "mongoose";
import { Comment } from "../models/comment.models.js";
import { Video } from "../models/video.models.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const getVideoComments = asyncHandler(async (req, res) => {
  //TODO: get all comments for a video
  const { videoId } = req.params;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  if (!isValidObjectId(videoId)) {
    throw new ApiError(400, "Invalid video id");
  }

  const comments = await Comment.find({ video: videoId })
    .populate("commentedby", "username avatar") // Fetch user details
    .sort({ createdAt: -1 }) // Sort newest first
    .skip((page - 1) * limit)
    .limit(limit);

  return res
    .status(200)
    .json(new ApiResponse(200, "Comments fetched successfully", comments));
});

const addComment = asyncHandler(async (req, res) => {
  // TODO: add a comment to a video
  const { videoId } = req.params;
  const { content } = req.body;

  if (!content || !content.trim()) {
    throw new ApiError(400, "Comment content cannot be empty");
  }

  const video = await Video.findById(videoId);
  if (!video) {
    throw new ApiError(404, "Video not found");
  }

  const comment = await Comment.create({
    commentedby: req.user._id,
    video: videoId,
    content: content.trim(), // Clean up extra spaces
  });

  // Increment comment count on the video
  await Video.findByIdAndUpdate(videoId, { $inc: { commentCount: 1 } });

  // Populate user details before sending response
  const populatedComment = await comment.populate(
    "commentedby",
    "username avatar"
  );

  return res
    .status(201)
    .json(
      new ApiResponse(201, "Comment created successfully", populatedComment)
    );
});

const updateComment = asyncHandler(async (req, res) => {
  // TODO: update a comment
  const { commentId } = req.params;
  const { content } = req.body;

  if (!isValidObjectId(commentId)) {
    throw new ApiError(400, "Invalid comment id");
  }

  if (!content || !content.trim()) {
    throw new ApiError(400, "Comment content cannot be empty");
  }

  const comment = await Comment.findById(commentId);
  if (!comment) {
    throw new ApiError(404, "Comment not found");
  }

  if (comment.commentedby.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not authorized to update this comment");
  }

  // Trim content and check if it has changed
  const trimmedContent = content.trim();
  if (comment.content === trimmedContent) {
    return res
      .status(200)
      .json(new ApiResponse(200, "No changes made", comment));
  }

  comment.content = trimmedContent;
  await comment.save();

  return res
    .status(200)
    .json(new ApiResponse(200, "Comment updated successfully", comment));
});

const deleteComment = asyncHandler(async (req, res) => {
  // TODO: delete a comment
  const { commentId } = req.params;

  if (!isValidObjectId(commentId)) {
    throw new ApiError(400, "Invalid comment id");
  }

  const comment = await Comment.findById(commentId);
  if (!comment) {
    throw new ApiError(404, "Comment not found");
  }

  // Authorization check: Ensure user owns the comment
  if (comment.commentedby.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not authorized to delete this comment");
  }
  // Delete the comment properly
  await comment.deleteOne();

  // Decrement comment count, ensuring it doesn't go below zero
  await Video.findByIdAndUpdate(
    comment.video,
    {
      $inc: { commentCount: -1 },
    },
    { new: true }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, "Comment deleted successfully"));
});

export { getVideoComments, addComment, updateComment, deleteComment };
