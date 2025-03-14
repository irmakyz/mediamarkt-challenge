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
    <PaginationContainer>
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        {"<"} Previous
      </Button>
      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages || totalPages === 0}
        data-testid="next-page-button"
      >
        Next {">"}
      </Button>
    </PaginationContainer>
  );
};

export default Pagination;
