import {useInfiniteQuery, useQuery} from "@tanstack/react-query";
import {api} from "../../../config/axiosInstance";
import type { Video } from "../../../shared/types/videos/video.types";
 
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
