import { Filter, SearchSection } from "@/components/Shop";
import React from "react";
import Image from "next/image";
import LOGO from "@/assets/logo.png";
const loading = () => {
  return (
    <div>
      <SearchSection />
      <div className="bg-white/30 w-full h-[15rem] animate-blink flex justify-center">
        <Image
          src={LOGO}
          alt="logo"
          width={150}
          height={150}
          className="object-contain"
        />
      </div>
      <Filter />
      <div className=" bg-white/30 animate-blink h-[20rem] mx-48 flex justify-center items-center">
        <Image
          src={LOGO}
          alt="logo"
          width={150}
          height={150}
          className="object-contain"
        />
      </div>
    </div>
  );
};

export default loading;
