"use client";
import { CollectionsType } from "@/libs/types";
import { useSearchParams } from "next/navigation";

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
    <div className="flex  text-xl font-extralight ">
      {collections.map((collection: CollectionsType) => {
        const isSelectedCollectionStyle: string =
          collectionQuery === collection.query
            ? " border-b-juice bg-white/5"
            : " border-b-transparent ";
        return (
          <button
            key={collection.title}
            className={`p-5 border-b-[1px] ${isSelectedCollectionStyle}`}
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
