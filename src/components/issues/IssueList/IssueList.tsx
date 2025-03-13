import React from "react";
import { IssueItem, WarningToaster } from "@/components";
import { ListContainer } from "./IssueList.styles";
import { IssueListProps } from "./types";

const IssueList: React.FC<IssueListProps> = ({ issues, reachedLimit }) => {
  if (!issues.length) {
    return <p>No issues found.</p>;
  }

  return (
    <ListContainer>
      {issues.map((issue) => (
        <IssueItem key={issue.issueNumber} {...issue} />
      ))}
      {reachedLimit && (
        <WarningToaster>
          <span>
            Showing only the first 1000 issues. Refine your search to view more.
          </span>
        </WarningToaster>
      )}
    </ListContainer>
  );
};

export default IssueList;
