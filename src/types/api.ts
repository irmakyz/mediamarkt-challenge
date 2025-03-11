import { Label } from "./issue";

export interface IssueItemResponse {
  number: number;
  title: string;
  state: string;
  html_url: string;
  labels: Label[];
  comments: number;
  user: { login: string };
  created_at: string;
}
export interface IssueResponse {
  items: IssueItemResponse[];
}
