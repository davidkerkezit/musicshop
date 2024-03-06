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
      ? "text-white border-b-[1px] border-b-juice bg-white/10 py-3 text-2xl "
      : "text-white/60 bg-white/5 border-b-[1px] border-b-white/10 py-2 text-xl ";
  const isSelectedTabSellerStyle: string =
    selectedTab === "seller"
      ? "text-white border-b-[1px] border-b-juice bg-white/10 py-3 text-2xl  "
      : "text-white/60 bg-white/5 border-b-[1px] border-b-white/10 py-2 text-xl ";
  return (
    <div>
      <div className="flex flex-row items-end ">
        <button
          onClick={() => {
            setSelectedTab("product");
          }}
          className={`font-thin  px-8  ${isSelectedTabProductStyle}`}
        >
          Product Description
        </button>
        <button
          onClick={() => {
            setSelectedTab("seller");
          }}
          className={` font-thin  px-8 ${isSelectedTabSellerStyle} `}
        >
          About seller
        </button>
      </div>
      <p className="px-8 py-8 text-lg text-white/80 font-light bg-white/10 ">
        {selectedTab === "product" && aboutProduct}
        {selectedTab === "seller" && aboutSeller}
      </p>
    </div>
  );
};

export default ProductInformation;
