import { GetServerSideProps } from "next";
import { useState, useEffect } from "react";
import { fetchIssues } from "@/services/api";
import { Issue } from "@/types/issue";
import { FilterBar, IssueList } from "@/components";

interface HomePageProps {
  initialIssues: Issue[];
  initialError?: string;
}

const HomePage: React.FC<HomePageProps> = ({ initialIssues, initialError }) => {
  const [issues, setIssues] = useState<Issue[]>(initialIssues);
  const [filter, setFilter] = useState({ query: "", status: "all" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(initialError || null);

  useEffect(() => {
    const searchIssues = async () => {
      setLoading(true);
      setError(null);
      try {
        const { issues: newIssues, error: fetchError } = await fetchIssues(
          filter.query,
          filter.status,
          1
        );
        if (fetchError) {
          setError(fetchError);
        } else {
          setIssues(newIssues);
        }
      } catch (error) {
        setError("An unexpected error occurred. Please try again.");
        console.error("Error fetching issues:", error);
      }
      setLoading(false);
    };
    searchIssues();
  }, [filter]);

  if (error) {
    return (
      <div>
        <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>
      </div>
    );
  }
  if (loading) {
    return <div>{loading && <p>Loading...</p>}</div>;
  }
  return (
    <div>
      <FilterBar onSearch={(query, status) => setFilter({ query, status })} />
      <IssueList issues={issues} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const { issues: initialIssues, error: initialError } = await fetchIssues(
    "",
    "all",
    1
  );
  return { props: { initialIssues, initialError } };
};

export default HomePage;
