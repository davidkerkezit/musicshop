import { AboutUsContentType } from "@/libs/types";
import Image from "next/image";

const AboutUsSection = ({
  content,
  isEven,
}: {
  content: AboutUsContentType;
  isEven: boolean;
}) => {
  const isEvenStyle: string = isEven
    ? "border-l-[3px] border-l-juice pl-10"
    : "border-r-[3px] border-r-juice pr-10";
  return (
    <div className="flex items-center even:flex-row-reverse odd:flex-row ">
      <div className="p-7 bg-white/10 rounded-3xl  w-1/2">
        <Image
          src={content.imgSrc}
          alt=""
          width={700}
          height={700}
          className="rounded-3xl object-cover grayscale "
        />
      </div>
      <div className={`flex flex-col gap-5 w-full ${isEvenStyle}`}>
        <h3 className="text-4xl font-semibold">{content.header}</h3>
        <p className="2xl:text-lg text-white/60 font-extralight  w-full xl:text-base text-sm">
          {content.text}
        </p>
      </div>
    </div>
  );
};

export default AboutUsSection;
