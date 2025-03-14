import {
  CommentResponse,
  IssueItemResponse,
  IssueResponse,
  PageInfo,
} from "@/types/api";
import { Issue } from "@/types/issue";
import { Comment } from "@/types/comment";
import { GET_ISSUE_AND_COMMENTS, GET_ISSUES } from "./queries";
import client from "./apollo-client";

const MAX_ISSUES = 1000;
const REPO = "facebook/react";

export const fetchIssues = async (
  query: string = "",
  state: string = "all",
  perPage: number = 25,
  afterCursor: string | null = null
): Promise<{
  issues: Issue[];
  totalPages: number;
  reachedLimit: boolean;
  pageInfo: PageInfo | null;
}> => {
  try {
    const stateFilter = state === "all" ? "" : `state:${state}`;
    const searchQuery =
      query !== ""
        ? `${query} repo:${REPO} is:issue`
        : `repo:${REPO} is:issue`;
    const filterQuery =
      stateFilter !== "" ? `${searchQuery} ${stateFilter}` : searchQuery;

    const { data } = await client.query<IssueResponse>({
      query: GET_ISSUES,
      variables: {
        query: filterQuery,
        first: perPage,
        after: afterCursor,
      },
      fetchPolicy: "network-only",
    });
    const issues = data?.search?.nodes
      .filter((issue: IssueItemResponse) => issue.author && issue.bodyHTML)
      .map((issue: IssueItemResponse) => ({
        issueNumber: issue.number,
        commentsCount: issue.comments.totalCount,
        title: issue.title,
        state: issue.state,
        author: issue.author!.login,
        createdAt: issue.createdAt,
        avatarUrl: issue.author!.avatarUrl,
      }));
    const totalCount = Math.min(data?.search?.issueCount, MAX_ISSUES);
    const totalPages = Math.ceil(totalCount / perPage);
    const reachedLimit =
      totalCount >= MAX_ISSUES && !data.search.pageInfo.hasNextPage;
    const pageInfo = data?.search?.pageInfo;

    return { issues, totalPages, pageInfo, reachedLimit };
  } catch (error) {
    console.error("Error fetching issues:", error);
    throw new Error("Failed to fetch issues. Please try again.");
  }
};

export const fetchIssueAndComments = async (
  issueNumber: number,
  firstLoad: boolean,
  first: number = 12,
  afterCursor: string | null = null,
  beforeCursor: string | null = null
): Promise<{
  comments: Comment[];
  lastComments?: Comment[];
  issue: Issue | null;
  hasMorePages: boolean;
  beforeCursor: string | null;
  pageInfo: PageInfo | null;
}> => {
  try {
    const { data } = await client.query({
      query: GET_ISSUE_AND_COMMENTS,
      variables: {
        issueNumber: issueNumber,
        first: firstLoad ? first / 2 : first,
        afterCursor,
        beforeCursor: firstLoad ? undefined : beforeCursor,
      },
      fetchPolicy: "network-only",
    });

    const issueResponse = data.repository.issue;
    const comments = issueResponse.comments.nodes
      .filter((comment: CommentResponse) => comment.author && comment.bodyHTML)
      .map((comment: CommentResponse) => ({
        id: comment.id,
        bodyHTML: comment.bodyHTML,
        author: comment.author!.login,
        avatarUrl: comment.author!.avatarUrl,
        createdAt: comment.createdAt,
      }));

    const issue = {
      title: issueResponse.title,
      state: issueResponse.state,
      author: issueResponse.author!.login || null,
      avatarUrl: issueResponse.author!.avatarUrl || null,
      createdAt: issueResponse.createdAt,
      bodyHTML: issueResponse.bodyHTML,
      issueNumber: issueNumber,
    };
    const pageInfo = issueResponse.comments.pageInfo;
    const totalCount = issueResponse.comments.totalCount;
    const hasMorePages =
      issueResponse.comments.nodes.length && pageInfo.hasNextPage;

    if (firstLoad && totalCount > first) {
      const lastResponse = await client.query({
        query: GET_ISSUE_AND_COMMENTS,
        variables: {
          issueNumber,
          last: totalCount < first ? totalCount - first / 2 : first / 2,
        },
      });

      const lastComments = lastResponse.data.repository.issue.comments.nodes
        .filter(
          (comment: CommentResponse) => comment.author && comment.bodyHTML
        )
        .map((comment: CommentResponse) => ({
          id: comment.id,
          bodyHTML: comment.bodyHTML,
          author: comment.author!.login,
          avatarUrl: comment.author!.avatarUrl,
          createdAt: comment.createdAt,
        }));

      const initialBeforeCursor =
        lastResponse.data.repository.issue.comments.pageInfo.startCursor;

      return {
        comments,
        lastComments,
        hasMorePages,
        beforeCursor: initialBeforeCursor,
        pageInfo,
        issue,
      };
    }

    return {
      pageInfo,
      comments,
      lastComments: [],
      beforeCursor: null,
      hasMorePages,
      issue,
    };
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw new Error("Failed to fetch details. Please try again.");
  }
};
