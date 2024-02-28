import Image from "next/image";
import React from "react";
import LOGO from "@/assets/logo.png";
import Link from "next/link";
import { BASE_URL } from "@/libs/utils";
import LoadingDots from "../LoadingDots";
const ProductAdded = () => {
  return (
    <div
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      className=" p-12 bg-[#1c1c21] rounded-lg shadow-lg  mx-auto left-0 right-0 top-0 bottom-0 my-auto h-max fixed flex flex-col items-center w-1/3 border-[1px] border-light-juice/20 z-50"
    >
      <Image src={LOGO} alt="logo" width={100} height={100} />
      <h2 className="text-xl font-bold mb-4 text-light-juice pt-4">
        Your product has been successfully added
      </h2>
      <div className="flex gap-2 mt-4">
        <Link
          href={`${BASE_URL}/dashboard?option=addproduct`}
          className="bg-white px-2 rounded-md text-black text-lg py-2 border-[1px] border-light-juice"
        >
          Add Product
        </Link>
        <Link
          href={`${BASE_URL}/dashboard?option=editproducts`}
          className="bg-white px-2 rounded-md text-black text-lg py-2 border-[1px] border-light-juice"
        >
          Dashboard
        </Link>
      </div>
    </div>
  );
};

export default ProductAdded;
