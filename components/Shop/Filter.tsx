"use client";
import { sort, collections } from "@/libs/utils";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import Collections from "./Collections";
import Sort from "./Sort";
const Filter = () => {
  const [selectedSort, setSelectedSort] = useState<string>("");
  const [selectedCollection, setSelectedCollection] = useState<string | null>(
    ""
  );
  const router = useRouter();
  const pathname = usePathname();
  const isShopPage = pathname.startsWith("/shop");

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSort(event.target.value);
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set("sort", event.target.value);
    currentUrl.searchParams.set("page", "1");
    router.push(currentUrl.href);
  };
  const handleCollectionChange = (collection: string) => {
    const currentUrl = new URL(window.location.href);
    collection && currentUrl.searchParams.set("collection", collection);
    currentUrl.searchParams.set("page", "1");
    router.push(currentUrl.href);
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
    </div>
  );
};

export default Filter;
