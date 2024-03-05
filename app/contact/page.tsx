import { ContactForm, PageBanner } from "@/components";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Music Shop | Contact",
  description:
    "Get in touch with Musicshop London - your trusted destination for all things music. Whether you have questions about our products, need assistance, or want to collaborate, our team is here to help. Reach out to us today and let's start a conversation about your musical needs",
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
