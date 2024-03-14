"use client";
import React from "react";
import LOGO from "@/assets/logo.png";
import Image from "next/image";
import Link from "next/link";
import { BASE_URL } from "@/libs/utils";
const page = () => {
  return (
    <div className="h-[100vh] w-full  flex flex-col justify-center items-center relative">
      <h1 className="text-[10rem] text-light-juice z-10">404</h1>
      <Image
        width={250}
        height={250}
        src={LOGO}
        alt="logo"
        className={`  custom-shadow aspect-square p-3 object-contain grayscale  opacity-30  absolute top-0 right-0 left-0 bottom-0 mx-auto my-auto `}
      />
      <p className="z-10 text-3xl">Page Not Found</p>
      <p className="z-10 my-10">
        Sorry, we can't find the page you're looking for.
      </p>
      <Link
        className="bg-juice/90 rounded-full px-3 py-2 font-thin hover:bg-juice duration-200"
        href={`${BASE_URL}`}
      >
        Back to Home
      </Link>
    </div>
  );
};

export default page;
