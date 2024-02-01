import { PageBanner } from "@/components";
import LoginForm from "@/components/Forms/LoginForm";

const page = async () => {
  // const originalPassword = "Musicadminshop2023";
  // const hashedPassword =
  //   "$2b$10$umkAtc.A1HKW3iBxQ28n3.xAwkEkuh7NoovX/O5gG.mlh4iJGfR5q";

  return (
    <>
      <PageBanner page="Admin Section" />
      <div className="relative z-10 m-32 ">
        <LoginForm />
      </div>
    </>
  );
};

export default page;
