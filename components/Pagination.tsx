import {
  Pagination as PaginationContainer,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Dispatch, SetStateAction } from "react";

interface Props {
  page: number;
  numberOfPages: number;
  onPageChange: Dispatch<SetStateAction<number>>;
}

const Pagination = ({ page, numberOfPages, onPageChange }: Props) => {
  return (
    <PaginationContainer>
      <PaginationContent className="flex w-full justify-between">
        <PaginationItem>
          <PaginationPrevious
            disabled={page === 1}
            onClick={() => onPageChange((p) => p - 1)}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            disabled={page === numberOfPages}
            onClick={() => onPageChange((p) => p + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </PaginationContainer>
  );
};

export default Pagination;
