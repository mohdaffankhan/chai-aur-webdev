import mongoose, { isValidObjectId } from "mongoose";
import { User } from "../models/user.models.js";
import { Subscription } from "../models/subscription.models.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const toggleSubscription = asyncHandler(async (req, res) => {
  const { channelId } = req.params;
  // TODO: toggle subscription
  if (!isValidObjectId(channelId)) {
    throw new ApiError(400, "Invalid channel id");
  }

  const user = await User.findById(req.user._id);

  if (channelId == user._id) {
    throw new ApiError(400, "You cannot subscribe to yourself");
  }

  const existingSubscription = await Subscription.findOne({
    subscriber: user._id,
    channel: channelId,
  });

  if (existingSubscription) {
    await Subscription.findByIdAndDelete(existingSubscription._id);

    return res
      .status(200)
      .json(new ApiResponse(200, "Unsubscribed successfully"));
  } else {
    await Subscription.create({
      subscriber: user._id,
      channel: channelId,
    });
  }

  return res.status(200).json(new ApiResponse(200, "Subscribed successfully"));
});

// controller to return list of users who subscribed to this channel
const getUserChannelSubscribers = asyncHandler(async (req, res) => {
  const { channelId } = req.params;

  if (!isValidObjectId(channelId)) {
    throw new ApiError(400, "Invalid channel id");
  }

  const channel = await User.findById(channelId);
  if (!channel) {
    throw new ApiError(404, "Channel not found");
  }

  const subscribers = await Subscription.find({ channel: channelId }).populate(
    "subscriber",
    "username email"
  );

  if (subscribers.length === 0) {
    throw new ApiError(404, "Subscribers not found");
  }

  return res.status(200).json(new ApiResponse(200, "OK", subscribers));
});

// controller to return channel list to which user has subscribed
const getSubscribedChannels = asyncHandler(async (req, res) => {
  const { subscriberId } = req.params;

  if (!isValidObjectId(subscriberId)) {
    throw new ApiError(400, "Invalid subscriber id");
  }

  const subscriber = await User.findById(subscriberId);
  if (!subscriber) {
    throw new ApiError(404, "Subscriber not found");
  }

  const subscribedChannels = await Subscription.find({
    subscriber: subscriberId,
  }).populate("channel", "username email"); // Populate the channel field

  if (subscribedChannels.length === 0) {
    throw new ApiError(404, "Channels not found");
  }

  return res.status(200).json(new ApiResponse(200, "OK", subscribedChannels));    
});

export { toggleSubscription, getUserChannelSubscribers, getSubscribedChannels };
