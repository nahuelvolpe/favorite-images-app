import {
  InfiniteData,
  UseInfiniteQueryResult,
  UseQueryResult,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { IImage } from "../utils/image.types";

const defaultRQOptions = {
  refetchOnWindowFocus: false,
  refetchOnMount: false,
  staleTime: 0,
};

export const useFetchImagesQuery = (): UseInfiniteQueryResult<
  InfiniteData<AxiosResponse<IImage[]>, unknown>,
  Error
> =>
  useInfiniteQuery({
    queryKey: ["images"],
    queryFn: async ({ pageParam }) => {
      return await axios.get(
        `https://picsum.photos/v2/list?page=${pageParam}&limit=12`
      );
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      if (lastPage.data.length === 1) {
        return undefined;
      }
      return lastPageParam + 1;
    },
    ...defaultRQOptions,
  });

export const useFetchImageDetailQuery = (
  id: string
): UseQueryResult<AxiosResponse<IImage>> =>
  useQuery({
    queryKey: ["imageDetail"],
    queryFn: async () => {
      return await axios.get(`https://picsum.photos/id/${id}/info`);
    },
    refetchOnWindowFocus: false,
    enabled: !!id,
  });

export const useFetchImageDownloadQuery = (
  imageUrl: string
): UseQueryResult<AxiosResponse<Blob>> =>
  useQuery({
    queryKey: ["imageDownload", { imageUrl }],
    queryFn: async () => {
      return await axios.get(imageUrl, {
        responseType: "blob",
      });
    },
    ...defaultRQOptions,
    enabled: !!imageUrl,
  });
