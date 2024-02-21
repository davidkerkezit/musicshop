"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const SearchQuery = () => {
  const [searchValue, setSearchValue] = useState<null | string>(null);
  const searchParams = useSearchParams();
  const search = searchParams.get("q");
  useEffect(() => {
    setSearchValue(search);
  }, [search]);

  return (
    <div className=" w-full  mb-4">
      {searchValue && (
        <p className="font-thin">
          You searched for:{" "}
          <span className="bg-light-juice text-black px-2 py-1">
            {searchValue}
          </span>
        </p>
      )}
    </div>
  );
};

export default SearchQuery;
