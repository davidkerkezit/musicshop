"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  RiMapPinUserLine,
  AiOutlineShopping,
  IoIosSearch,
  FaGooglePlay,
} from "@/components/UI/Icons";
import Burger from "../UI/Burger";
import { Menu } from "@/libs/types";
import { usePathname, useRouter } from "next/navigation";
import { hideSearch, toogleSearch } from "@/libs/features/searchSliderSlice";
import { hideCart, toggleCart } from "@/libs/features/cartSlice";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/libs/store";
import MENU, { BASE_URL } from "@/libs/utils";
import { motion } from "framer-motion";
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
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
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
      className="w-full  z-40 fixed  bg-white/5    "
      id="nav"
      data-nextjs-scroll-focus-boundary
    >
      <nav className="  flex justify-between items-center md:px-8 px-3   py-5  bg-darkness/50 backdrop-blur-sm border-b-[1px] border-juice/5 ">
        {/* Burger menu */}
        <div className="flex md:hidden ">
          <Burger />
        </div>
        {/* Logo */}
        <Link
          href={"/"}
          className="group flex items-center gap-3 text-xl md:w-max lg:min-w-[160px] "
        >
          <FaGooglePlay className=" group-hover:scale-105 duration-200 text-juice" />
          <p className="block md:hidden lg:block">MusicShop</p>
        </Link>
        {/* MENU */}
        <div className="min-w-[250px] w-[700px] md:w-full  lg:w-[800px]    gap-2 hidden md:flex md:mx-10  ">
          {MENU.map((item: Menu, index: number) => {
            return (
              <Link
                key={index}
                className={`nav-links relative `}
                href={item.link}
              >
                {path === item.link && (
                  <motion.div
                    layoutId="bubble"
                    className="absolute inset-0 -z-10 bg-juice rounded-xl "
                    transition={{ type: "spring", duration: 0.6 }}
                  ></motion.div>
                )}

                {item.label}
              </Link>
            );
          })}
          <Link className={`nav-links relative`} href={`${BASE_URL}/dashboard`}>
            {(path.includes("dashboard") || path.includes("admin")) && (
              <motion.div
                layoutId="bubble"
                className="absolute inset-0 -z-10 bg-juice rounded-xl "
                transition={{ type: "spring", duration: 0.6 }}
              ></motion.div>
            )}
            Dashboard
          </Link>
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
                } rounded-full absolute -top-[8px] left-[15px] md:w-[15px] md:h-[15px] w-[12px] h-[12px] flex items-center justify-center text-xs p-[8px] md:p-[10px]  lg:text-sm`}
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
