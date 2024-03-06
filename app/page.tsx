import ContactForm from "@/components/Forms/ContactForm";
import {
  AboutCategories,
  Banner,
  Categories,
  Testimonials,
} from "@/components/Home";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Music Shop | Home",
  description:
    "Welcome to Musicshop London - your premier destination for vinyl records, DJ equipment, and audio software. Explore our extensive collection and elevate your music experience today.",
};
export default function Home() {
  return (
    <main>
      <Banner />
      <Categories />
      <AboutCategories />
      <Testimonials />
      <ContactForm />
    </main>
  );
}
