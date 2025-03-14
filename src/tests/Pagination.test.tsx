import { render, screen, fireEvent } from "../../jest.setup";
import { Pagination } from "@/components";

describe("Pagination Component", () => {
  const onPageChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders Previous and Next buttons", () => {
    render(
      <Pagination currentPage={2} totalPages={5} onPageChange={onPageChange} />
    );

    jestExpect(screen.getByText("< Previous")).toBeInTheDocument();
    jestExpect(screen.getByText("Next >")).toBeInTheDocument();
  });

  test("disables Previous button when on the first page", () => {
    render(
      <Pagination currentPage={1} totalPages={5} onPageChange={onPageChange} />
    );

    jestExpect(screen.getByText("< Previous")).toBeDisabled();
    jestExpect(screen.getByText("Next >")).not.toBeDisabled();
  });

  test("disables Next button when on the last page", () => {
    render(
      <Pagination currentPage={5} totalPages={5} onPageChange={onPageChange} />
    );

    jestExpect(screen.getByText("< Previous")).not.toBeDisabled();
    jestExpect(screen.getByText("Next >")).toBeDisabled();
  });

  test("calls onPageChange with the correct value when Previous is clicked", () => {
    render(
      <Pagination currentPage={3} totalPages={5} onPageChange={onPageChange} />
    );

    fireEvent.click(screen.getByText("< Previous"));

    jestExpect(onPageChange).toHaveBeenCalledTimes(1);
    jestExpect(onPageChange).toHaveBeenCalledWith(2);
  });

  test("calls onPageChange with the correct value when Next is clicked", () => {
    render(
      <Pagination currentPage={3} totalPages={5} onPageChange={onPageChange} />
    );

    fireEvent.click(screen.getByText("Next >"));

    jestExpect(onPageChange).toHaveBeenCalledTimes(1);
    jestExpect(onPageChange).toHaveBeenCalledWith(4);
  });
});
