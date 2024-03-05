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

export type QuestionType = {
  _id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  createdAt: string;
  answer: string;
};
export type CategoryType = {
  name: string;
  quote: string;
  background: string;
  imageSrc: StaticImageData;
  imageAlt: string;
  width: number;
  height: number;
  hover: string;
  query: string;
};
export type AboutCategoryType = {
  background: string;
  quote: string;
  label: string;
  description: string;
  artist: string;
  profession: string;
  statement: string;
  width: number;
  height: number;
  imageSrc: StaticImageData;
  imageAlt: string;
  imageStyle: string;
};
export type TestimonialType = {
  name: string;
  occupation: string;
  text: string;
  stars: number;
  imageSrc: StaticImageData;
};
export type OrderType = {
  firstName: string;
  lastName: string;
  city: string;
  houseNumber: string;
  streetName: string;
  totalPrice: number;
  order: CartItem[];
  isChecked: boolean;
  moreInformation: string;
  postalCode: string;
  phoneNumber: string;
};
