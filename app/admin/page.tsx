import { PageBanner, LoginForm } from "@/components";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Music Shop | Admin",
};
const page = () => {
  return (
    <>
      <PageBanner page="Admin Section" />
      <LoginForm />
    </>
  );
};

export default page;
