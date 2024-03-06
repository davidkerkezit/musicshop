import LoginForm from "@/components/Forms/LoginForm";
import PageBanner from "@/components/UI/PageBanner";
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
