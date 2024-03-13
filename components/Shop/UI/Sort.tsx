"use client";
import { SortType } from "@/libs/types";
import { FaAngleDown } from "react-icons/fa";

const Sort = ({
  sort,
  selectedSort,
  handleSortChange,
  showSortOptions,
  setShowSortOptions,
  showCollections,
  setShowCollections,
  handleSort,
}: {
  sort: SortType[];
  selectedSort: string;
  handleSort: (value: string, title: string) => void;
  handleSortChange: (value: React.ChangeEvent<HTMLSelectElement>) => void;
  showSortOptions: boolean;
  setShowSortOptions: (value: boolean) => void;
  showCollections: boolean;
  setShowCollections: (value: boolean) => void;
}) => {
  return (
    <div
      className={`lg:block w-full lg:w-max ${
        !showSortOptions && "hidden"
      } grid grid-cols-2`}
    >
      <select
        id="sortSelect"
        className="p-2 m-4 text-white font-thin rounded-md bg-white/10 focus:outline-none hidden lg:block"
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
      {sort.map((sortOption: SortType) => {
        const isSelectedSortOption: string =
          selectedSort === sortOption.query
            ? " lg:border-b-juice border-juice/50 lg:border-transparent bg-white/5"
            : " lg:border-b-transparent border-gray-800/20 lg:border-transparent ";
        return (
          <button
            key={sortOption.option}
            className={`p-5 lg:border-b-[1px]  lg:hidden border-[1px] lg:w-[12rem] w-full   ${isSelectedSortOption}`}
            onClick={() => {
              handleSort(sortOption.query, sortOption.option);
              setShowSortOptions(false);
            }}
          >
            {sortOption.option}
          </button>
        );
      })}
    </div>
  );
};

export default Sort;
