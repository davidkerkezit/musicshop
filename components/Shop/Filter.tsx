"use client";
import { sort, collections } from "@/libs/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Collections from "./UI/Collections";
import Sort from "./UI/Sort";
import { FaAngleDown } from "react-icons/fa";
import { FaAngleUp } from "react-icons/fa";
import { CollectionsType } from "@/libs/types";

const Filter = () => {
  const [selectedSort, setSelectedSort] = useState<string>("");
  const [selectedTitle, setSelectedTitle] = useState<string | null>(null);
  const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const isShopPage = pathname.startsWith("/shop");
  const [showCollections, setShowCollections] = useState<boolean>(false);
  const [showSortOptions, setShowSortOptions] = useState<boolean>(false);

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSort(event.target.value);
    const searchParams = new URLSearchParams(params);
    searchParams.set("sort", event.target.value);
    const searchString = searchParams.toString();
    const updatedUrl = `${pathname}?${searchString}`;
    router.push(`${updatedUrl}#sort`);
  };
  const handleSort = (query: string, title: string) => {
    setSelectedTitle(title);
    setSelectedSort(query);
    const searchParams = new URLSearchParams(params);
    searchParams.set("sort", query);
    searchParams.set("page", "1");
    const searchString = searchParams.toString();
    const updatedUrl = `${pathname}?${searchString}`;
    router.push(`${updatedUrl}#sort`);
  };

  const handleCollectionChange = (collection: string) => {
    const searchParams = new URLSearchParams(params);
    searchParams.set("collection", collection);
    searchParams.set("page", "1");

    const searchString = searchParams.toString();
    const updatedUrl = `${pathname}?${searchString}`;
    router.push(`${updatedUrl}#sort`);
  };

  const collectionQuery = params.get("collection") ?? "allproducts";

  return (
    <div className="md:w-[80%] w-full  my-5 mx-auto   flex lg:flex-row flex-col  justify-between border-b-[1px] lg:border-b-white/20 border-b-white/5 items-end  bg-white/5 ">
      <div className=" flex flex-row w-full lg:hidden">
        <div className="w-full ">
          {" "}
          <button
            onClick={() => {
              setShowCollections(!showCollections);
              setShowSortOptions(false);
            }}
            className={`p-5 lg:border-b-[1px] border-[1px] lg:w-[10rem] text-center w-full lg:border-b-transparent  border-gray-800/20 flex items-center gap-2 justify-center  lg:hidden`}
          >
            <p>Categories</p>
            {!showCollections ? <FaAngleDown /> : <FaAngleUp />}
          </button>
          {!showSortOptions && !showCollections && (
            <p className="bg-light-juice py-2 px-3 text-sm  text-black w-full text-center block lg:hidden border-r-[1px] border-r-black">
              {
                collections.find(
                  (collection: CollectionsType) =>
                    collection.query === collectionQuery
                )?.title
              }
            </p>
          )}
        </div>
        <div className={`w-full ${!isShopPage && "hidden"}`}>
          <button
            className={`p-5 lg:border-b-[1px] border-[1px]   lg:w-[10rem] w-full lg:border-b-transparent border-gray-800/20  gap-2 flex items-center justify-center lg:hidden`}
            onClick={() => {
              setShowSortOptions(!showSortOptions);
              setShowCollections(false);
            }}
          >
            <p>Sort</p>
            {!showSortOptions ? <FaAngleDown /> : <FaAngleUp />}
          </button>
          {!showSortOptions && !showCollections && (
            <p className="bg-light-juice text-black py-2 px-3 text-sm block   w-full text-center  lg:hidden">
              {selectedTitle === null ? "Relevant" : selectedTitle}
            </p>
          )}
        </div>
      </div>
      <Collections
        collections={collections}
        handleCollectionChange={handleCollectionChange}
        showSortOptions={showSortOptions}
        setShowSortOptions={setShowSortOptions}
        showCollections={showCollections}
        setShowCollections={setShowCollections}
      />
      {isShopPage && (
        <Sort
          sort={sort}
          selectedSort={selectedSort}
          handleSortChange={handleSortChange}
          showSortOptions={showSortOptions}
          setShowSortOptions={setShowSortOptions}
          showCollections={showCollections}
          setShowCollections={setShowCollections}
          handleSort={handleSort}
        />
      )}
    </div>
  );
};

export default Filter;
