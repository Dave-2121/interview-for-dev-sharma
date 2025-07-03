"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useRouter, useSearchParams } from "next/navigation";

type Props = {
  currentPage: number;
  totalPages: number;
};

export function PaginationFilter({ currentPage, totalPages }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`/?${params.toString()}`);
  };

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - 1 && i <= currentPage + 1)
    ) {
      pageNumbers.push(i);
    } else if (
      (i === currentPage - 2 && currentPage > 3) ||
      (i === currentPage + 2 && currentPage < totalPages - 2)
    ) {
      pageNumbers.push("ellipsis");
    }
  }

  return (
    <Pagination className="sm:justify-end justify-center mt-6">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={() => currentPage > 1 && goToPage(currentPage - 1)}
          />
        </PaginationItem>

        {pageNumbers.map((num, idx) =>
          num === "ellipsis" ? (
            <PaginationItem key={`ellipsis-${idx}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={num}>
              <PaginationLink
                href="#"
                isActive={num === currentPage}
                onClick={() => goToPage(Number(num))}
              >
                {num}
              </PaginationLink>
            </PaginationItem>
          )
        )}

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={() =>
              currentPage < totalPages && goToPage(currentPage + 1)
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
