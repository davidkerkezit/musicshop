"use client";
import { useAppSelector } from "@/libs/store";
import React from "react";
import { IoIosSearch } from "react-icons/io";
const Search = () => {
  const showSearch = useAppSelector((state) => state.searchSliderSlice);

  return (
    <div
      className={`absolute z-50 w-[80%] h-max  bg-white backdrop-blur-xl text-center text-4xl mx-auto left-0 right-0 rounded-full flex items-center ${
        showSearch && "animate-openFromTop"
      } ${showSearch === false && "animate-closeToTop"} ${
        showSearch === null && "-top-[30%]"
      } `}
    >
      <input
        type="text"
        placeholder="Search for products..."
        className="text-base text-black bg-transparent w-full pl-5 font-thin placeholder:text-black/80  placeholder:font-thin focus:outline-none"
      />
      <IoIosSearch className="text-4xl md:text-4xl p-1 m-1 bg-juice rounded-full text-white border-[1px] border-juice" />
    </div>
  );
};

export default Search;
