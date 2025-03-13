import { Issue } from "@/types/issue";

export interface IssueListProps {
  issues: Issue[];
  reachedLimit?: boolean;
}
