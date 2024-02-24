"use client";
import {
  Banner,
  Categories,
  ContactForm,
  Dj,
  Softwere,
  Testimonials,
  Vinyl,
} from "@/components";
import { useAppSelector } from "@/libs/store";

export default function Home() {
  const showCart = useAppSelector((state) => state.cartSlice.isVisible);

  return (
    <main className="">
      <Banner />
      <Categories />
      <Vinyl />
      <Dj />
      <Softwere />
      <Testimonials />
      <ContactForm />
    </main>
  );
}
