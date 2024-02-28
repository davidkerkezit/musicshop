"use client";
import { BASE_URL } from "@/libs/utils";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { TiDeleteOutline } from "react-icons/ti";

const SearchQuery = () => {
  const pathname = usePathname();
  const isShopPage = pathname.startsWith("/shop");
  const [searchValue, setSearchValue] = useState<null | string>(null);
  const searchParams = useSearchParams();
  const search = searchParams.get("q");
  useEffect(() => {
    setSearchValue(search);
  }, [search]);

  return (
    <div className=" w-full  mb-4 flex items-center gap-2">
      {searchValue && (
        <p className="font-thin">
          You searched for:{" "}
          <span className="bg-light-juice text-black px-2 py-1">
            {searchValue}
          </span>
        </p>
      )}
      {searchValue && (
        <Link
          href={`${BASE_URL}/${
            isShopPage ? "shop#sort" : "dashboard?option=editproducts"
          }`}
          className="text-light-juice "
        >
          <TiDeleteOutline size={24} />
        </Link>
      )}
    </div>
  );
};

export default SearchQuery;
