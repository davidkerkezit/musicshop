"use client";
import { sort, collections } from "@/libs/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AnchorHTMLAttributes, useEffect, useRef, useState } from "react";
import Collections from "./Collections";
import Sort from "./Sort";
import Link from "next/link";
const Filter = () => {
  const [selectedSort, setSelectedSort] = useState<string>("");
  const [selectedCollection, setSelectedCollection] = useState<string | null>(
    ""
  );
  const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const isShopPage = pathname.startsWith("/shop");
  const [currentUrl, setCurrentUrl] = useState<string>("");
  const scrollRef = useRef<HTMLAnchorElement>(null);
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSort(event.target.value);
    const searchParams = new URLSearchParams(params);
    searchParams.set("sort", event.target.value);
    const searchString = searchParams.toString();
    const updatedUrl = `${pathname}?${searchString}`;
    router.push(`${updatedUrl}#sort`);
  };

  const handleCollectionChange = (collection: string) => {
    const searchParams = new URLSearchParams(params);
    searchParams.set("collection", collection);
    const searchString = searchParams.toString();
    const updatedUrl = `${pathname}?${searchString}`;
    router.push(`${updatedUrl}#sort`);
  };

  return (
    <div className="w-[80%] my-5 mx-auto   flex justify-between border-b-[1px] border-b-white/20 items-end  bg-white/5 ">
      <Collections
        collections={collections}
        selectedCollection={selectedCollection}
        handleCollectionChange={handleCollectionChange}
      />
      {isShopPage && (
        <Sort
          sort={sort}
          selectedSort={selectedSort}
          handleSortChange={handleSortChange}
        />
      )}
      <Link
        ref={scrollRef}
        href={`${currentUrl}${isShopPage && "#sort"}`}
        className="hidden"
      ></Link>
    </div>
  );
};

export default Filter;
