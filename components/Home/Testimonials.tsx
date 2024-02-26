// Import Swiper React components
"use client";
import { IoIosStar } from "react-icons/io";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { SwiperSlide, Swiper } from "swiper/react";
// Import Swiper styles
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules

import { Pagination, Mousewheel, Keyboard, Autoplay } from "swiper/modules";
import Image, { StaticImageData } from "next/image";
import USER1 from "../../assets/user1.jpg";
import USER2 from "../../assets/user2.jpg";
import USER3 from "../../assets/user3.jpg";
import USER4 from "../../assets/user4.jpg";
import USER5 from "../../assets/user5.jpg";
import USER6 from "../../assets/user6.jpg";
import USER7 from "../../assets/user7.jpg";
import USER8 from "../../assets/user8.jpg";
import { TestimonialType } from "@/libs/types";
interface TestimonialTypes {
  name: string;
  occupation: string;
  text: string;
  stars: number;
  imageSrc: StaticImageData;
}
const testimonials = [
  {
    name: "Erick Johnson",
    occupation: "Customer",
    text: "Discovering this vinyl store was a game-changer for me! The diverse collection and rare finds have elevated my music experience. The attention to detail in curating the selection is unmatched. Each record tells a story, and I love the personalized touch in every recommendation. The staff's passion for music shines through, making every visit an adventure. My vinyl collection has flourished, thanks to this gem of a store!",
    stars: 5,
    imageSrc: USER1,
  },

  {
    name: "Ethan Turner",
    occupation: "Customer",
    text: "From the moment I delved into this audio software store, my music production journey reached new heights. The vast selection of cutting-edge software blew me away, and the expert guidance from the team ensured I found the perfect tools for my craft. The seamless purchase process and regular updates have made this my go-to destination for all things audio. My compositions have evolved, and my creativity knows no bounds, all thanks to the incredible software I discovered here.",
    stars: 5,
    imageSrc: USER2,
  },
  {
    name: "Marcus Bennett",
    occupation: "DJ",
    text: "Stepping into this DJ equipment haven was a game-changer for my mixes. The store's array of cutting-edge gear is a DJ's dream come true. The staff's expertise and passion for music translate into invaluable advice, ensuring I make the right choices for my setup. Each piece of equipment I've invested in here has elevated my performances and studio sessions. It's more than a store; it's a hub for DJs, fostering a community where beats and innovation collide. My sound has evolved, and my sets have never been more electrifying, all thanks to this DJ paradise.",
    stars: 5,
    imageSrc: USER3,
  },
  {
    name: "Oliver Mitchell",
    occupation: "Customer",
    text: "Discovering this DJ equipment oasis has transformed my music journey. The store's comprehensive selection, coupled with the expert guidance of the staff, has made navigating the world of DJ gear a breeze. Every piece I've acquired here has been a game-changer for my performances. The commitment to quality and the latest technology is evident in every product. It's not just a store; it's a sanctuary for DJs, where the rhythm of beats meets the pulse of innovation. My mixes have soared to new heights, and I'm endlessly grateful for the treasure trove of gear I found here.",
    stars: 5,
    imageSrc: USER4,
  },
  {
    name: "Lucas Foster",
    occupation: "Music Producer",
    text: "The staff at this music haven isn't just knowledgeable; they're passionate curators of sonic experiences. Their genuine enthusiasm for music is contagious, turning every visit into a delightful exploration. Whether guiding me through vinyl gems or recommending the latest DJ gear, their expertise has been invaluable. It's not just a store; it's an ensemble of dedicated individuals whose love for music elevates the entire shopping experience. Their personalized recommendations and friendly demeanor create a sense of community, making each interaction a harmonious connection in the world of sound.",
    stars: 5,
    imageSrc: USER5,
  },
  {
    name: "Nathan Hayes",
    occupation: "Customer",
    text: "Finding this audio software paradise was a game-changer for my music projects. The store's curated collection of software has not only enhanced the quality of my productions but has also streamlined my creative process. The intuitive interface and powerful features of the software I purchased here have become indispensable in my studio. The customer support is top-notch, making every purchase a smooth and enjoyable experience. It's more than just a store; it's a key player in the symphony of my musical endeavors.",
    stars: 5,
    imageSrc: USER6,
  },
  {
    name: "Adrian Reynolds",
    occupation: "Partner",
    text: "Walking into this vinyl sanctuary was like entering a music lover's paradise. The curated selection of records, spanning genres and eras, captured my heart from the first note. The knowledgeable staff transformed my browsing into a personalized journey, recommending hidden gems that now hold a cherished place in my collection. It's not just a store; it's a haven where the crackle of vinyl and the warmth of analog sound create an immersive experience. Every visit feels like a musical adventure, and my love for vinyl has deepened thanks to this extraordinary haven.",
    stars: 5,
    imageSrc: USER7,
  },
  {
    name: "Mark Peterson",
    occupation: "Customer",
    text: "I stumbled upon this vinyl haven and instantly fell in love. The ambiance is cozy, and the staff's knowledge is impressive. Every vinyl I've purchased has exceeded my expectations. The store's commitment to quality and the joy of music is evident in every corner. It's more than a store; it's a haven for music enthusiasts. My vinyl journey wouldn't be the same without it!",
    stars: 5,
    imageSrc: USER8,
  },
];
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
        {testimonials.map((testimonial: TestimonialTypes, index: number) => {
          const stars = Array.from({ length: testimonial.stars });
          return (
            <SwiperSlide
              className=" bg-gradient-to-tr from-neutral-600 to-neutral-800  text-black w-[10rem] rounded-2xl "
              key={index}
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
