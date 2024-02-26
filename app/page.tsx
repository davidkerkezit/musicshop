import {
  Banner,
  Categories,
  ContactForm,
  Dj,
  Softwere,
  Testimonials,
  Vinyl,
} from "@/components";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Music Shop | Home",

  description: "Feel Our Vibe",
};
export default function Home() {
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
