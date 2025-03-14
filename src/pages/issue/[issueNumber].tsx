import React, { useCallback } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchIssueAndComments } from "@/services/api";
import { DetailItem, ErrorContainer } from "@/components";
import {
  DetailContainer,
  IssueTitle,
  CommentsContainer,
  LoadMoreButton,
  IssueState,
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
  initialError?: Error;
}

const DetailPage: React.FC<IssueDetailProps> = ({
  issueNumber,
  initialIssue,
  initialComments,
  initialLastComments,
  initialPageInfo,
  initialHasMorePages,
  beforeCursor,
  initialError,
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

  const issue = data?.pages[0]?.issue || initialIssue;

  const handleLoadMore = useCallback(() => {
    fetchNextPage();
  }, [fetchNextPage]);

  if (initialError || error) {
    return <ErrorContainer message={initialError?.message || error?.message} />;
  }
  return (
    <DetailContainer>
      <IssueTitle>
        {issue.title} #{issue.issueNumber}
      </IssueTitle>
      <IssueState state={issue.state}>
        {issue.state}
      </IssueState>
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
          <LoadMoreButton
            onClick={handleLoadMore}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? "Loading..." : "Load More"}
          </LoadMoreButton>
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

  try {
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
  } catch (error) {
    console.error("GitHub API Error:", error);

    return {
      props: {
        issueNumber,
        initialIssue: null,
        initialComments: [],
        initialLastComments: [],
        initialPageInfo: null,
        initialHasMorePages: false,
        beforeCursor: "",
        initialError: error,
      },
    };
  }
};

export default DetailPage;
