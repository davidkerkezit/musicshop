import { ContactForm, PageBanner } from "@/components";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Music Shop | Contact",

  description: "Feel Our Vibe",
};
const page = () => {
  return (
    <>
      <PageBanner page="Contact" />
      <ContactForm />
    </>
  );
};

export default page;
