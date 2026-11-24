const GENRES = [
  "action",
  "comedy",
  "drama",
  "horror",
  "romance",
  "thriller",
  "sci-fi",
  "documentary"
] ;

 type Genre = (typeof GENRES)[number];

export {GENRES};
export type {Genre};

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



export type FormDataTypes = {
  title: string;
  description: string;
  genre: Genre[];
  video: FileList;
  thumbnail: FileList;
};


