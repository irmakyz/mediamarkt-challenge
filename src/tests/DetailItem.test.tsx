import { render, screen } from "../../jest.setup";
import DetailItem from "@/components/details/DetailItem";
import { formatDate } from "@/utils/formatDate";

const mockProps = {
  author: "testUser",
  createdAt: "2024-03-15T12:00:00Z",
  bodyHTML: "<p>Test comment content</p>",
  avatarUrl: "https://avatars.githubusercontent.com/testUser",
};

describe("DetailItem Component", () => {
  test("renders without crashing", () => {
    render(<DetailItem {...mockProps} />);
    jestExpect(screen.getByText(mockProps.author)).toBeInTheDocument();
    jestExpect(
      screen.getByText(`on ${formatDate(mockProps.createdAt)}`)
    ).toBeInTheDocument();
  });

  test("renders avatar with correct src", () => {
    render(<DetailItem {...mockProps} />);
    const avatar = screen.getByAltText(mockProps.author);
    jestExpect(avatar.getAttribute("src")).toContain("avatars.githubusercontent.com");

  });

  test("uses default avatar when avatarUrl is missing", () => {
    render(<DetailItem {...mockProps} />);
    const avatar = screen.getByAltText(mockProps.author);
    jestExpect(avatar.getAttribute("src")).toContain("avatars.githubusercontent.com");

  });

  test("renders HTML content inside DetailBody", () => {
    render(<DetailItem {...mockProps} />);
    jestExpect(screen.getByText("Test comment content")).toBeInTheDocument();
  });

  test("handles missing bodyHTML safely", () => {
    render(<DetailItem {...mockProps} />);
    jestExpect(screen.getByTestId("detail-item-body")).toBeInTheDocument();
  });
});
