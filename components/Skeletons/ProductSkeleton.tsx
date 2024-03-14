import Image from "next/image";
import React from "react";
import LOGO from "@/assets/logo.png";

const ProductSkeleton = () => {
  return (
    <div className="bg-[#03040a] h-[35rem]  flex flex-col gap-4 w-full items-center">
      <div className="animate-blink bg-gradient-to-tr from-[#424242] to-[#191919] w-full h-[300px]  relative flex justify-center items-center">
        <Image
          width={150}
          height={150}
          src={LOGO}
          alt="logo"
          className={`  custom-shadow aspect-square p-3 object-contain grayscale  opacity-30   `}
        />
      </div>
      <div className="animate-blink bg-white/30 w-[80%] h-[1.5rem]" />
      <div className="animate-blink bg-white/30 w-[40%] h-[1.5rem] mt-5" />
      <div className="animate-blink bg-white/30 w-1/3 h-[1.7rem]  mt-2" />
    </div>
  );
};

export default ProductSkeleton;
