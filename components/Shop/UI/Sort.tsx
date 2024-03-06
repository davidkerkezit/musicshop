"use client";
import { SortType } from "@/libs/types";

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
    <div>
      <select
        id="sortSelect"
        className="p-2 m-4 text-white font-thin rounded-md bg-white/10 focus:outline-none"
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
    </div>
  );
};

export default Sort;
