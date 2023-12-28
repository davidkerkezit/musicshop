import Label from "@/components/UI/Label";
import { StaticImageData } from "next/image";

const AboutCategory = ({
  background,
  quote,
  label,
  description,
}: {
  background: string;
  quote: string;
  label: string;
  description: string;
}) => {
  return (
    <div className={`w-full h-max flex flex-col  ${background} relative `}>
      <div className="absolute top-0 bottom-0 left-0 right-0 bg-black/80" />
      <Label quote={quote} label={label} />
      <p className="text-base md:text-lg font-thin text-center flex-1 px-5 relative z-10 py-10 ">
        {description}
      </p>
    </div>
  );
};

export default AboutCategory;
