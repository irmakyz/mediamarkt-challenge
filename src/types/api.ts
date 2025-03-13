export interface IssueItemResponse {
  number: number;
  title: string;
  state: string;
  comments: { totalCount: number };
  author: { login: string; avatarUrl: string };
  createdAt: string;
  bodyHTML?: string;
}
export interface PageInfo {
  endCursor: string | null;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string | null;
}

export interface IssueResponse {
  search: {
    nodes: IssueItemResponse[];
    pageInfo: PageInfo;
    issueCount: number;
  };
}
export interface CommentResponse {
  id: string;
  bodyHTML: string;
  createdAt: string;
  author: {
    login: string;
    avatarUrl: string;
  };
}
