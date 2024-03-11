import React from "react";
import LOGO from "@/assets/logo.png";
import Image from "next/image";
const loading = () => {
  return (
    <div className="w-full h-[100vh] bg-gray-600 animate-blink flex items-center justify-center">
      <Image
        src={LOGO}
        alt="logo"
        width={300}
        height={300}
        className="object-contain"
      />
    </div>
  );
};

export default loading;
