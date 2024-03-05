"use client";
import Category from "./UI/Category";
import LOGO from "@/assets/logo.png";
import Image from "next/image";
import Label from "../UI/Label";
import { allCategories } from "@/libs/utils";
import { CategoryType } from "@/libs/types";

const Categories = () => {
  return (
    <div className=" bg-gradient-to-r from-neutral-900 to-neutral-800">
      {/* HEADER */}
      <Label
        quote={`"Where words fail, music speaks."`}
        label="Discover our products"
      />
      {/* Categories */}
      <div className="w-full h-max py-10 lg:py-20 grid grid-cols-2 md:grid-cols-3 lg:w-[70%] lg:mx-auto lg:grid-cols-3 gap-3 justify-items-center px-5 place-items-center lg:gap-5   ">
        {allCategories.map((category: CategoryType) => {
          return (
            <Category
              key={category.name}
              name={category.name}
              quote={category.quote}
              background={category.background}
              imageSrc={category.imageSrc}
              imageAlt={category.imageAlt}
              width={category.width}
              height={category.height}
              hover={category.hover}
              query={category.query}
            />
          );
        })}
        <div className="flex flex-col items-center gap-2 md:hidden">
          {/* Logo image for sm devices to complete grid-cols-4 */}
          <Image width={150} height={150} alt="logo" src={LOGO} />
          <p className="text-juice font-semibold italic">Music Shop</p>
        </div>
      </div>
    </div>
  );
};

export default Categories;
