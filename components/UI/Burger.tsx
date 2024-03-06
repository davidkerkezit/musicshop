"use client";
import { useState } from "react";

const Burger = () => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const menuHandler = () => {
    setOpenMenu((openMenu) => !openMenu);
  };
  return (
    <button onClick={menuHandler} className="w-[1.2rem] h-[1.2rem] relative   ">
      <div
        className={` bg-white w-full h-[1px]  absolute  ${
          openMenu ? "animate-menuFirst top-0 bottom-0 my-auto" : " top-0 "
        }`}
      />
      <div
        className={`  w-full h-[1px]  ${
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
