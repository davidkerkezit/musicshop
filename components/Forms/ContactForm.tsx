"use client";
// React Iconss
import {
  IoIosMail,
  FaPhoneVolume,
  IoIosPin,
  GrFacebookOption,
  GrInstagram,
  GiFlowerStar,
} from "@/components/UI/Icons";
import Image from "next/image";
import LOGO from "@/assets/logo.png";
import Button from "../UI/SubmitButton";
import { sendMessage } from "@/libs/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { contact } from "@/libs/utils";

type FormFields = z.infer<typeof contact>;
const ContactForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {},
    resolver: zodResolver(contact),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data, e) => {
    e?.preventDefault();
    await sendMessage(data.name, data.email, data.message);
    reset({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <div className="bg-gradient-to-r from-neutral-900 to-neutral-800 flex  h-max overflow-hidden flex-col items-center relative z-10 lg:m-32">
      <div className="w-full h-max md:my-5 my-5 flex flex-col lg:flex-row gap-5  items-center justify-center ">
        <div className="lg:w-1/2 w-full  md:px-20 px-5 flex flex-col md:gap-10 gap-5">
          <h3 className="text-3xl md:text-5xl font-semibold md:leading-[4rem] text-center">
            Let's discuss on something <span className="text-juice">cool </span>
            together
          </h3>
          <div className="flex flex-col gap-4 justify-center items-center">
            <div className="flex gap-2 md:gap-4 items-center border-[1px] border-light-juice py-2 md:py-2 px-3 md:px-4 rounded-2xl w-[16rem] md:w-full">
              <IoIosMail className="text-3xl text-juice" />
              <p className="text-sm md:text-xl font-light ">
                music-shop@gmail.com
              </p>
            </div>
            <div className="flex gap-2 md:gap-4 items-center border-[1px] border-light-juice py-2 md:py-2 px-3 md:px-4 rounded-2xl w-[16rem] md:w-full">
              <FaPhoneVolume className="text-3xl text-juice " />
              <p className="text-sm md:text-xl font-light">+123 456 789</p>
            </div>
            <div className="flex gap-2 md:gap-4 items-center border-[1px] border-light-juice py-2 md:py-2 px-3 md:px-4 rounded-2xl w-[16rem] md:w-full">
              <IoIosPin className="text-3xl text-juice" />
              <p className="text-sm md:text-xl font-light">
                11A Abraham Street, London
              </p>
            </div>
          </div>
          <div className="flex gap-10 justify-center pb-5">
            <div className="flex items-center gap-3 flex-col md:flex-row ">
              <div className="bg-neutral-700 rounded-full p-2">
                <GrFacebookOption className="text-3xl text-light-juice " />
              </div>
              <p> Music Shop London</p>
            </div>
            <div className="flex items-center gap-3 flex-col md:flex-row">
              <div className="bg-neutral-700 rounded-full p-2">
                <GrInstagram className="text-3xl text-light-juice " />
              </div>
              <p> musicshop.london</p>
            </div>
          </div>
        </div>
        <div className="lg:w-1/2 w-full md:w-[80%]   md:bg-gradient-to-tr md:from-neutral-700 tmd:o-neutral-900 h-full lg:mr-20 md:rounded-2xl flex flex-col items-center py-5 md:py-10 lg:py-20 gap-8 md:gap-14 ">
          <div className="flex flex-col gap-1 items-center">
            <Image
              width={200}
              height={200}
              src={LOGO}
              alt="logo"
              className="w-1/4 lg:w-1/2"
            />
            <p className="text-3xl lg:text-5xl font-semibold italic  text-juice">
              Music Shop
            </p>
            <p className="text-sm lg:text-xl italic font-extralight text-neutral-400">
              Forming partnerships will help to share good vibes
            </p>
          </div>
          <form
            className="w-full px-5 md:px-20 flex flex-col gap-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col  w-full gap-1">
              <div className="flex gap-1">
                <label htmlFor="">Name</label>
                <GiFlowerStar className="text-xs text-red-900" />
                {errors.name && (
                  <div className="text-red-500 text-sm">
                    {errors.name.message}
                  </div>
                )}
              </div>
              <input
                {...register("name")}
                type="text"
                className="text-white bg-transparent border-b-[1px] border-b-light-juice focus:outline-none font-light px-1 text-lg py-1 rounded-none"
              />
            </div>
            <div className="flex flex-col  w-full gap-1">
              {" "}
              <div className="flex gap-1">
                <label htmlFor="">Email</label>
                <GiFlowerStar className="text-xs text-red-900" />
                {errors.email && (
                  <div className="text-red-500 text-sm">
                    {errors.email.message}
                  </div>
                )}
              </div>
              <input
                {...register("email")}
                type="email"
                className="text-white bg-transparent border-b-[1px] border-b-light-juice focus:outline-none font-light px-1 text-lg py-1 rounded-none"
              />
            </div>
            <div className="flex flex-col  w-full gap-1">
              <div className="flex gap-1">
                <label htmlFor="">Message</label>
                <GiFlowerStar className="text-xs text-red-900" />
                {errors.message && (
                  <div className="text-red-500 text-sm">
                    {errors.message.message}
                  </div>
                )}
              </div>
              <input
                {...register("message")}
                type="text"
                className="text-white bg-transparent border-b-[1px] border-b-light-juice focus:outline-none font-light px-1 text-lg py-1 rounded-none"
              />
            </div>
            <div className=" flex justify-center">
              <Button
                label="Contact"
                icon={<IoIosMail />}
                isSubmitting={isSubmitting}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
