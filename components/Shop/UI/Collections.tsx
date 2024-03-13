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
      className={`lg:flex   text-base lg:text-xl font-extralight w-full lg:w-full ${
        !showCollections && "hidden"
      }`}
    >
      <div className="lg:flex grid grid-cols-2  ">
        {collections.map((collection: CollectionsType) => {
          const isSelectedCollectionStyle: string =
            collectionQuery === collection.query
              ? " lg:border-b-juice border-juice/50 lg:border-transparent bg-white/5"
              : " lg:border-b-transparent border-gray-800/20 lg:border-transparent ";
          return (
            <button
              key={collection.title}
              className={`p-5 lg:border-b-[1px] lg:text-base xl:text-lg  lg:block border-[1px] lg:w-[9.5rem] xl:w-[11rem] w-full   ${isSelectedCollectionStyle}`}
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
