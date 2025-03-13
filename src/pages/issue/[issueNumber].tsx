import { GetServerSideProps } from "next";
import { useState } from "react";
import { fetchIssueAndComments } from "@/services/api";
import { Button, DetailItem } from "@/components";
import { Comment } from "@/types/comment";
import {
  DetailContainer,
  IssueTitle,
  CommentsContainer,
} from "@/styles/DetailPage.style";
import { PageInfo } from "@/types/api";
import { Issue } from "@/types/issue";

interface IssueDetailProps {
  firstComments: Comment[];
  lastComments?: Comment[];
  initialError?: string;
  initialHasMorePages: boolean;
  beforeCursor: string;
  issueNumber: number;
  initialPageInfo: PageInfo;
  issue: Issue;
}

const DetailPage: React.FC<IssueDetailProps> = ({
  firstComments,
  lastComments,
  initialError,
  initialHasMorePages,
  beforeCursor,
  initialPageInfo,
  issueNumber,
  issue,
}) => {
  const [middleComments, setMiddleComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(initialError || null);
  const [pageInfo, setPageInfo] = useState<PageInfo | null>(initialPageInfo);
  const [hasMorePages, setHasMorePages] =
    useState<boolean>(initialHasMorePages);

  const loadMoreComments = async () => {
    if (issue) setLoading(true);
    try {
      const {
        comments,
        pageInfo: newPageInfo,
        hasMorePages: newHasMorePages,
      } = await fetchIssueAndComments(
        issueNumber,
        false,
        12,
        pageInfo?.endCursor,
        beforeCursor
      );
      setMiddleComments((prev) => [...prev, ...comments]);
      setPageInfo(newPageInfo);
      setHasMorePages(newHasMorePages);
    } catch {
      setError("Failed to load more comments.");
    }
    setLoading(false);
  };

  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <DetailContainer>
      <IssueTitle>
        {issue.title} #{issue.issueNumber}
      </IssueTitle>
      <DetailItem
        author={issue.author}
        avatarUrl={issue.avatarUrl}
        bodyHTML={issue.bodyHTML}
        createdAt={issue.createdAt}
      />
      <CommentsContainer>
        {firstComments.map((comment) => (
          <DetailItem key={comment.id} {...comment} />
        ))}

        {middleComments.map((comment) => (
          <DetailItem key={comment.id} {...comment} />
        ))}

        {hasMorePages && (
          <Button onClick={loadMoreComments} disabled={loading}>
            {loading ? "Loading..." : "Load More"}
          </Button>
        )}

        {lastComments?.map((comment) => (
          <DetailItem key={comment.id} {...comment} />
        ))}
      </CommentsContainer>
    </DetailContainer>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const issueNumber = Number(query?.issueNumber);
  const {
    comments,
    lastComments,
    error: initialError,
    hasMorePages: initialHasMorePages,
    beforeCursor,
    pageInfo: initialPageInfo,
    issue,
  } = await fetchIssueAndComments(issueNumber, true, 12);
  return {
    props: {
      firstComments: comments,
      lastComments,
      initialError,
      initialHasMorePages,
      beforeCursor,
      issueNumber,
      initialPageInfo,
      issue,
    },
  };
};

export default DetailPage;
