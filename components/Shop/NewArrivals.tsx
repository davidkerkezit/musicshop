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
  const [stretchValue, setStretchValue] = useState(7); // Default stretch value

  useEffect(() => {
    // Update stretch value based on screen size
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        // Medium-sized screens or smaller (adjust as needed)
        setStretchValue(4);
      } else {
        // Other screen sizes
        setStretchValue(7); // Default stretch value
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Call the function initially

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    if (
      search === null &&
      sortParam === null &&
      collection === null &&
      page === null
    ) {
      return;
    }
    sortRef.current?.scrollIntoView();
  }, [search, sortParam, page, collection]);
  return (
    <div className=" md:py-0 lg:py-10 bg-gradient-to-r from-gray-900/20 to-gray-500/20">
      <h3 className="mx-2 text-3xl py-2 font-bold">
        <span className=" font-thin">New</span> Arrivals
      </h3>
      <Swiper
        autoplay={true}
        breakpoints={{
          576: {
            slidesPerView: 4,
          },
          1000: {
            slidesPerView: 7,
          },
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
        mousewheel={true}
        keyboard={true}
        modules={[Pagination, Mousewheel, Keyboard, Autoplay]}
        className="w-full    "
      >
        {products.map((product, index: number) => {
          return (
            <SwiperSlide key={index} className="h-[50rem]">
              <ProductCard product={product} />
              <div ref={sortRef} className="md:pb-0 lg:pb-10" />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default NewArrivals;
