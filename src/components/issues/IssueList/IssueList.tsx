import React from "react";
import { IssueItem } from "@/components";
import { ListContainer } from "./IssueList.styles";
import { IssueListProps } from "./types";

const IssueList: React.FC<IssueListProps> = ({ issues }) => {
  if (!issues.length) {
    return <p>No issues found.</p>;
  }

  return (
    <ListContainer>
      {issues.map((issue) => (
        <IssueItem key={issue.id} {...issue} />
      ))}
    </ListContainer>
  );
};

export default IssueList;
