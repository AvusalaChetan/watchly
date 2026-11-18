import {useQuery} from "@tanstack/react-query";
import {api} from "../../config/axiosInstance";
import type {Video} from "../../feature/videos/types/video.types";

type SearchResponse = {
  result: Video[];
};

export const useSearch = ({debounceVal}: {debounceVal: string}) => {
  const {data, isLoading, error} = useQuery({
    queryKey: ["search", debounceVal],
    queryFn: async () => {
      const res = await api.get<{data: SearchResponse}>("/videos/search", {
        params: {search: debounceVal},
      });
      return res.data.data;
    },
    enabled: !!debounceVal.trim(),
  });

  return {data, isLoading, error};
};
