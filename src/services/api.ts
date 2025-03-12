import axios from "axios";
import { IssueItemResponse, IssueResponse } from "@/types/api";
import { Label, Issue } from "@/types/issue";

const GITHUB_API_URL = "https://api.github.com/search/issues";

export const fetchIssues = async (
  query: string = "",
  status: string = "all",
  page: number = 1,
  perPage: number = 25
): Promise<{ issues: Issue[]; error: string | null; totalPages: number }> => {
  try {
    console.log("query");
    const repo = "facebook/react";
    const stateFilter = status === "all" ? "" : `+state:${status}`;
    const searchQuery =
      query !== ""
        ? `${encodeURIComponent(query)}+repo:${repo}${stateFilter}`
        : `repo:${repo}${stateFilter}`;

    const apiUrl = `${GITHUB_API_URL}?q=${searchQuery}&per_page=${perPage}&page=${page}`;
    console.log("apiurl", apiUrl);
    const response = await axios.get<IssueResponse>(apiUrl);
    console.log("RESPONSE", response);
    const totalCount = response?.data.total_count;
    const totalPages = Math.ceil(totalCount / perPage);

    const issues = response?.data?.items.map((issue: IssueItemResponse) => ({
      id: issue.number,
      title: issue.title,
      state: issue.state.toUpperCase(),
      url: issue.html_url,
      labels: issue.labels.map((label: Label) => ({
        name: label.name,
        color: label.color,
      })),
      comments: issue.comments,
      author: issue.user.login,
      createdAt: issue.created_at,
    }));

    return { issues, error: null, totalPages };
  } catch (error) {
    console.error("Error fetching issues:", error);
    const errorMessage = "Failed to fetch issues from GitHub API";
    return { issues: [], error: errorMessage, totalPages: 0 };
  }
};
