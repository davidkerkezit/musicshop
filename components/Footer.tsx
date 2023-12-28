import Link from "next/link";
import { FaAngleDoubleRight, FaFacebook } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { FaPhoneVolume } from "react-icons/fa";
import { IoIosPin } from "react-icons/io";
import { GrFacebookOption } from "react-icons/gr";
import { GrInstagram } from "react-icons/gr";
import { MdKeyboardArrowUp } from "react-icons/md";
import MENU from "@/constants";
import { Menu } from "@/libs/types";

const Footer = () => {
  return (
    <footer className="bg-black flex flex-col  ">
      <div className="flex justify-between  pb-5 pt-10 md:py-10 gap-1 md:border-b-[1px] border-b-white/20 md:mx-6  ">
        <div className="flex flex-col items-center gap-3 w-1/3">
          <div className="text-xl md:text-3xl p-3 bg-juice rounded-full w-max">
            <FaPhoneVolume />
          </div>
          <p className="text-white/70 text-xs md:text-base text-center">
            +123 456 789
          </p>
        </div>
        <div className="flex flex-col items-center gap-3 w-1/3">
          <div className="text-xl md:text-3xl  p-3 bg-juice rounded-full w-max">
            <IoIosMail />
          </div>
          <p className="text-white/70 text-xs md:text-base text-center">
            music-shop@gmail.com
          </p>
        </div>
        <div className="flex flex-col items-center gap-3 w-1/3 ">
          <div className="text-xl md:text-3xl  p-3 bg-juice rounded-full w-max">
            <IoIosPin />
          </div>
          <p className="text-white/70 text-xs md:text-base text-center">
            11A Abraham Street, London
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3  justify-between   py-5 md:mx-20 ">
        <div className="flex flex-col gap-4  items-center  w-full md:w-1/3">
          <p className="text-lg font-medium ">Sitemap</p>
          <div className="flex flex-col flex-center text-neutral-400 text-base font-thin items-center md:items-start">
            {MENU.map((item: Menu, index: number) => {
              return (
                <Link
                  key={index}
                  href={item.link}
                  className="md:border-l-[3px] md:border-l-juice md:pl-3 text-neutral-200 font-normal"
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col gap-4  items-center w-full md:w-1/3 ">
          <p className="text-lg font-medium">Categories</p>
          <div className="flex flex-col text-neutral-400 text-base font-thin items-center md:items-start ">
            <Link
              href={"/"}
              className="md:border-l-[3px] md:border-l-juice md:pl-3 text-neutral-200 font-normal"
            >
              Vinyls
            </Link>
            <Link
              href={"/"}
              className="md:border-l-[1px] md:border-l-transparent md:pl-3"
            >
              DJ Equipments
            </Link>
            <Link
              href={"/"}
              className="md:border-l-[1px] md:border-l-transparent md:pl-3"
            >
              Softweres
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-4 col-span-2 md:col-span-1	mt-4  md:w-full  items-center">
          <p className="text-lg font-medium">Subscribe</p>
          <div className="flex flex-col gap-2">
            <div className="bg-white flex items-center ">
              {" "}
              <input
                type="text"
                className="bg-transparent w-full py-1 pl-2 "
                placeholder="Email Address"
              />
              <FaAngleDoubleRight className="text-juice text-4xl pr-1" />
            </div>
            <p className="text-neutral-400 font-thin italic text-sm">
              Get digital marketing updates in your mailbox
            </p>
          </div>
        </div>
      </div>
      <div className="bg-neutral-900/30 relative pt-5 pb-12">
        <div className=" flex w-max mx-auto gap-7 ">
          <div className="text-xl p-3 rounded-full border-[1px] border-neutral-400 text-neutral-400">
            <GrFacebookOption />
          </div>
          <div className="text-xl p-3 rounded-full border-[1px] border-neutral-400 text-neutral-400">
            <GrInstagram />
          </div>
        </div>
        <p className="text-neutral-400 absolute bottom-4 md:bottom-2  left-0 right-0 text-center font-thin italic text-sm ">
          © 2023 David Kerkez. All rights reserved.
        </p>
        <button className="text-base md:text-2xl bg-juice p-2 rounded-full absolute top-2 right-2 md:top-3 md:right-3">
          <MdKeyboardArrowUp />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
