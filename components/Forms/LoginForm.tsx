"use client";
import { loginAuthAction } from "@/libs/actions";
import React, { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import Button from "../UI/Button";
import { IoMdLogIn } from "react-icons/io";
import { FaEye,FaEyeSlash } from "react-icons/fa";
import SubmitButton from "../UI/SubmitButton";
import { useRouter } from "next/navigation";


const initialState = {
  message: null,
};

const LoginForm = () => {
  const [isHiddenPassword,setIsHiddenPassword] = useState(false)
 const router = useRouter()
  const [state, formAction] = useFormState<any, FormData>(
    loginAuthAction,
    initialState
  );
useEffect(() => {

  
 
  state === 201 && router.push('/dashboard')}, [state])
  return (
    <div className="w-1/3  mx-auto ">
      <h1 className=" py-4 text-center text-4xl font-thin">
        Admin Acces Only{" "}
      </h1>
      <p className="text-red-500 text-center mb-4">{state === 401 && "Incorect username or password"}</p>
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
       
            className="bg-transparent w-full ml-4 focus:outline-none"
          />
        </div>
        <div className="flex bg-white/10 border-[2px] border-juice items-center px-4 py-3 rounded-xl w-full">
          <RiLockPasswordFill />

          <input
         
            type={isHiddenPassword ? "text" : "password"}
            name="password"
     
            placeholder="Password"
            className="bg-transparent w-full ml-4 focus:outline-none"
          />
          <button type="button" onClick={()=>setIsHiddenPassword(isHiddenPassword => !isHiddenPassword)}>
            {isHiddenPassword? <FaEyeSlash /> : <FaEye />}
          </button>     
        
        </div>
     
        <SubmitButton label="Sign in" icon={<IoMdLogIn />}/>
      </form>
    </div>
  );
};

export default LoginForm;
