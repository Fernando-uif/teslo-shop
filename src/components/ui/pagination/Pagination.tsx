"use client";

import { generatePaginationNumbers } from "@/utils";
import clsx from "clsx";
import Link from "next/link";
import { redirect, usePathname, useSearchParams } from "next/navigation";
import React from "react";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

interface Props {
  totalPages: number;
}

const Pagination = ({ totalPages }: Props) => {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const pageString = searchParams.get("page") ?? 1;
  let currentPage = isNaN(+pageString) ? 1 : +pageString;
  
  if (currentPage < 1 || isNaN(+pageString)) {
    redirect(pathName);
  }
  const allPages = generatePaginationNumbers(currentPage, totalPages);

  const createPageUrl = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    if (pageNumber === "...") {
      return `${pathName}?${params.toString()}`;
    }
    if (Number(pageNumber) === 0) {
      return `${pathName}`;
    }
    if (Number(pageNumber) > totalPages) {
      return `${pathName}?${params.toString()}`;
    }
    params.set("page", pageNumber.toString());
    return `${pathName}?${params.toString()}`;
  };
  return (
    <div className="flex text-center m-10 mb-32 justify-center">
      <nav aria-label="Page navigation example">
        <ul className="flex list-style-none">
          <li className="page-item">
            <Link
              className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
              href={createPageUrl(currentPage - 1)}
              aria-disabled="true"
            >
              <IoChevronBackOutline size={30} />
            </Link>
          </li>

          {React.Children.toArray(
            allPages.map((page) => {
              return (
                <li className="page-item">
                  <Link
                    className={clsx(
                      "page-link relative block py-1.5 px-3 border-0  outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none",
                      {
                        "bg-blue-700 shadow-sm text-white hover:bg-blue-600 hover:text-white":
                          page === currentPage,
                      }
                    )}
                    href={createPageUrl(page)}
                  >
                    {page}
                  </Link>
                </li>
              );
            })
          )}

          <li className="page-item">
            <Link
              className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
              href="#"
            >
              <IoChevronForwardOutline size={30} />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
