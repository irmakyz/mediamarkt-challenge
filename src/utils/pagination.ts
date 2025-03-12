export const generatePageNumbers = (
  totalPages: number,
  currentPage: number,
  siblingCount: number = 1
): (number | string)[] => {
  const pageNumbers: (number | string)[] = [];
  const firstPage = 1;
  const lastPage = totalPages;
  const ellipsis = "...";

  if (totalPages === 0) {
    return [];
  }
  if (totalPages === 1) {
    return [1];
  }
  const startPage = Math.max(firstPage + 1, currentPage - siblingCount);
  const endPage = Math.min(lastPage - 1, currentPage + siblingCount);

  pageNumbers.push(firstPage);

  if (startPage > firstPage + 1) {
    pageNumbers.push(ellipsis);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  if (endPage < lastPage - 1) {
    pageNumbers.push(ellipsis);
  }

  pageNumbers.push(lastPage);

  return pageNumbers;
};
