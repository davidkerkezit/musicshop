import Image from "next/image";
import React from "react";
import LOGO from "@/assets/logo.png";
import Link from "next/link";
import { BASE_URL } from "@/libs/utils";
import LoadingDots from "../LoadingDots";
const SuccessfullyEdit = () => {
  return (
    <div className=" p-12 bg-[#1c1c21] rounded-lg shadow-lg  mx-auto left-0 right-0 top-0 bottom-0 my-auto h-max fixed flex flex-col items-center w-1/3 border-[1px] border-light-juice/20">
      <Image src={LOGO} alt="logo" width={100} height={100} />
      <h2 className="text-xl font-bold mb-4 text-light-juice py-4">
        Your product has been successfully updated
      </h2>

      <LoadingDots />
    </div>
  );
};

export default SuccessfullyEdit;
