import { render, screen } from "../../jest.setup";
import IssueList from "@/components/issues/IssueList";
import { Issue } from "@/types/issue";

jest.mock("@/components", () => ({
  IssueItem: jest.fn(({ title }) => (
    <div data-testid='issue-item'>{title}</div>
  )),
  WarningToaster: jest.fn(({ children }) => (
    <div data-testid='warning-toaster'>{children}</div>
  )),
}));

describe("IssueList Component", () => {
  const mockIssues: Issue[] = [
    {
      issueNumber: 101,
      title: "First Issue",
      state: "OPEN",
      commentsCount: 2,
      author: "user1",
      createdAt: "2024-03-15T12:00:00Z",
      avatarUrl: "https://example.com/avatar1.png",
    },
    {
      issueNumber: 102,
      title: "Second Issue",
      state: "CLOSED",
      commentsCount: 5,
      author: "user2",
      createdAt: "2024-03-16T14:00:00Z",
      avatarUrl: "https://example.com/avatar2.png",
    },
  ];

  test("displays 'No issues found' when issue list is empty", () => {
    render(<IssueList issues={[]} reachedLimit={false} />);

    expect(screen.getByText("No Results Found")).toBeInTheDocument();
  });

  test("renders list of issues correctly", () => {
    render(<IssueList issues={mockIssues} reachedLimit={false} />);

    const issueItems = screen.getAllByTestId("issue-item");
    expect(issueItems).toHaveLength(mockIssues.length);
    expect(screen.getByText("First Issue")).toBeInTheDocument();
    expect(screen.getByText("Second Issue")).toBeInTheDocument();
  });

  test("shows warning toaster when reachedLimit is true", () => {
    render(<IssueList issues={mockIssues} reachedLimit={true} />);

    const warningToaster = screen.getByTestId("warning-toaster");
    expect(warningToaster).toBeInTheDocument();
    expect(warningToaster).toHaveTextContent(
      "Showing only the first 1000 issues. Refine your search to view more."
    );
  });
});
