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

export default function Home() {
  return (
    <main>
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
