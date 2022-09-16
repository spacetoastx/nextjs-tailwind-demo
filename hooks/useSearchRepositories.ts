import { useQuery } from "@tanstack/react-query";
import {
  SearchRepositoriesRequest,
  SearchRepositoriesResponse,
} from "../entities/repositories";

const searchRepositories = async (request: SearchRepositoriesRequest) => {
  const query = Object.entries(request)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  const response = await fetch(`/api/search/repositories?${query}`);
  const data = await response.json();
  return data;
};

export const useSearchRepositories = (request: SearchRepositoriesRequest) =>
  useQuery<SearchRepositoriesResponse>(
    ["searchRepositories", request],
    () => searchRepositories(request),
    { enabled: Boolean(request.query) }
  );
