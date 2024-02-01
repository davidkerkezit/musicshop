"use client";
import { loginAuthAction } from "@/libs/actions";
import React from "react";
import { useFormState } from "react-dom";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import Button from "../UI/Button";
import { IoMdLogIn } from "react-icons/io";

const initialState = {
  message: null,
};

const LoginForm = () => {
  const [state, formAction] = useFormState<any, FormData>(
    loginAuthAction,
    initialState
  );
  return (
    <div className="w-1/3  mx-auto ">
      <h1 className=" py-4 text-center text-4xl font-thin">
        Admin Acces Only{" "}
      </h1>
      <form
        action={formAction}
        className=" flex flex-col gap-5 items-center    "
      >
        <div className="flex bg-white/10 border-[2px] border-juice items-center px-4 py-3 rounded-xl w-full">
          <FaUser />

          <input
            type="text"
            name="username"
            placeholder="Username"
            id=""
            className="bg-transparent w-full ml-4 focus:outline-none"
          />
        </div>
        <div className="flex bg-white/10 border-[2px] border-juice items-center px-4 py-3 rounded-xl w-full">
          <RiLockPasswordFill />

          <input
            type="password"
            name="password"
            id=""
            placeholder="Password"
            className="bg-transparent w-full ml-4 focus:outline-none"
          />
        </div>
        <Button label="Sign in" icon={<IoMdLogIn />} />
      </form>
    </div>
  );
};

export default LoginForm;
