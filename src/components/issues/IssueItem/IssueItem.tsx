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
  id,
  title,
  state,
  url,
  comments,
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
        <Link href={url} passHref>
          <IssueTitle>{title}</IssueTitle>
        </Link>
      </IssueHeader>
      <IssueDetail>
        <span>
          #{id} opened by {author} on {formatDate(createdAt)}
        </span>
      </IssueDetail>
      <Comments>
        <CommentIcon size={16} />
        {comments}
      </Comments>
    </IssueContainer>
  );
};

export default IssueItem;
