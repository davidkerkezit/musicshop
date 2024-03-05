"use client";
import { sort, collections } from "@/libs/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import Collections from "./Collections";
import Sort from "./Sort";
const Filter = () => {
  const [selectedSort, setSelectedSort] = useState<string>("");
  const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const isShopPage = pathname.startsWith("/shop");

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
        handleCollectionChange={handleCollectionChange}
      />
      {isShopPage && (
        <Sort
          sort={sort}
          selectedSort={selectedSort}
          handleSortChange={handleSortChange}
        />
      )}
    </div>
  );
};

export default Filter;
