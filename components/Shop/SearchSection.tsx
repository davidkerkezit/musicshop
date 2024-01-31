"use client";
import { SearchForm } from "..";

const SearchSection = () => {
  return (
    <div className="flex flex-col items-center pb-20 pt-40 gap-2 background relative">
      <div className="bg-black/50 absolute top-0 right-0 bottom-0 left-0" />
      <h1 className="text-7xl font-semibold relative z-10 ">Great Products.</h1>
      <h1 className="text-7xl font-semibold relative z-10 ">
        Feel The Vibe With Us.
      </h1>
      <p className="text-lg italic text-gray-400 font-extralight relative z-10">
        Explore a diverse range of high-quality music products
      </p>
      <SearchForm />
    </div>
  );
};

export default SearchSection;