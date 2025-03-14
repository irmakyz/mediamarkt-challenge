import { render, screen } from "../../jest.setup";
import "@testing-library/jest-dom";
import { IssueItem } from "@/components";
import { IssueItemProps } from "@/components/issues/IssueItem/types";
import { formatDate } from "@/utils/formatDate";

describe("IssueItem Component", () => {
  const mockIssue: IssueItemProps = {
    issueNumber: 123,
    title: "Sample Issue",
    state: "OPEN",
    commentsCount: 5,
    author: "testUser",
    createdAt: "2024-03-15T12:00:00Z",
  };

  test("renders issue title and link", () => {
    render(<IssueItem {...mockIssue} />);

    const titleElement = screen.getByText(mockIssue.title);
    jestExpect(titleElement).toBeInTheDocument();
    const linkElement = screen.getByRole("link", {
      name: mockIssue.title,
    });

    jestExpect(linkElement).toBeInTheDocument();
    jestExpect(linkElement).toHaveAttribute(
      "href",
      `/issue/${mockIssue.issueNumber}`
    );
  });

  test("renders issue state icon correctly", () => {
    render(<IssueItem {...mockIssue} />);

    jestExpect(screen.getByTestId("issue-status-open-icon")).toBeInTheDocument();
  });

  test("renders issue details correctly", () => {
    render(<IssueItem {...mockIssue} />);

    const issueDetails = screen.getByText(
      `#${mockIssue.issueNumber} opened by ${mockIssue.author} on ${formatDate(
        mockIssue.createdAt
      )}`
    );
    jestExpect(issueDetails).toBeInTheDocument();
  });

  test("renders comments count", () => {
    render(<IssueItem {...mockIssue} />);

    jestExpect(screen.getByText(5)).toBeInTheDocument();
  });
});
