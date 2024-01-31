import { twMerge } from "tailwind-merge";
import { ClassValue, clsx } from "clsx";
import { collectionsType, sortType } from "./types";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const sort: sortType[] = [
  {
    option: "Price (Low to High)",
    query: "lowprice",
  },
  {
    option: "Price (High to Low)",
    query: "highprice",
  },
  {
    option: "Newest",
    query: "newest",
  },
  {
    option: "Oldest",
    query: "oldest",
  },
];
export const collections: collectionsType[] = [
  {
    title: "All Products",
    query: "allproducts",
  },
  {
    title: "Vinyls",
    query: "vinyls",
  },
  {
    title: "DJ Equipments",
    query: "djequipments",
  },
  {
    title: "Softweres",
    query: "softweres",
  },
];
export const BASE_URL = "";
