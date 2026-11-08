import videoModel, {type IVideo} from "../../models/video.model.js";
import { deleteFromCloudinary } from "../../services/delete.service.js";
import {uploadToCloudinary} from "../../services/upload.services.js";
import {tryCatch} from "../../utils/tryCatch.js";
import type {Request, Response} from "express";

const uploadVideo = tryCatch(async (req: Request, res: Response) => {
  const {title, description, genre} = req.body;
  const files = req.files as {[field: string]: Express.Multer.File[]};

  const videoFile: Express.Multer.File | undefined = files.video?.[0];
  const thumbnailFile = files.thumbnail?.[0];
  
  if (!videoFile || !thumbnailFile) {
    return res.status(400).json({message: "Video and thumbnail are required"});
  }
  
  const [videoRes, thumbRes] = await Promise.all([
    uploadToCloudinary(videoFile.path, "video", "streaming-app/videos"),
    uploadToCloudinary(thumbnailFile.path, "image", "streaming-app/thumbnails"),
  ]);
  console.log("videoRes", videoRes);
 
  const video = await videoModel.create({
    title,
    description,
    genre,
    videoUrl: videoRes?.secure_url,
    thumbnailUrl: thumbRes?.secure_url,
    duration: Math.round(videoRes.duration),
    thumbnailPublicId: thumbRes?.public_id,
    videoPublicId: videoRes?.public_id,
  });

  res.status(201).json({
    message: "succussfully uploaded",
    success: true,
    data: {
      video,
    },
  });
});

const videoList = tryCatch(async (req: Request, res: Response) => {
  const limit = Number(req.query.limit) || 10;
  const cursor = req.query.cursor as string | undefined;

  const filter: any = {};
  if (cursor) filter._id = {$lt: cursor};

  const videos = await videoModel
    .find(filter)
    .sort({_id: -1})
    .limit(limit + 1);

  if (!videos)
    return res.status(404).json({
      message: "there are no videos",
      sccess: false,
    });

  const hasMore = videos.length > limit;
  if (hasMore) videos.pop();

  res.status(200).json({
    message: "successfully sended videos",
    success: true,
    data: {
      videos,
      nextCursor: hasMore ? (videos[videos.length - 1]?._id ?? null) : null,
      limit: videos.length,
    },
  });
});

const getVideoById = tryCatch(async (req: Request, res: Response) => {
  const {id} = req.params;

  if (!id) {
    return res.status(400).json({
      message: " video id is required",
      success: false,
    });
  }

  const video = await videoModel.findById(id);

  if (!video) {
    return res.status(404).json({
      message: "video is not found with that id ",
      success: false,
    });
  }

  res.status(200).json({
    message: "successfully sended video",
    success: true,
    data: {
      video,
    },
  });
});

const updateVideo = tryCatch(async (req: Request, res: Response) => {
  const {id} = req.params;
  if (!id) {
    return res.status(400).json({
      message: " video id is required",
      success: false,
    });
  }
  const {title, description, genre} = req.body;

  const video = await videoModel.findByIdAndUpdate(
    id,
    {title, description, genre},
    {returnDocument: "after"},
  );

  if (!video) {
    return res.status(404).json({
      message: "video is not found with that id ",
      success: false,
    });
  }

  res.status(200).json({
    message: "successfully updated video",
    success: true,
    data: {
      video,
    },
  });
});

const deleteVideo = tryCatch(async (req: Request, res: Response) => {
  const {id} = req.params;
  if (!id) {
    return res.status(400).json({
      message: " video id is required",
      success: false,
    });
  }
  const video = await videoModel.findById(id);

  
  if (!video) {
    return res.status(404).json({
      message: "video is not found with that id ",
      success: false,
    });
  }
  await deleteFromCloudinary(video?.videoPublicId,'video')
  await deleteFromCloudinary(video?.thumbnailPublicId,'image')

  await videoModel.findByIdAndDelete(id);

  return res.status(200).json({
    message: `successfully deleted video ${video.title} ${video._id}`,
    success: true,
  });
});

export {uploadVideo, videoList, getVideoById, updateVideo, deleteVideo};
