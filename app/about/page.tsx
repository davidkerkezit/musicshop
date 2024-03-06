import AboutUsSection from "@/components/About/AboutUsSection";
import PageBanner from "@/components/UI/PageBanner";
import { Metadata } from "next";
import { AboutUsContentType } from "@/libs/types";
import { aboutUsContent } from "@/libs/utils";

export const metadata: Metadata = {
  title: "Music Shop | About Us",
  description:
    "At Musicshop London, our passion for music drives everything we do. Learn more about our story, mission, and commitment to providing the best products and services for music enthusiasts like you. Discover the heart behind Musicshop and join us on our journey to elevate the world of music.",
};
const page = () => {
  return (
    <>
      <PageBanner page="About Us" />
      <div className="relative z-10 m-32 flex flex-col gap-10 ">
        {aboutUsContent.map((content: AboutUsContentType, index: number) => {
          let isEven = index % 2 === 0;
          return <AboutUsSection content={content} isEven={isEven} />;
        })}
      </div>
    </>
  );
};

export default page;
