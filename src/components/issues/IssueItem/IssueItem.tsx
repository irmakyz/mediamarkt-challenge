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
    <IssueContainer>
      <IssueStatus>
        {state === "OPEN" ? (
          <IssueOpenedIcon size={16} fill='green' />
        ) : (
          <IssueClosedIcon size={16} fill='red' />
        )}
      </IssueStatus>
      <IssueHeader>
        <Link href={`/issue/${issueNumber}`} passHref>
          <IssueTitle>{title}</IssueTitle>
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
        <CommentIcon size={16} />
        {commentsCount}
      </Comments>
    </IssueContainer>
  );
};

export default IssueItem;
