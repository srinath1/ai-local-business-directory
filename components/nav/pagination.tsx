import Link from "next/link";
import { ChevronsRight, ChevronsLeft } from "lucide-react";
interface BusinessPaginationProps {
  page: number;
  totalPages: number;
}
import { Button } from "../ui/button";

export default function BusinessPagination({
  page,
  totalPages,
}: BusinessPaginationProps) {
  return (
    <nav
      className="d-flex justify-content-center fixed-bottom opacity-75 
    mb-30"
    >
      <ul className="flex justify-center items-center space-x-6 mt-5">
        {page > 1 && (
          <li className="page-item">
            <Link href={`?page=${page - 1}`}>
              <ChevronsLeft />
            </Link>
          </li>
        )}

        {Array.from({ length: totalPages }, (_, index) => {
          const p = index + 1;
          return (
            <li key={p} className="page-item">
              <Link href={`?page=${p}`}>
                <Button variant={`${page == p ? "secondary" : "ghost"}`}>
                  {p}
                </Button>
              </Link>
            </li>
          );
        })}

        {page < totalPages && (
          <li className="page-item">
            <Link href={`?page=${page + 1}`}>
              <ChevronsRight />{" "}
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
