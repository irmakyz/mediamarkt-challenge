import React from "react";
import Link from "next/link";
import {
  IssueOpenedIcon,
  IssueClosedIcon,
  CommentIcon,
} from "@primer/octicons-react";
import { IssueItemProps } from "./types";
import {
  Comments,
  IssueContainer,
  IssueDetail,
  IssueHeader,
  IssueStatus,
  IssueTitle,
} from "./IssueItem.styles";
import { formatDate } from "@/utils/formatDate";

const IssueItem: React.FC<IssueItemProps> = ({
  issueNumber,
  title,
  state,
  commentsCount,
  author,
  createdAt,
}) => {
  return (
    <IssueContainer
      data-testid='issue-item'
      aria-labelledby={`issue-${issueNumber}-title`}
    >
      <IssueStatus>
        {state === "OPEN" ? (
          <IssueOpenedIcon
            data-testid='issue-status-open-icon'
            size={16}
            fill='green'
            aria-label='Open issue'
          />
        ) : (
          <IssueClosedIcon size={16} fill='red' aria-label='Closed issue' />
        )}
      </IssueStatus>
      <IssueHeader>
        <Link href={`/issue/${issueNumber}`}>
          <IssueTitle id={issueNumber}>{title}</IssueTitle>
        </Link>
      </IssueHeader>
      <IssueDetail>
        <span>
          {author
            ? `#${issueNumber} opened by ${author} on ${formatDate(createdAt)}`
            : `#${issueNumber} opened on ${formatDate(createdAt)}`}
        </span>
      </IssueDetail>
      <Comments>
        <CommentIcon
          size={16}
          aria-label={`Number of comments`}
        />
        {commentsCount}
      </Comments>
    </IssueContainer>
  );
};

export default IssueItem;
