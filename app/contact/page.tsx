"use client";
import { ContactForm, PageBanner } from "@/components";

const page = () => {
  return (
    <div className="">
      <PageBanner page="Contact" />
      <div className="relative z-10 m-32 ">
        <ContactForm />
      </div>
    </div>
  );
};

export default page;
