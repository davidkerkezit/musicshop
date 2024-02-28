"use client";
import { BASE_URL } from "@/libs/utils";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Category = ({
  name,
  background,
  quote,
  imageSrc,
  imageAlt,
  width,
  height,
  hover,
  query,
}: {
  name: string;
  background: string;
  quote: string;
  imageSrc: StaticImageData;
  imageAlt: string;
  width: number;
  height: number;
  hover: string;
  query: string;
}) => {
  const router = useRouter();
  return (
    <Link
      href={`${BASE_URL}/shop?page=1&collection=${query}#sort`}
      shallow={true}
      className={`group ${background} border-[3px] lg:border-[5px] border-light-juice lg:hover:border-juice duration-200 lg:w-full    w-full lg:h-[23rem] h-[13rem] relative `}
    >
      <div className="absolute left-0 right-0 top-0 bottom-0 bg-black/50  backdrop-blur-md lg:group-hover:backdrop-blur-sm lg:group-hover:bg-black/40 duration-200 cursor-pointer" />
      <Image
        width={width}
        height={height}
        alt={imageAlt}
        src={imageSrc}
        className={`absolute left-0 right-0 mx-auto -top-6 lg:-top-14 lg:relative bottom-0 my-auto    group cursor-pointer ${hover} w-[45%] md:w-[40%] lg:w-[8rem]`}
      />
      <div className="  w-full h-[7rem] absolute bottom-0 flex flex-col items-center gap-5 group cursor-pointer px-4 ">
        <p className="italic drop-shadow-lg text-center  h-[5rem] text-base absolute px-2 hidden lg:block text-white/70  ">
          "{quote}"
        </p>
        <p className="text-sm md:text-base uppercase font-semibold lg:group-hover:scale-125 lg:duration-300  absolute bottom-0 py-3 bg-black/60 w-full text-center lg:bg-transparent lg:text-[1.8rem] lg:bottom-3">
          {name}
        </p>
      </div>
    </Link>
  );
};

export default Category;
