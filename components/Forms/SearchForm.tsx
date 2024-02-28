"use client";
import { BASE_URL } from "@/libs/utils";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { IoIosSearch } from "react-icons/io";
const SearchForm = () => {
  const pathname = usePathname();
  const isShopPage = pathname.startsWith("/shop");
  const [searchValue, setSearchValue] = useState<string>("");
  const searchRef = useRef<HTMLAnchorElement>(null);
  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchValue(e.target.value);
  };
  const searchValueHandler = (e: React.FormEvent) => {
    e.preventDefault();
    searchRef.current && searchRef.current.click();
  };
  return (
    <form
      onSubmit={searchValueHandler}
      className="flex bg-slate-600 md:w-1/2 lg:w-1/5 my-5 rounded-full relative z-10"
    >
      <input
        onChange={searchHandler}
        type="text"
        className="bg-transparent w-full pl-5 font-thin focus:outline-none"
        placeholder="Search product..."
      />
      <Link
        className="w-max "
        href={`${BASE_URL}/${
          isShopPage ? "shop" : "dashboard?option=editproducts&"
        }?page=1&q=${searchValue}#${isShopPage && "#sort"}`}
        shallow={true}
        ref={searchRef}
      >
        <IoIosSearch className="text-4xl md:text-4xl p-1 m-1 bg-juice rounded-full text-white border-[1px] border-juice " />
      </Link>
    </form>
  );
};

export default SearchForm;
