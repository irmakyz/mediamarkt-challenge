import React, { useCallback } from "react";
import { GetServerSideProps } from "next";
import { useState, useRef } from "react";
import { fetchIssues } from "@/services/api";
import { Issue } from "@/types/issue";
import {
  ErrorContainer,
  FilterBar,
  IssueList,
  Loader,
  Pagination,
  SEOHead,
} from "@/components";
import { PageInfo } from "@/types/api";
import { useQuery } from "@tanstack/react-query";
import { HomePageContainer } from "@/styles/HomePage.style";

interface HomePageProps {
  initialIssues: Issue[];
  initialError?: Error;
  initialTotalPages: number;
  initialPageInfo: PageInfo;
  initialReachedLimit: boolean;
}

const HomePage: React.FC<HomePageProps> = ({
  initialIssues,
  initialTotalPages,
  initialPageInfo,
  initialReachedLimit,
  initialError,
}) => {
  const [filter, setFilter] = useState({ query: "", status: "all" });
  const [currentPage, setCurrentPage] = useState(1);
  const pageCursorsRef = useRef<{ [page: number]: string | null }>({ 1: null });
  const [shouldFetch, setShouldFetch] = useState(false);

  const { data, error, isFetching } = useQuery({
    queryKey: ["issues", filter.query, filter.status, currentPage],
    queryFn: async () => {
      const afterCursor = pageCursorsRef.current[currentPage] || null;
      const result = await fetchIssues(
        filter.query,
        filter.status,
        25,
        afterCursor
      );

      if (
        result.pageInfo?.endCursor &&
        !pageCursorsRef.current[currentPage + 1]
      ) {
        pageCursorsRef.current[currentPage + 1] = result.pageInfo.endCursor;
      }
      return result;
    },
    initialData: {
      issues: initialIssues,
      pageInfo: initialPageInfo,
      totalPages: initialTotalPages,
      reachedLimit: initialReachedLimit,
    },
    placeholderData: (previousData) => previousData,
    enabled: shouldFetch,
  });

  const handleSearch = useCallback((query: string, status: string) => {
    setFilter({ query, status });
    setCurrentPage(1);
    setShouldFetch(true);
  }, []);

  if (initialError || error) {
    return (
      <ErrorContainer
        data-testid='error-container'
        message={error?.message || initialError?.message}
      />
    );
  }

  return (
    <>
      <SEOHead
        title='GitHub Issues Browser - React Repository'
        description='Browse, filter, and view issues from the React repository on GitHub.'
      />
      <HomePageContainer>
        <FilterBar onSearch={handleSearch} filter={filter} />
        {isFetching && <Loader />}
        {!isFetching && (
          <IssueList
            issues={data?.issues || []}
            reachedLimit={data?.reachedLimit}
          />
        )}
        <Pagination
          currentPage={currentPage}
          totalPages={data?.totalPages}
          onPageChange={(newPage) => {
            setCurrentPage(newPage);
            setShouldFetch(true);
          }}
        />
      </HomePageContainer>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const {
      issues: initialIssues,
      totalPages: initialTotalPages,
      pageInfo: initialPageInfo,
      reachedLimit: initialReachedLimit,
    } = await fetchIssues("", "all");

    return {
      props: {
        initialIssues,
        initialTotalPages,
        initialPageInfo,
        initialReachedLimit,
      },
    };
  } catch (error) {
    console.error("GitHub API Error:", error);

    return {
      props: {
        initialIssues: [],
        initialTotalPages: 0,
        initialPageInfo: null,
        initialReachedLimit: false,
        initialError: error,
      },
    };
  }
};

export default HomePage;
