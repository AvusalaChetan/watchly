import type { InfiniteData } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { api } from "../../../config/axiosInstance";
import { queryClient } from "../../../main";
import type {
  UploadFormData,
  VideoListResponse
} from "../../../shared/types/videos/video.types";

export const useUpload = () => {
  const upload = async (data: UploadFormData) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    data.genre.forEach((g) => formData.append("genre", g));
    formData.append("video", data.video[0]);
    formData.append("thumbnail", data.thumbnail[0]);

    try {
      const res = await api.post("/videos", formData);
       return res.data;
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data?.message);
      } else {
        toast.error((error as Error).message);
      }
    }
  };

  return { upload };
};

export const useDeleteVideo = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [deletingVideoId, setDeletingVideoId] = useState<string | null>(null);
  const deleteVideo = async (id: string) => {
    setDeletingVideoId(id);
    try {
      setIsLoading(true);
      const res = await api.delete(`/videos/${id}`);
      setIsLoading(false);
      setDeletingVideoId(null);
      
      queryClient.setQueryData<InfiniteData<VideoListResponse>>(["videos"], (oldData) => {
        if (!oldData) return oldData;
        
        return {
          ...oldData,
          pages: oldData?.pages.map((page) => ({
            ...page,
            videos: page.videos.filter((video) => video._id !== id),
          })),
        };
      });
     
      toast.success(res?.data?.message);
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data?.message);
      } else {
        toast.error((error as Error).message);
      }
    }
  };

  return { deleteVideo, isLoading, deletingVideoId };
};
