"use client";
import { IoIosStar, FaQuoteLeft, FaQuoteRight } from "@/components/UI/Icons";
import { SwiperSlide, Swiper } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// import required modules
import { Pagination, Mousewheel, Keyboard, Autoplay } from "swiper/modules";
import Image from "next/image";
import { TestimonialType } from "@/libs/types";
import { testimonials } from "@/libs/utils";

const Testimonials = () => {
  return (
    <div className=" bg-neutral-1000 w-full h-max pb-10 ">
      <p className="text-sm md:text-lg text-juice text-center pt-10 italic font-thin">
        "Music is the divine way to tell beautiful, poetic things to the heart."
      </p>
      <h2 className="text-3xl font-semibold text-center pt-3 uppercase">
        Testimonials
      </h2>

      <Swiper
        autoplay={true}
        cssMode={true}
        coverflowEffect={{
          rotate: 1,
          modifier: 2,
          stretch: 7,
          slideShadows: false,
        }}
        effect="coverflow"
        pagination={{ clickable: true }}
        mousewheel={true}
        keyboard={true}
        modules={[Pagination, Mousewheel, Keyboard, Autoplay]}
        className="w-[90%] md:w-[60%] lg:w-[40%] mt-10 rounded-2xl "
      >
        {testimonials.map((testimonial: TestimonialType) => {
          const stars = Array.from({ length: testimonial.stars });
          return (
            <SwiperSlide
              className=" bg-gradient-to-tr from-neutral-600 to-neutral-800  text-black w-[10rem] rounded-2xl "
              key={testimonial.name}
            >
              <div className="border-b-[1px] border-b-white/5 rounded-2xl shadow-lg h-[17rem]  ">
                <div className="mx-10 my-10 lg:px-14 relative rounded-2xl ">
                  <FaQuoteLeft className="text-2xl text-neutral-500 absolute -top-2 -left-8 lg:-left-0" />
                  <p className="text-center italic font-thin text-neutral-200 h-[11.9rem]  overflow-y-scroll scrollbar-hide  ">
                    {testimonial.text}
                  </p>
                  <FaQuoteRight className="text-2xl text-neutral-500 absolute -bottom-2 -right-8 lg:-right-0" />
                </div>
              </div>
              <div className="flex flex-col gap-4 items-center relative py-14 lg:py-16 px-20 h-[12rem] lg:h-[12.5rem] bg-gradient-to-tr from-neutral-700 to-neutral-900 ">
                <Image
                  src={testimonial.imageSrc}
                  alt="customer"
                  width={100}
                  height={100}
                  className="mx-auto bg-light-juice border-[5px] border-light-juice rounded-full absolute -top-[2rem] lg:-top-[2.6rem] aspect-square object-cover w-1/5 md:w-[15%] lg:w-[5rem]"
                />
                <div className="flex gap-[2px]">
                  {stars.map((star: any, index: number) => {
                    return (
                      <IoIosStar
                        key={index}
                        className=" text-yellow-500 text-2xl"
                      />
                    );
                  })}
                </div>
                <div className="flex flex-col items-center ">
                  <p className="text-2xl font-medium text-neutral-200">
                    {testimonial.name}
                  </p>
                  <p className="italic text-neutral-400">
                    {testimonial.occupation}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Testimonials;
