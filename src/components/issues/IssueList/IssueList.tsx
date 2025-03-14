import React from "react";
import { IssueItem, WarningToaster } from "@/components";
import { ListContainer, NoIssueContainer } from "./IssueList.styles";
import { IssueListProps } from "./types";

const IssueList: React.FC<IssueListProps> = ({ issues, reachedLimit }) => {
  return (
    <ListContainer>
      {!issues.length && (
        <NoIssueContainer>
          <strong>No Results Found</strong>
          <p>Try adjusting your search filters.</p>
        </NoIssueContainer>
      )}
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
