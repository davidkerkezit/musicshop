"use client";
import { loginAuthAction } from "@/libs/actions";
import React from "react";
import { useFormState } from "react-dom";
const initialState = {
  message: null,
};

const LoginForm = () => {
  const [state, formAction] = useFormState<any, FormData>(
    loginAuthAction,
    initialState
  );
  return (
    <form action={formAction}>
      <div>
        <label htmlFor="">Username</label>
        <input type="text" name="username" id="" />
      </div>
      <div>
        <label htmlFor="">Password</label>
        <input type="password" name="password" id="" />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default LoginForm;
