import CheckoutDetails from "@/components/Checkout/CheckoutDetails";
import PageBanner from "@/components/UI/PageBanner";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Music Shop | Checkout",
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
