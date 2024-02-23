"use client";
import { hideSearch } from "@/libs/features/searchSliderSlice";
import { AppDispatch, useAppSelector } from "@/libs/store";
import { BASE_URL } from "@/libs/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { useDispatch } from "react-redux";
import LOGO from "@/assets/logo.png";
import Image from "next/image";
const Search = () => {
  const showSearch = useAppSelector((state) => state.searchSliderSlice);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [searchValue, setSearchValue] = useState<string>("");
  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchValue(e.target.value);
  };

  const searchValueHandler = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(hideSearch());
    router.push(`${BASE_URL}/shop?page=1&q=${searchValue}`);
  };
  return (
    <form
      onSubmit={searchValueHandler}
      className={`fixed z-50 w-[30%] h-max   text-center  mx-auto left-0 right-0  flex flex-col items-center ${
        showSearch && "animate-openFromTop"
      } ${showSearch === false && "animate-closeToTop"} ${
        showSearch === null && "-top-[40%]"
      } `}
    >
      <Image alt="logo" width={200} height={200} src={LOGO} className="mb-10" />
      <div className="rounded-full flex items-center bg-white w-full">
        <input
          onChange={searchHandler}
          type="text"
          className="bg-transparent w-full pl-5 font-thin focus:outline-none text-base text-black"
          placeholder="Search product..."
        />
        <button className="w-max " onSubmit={searchValueHandler}>
          <IoIosSearch className="text-4xl md:text-4xl p-1 m-1 bg-juice/80 rounded-full text-white border-[1px] border-juice hover:bg-juice duration-200 " />
        </button>
      </div>
    </form>
  );
};

export default Search;
