"use client";
import {
  IoIosPin,
  AiOutlineShopping,
  BsHouseDoor,
} from "@/components/UI/Icons";
import BANNER from "@/assets/banner.png";
import Image from "next/image";
import Button from "../UI/Button";
import { StoreStatistic } from ".";
import { useRouter } from "next/navigation";
import { BASE_URL } from "@/libs/utils";

const Banner = () => {
  const router = useRouter();
  return (
    <div
      className="flex h-max px-5 overflow-hidden background text-white relative pb-[4%] pt-20 lg:pt-40"
      id="banner"
    >
      {/* Container for darker banner bg */}
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/60" />
      {/* Text Banner */}
      <div className="  my-auto w-full lg:w-1/2 relative z-10">
        {/* Location */}
        <div className="md:flex items-center hidden  ">
          <IoIosPin className="text-4xl text-juice" />
          <p className="text-xl">Evershold St. 24 London</p>
        </div>
        {/* Header */}
        <h1 className="uppercase text-6xl font-semibold pt-5 md:pt-0">
          New shop in your <span className="text-juice">town</span>.
        </h1>
        {/* About new  shop */}
        <p className="py-5 text-base md:text-lg text-justify pr-5">
          Welcome to "Music Shop" at our new address, Evershold St. 24 in
          London! Dive into a world of musical wonders where we offer a curated
          collection of vinyls, top-notch DJ equipment, and cutting-edge audio
          software. Discover the beats that define us, explore the vinyl
          stories, and gear up with the tools that transform sounds. At "Music
          Shop," we don't just sell music; we embrace it. Visit us and let the
          melody speak.
        </p>
        <Button
          label="Visit our shop"
          icon={<AiOutlineShopping />}
          func={() => router.push(`${BASE_URL}/shop`)}
          isPending={false}
        />
        {/* Store Statistics informatios */}
        <div className="flex gap-5 w-full flex-col lg:flex-row">
          <StoreStatistic
            icon={<BsHouseDoor />}
            quantity="10+"
            label="Shops Worldwide"
          />
          <StoreStatistic
            icon={<BsHouseDoor />}
            quantity="3000+"
            label="Satisfied customers"
          />
          <StoreStatistic
            icon={<BsHouseDoor />}
            quantity="100+"
            label="Products"
          />
        </div>
      </div>
      <div className=" w-1/2 relative hidden lg:block">
        {/* Vector */}
        <div className="vector absolute mx-auto my-auto top-0 bottom-0 left-0 right-0 " />
        {/* Product image */}
        <Image
          width={800}
          height={800}
          src={BANNER}
          alt="banner"
          className="object-contain absolute mx-auto my-auto top-10 bottom-0 left-0 right-10 min-w-[400px] "
        />
      </div>
    </div>
  );
};

export default Banner;
