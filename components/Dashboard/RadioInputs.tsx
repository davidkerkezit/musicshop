"use client";
import { useState } from "react";

import { MdCheck } from "react-icons/md";

const RadioInputs = ({
  selectedCategory,
  setSelectedCategory,
  categories,
}: {
  selectedCategory: null | string;
  setSelectedCategory: (category: string | null) => void;
  categories: {
    name: string;
    path: string;
  }[];
}) => {
  return (
    <div className="flex gap-10">
      {categories.map((category) => {
        return (
          <div className="flex items-center gap-2" key={category.name}>
            <button
              type="button"
              onClick={() => setSelectedCategory(category.path)}
              className="relative bg-gray-500 w-[1rem] h-[1rem] rounded-sm   "
            >
              {selectedCategory === category.path && (
                <MdCheck className="absolute top-0 bottom-0 left-0 right-0 text-light-juice mx-auto my-auto " />
              )}
            </button>
            <p>{category.name}</p>
          </div>
        );
      })}
    </div>
  );
};

export default RadioInputs;
