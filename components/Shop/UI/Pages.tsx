"use client";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
export const dynamic = "force-dynamic";

const Pages = ({ pagesNumber }: { pagesNumber: number }) => {
  const [displayedPages, setDisplayedPages] = useState<number[]>([]);
  const pathname = usePathname();
  const [currentUrl, setCurrentUrl] = useState<string>("");
  const params = useSearchParams();
  const selectedPageQuery = params.get("page") ?? "1";
  const selectedPageNumber = parseInt(selectedPageQuery);
  const searchQuery = params.get("q");
  const sortQuery = params.get("sort");
  const collectionQuery = params.get("collection");
  const isShopPage = pathname.startsWith("/shop");

  useEffect(() => {
    const searchParams = new URLSearchParams(params);
    searchParams.delete("page");
    const searchString = searchParams.toString();
    const updatedUrl = `${pathname}?${searchString}`;
    setCurrentUrl(updatedUrl);
  }, [selectedPageQuery, sortQuery, collectionQuery, searchQuery]);

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

  return (
    <div className="flex gap-2 items-center">
      {displayedPages?.map((page: number) => {
        return (
          <Link
            key={page}
            href={`${currentUrl}&page=${page}#${
              isShopPage ? "sort" : "search"
            }`}
            shallow={true}
            className={`border-[3px]   rounded-full text-lg w-[40px] h-[40px] flex items-center justify-center ${
              selectedPageNumber === page
                ? "bg-juice/20 font-semibold border-juice  "
                : "bg-transparent border-juice/60"
            } `}
          >
            {page}
          </Link>
        );
      })}
    </div>
  );
};

export default Pages;
