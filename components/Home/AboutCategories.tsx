"use client";
import { aboutCategories } from "@/libs/utils";
import { AboutCategory } from "@/components/Home";
import { AboutCategoryType } from "@/libs/types";
const AboutCategories = () => {
  return (
    <>
      {aboutCategories.map((category: AboutCategoryType) => {
        return (
          <AboutCategory
            key={category.label}
            background={category.background}
            quote={category.quote}
            label={category.label}
            description={category.description}
            artist={category.artist}
            profession={category.profession}
            statement={category.statement}
            width={category.width}
            height={category.height}
            imageSrc={category.imageSrc}
            imageAlt={category.imageAlt}
            imageStyle={category.imageStyle}
          />
        );
      })}
    </>
  );
};

export default AboutCategories;
