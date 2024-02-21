"use client";
import { SwiperSlide, Swiper } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules

import { Pagination, Mousewheel, Keyboard, Autoplay } from "swiper/modules";
import { ProductType } from "@/libs/types";

import ProductCard from "../UI/ProductCard";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
const NewArrivals = ({ products }: { products: ProductType[] }) => {
  const sortRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const search = searchParams.get("q");
  const sortParam = searchParams.get("sort");
  const collection = searchParams.get("collection");
  const page = searchParams.get("page");

  useEffect(() => {
    sortRef.current?.scrollIntoView();
  }, [search, sortParam, page, collection]);
  return (
    <div className="py-10 bg-gradient-to-r from-gray-900/20 to-gray-500/20">
      <h3 className="mx-2 text-3xl py-2 font-bold">
        <span className=" font-thin">New</span> Arrivals
      </h3>
      <Swiper
        autoplay={true}
        slidesPerView={7}
        cssMode={true}
        coverflowEffect={{
          rotate: 1,
          modifier: 2,
          stretch: 7,
          slideShadows: false,
        }}
        effect="coverflow"
        // pagination={{ clickable: true }}
        mousewheel={true}
        keyboard={true}
        modules={[Pagination, Mousewheel, Keyboard, Autoplay]}
        className="w-full    "
      >
        {products.map((product, index: number) => {
          return (
            <SwiperSlide key={index}>
              <ProductCard product={product} />
              <div ref={sortRef} className="pb-10" />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default NewArrivals;
