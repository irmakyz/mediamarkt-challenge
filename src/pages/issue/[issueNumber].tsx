import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchIssueAndComments } from "@/services/api";
import { Button, DetailItem } from "@/components";
import {
  DetailContainer,
  IssueTitle,
  CommentsContainer,
} from "@/styles/DetailPage.style";
import { PageInfo } from "@/types/api";
import { Issue } from "@/types/issue";
import { Comment } from "@/types/comment";
import { GetServerSideProps } from "next";
import { useState } from "react";

interface IssueDetailProps {
  issueNumber: number;
  initialIssue: Issue;
  initialComments: Comment[];
  initialLastComments?: Comment[];
  initialPageInfo: PageInfo;
  initialHasMorePages: boolean;
  beforeCursor: string;
}

const DetailPage: React.FC<IssueDetailProps> = ({
  issueNumber,
  initialIssue,
  initialComments,
  initialLastComments,
  initialPageInfo,
  initialHasMorePages,
  beforeCursor,
}) => {
  const [hasMorePages, setHasMorePages] = useState(initialHasMorePages);

  const { data, fetchNextPage, isFetchingNextPage, error } = useInfiniteQuery({
    queryKey: ["comments", issueNumber],
    queryFn: async ({ pageParam }) => {
      const response = await fetchIssueAndComments(
        issueNumber,
        false,
        12,
        pageParam,
        beforeCursor
      );
      setHasMorePages(response?.hasMorePages);
      return response;
    },
    initialPageParam: initialPageInfo?.endCursor,
    getNextPageParam: (currentPage) =>
      hasMorePages ? currentPage.pageInfo?.endCursor : null,
    getPreviousPageParam: (firstPage) =>
      firstPage.pageInfo?.hasPreviousPage ? firstPage.beforeCursor : null,
    initialData: {
      pages: [
        {
          comments: initialComments,
          lastComments: initialLastComments,
          pageInfo: initialPageInfo,
          issue: initialIssue,
          hasMorePages: initialHasMorePages,
          beforeCursor,
        },
      ],
      pageParams: [initialPageInfo?.endCursor],
    },
    staleTime: 1000 * 60 * 5,
  });

  if (error) return <p style={{ color: "red" }}>{error.message}</p>;

  const issue = data?.pages[0]?.issue || initialIssue;

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
        {data?.pages.map((page) =>
          page.comments.map((comment) => (
            <DetailItem key={comment.id} {...comment} />
          ))
        )}

        {!!hasMorePages && (
          <Button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
            {isFetchingNextPage ? "Loading..." : "Load More"}
          </Button>
        )}

        {initialLastComments?.map((comment) => (
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
    pageInfo: initialPageInfo,
    issue,
    hasMorePages: initialHasMorePages,
    beforeCursor,
  } = await fetchIssueAndComments(issueNumber, true, 12);

  return {
    props: {
      issueNumber,
      initialIssue: issue,
      initialComments: comments,
      initialLastComments: lastComments,
      initialPageInfo,
      initialHasMorePages,
      beforeCursor,
    },
  };
};

export default DetailPage;
