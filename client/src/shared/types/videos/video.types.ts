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

export type Video = {
  _id: string;
  title: string;
  description: string;
  genre?: Genre[];
  thumbnailUrl: string;
  videoUrl: string;
  duration: number; 
  thumbnailPublicId: string;
  videoPublicId: string;
  createdAt: string;  
  updatedAt: string;
 };

export type VideoListResponse = {
  videos: Video[];
  nextCursor: string | null;
};