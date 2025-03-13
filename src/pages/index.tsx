import { GetServerSideProps } from "next";
import { useState, useRef } from "react";
import { fetchIssues } from "@/services/api";
import { Issue } from "@/types/issue";
import { FilterBar, IssueList, Loader, Pagination } from "@/components";
import { PageInfo } from "@/types/api";
import { useQuery } from "@tanstack/react-query";

interface HomePageProps {
  initialIssues: Issue[];
  initialError: string | null;
  initialTotalPages: number;
  initialPageInfo: PageInfo;
  initialReachedLimit: boolean;
}

const HomePage: React.FC<HomePageProps> = ({
  initialIssues,
  initialTotalPages,
  initialPageInfo,
  initialReachedLimit,
}) => {
  const [filter, setFilter] = useState({ query: "", status: "all" });
  const [currentPage, setCurrentPage] = useState(1);
  const pageCursorsRef = useRef<{ [page: number]: string | null }>({ 1: null });

  const { data, error, isLoading, isFetching } = useQuery({
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
  });

  if (error) {
    return (
      <div>
        <p style={{ color: "red", fontWeight: "bold" }}>{error.message}</p>
      </div>
    );
  }
  if (isLoading || isFetching) {
    return <Loader />;
  }

  return (
    <div>
      <FilterBar
        onSearch={(query, status) => {
          setFilter({ query, status });
          setCurrentPage(1);
        }}
        filter={filter}
      />
      <IssueList
        issues={data?.issues || []}
        reachedLimit={data?.reachedLimit}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={data?.totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
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
};

export default HomePage;
