import { Router } from "express";
import { registerUser, loginUser } from "../controllers/user.controllers.js";
import { upload } from "../middlewares/multer.middlewares.mjs";

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

export default router;
