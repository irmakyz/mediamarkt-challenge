import React from "react";
import { Button } from "@/components";
import { PaginationContainer, PageNumber, Ellipsis } from "./Pagination.styles";
import { generatePageNumbers } from "@/utils/pagination";

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
  const pageNumbers = generatePageNumbers(totalPages, currentPage);

  return (
    <PaginationContainer>
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        {"<"} Previous
      </Button>
      {pageNumbers.map((page, index) =>
        page === "..." ? (
          <Ellipsis key={index}>{page}</Ellipsis>
        ) : (
          <PageNumber
            key={index}
            variant='filled'
            isActive={page === currentPage}
            onClick={() => onPageChange(Number(page))}
          >
            {page}
          </PageNumber>
        )
      )}
      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages || totalPages === 0}
      >
        Next {">"}
      </Button>
    </PaginationContainer>
  );
};

export default Pagination;
