import {useInfiniteQuery, useQuery} from "@tanstack/react-query";
import {api} from "../../../config/axiosInstance";

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
        await api.get("/video", {
          params: {cursor: pageParam, limit: 10},
        })
      ).data.data,
    initialPageParam: undefined as string | undefined,

    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
  });

  const videos = data?.pages.flatMap((page) => page.videos) ?? [];

  return {
    videos,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
};

export const useVideo = (videoId?: string) => {
  const {data, isLoading, isError, error} = useQuery({
    queryKey: ["video", videoId],
    enabled: !!videoId,
    retry: false,
    queryFn: async () => (await api.get(`/video/${videoId}`)).data.data,
  });

  return {
    video: data?.video,
    isLoading,
    error,
    isError,
  };
};
