import { User } from "./user";

export interface FetchIssuesRequest {
  owner: string;
  repo: string;
  page: number;
  per_page: number;
}

export interface FetchIssuesResponse {
  issues: Issue[];
  page: number;
}

export interface Issue {
  id: number;
  number: number;
  title: string;
  body: string;
  state: string;
  created_at: string;
  updated_at: string;
  closed_at: string;
  user: User;
  html_url: string;
}
