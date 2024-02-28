import { StaticImageData } from "next/image";
import { CartItem } from "./features/cartSlice";

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
  category: string;
  inStock: number;
  __v: number;
  access: boolean;
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
export type checkoutType = {
  _id: string;
  firstName: string;
  lastName: string;
  totalPrice: number;
  streetName: string;
  houseNumber: string;
  isChecked: boolean;
  postalCode: string;
  phoneNumber: string;
  moreInformation: string;
  city: string;

  order: CartItem[];
};
export type TestimonialType = {
  name: string;
  occupation: string;
  text: string;
  imageSrc: StaticImageData;
};
