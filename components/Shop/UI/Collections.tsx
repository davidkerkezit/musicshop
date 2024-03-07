"use client";
import { CollectionsType } from "@/libs/types";
import { useSearchParams } from "next/navigation";
import { FaAngleDown } from "@/components/UI/Icons";

const Collections = ({
  collections,
  handleCollectionChange,
}: {
  collections: CollectionsType[];
  handleCollectionChange: (value: string) => void;
}) => {
  const params = useSearchParams();
  const collectionQuery = params.get("collection") ?? "allproducts";
  return (
    <div className="md:flex   text-base md:text-xl font-extralight w-1/2 md:w-full   ">
      <button
        className={`p-5 md:border-b-[1px] border-[1px] md:w-[10rem] text-center w-full md:border-b-transparent border-gray-800/20 flex items-center gap-2 justify-center  md:hidden`}
      >
        <p>Categories</p>
        <FaAngleDown />
      </button>
      {collections.map((collection: CollectionsType) => {
        const isSelectedCollectionStyle: string =
          collectionQuery === collection.query
            ? " md:border-b-juice border-juice/50 md:border-transparent bg-white/5"
            : " md:border-b-transparent border-gray-800/20 md:border-transparent ";
        return (
          <button
            key={collection.title}
            className={`p-5 md:border-b-[1px] hidden md:block border-[1px] md:w-[12rem] w-1/2  ${isSelectedCollectionStyle}`}
            onClick={() => {
              handleCollectionChange(collection.query);
            }}
          >
            {collection.title}
          </button>
        );
      })}
    </div>
  );
};

export default Collections;
