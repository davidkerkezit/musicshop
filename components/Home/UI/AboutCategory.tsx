import Label from "@/components/UI/Label";
import { AboutCategoryType } from "@/libs/types";
import Image from "next/image";

const AboutCategory = ({
  background,
  quote,
  label,
  description,
  artist,
  profession,
  statement,
  width,
  height,
  imageSrc,
  imageAlt,
  imageStyle,
}: AboutCategoryType) => {
  return (
    <>
      <div className={`w-full h-max flex flex-col  ${background} relative `}>
        <div className="absolute top-0 bottom-0 left-0 right-0 bg-black/80" />
        <Label quote={quote} label={label} />
        <p className="text-base md:text-lg font-thin text-center flex-1 px-5 relative z-10 py-10 ">
          {description}
        </p>
      </div>
      <div className="bg-gradient-to-r from-neutral-900 to-neutral-800 flex flex-col-reverse lg:flex-row-reverse h-max lg:h-[30rem] overflow-hidden px-5 py-5  lg:items-center  ">
        <div className="flex flex-col items-center lg:w-1/2  ">
          <h3 className="text-3xl md:text-4xl  uppercase font-semibold ">
            {artist}
          </h3>
          <p className="text-sm md:text-lg text-juice text-center  italic font-thin  pb-4">
            {profession}
          </p>
          <div
            className={`vector-1-sm block lg:hidden relative  w-[2rem] mx-auto my-5 overflow-hidden`}
          >
            <Image
              width={width}
              height={height}
              src={imageSrc}
              alt={imageAlt}
              className={imageStyle}
            />
          </div>
          <p className="lg:pr-10 text-center text-base md:text-lg lg:pt-10">
            {statement}
          </p>
        </div>
        <div className="w-full lg:w-1/2   relative ">
          <div
            className={`vector-1 lg:block hidden lg:absolute w-[2rem]   mx-auto my-auto top-0 bottom-0 left-0 right-0 overflow-hidden`}
          >
            <Image
              width={width}
              height={height}
              src={imageSrc}
              alt={imageAlt}
              className={imageStyle}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutCategory;
