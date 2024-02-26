"use client";
import { AppDispatch, useAppSelector } from "@/libs/store";
import React from "react";
import { useDispatch } from "react-redux";
import { hideCart } from "@/libs/features/cartSlice";
import { hideSearch } from "@/libs/features/searchSliderSlice";

const Modal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const showCart = useAppSelector((state) => state.cartSlice.isVisible);
  const showSearch = useAppSelector((state) => state.searchSliderSlice);

  const modalHandler = () => {
    showCart && dispatch(hideCart());
    showSearch && dispatch(hideSearch());
  };
  return (
    <div
      onClick={modalHandler}
      className={`fixed top-0 right-0 left-0 bottom-0 z-50 h-[100vh] bg-black/50 ${
        showCart || showSearch ? "block" : "hidden"
      }`}
    />
  );
};

export default Modal;
