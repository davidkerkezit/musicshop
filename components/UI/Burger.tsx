"use client";
import { showMenu } from "@/libs/features/menuSlice";
import { AppDispatch, useAppSelector } from "@/libs/store";
import { useState } from "react";
import { useDispatch } from "react-redux";

const Burger = () => {
  const dispatch = useDispatch<AppDispatch>();
  const openMenu = useAppSelector((state) => state.menuSlice);

  const menuHandler = () => {
    dispatch(showMenu());
  };
  return (
    <button onClick={menuHandler} className="w-[1.3rem] h-[1rem] relative   ">
      <div
        className={` bg-white w-full h-[1px]  absolute  ${
          openMenu ? "animate-menuFirst top-0 bottom-0 my-auto" : " top-0 "
        }`}
      />
      <div
        className={`  w-[80%] h-[1px]  ${
          openMenu ? "bg-transparent" : "bg-white"
        } `}
      />
      <div
        className={` bg-white w-full h-[1px]  absolute ${
          openMenu ? "animate-menuThird top-0 bottom-0 my-auto" : " bottom-0"
        }`}
      />
    </button>
  );
};

export default Burger;
