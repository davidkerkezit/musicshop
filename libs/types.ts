import { StaticImageData } from "next/image";

export type Menu = {
  label: string;
  link: string;
};

export type ProductType = {
  _id: string;
  name: string;
  price: number;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  about: string;
  description: string;
  aboutSeller: string;
  __v: number;
};
export type PipelineStage =
  | { $unionWith: { coll: string } }
  | { $skip: number }
  | { $limit: number }
  | { $match: { name: { $regex: RegExp } } };

export type sortType = {
  option: string;
  query: string;
};
export type collectionsType = {
  title: string;
  query: string;
};
export type AboutUsContentType = {
  header: string;
  text: string;
  imgSrc: StaticImageData;
};
