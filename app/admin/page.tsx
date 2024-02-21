import { PageBanner } from "@/components";
import LoginForm from "@/components/Forms/LoginForm";

const page = async () => {
  return (
    <>
      <PageBanner page="Admin Section" />
      <div className="relative z-10 m-14 ">
        <LoginForm />
      </div>
    </>
  );
};

export default page;
