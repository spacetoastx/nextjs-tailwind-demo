import { useInfiniteQuery } from "@tanstack/react-query";
import { FetchIssuesRequest, FetchIssuesResponse } from "../entities/issues";

const fetchIssues = async (request: FetchIssuesRequest) => {
  const query = Object.entries(request)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  const response = await fetch(`/api/repository/issues?${query}`);
  const data = await response.json();

  if (response.status !== 200) {
    throw new Error(data.message);
  }

  return {
    issues: data,
    page: request.page,
  } as FetchIssuesResponse;
};

export const useIssues = (request: FetchIssuesRequest) =>
  useInfiniteQuery<FetchIssuesResponse>(
    ["issues", `${request.owner}/${request.repo}`, request.page],
    () => fetchIssues(request),
    {
      getNextPageParam: (lastPage) =>
        lastPage.issues.length != request.per_page,
      retry: false,
    }
  );
