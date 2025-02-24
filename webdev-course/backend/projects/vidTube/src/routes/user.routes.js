import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  /////////////////////////
  changePassword,
  getCurrentUserDetails,
  updateAccountDetails,
  updateAvatar,
  updateCoverImage,
  /////////////////////////
  getUserChannelProfile,
  getWatchHistory,
} from "../controllers/user.controllers.js";
import { upload } from "../middlewares/multer.middlewares.mjs";
import { authMiddleware } from "../middlewares/auth.middlewares.js";

const router = Router();

// Public routes
router.route("/register").post(
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  registerUser
);

router.route("/login").post(loginUser);
router.route("/refresh-token").post(refreshAccessToken);

// Protected routes (require authentication)
// we need to add the authMiddleware before executing the controllers, to check if the user is authenticated
router.route("/logout").post(authMiddleware, logoutUser);
router.route("/change-password").post(authMiddleware, changePassword);
router.route("/me").get(authMiddleware, getCurrentUserDetails);
router.route("/update-me").put(authMiddleware, updateAccountDetails);
router
  .route("/update-avatar")
  .patch(authMiddleware, upload.single("avatar"), updateAvatar);
router
  .route("/update-cover-image")
  .put(authMiddleware, upload.single("coverImage"), updateCoverImage);

router
  .route("/get-channel-profile/:username")
  .get(authMiddleware, getUserChannelProfile);
router.route("/history").get(authMiddleware, getWatchHistory);

export default router;