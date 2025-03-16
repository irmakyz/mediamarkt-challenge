import React from "react";
import { Button } from "@/components";
import { PaginationContainer} from "./Pagination.styles";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <PaginationContainer aria-label="Pagination Navigation">
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Go to previous page"
      >
        {"<"} Previous
      </Button>
      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages || totalPages === 0}
        data-testid="next-page-button"
        aria-label="Go to next page"
      >
        Next {">"}
      </Button>
    </PaginationContainer>
  );
};

export default Pagination;
