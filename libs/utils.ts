import { twMerge } from "tailwind-merge";
import { ClassValue, clsx } from "clsx";
import { collectionsType, sortType } from "./types";
import { z } from "zod";

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
export const dashboardInputs = [
  {
    label: "Name",
    placeholder: "Add product name",
    value: undefined,
    name: "name",
    registerValue: "name",
    type: "text",
  },
  {
    label: "Price",
    placeholder: "Add product price",
    value: undefined,
    name: "price",
    registerValue: "price",
    type: "number",
  },
  {
    label: "In Stock",
    placeholder: "Add product quantity in stock",
    value: undefined,
    name: "inStock",
    registerValue: "inStock",
    type: "number",
  },
];
export const dashboardTextAreas = [
  {
    label: "Short product description",
    placeholder: "One sentence about product",
    value: undefined,
    name: "about-product",
    registerValue: "aboutProduct",
    type: "text",
  },
  {
    label: "Longer product description",
    placeholder: "Longer description about product",
    value: undefined,
    name: "product-description",
    registerValue: "productDescription",
    type: "text",
  },
  {
    label: "About seller",
    placeholder: "Longer description about seller",
    value: undefined,
    name: "about-seller",
    registerValue: "aboutSeller",
    type: "text",
  },
];
export const categories = [
  { name: "DJ Equipment", path: "dj" },
  { name: "Vinyl", path: "vinyls" },
  { name: "Softwere", path: "softweres" },
];
export const djsSubCategories = [
  { name: "Pioneer", path: "pioneer" },
  { name: "Dennon", path: "denon" },
];
export const productSchema = z.object({
  name: z.string().min(1),
  price: z.coerce.number().min(1),
  inStock: z.coerce.number().min(1),
  aboutProduct: z.string().min(10),
  productDescription: z.string().min(60),
  aboutSeller: z.string().min(60),
});
export const editableProductSchema = z.object({
  name: z.string().min(1),
  price: z.string().min(1),
  aboutProduct: z.string().min(10),
  productDescription: z.string().min(60),
  aboutSeller: z.string().min(60),
});
export const order = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  city: z.string().min(1),
  postalCode: z.string().min(1),
  streetName: z.string().min(1),
  houseNumber: z.string().min(1),
  phoneNumber: z.string().min(1),
  moreInformation: z.string(),
});
export const contact = z.object({
  name: z.string().min(1),
  email: z.string().email(),

  message: z.string().min(20),
});
export const subscriptions = z.object({
  email: z.string().email(),
});
export const login = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});
let BASE_URL: string;

if (process.env.NODE_ENV === "production") {
  BASE_URL = "https://musicshop-two.vercel.app";
} else {
  BASE_URL = "http://localhost:3000";
}

export { BASE_URL };
const MENU = [
  { label: "Home", link: "/" },
  { label: "About Us", link: "/about" },
  { label: "Shop", link: "/shop" },
  { label: "Contact", link: "/contact" },
];
export default MENU;
