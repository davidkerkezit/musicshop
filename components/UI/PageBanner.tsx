"use client";
import Image from "next/image";
import DARK_BG from "@/assets/brush-dark.png";
import { usePathname } from "next/navigation";

const PageBanner = ({ page }: { page: string }) => {
  const path = usePathname();

  return (
    <div className="background  w-full pt-32 md:pt-40 md:pb-32 pb-40 h-[2rem]  md:h-[30rem] flex justify-center relative">
      <div className="absolute top-0 right-0 bottom-0 left-0 md:bg-darkness/40 bg-darkness/60" />{" "}
      {page === "Dashboard" && (
        <div className=" p-12  rounded-lg shadow-lg bg-black/40 mx-auto left-0 right-0 backdrop-blur-xl  bottom-3 my-auto h-max absolute flex flex-col items-center w-1/2   ">
          <p className="font-thin text-center">
            This is public Pilot Project. You are not allowed to edit some
            products for security reasons of our database. Find products with{" "}
            <span className="text-green-500">green padlock</span> in dashboard
            section or add new product if allowed products don't exist.
          </p>
        </div>
      )}
      {path === "/admin" && (
        <div className=" p-12  rounded-lg shadow-lg bg-black/40 mx-auto left-0 right-0 backdrop-blur-xl  bottom-3 my-auto h-max absolute flex flex-col items-center w-1/2   ">
          <p className="font-thin text-center">This is public Pilot Project.</p>
          <p className="font-thin text-center">
            Username: <span className="bg-juice px-2 text-black">admin</span>
          </p>
          <p className="font-thin text-center">
            Password:{" "}
            <span className="bg-juice px-2 text-black">Musicadminshop2023</span>
          </p>
        </div>
      )}
      <h1 className="md:text-[7rem] text-[5rem] font-bold relative z-10">
        {page}
      </h1>
      <Image
        src={DARK_BG}
        alt="dark-background"
        width={1600}
        height={300}
        className="w-full absolute -bottom-[16rem]"
      />
    </div>
  );
};

export default PageBanner;
