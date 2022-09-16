import { User } from "./user";

export interface SearchRepositoriesRequest {
  query: string;
  page: number;
  per_page: number;
}

export interface SearchRepositoriesResponse {
  total_count: number;
  incomplete_results: boolean;
  items: Repository[];
}

export interface Repository {
  id: number;
  name: string;
  full_name: string;
  owner: User;
  description: string;
  open_issues_count: number;
}
