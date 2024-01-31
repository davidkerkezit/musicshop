"use client";
import Image from "next/image";
import DARK_BG from "@/assets/brush-dark.png";

const PageBanner = ({ page }: { page: string }) => {
  return (
    <div className="background  w-full pt-40 pb-32 h-[20rem] flex justify-center relative">
      <div className="absolute top-0 right-0 bottom-0 left-0 bg-darkness/40" />{" "}
      <h1 className="text-[7rem] font-bold relative z-10">{page}</h1>
      <Image
        src={DARK_BG}
        alt=""
        width={1600}
        height={300}
        className="w-full absolute -bottom-[16rem]"
      />
    </div>
  );
};

export default PageBanner;
