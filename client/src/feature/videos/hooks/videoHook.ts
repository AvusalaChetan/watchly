import type {InfiniteData} from "@tanstack/react-query";
import {useInfiniteQuery, useQuery} from "@tanstack/react-query";
import {isAxiosError} from "axios";
import {useState} from "react";
import {toast} from "react-toastify";
import {api} from "../../../config/axiosInstance";
import {queryClient} from "../../../main";
import type {FormDataTypes, Video} from "../types/video.types";

import type {VideoListResponse} from "../../videos/types/video.types";

export const useVideos = () => {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["videos"],
    queryFn: async ({pageParam}) =>
      (
        await api.get("/videos", {
          params: {cursor: pageParam, limit: 10},
        })
      ).data.data,
    initialPageParam: undefined as string | undefined,

    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
  });

  const videos: Video[] = data?.pages.flatMap((page) => page.videos) ?? [];

  return {
    videos,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
};

export const useVideo = (
  videoId?: string,
): {
  video: Video;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
} => {
  const {data, isLoading, isError, error} = useQuery({
    queryKey: ["video", videoId],
    enabled: !!videoId,
    retry: false,
    queryFn: async () => (await api.get(`/videos/${videoId}`)).data.data,
  });

  return {
    video: data?.video,
    isLoading,
    error,
    isError,
  };
};

export const useUploadVideo = () => {
  const upload = async (data: FormDataTypes) => {
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

  return {upload};
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

      queryClient.setQueryData<InfiniteData<VideoListResponse>>(
        ["videos"],
        (oldData) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            pages: oldData?.pages.map((page) => ({
              ...page,
              videos: page.videos.filter((video) => video._id !== id),
            })),
          };
        },
      );

      toast.success(res?.data?.message);
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data?.message);
      } else {
        toast.error((error as Error).message);
      }
    }
  };

  return {deleteVideo, isLoading, deletingVideoId};
};

export const useUpdateVideo = () => {
  const updateVideo = async (data: FormDataTypes, id: string) => {
    try {
      const res = await api.patch(`/videos/${id}`, data);
    
      return res?.data;
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data?.message);
      } else {
        toast.error((error as Error).message);
      }
    }
  };

  return {updateVideo};
};
