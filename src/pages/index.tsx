import { GetServerSideProps } from "next";
import { useState, useEffect } from "react";
import { fetchIssues } from "@/services/api";
import { Issue } from "@/types/issue";
import { FilterBar, IssueList, Loader, Pagination } from "@/components";

interface HomePageProps {
  initialIssues: Issue[];
  initialError?: string;
  initialTotalPages: number;
}

const HomePage: React.FC<HomePageProps> = ({
  initialIssues,
  initialError,
  initialTotalPages,
}) => {
  const [issues, setIssues] = useState<Issue[]>(initialIssues);
  const [filter, setFilter] = useState({ query: "", status: "all" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(initialError || null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(initialTotalPages);

  useEffect(() => {
    const searchIssues = async () => {
      setLoading(true);
      setError(null);
      try {
        const {
          issues: newIssues,
          error: fetchError,
          totalPages: newTotalPages,
        } = await fetchIssues(filter.query, filter.status, currentPage);
        if (fetchError) {
          setError(fetchError);
        } else {
          setIssues(newIssues);
          setTotalPages(newTotalPages);
        }
      } catch (error) {
        setError("An unexpected error occurred. Please try again.");
        console.error("Error fetching issues:", error);
      }
      setLoading(false);
    };
    searchIssues();
  }, [filter, currentPage]);

  if (error) {
    return (
      <div>
        <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>
      </div>
    );
  }
  if (loading) {
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
      <IssueList issues={issues} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const {
    issues: initialIssues,
    error: initialError,
    totalPages: initialTotalPages,
  } = await fetchIssues("", "all", 1);
  return { props: { initialIssues, initialError, initialTotalPages } };
};

export default HomePage;
