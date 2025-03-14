import { render, screen, fireEvent } from "../../jest.setup";
import { FilterBar } from "@/components"; 
import { FilterBarProps } from "@/components/ui/FilterBar/types";

const mockOnSearch = jest.fn();

const defaultProps: FilterBarProps = {
  onSearch: mockOnSearch,
  filter: { query: "", status: "all" },
};

describe("FilterBar Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders input field and search button", () => {
    render(<FilterBar {...defaultProps} />);

    expect(
      screen.getByPlaceholderText("Search for an issue")
    ).toBeInTheDocument();
    expect(screen.getByTestId("search-button")).toBeInTheDocument();
  });

  test("updates search query on input change", () => {
    render(<FilterBar {...defaultProps} />);

    const input = screen.getByPlaceholderText(
      "Search for an issue"
    ) as HTMLInputElement;
    fireEvent.change(input, { target: { value: "bug" } });

    expect(input.value).toBe("bug");
  });

  test("calls onSearch when search button is clicked", () => {
    render(<FilterBar {...defaultProps} />);

    const input = screen.getByPlaceholderText("Search for an issue");
    fireEvent.change(input, { target: { value: "bug" } });

    const searchButton = screen.getByTestId("search-button");
    fireEvent.click(searchButton);

    expect(mockOnSearch).toHaveBeenCalledTimes(1);
    expect(mockOnSearch).toHaveBeenCalledWith("bug", "all");
  });

  test("calls onSearch when Enter key is pressed", () => {
    render(<FilterBar {...defaultProps} />);

    const input = screen.getByPlaceholderText("Search for an issue");
    fireEvent.change(input, { target: { value: "bug" } });

    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    expect(mockOnSearch).toHaveBeenCalledTimes(1);
    expect(mockOnSearch).toHaveBeenCalledWith("bug", "all");
  });

  test("calls onSearch when status dropdown is changed", () => {
    render(<FilterBar {...defaultProps} />);

    const dropdown = screen.getByRole("button", { name: /all/i });
    fireEvent.click(dropdown);

    const openOption = screen.getByText("Open");
    fireEvent.click(openOption);

    expect(mockOnSearch).toHaveBeenCalledTimes(1);
    expect(mockOnSearch).toHaveBeenCalledWith("", "open");
  });
});
