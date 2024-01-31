"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoIosSearch } from "react-icons/io";
const SearchForm = () => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState<string>("");
  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchValue(e.target.value);
  };
  const searchValueHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set("q", searchValue);
    currentUrl.searchParams.set("page", "1");

    router.push(currentUrl.href);
  };
  return (
    <form
      action=""
      onSubmit={searchValueHandler}
      className="flex bg-slate-600 w-1/5 my-5 rounded-full relative z-10"
    >
      <input
        onChange={searchHandler}
        type="text"
        className="bg-transparent w-full pl-5 font-thin focus:outline-none"
        placeholder="Search product..."
      />
      <button className="w-max ">
        <IoIosSearch className="text-4xl md:text-4xl p-1 m-1 bg-juice rounded-full text-white border-[1px] border-juice " />
      </button>
    </form>
  );
};

export default SearchForm;
