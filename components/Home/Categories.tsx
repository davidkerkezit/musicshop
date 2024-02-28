"use client";

import React from "react";
import VINYL from "../../assets/category-vinyl.png";
import DJ from "../../assets/category-dj.png";
import SOFTWERE from "../../assets/category-softwere.png";
import Category from "./UI/Category";
import LOGO from "../../assets/logo.png";
import Image from "next/image";
import Label from "../UI/Label";

const allCategories = [
  {
    name: "Vinyls",
    quote: "Spin it old school, feel the vinyl cool.",
    background: "bg-vinyl",
    imageSrc: VINYL,
    imageAlt: "vinyl-category",
    width: 230,
    height: 230,
    hover: "lg:group-hover:rotate-[360deg] duration-500 rotate-90",
    query: "vinyls",
  },
  {
    name: "DJ Equipments",
    quote: "Faders up, vibes high – where DJ magic comes to life.",
    background: "bg-dj",
    imageSrc: DJ,
    imageAlt: "dj-category",
    width: 150,
    height: 150,
    hover: "lg:group-hover:scale-110 duration-300",
    query: "djequipments",
  },
  {
    name: "Softweres",
    quote: "Where melodies meet algorithms, music software sparks creativity.",
    background: "bg-softwere",
    imageSrc: SOFTWERE,
    imageAlt: "softwere-category",
    width: 130,
    height: 130,
    hover: "lg:group-hover:scale-110 duration-300",
    query: "softweres",
  },
];
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
        {allCategories.map((category, index: number) => {
          return (
            <Category
              key={index}
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
