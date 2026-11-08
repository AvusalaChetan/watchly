import express from "express";
import {
  authenticated,
  authenticatedAdmin,
} from "../../middleware/auth.middleware.js";
import {
  deleteVideo,
  getVideoById,
  updateVideo,
  uploadVideo,
  videoList,
} from "../../controllers/video/video.controller.js";
import {uploads} from "../../middleware/upload.middleware.js";
import {videoUploadValidator} from "../../validator/video/video.validator.js";

const router = express.Router();

router.use(authenticated);

router.post(
  "/",
  authenticatedAdmin,
  uploads.fields([
    {name: "video", maxCount: 1},
    {name: "thumbnail", maxCount: 1},
  ]),
  videoUploadValidator,
  uploadVideo,
);

router.get("/", videoList);
router.get("/:id", getVideoById);

router.patch("/:id",authenticatedAdmin, updateVideo);
router.delete("/:id",authenticatedAdmin, deleteVideo);

export default router;
