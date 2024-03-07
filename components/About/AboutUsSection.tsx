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
    ? "md:border-l-[3px] md:border-l-juice md:pl-10  "
    : "md:border-r-[3px] md:border-r-juice md:pr-10  ";
  return (
    <div className="flex flex-col md:items-center md:even:flex-row-reverse md:odd:flex-row ">
      <div className="relative md:p-7  md:bg-white/10 bg-transparent  md:rounded-3xl  mx-auto mt-5 md:w-1/2 overflow-hidden">
        <Image
          src={content.imgSrc}
          alt="about-us"
          width={700}
          height={700}
          className=" md:rounded-3xl object-cover grayscale "
        />
        <h3 className="text-4xl md:hidden font-semibold absolute top-0 left-0 right-0 bottom-0 mx-auto my-auto bg-black/80 md:py-0 py-2 backdrop-blur-md h-max w-full text-center border-y-[1px] border-y-juice">
          {content.header}
        </h3>
      </div>
      <div
        className={`flex flex-col gap-5 md:w-full w-[85%] mx-auto ${isEvenStyle}`}
      >
        <h3 className="text-4xl font-semibold hidden md:block">
          {content.header}
        </h3>
        <p className="2xl:text-lg text-white/60 font-extralight  w-full xl:text-base text-base text-center md:text-left mt-4 md:mt-0">
          {content.text}
        </p>
      </div>
    </div>
  );
};

export default AboutUsSection;
