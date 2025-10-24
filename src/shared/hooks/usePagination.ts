import { useEffect, useMemo, useState } from "react";
import { PAGINATION } from "../constants/config";

interface UsePaginationProps {
  items: any[];
  itemsPerPage?: number;
  dependencies?: any[];
}

export function usePagination({
  items,
  itemsPerPage = PAGINATION.ITEMS_PER_PAGE,
  dependencies = [],
}: UsePaginationProps) {
  const [currentPage, setCurrentPage] = useState(1);

  // Reset to first page when dependencies change
  useEffect(() => {
    setCurrentPage(1);
  }, dependencies);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return items.slice(startIndex, endIndex);
  }, [items, currentPage, itemsPerPage]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return {
    currentPage,
    setCurrentPage,
    totalPages,
    paginatedItems,
    startIndex,
    endIndex,
  };
}
