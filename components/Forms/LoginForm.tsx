"use client";
import { loginAuthAction } from "@/libs/actions";
import React, { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import Button from "../UI/SubmitButton";
import { IoMdLogIn } from "react-icons/io";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import SubmitButton from "../UI/SubmitButton";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { BASE_URL, login } from "@/libs/utils";
import Loading from "../UI/Loading";

const initialState = {
  message: null,
};
type FormFields = z.infer<typeof login>;
const LoginForm = () => {
  const [isHiddenPassword, setIsHiddenPassword] = useState(false);
  const router = useRouter();
  const [error, setError] = useState<undefined | number>(undefined);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(login),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data, event) => {
    event?.preventDefault();
    console.log(data);

    const { username, password } = data;
    const status = await loginAuthAction(username, password);
    if (status === 201) {
      router.push(`${BASE_URL}/dashboard`);
    }
    setError(status);
  };
  return (
    <div className="relative z-10 m-14 ">
      {error === 201 ? (
        <Loading />
      ) : (
        <div className="w-1/3  mx-auto ">
          <h1 className=" py-4 text-center text-4xl font-thin">
            Admin Acces Only{" "}
          </h1>
          <p className="text-red-500 text-center mb-4">
            {error === 401 && "Incorect username or password"}
          </p>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className=" flex flex-col gap-5 items-center    "
          >
            <div className="w-full flex flex-col items-center">
              {errors.username && (
                <div className="text-red-500 text-sm">
                  {errors.username.message}
                </div>
              )}
              <div className="flex bg-white/10 border-[2px] border-juice items-center px-4 py-3 rounded-xl w-full">
                <FaUser />

                <input
                  {...register("username")}
                  type="text"
                  name="username"
                  placeholder="Username"
                  className="bg-transparent w-full ml-4 focus:outline-none text-white"
                />
              </div>
            </div>

            <div className="w-full flex flex-col items-center">
              {errors.password && (
                <div className="text-red-500 text-sm">
                  {errors.password.message}
                </div>
              )}
              <div className="flex bg-white/10 border-[2px] border-juice items-center px-4 py-3 rounded-xl w-full">
                <RiLockPasswordFill />

                <input
                  type={isHiddenPassword ? "text" : "password"}
                  {...register("password")}
                  name="password"
                  placeholder="Password"
                  className="bg-transparent w-full ml-4 focus:outline-none text-white"
                />

                <button
                  type="button"
                  onClick={() =>
                    setIsHiddenPassword((isHiddenPassword) => !isHiddenPassword)
                  }
                >
                  {isHiddenPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <Button
              label="Sign in"
              icon={<IoMdLogIn />}
              isSubmitting={isSubmitting}
            />
          </form>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
