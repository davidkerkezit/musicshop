"use client";
import { CollectionsType } from "@/libs/types";
import { useSearchParams } from "next/navigation";
import { FaAngleDown } from "@/components/UI/Icons";

const Collections = ({
  collections,
  handleCollectionChange,
  showSortOptions,
  setShowSortOptions,
  showCollections,
  setShowCollections,
}: {
  collections: CollectionsType[];
  handleCollectionChange: (value: string) => void;
  showSortOptions: boolean;
  setShowSortOptions: (value: boolean) => void;
  showCollections: boolean;
  setShowCollections: (value: boolean) => void;
}) => {
  const params = useSearchParams();
  const collectionQuery = params.get("collection") ?? "allproducts";
  return (
    <div
      className={`md:flex   text-base md:text-xl font-extralight w-full md:w-full ${
        !showCollections && "hidden"
      }`}
    >
      <div className="md:flex grid grid-cols-2 ">
        {collections.map((collection: CollectionsType) => {
          const isSelectedCollectionStyle: string =
            collectionQuery === collection.query
              ? " md:border-b-juice border-juice/50 md:border-transparent bg-white/5"
              : " md:border-b-transparent border-gray-800/20 md:border-transparent ";
          return (
            <button
              key={collection.title}
              className={`p-5 md:border-b-[1px]  md:block border-[1px] md:w-[12rem] w-full   ${isSelectedCollectionStyle}`}
              onClick={() => {
                handleCollectionChange(collection.query);
                setShowCollections(false);
              }}
            >
              {collection.title}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Collections;
