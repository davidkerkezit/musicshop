"use client";
import { useState } from "react";

const ProductInformation = ({
  aboutProduct,
  aboutSeller,
}: {
  aboutProduct: string;
  aboutSeller: string;
}) => {
  const [selectedTab, setSelectedTab] = useState<string>("product");
  const isSelectedTabProductStyle: string =
    selectedTab === "product"
      ? "text-white border-b-[1px] border-b-juice bg-white/10 py-3 md:text-2xl text-lg"
      : "text-white/60 bg-white/5 border-b-[1px] border-b-white/10 py-2 md:text-xl  ";
  const isSelectedTabSellerStyle: string =
    selectedTab === "seller"
      ? "text-white border-b-[1px] border-b-juice bg-white/10 py-3 text-lg md:text-xl  "
      : "text-white/60 bg-white/5 border-b-[1px] border-b-white/10 py-2 text-sm md:text-xl text-lg";
  return (
    <div>
      <div className="flex flex-row items-end justify-center lg:justify-start ">
        <button
          onClick={() => {
            setSelectedTab("product");
          }}
          className={`font-thin   px-8  ${isSelectedTabProductStyle}`}
        >
          Product Description
        </button>
        <button
          onClick={() => {
            setSelectedTab("seller");
          }}
          className={` font-thin   px-8 ${isSelectedTabSellerStyle} `}
        >
          About seller
        </button>
      </div>
      <p className="px-8 py-8 text-base text-center lg:text-left md:text-lg text-white/80 font-light bg-white/10 ">
        {selectedTab === "product" && aboutProduct}
        {selectedTab === "seller" && aboutSeller}
      </p>
    </div>
  );
};

export default ProductInformation;
