import Image from "next/image";
import React from "react";
import LOGO from "@/assets/logo.png";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Loading = () => {
  return (
    <div className=" flex justify-center relative">
      <Image
        width={200}
        height={200}
        alt="logo"
        src={LOGO}
        className="animate-grayscale"
      />
    </div>
  );
};

export default Loading;
