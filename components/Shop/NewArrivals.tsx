"use client";
import { SwiperSlide, Swiper } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Pagination, Mousewheel, Keyboard, Autoplay } from "swiper/modules";
import { ProductType } from "@/libs/types";
import ProductCard from "../UI/ProductCard";

const NewArrivals = ({ products }: { products: ProductType[] }) => {
  return (
    <div className=" md:py-0 lg:py-10 bg-gradient-to-r from-gray-900/20 to-gray-500/20">
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
        {products.map((product, index: number) => {
          return (
            <SwiperSlide key={index} className="h-[55rem]">
              <ProductCard product={product} parent="swiper" />
              <div id="sort" className="pb-10 lg:pb-10" />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default NewArrivals;
