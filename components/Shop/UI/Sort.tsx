"use client";
import { SortType } from "@/libs/types";
import { FaAngleDown } from "react-icons/fa";

const Sort = ({
  sort,
  selectedSort,
  handleSortChange,
}: {
  sort: SortType[];
  selectedSort: string;
  handleSortChange: (value: React.ChangeEvent<HTMLSelectElement>) => void;
}) => {
  return (
    <div className="md:block w-1/2 md:w-max ">
      <select
        id="sortSelect"
        className="p-2 m-4 text-white font-thin rounded-md bg-white/10 focus:outline-none hidden md:block"
        value={selectedSort}
        onChange={handleSortChange}
      >
        <option value="" disabled hidden>
          Select sort option
        </option>

        {sort.map((option: SortType) => {
          return (
            <option key={option.query} value={option.query}>
              {option.option}
            </option>
          );
        })}
      </select>
      <button
        className={`p-5 md:border-b-[1px] border-[1px] md:w-[10rem] w-full md:border-b-transparent border-gray-800/20 flex gap-2 items-center justify-center md:hidden`}
      >
        <p>Sort</p>
        <FaAngleDown />
      </button>
    </div>
  );
};

export default Sort;
