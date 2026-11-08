import mongoose from "mongoose";

export const GENRES = [
  "action",
  "comedy",
  "drama",
  "horror",
  "romance",
  "thriller",
  "sci-fi",
] as const;

export type Genre = (typeof GENRES)[number];

export interface IVideo {
  title: string;
  description: string;
  genre: Genre[];
  thumbnailUrl: string;
  videoUrl: string;
  duration: number;
  thumbnailPublicId: string;
  videoPublicId: string;
}

const videoSchema = new mongoose.Schema<IVideo>(
  {
    title: {
      type: String,
      required: [true, "title is required"],
      index: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, "description is required"],
      minlength: 20,
      maxLength: 500,
      trim: true,
    },
    genre: {
      type: [{type: String, enum: GENRES}],
      required: true,
      index: true,
    },
    thumbnailUrl: {
      type: String,
      required: true,
    },
    thumbnailPublicId: {
      type: String,
      required: true,
    },
    videoUrl: {
      type: String,
      required: true,
    },
    videoPublicId: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
  },
  {timestamps: true},
);

const videoModel = mongoose.model("Video", videoSchema);

export default videoModel;
