"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Pages = ({ pagesNumber }: { pagesNumber: number }) => {
  const [displayedPages, setDisplayedPages] = useState<number[]>([]);
  const router = useRouter();
  const params = useSearchParams();
  const selectedPageQuery = params.get("page") ?? "1";
  const selectedPageNumber = parseInt(selectedPageQuery);

  useEffect(() => {
    if (selectedPageNumber < 3 && pagesNumber < 4) {
      let array = [];
      for (let index = 1; index <= pagesNumber; index++) {
        array.push(index);

        setDisplayedPages(array);
      }
    } else if (selectedPageNumber < 3 && pagesNumber > 3) {
      setDisplayedPages([1, 2, 3]);
    } else if (
      pagesNumber > 3 &&
      selectedPageNumber < pagesNumber &&
      2 < selectedPageNumber
    ) {
      setDisplayedPages([
        selectedPageNumber - 1,
        selectedPageNumber,
        selectedPageNumber + 1,
      ]);
    }
  }, [pagesNumber, selectedPageQuery, selectedPageNumber]);
  const pageHandler = (page: number) => {
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set("page", String(page));
    router.push(currentUrl.href);
  };
  return (
    <div className="flex gap-2 items-center">
      {displayedPages?.map((page) => {
        return (
          <button
            key={page}
            onClick={() => pageHandler(page)}
            className={`border-[3px]   rounded-full text-lg w-[40px] h-[40px] flex items-center justify-center ${
              selectedPageNumber === page
                ? "bg-juice/20 font-semibold border-juice  "
                : "bg-transparent border-juice/60"
            } `}
          >
            {page}
          </button>
        );
      })}
    </div>
  );
};

export default Pages;
