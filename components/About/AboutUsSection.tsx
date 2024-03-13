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
    ? "lg:border-l-[3px] lg:border-l-juice lg:pl-10 md:pl-5  "
    : "lg:border-r-[3px] lg:border-r-juice lg:pr-10 md:pr-5  ";
  return (
    <div className="flex flex-col md:items-center md:even:flex-row-reverse md:odd:flex-row md:h-[18rem] lg:max-w-[1350px] lg:mx-auto">
      <div className="relative md:p-0 lg:p-5  md:bg-white/20 bg-transparent  md:rounded-3xl  mx-auto lg:mt-5 md:w-1/2 overflow-hidden h-[18rem]">
        <Image
          src={content.imgSrc}
          alt="about-us"
          width={700}
          height={700}
          className=" md:rounded-3xl grayscale float-right h-[18rem] lg:h-full object-cover  "
        />
        <h3 className="text-4xl md:hidden font-semibold absolute top-0 left-0 right-0 bottom-0 mx-auto my-auto bg-black/80 md:py-0 py-2 backdrop-blur-md h-max w-full text-center border-y-[1px] border-y-juice ">
          {content.header}
        </h3>
      </div>
      <div
        className={`flex flex-col gap-5 md:w-full w-[85%] mx-auto  ${isEvenStyle}`}
      >
        <h3 className="text-4xl font-semibold hidden md:block">
          {content.header}
        </h3>
        <p className="2xl:text-lg text-white/60 font-extralight  w-full xl:text-base text-base sm:text-lg md:text-base text-center lg:text-left mt-4 md:mt-0 md:text-justify">
          {content.text}
        </p>
      </div>
    </div>
  );
};

export default AboutUsSection;
