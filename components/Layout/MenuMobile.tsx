"use client";
import MENU, { BASE_URL } from "@/libs/utils";
import { Menu } from "@/libs/types";
import Link from "next/link";
import Image from "next/image";
import LOGO from "@/assets/logo.png";
import { usePathname } from "next/navigation";
import { MdKeyboardBackspace } from "react-icons/md";
import { useSelector } from "react-redux";
import { AppDispatch, useAppSelector } from "@/libs/store";
import { useDispatch } from "react-redux";
import { hideMenu, showMenu } from "@/libs/features/menuSlice";
import { useEffect } from "react";

const MenuMobile = () => {
  const path = usePathname();
  const showMenu = useAppSelector((state) => state.menuSlice);
  const dispatch = useDispatch<AppDispatch>();
  let delay = 50;
  return (
    <div
      className={`bg-black/60 backdrop-blur-lg fixed top-0 bottom-0  w-full h-full z-50 flex flex-col items-center gap-4 md:hidden ${
        showMenu && "animate-openFromLeft"
      } ${showMenu === false && "animate-closeToLeft"} ${
        showMenu === null && " -left-[100%] md:-left-[25%]"
      }`}
    >
      <div className="w-full flex justify-between items-end mt-5 px-4">
        <p className="text-lg">
          Welcome to{" "}
          <span className="bg-light-juice/30 px-2 text-white ">musicshop.</span>
        </p>
        <button
          className="bg-light-juice text-black text-3xl "
          onClick={() => {
            dispatch(hideMenu());
          }}
        >
          <MdKeyboardBackspace />
        </button>
      </div>
      <div className="flex flex-col  w-full">
        {MENU.map((item: Menu) => {
          delay = delay + 200;
          return (
            <Link
              onClick={() => dispatch(hideMenu())}
              key={item.label}
              href={item.link}
              className={`text-2xl font-thin text-center py-4 text-white border-y-light-juice/5 border-y-[1px] w-full flex items-center gap-2 justify-center relative ${
                showMenu && ` animate-opacity  delay-${delay}`
              }  ${
                path === item.link
                  ? "bg-white/10 border-y-light-juice/80"
                  : "bg-transparent border-y-light-juice/5"
              }`}
            >
              <p>{item.label}</p>
              {path === item.link && (
                <Image
                  alt="LOGO"
                  width={40}
                  height={40}
                  src={LOGO}
                  className="absolute right-4"
                />
              )}
            </Link>
          );
        })}
        <Link
          onClick={() => dispatch(hideMenu())}
          className={`text-2xl font-thin text-center py-4 text-white border-y-light-juice/5 border-y-[1px] w-full flex items-center gap-2 justify-center relative ${
            showMenu && ` animate-opacity  delay-500`
          } ${path === "dashboard" ? "bg-white/10" : "bg-transparent"}`}
          href={`${BASE_URL}/dashboard`}
        >
          Dashboard
        </Link>
      </div>
      <div className="absolute bottom-5  flex flex-col items-center">
        <Image
          alt="LOGO"
          width={150}
          height={150}
          src={LOGO}
          className="grayscale"
        />
        <p className="text-light-juice">MusicShop</p>
      </div>
    </div>
  );
};

export default MenuMobile;
