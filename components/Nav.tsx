"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaGooglePlay, FaRegUser } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { AiOutlineShopping } from "react-icons/ai";
import Burger from "./Burger";
import { Menu } from "@/libs/types";
import { usePathname, useRouter } from "next/navigation";
import { hideSearch, toogleSearch } from "@/libs/features/searchSliderSlice";
import { hideCart, toggleCart } from "@/libs/features/cartSlice";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/libs/store";
import MENU, { BASE_URL } from "@/libs/utils";
import { RiMapPinUserLine } from "react-icons/ri";

const Nav = () => {
  const path = usePathname();
  const dispatch = useDispatch<AppDispatch>();
  const showCart = useAppSelector((state) => state.cartSlice.isVisible);
  const cartItems = useAppSelector((state) => state.cartSlice.cartItems);
  const router = useRouter();
  const showSearch = useAppSelector((state) => state.searchSliderSlice);
  const [isUpdatedCart, setIsUpdatedCart] = useState<boolean>(false);
  const showSearchHandler = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    dispatch(toogleSearch());
    showCart && dispatch(hideCart());
  };

  const showCartHandler = () => {
    dispatch(toggleCart());
    showSearch && dispatch(hideSearch());
  };

  useEffect(() => {
    setIsUpdatedCart(true);
    setTimeout(() => {
      setIsUpdatedCart(false);
    }, 1000);
  }, [cartItems]);
  return (
    <header
      className="w-full  z-40 fixed  bg-white/5 "
      id="nav"
      data-nextjs-scroll-focus-boundary
    >
      <nav className="  flex justify-between items-center md:px-8 px-2   py-5  bg-darkness/50 backdrop-blur-sm border-b-[1px] border-juice/5 ">
        {/* Burger menu */}
        <div className="block md:hidden">
          <Burger />
        </div>
        {/* Logo */}
        <Link
          href={"/"}
          className="group flex items-center gap-3 text-xl md:min-w-[160px] "
        >
          <FaGooglePlay className=" group-hover:scale-105 duration-200 text-juice" />
          <p>MusicShop</p>
        </Link>
        {/* MENU */}
        <div className="min-w-[250px] w-[700px]   gap-2 hidden md:flex  ">
          {MENU.map((item: Menu, index: number) => {
            return (
              <Link
                key={index}
                className={`nav-links ${path === item.link && "bg-juice/90"}`}
                href={item.link}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
        {/* Search/User/Cart */}
        <div className=" gap-4 items-bottom text-xl flex  z-50 ">
          <div>
            <button onClick={() => router.push(`${BASE_URL}/dashboard`)}>
              <RiMapPinUserLine className="cursor-pointer text-2xl font-thin   " />
            </button>
          </div>
          <div>
            <button onClick={showSearchHandler}>
              <IoIosSearch className="cursor-pointer text-2xl  " />
            </button>
          </div>
          <div className="relative ">
            <button onClick={showCartHandler}>
              {" "}
              <AiOutlineShopping className="cursor-pointer text-2xl  " />{" "}
            </button>
            {cartItems.length > 0 && (
              <p
                className={`bg-juice ${
                  isUpdatedCart ? "animate-shake" : ""
                } rounded-full absolute -top-[8px] left-[15px] w-[15px] h-[15px] flex items-center justify-center text-xs p-[10px]  lg:text-sm`}
              >
                {cartItems.length}
              </p>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Nav;
