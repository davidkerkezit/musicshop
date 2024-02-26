import { aboutUsContent } from "@/libs/content";
import { AboutUsSection, PageBanner } from "@/components";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Music Shop | About Us",

  description: "Feel Our Vibe",
};
const page = () => {
  return (
    <div>
      <PageBanner page="About Us" />
      <div className="relative z-10 m-32 flex flex-col gap-10 ">
        {aboutUsContent.map((content, index) => {
          let isEven = index % 2 === 0;
          return <AboutUsSection content={content} isEven={isEven} />;
        })}
      </div>
    </div>
  );
};

export default page;
