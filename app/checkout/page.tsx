import { PageBanner, CheckoutDetails } from "@/components";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Music Shop | Checkout",

  description: "Feel Our Vibe",
};
const page = () => {
  return (
    <>
      <PageBanner page="Checkout" />
      <CheckoutDetails />
    </>
  );
};

export default page;
