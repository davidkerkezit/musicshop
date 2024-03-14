"use client";
import { Filter, SearchSection } from "@/components/Shop";
import React from "react";
import Image from "next/image";
import LOGO from "@/assets/logo.png";
import { SwiperSlide, Swiper } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Pagination, Mousewheel, Keyboard, Autoplay } from "swiper/modules";
import ProductSkeleton from "@/components/Skeletons/ProductSkeleton";
const loading = () => {
  return (
    <div>
      <SearchSection />

      <div className="bg-white/30 w-full h-max  flex ">
        <div className=" md:py-0 lg:py-10 bg-[#03040a] w-full">
          <h3 className="mx-2 text-3xl py-2 font-bold">
            <span className=" font-thin">New</span> Arrivals
          </h3>
          <Swiper
            mousewheel={true}
            direction={"horizontal"}
            autoplay={true}
            breakpoints={{
              370: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              670: {
                slidesPerView: 3,
                spaceBetween: 5,
              },
              686: {
                slidesPerView: 4,
                spaceBetween: 5,
              },
              1022: {
                slidesPerView: 5,
                spaceBetween: 5,
              },
              1222: {
                slidesPerView: 6,
                spaceBetween: 5,
              },
              1500: {
                slidesPerView: 7,
                spaceBetween: 5,
              },
            }}
            pagination={{
              clickable: true,
            }}
            cssMode={true}
            coverflowEffect={{
              rotate: 1,
              modifier: 2,
              stretch: 7,
              slideShadows: false,
            }}
            effect="coverflow"
            // pagination={{ clickable: true }}

            keyboard={true}
            modules={[Pagination, Mousewheel, Keyboard, Autoplay]}
            className="w-full    "
          >
            {[...Array(12)].map((_, index: number) => {
              return (
                <SwiperSlide key={index} className="h-[35rem] bg-white">
                  <ProductSkeleton />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
      <Filter />
      <div
        className={` grid   gap-2 lg:grid-cols-4 grid-cols-2 sm:grid-cols-3 md:w-[80%] mx-auto`}
      >
        {[...Array(12)].map((_, index: number) => {
          return <ProductSkeleton />;
        })}
      </div>
    </div>
  );
};

export default loading;
