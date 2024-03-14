"use client";
import React from "react";
import LOGO from "@/assets/logo.png";
import Image from "next/image";
const loading = () => {
  return (
    <div className="flex flex-col gap-10  mx-0 ">
      <div className="flex md:pt-24 pt-20 md:flex-row flex-col ">
        <div className=" bg-white/20 animate-blink flex items-center justify-center h-[28rem]  w-full md:w-1/2">
          <Image
            width={250}
            height={250}
            src={LOGO}
            alt="logo"
            className={`  custom-shadow aspect-square p-3 object-contain grayscale  opacity-30   `}
          />
        </div>

        <div className="md:w-1/2 w-full md:px-10 px-2 md:mt-0 mt-4 flex flex-col gap-1 md:gap-4">
          <div className="h-[2rem] w-[40%] bg-white/20 animate-blink" />
          <div className="flex  md:text-lg text-base gap-2">
            <div className="h-[2rem] w-[10%] bg-white/20 animate-blink" />
            <div className="h-[2rem] w-[20%] bg-white/20 animate-blink" />
          </div>
          <div className="h-[10rem] w-full bg-white/20 animate-blink" />
          <p className="md:text-[2.5rem] text-2xl font-extralight">
            <div className="h-[2rem] w-[20%] bg-white/20 animate-blink" />
          </p>
          <div className="md:mt-0 mt-4">
            <div className="h-[2rem] w-[20%] bg-white/20 animate-blink" />
          </div>
        </div>
      </div>
      <div>
        <div className="flex flex-row items-end justify-center lg:justify-start gap-1 ">
          <div className="h-[3rem] w-[10%] bg-white/20 animate-blink" />

          <div className="h-[2rem] w-[10%] bg-white/20 animate-blink" />
        </div>
        <div className="h-[20rem] w-full bg-white/20 animate-blink mt-1" />
      </div>
    </div>
  );
};

export default loading;
