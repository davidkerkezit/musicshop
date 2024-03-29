"use client";
import { getAllSubscriptions } from "@/libs/actions";
import React, { useEffect, useState } from "react";
import LoadingDots from "../UI/LoadingDots";
import { useSearchParams } from "next/navigation";
import Button from "../UI/SubmitButton";
import { FiSend, IoMdCloseCircleOutline } from "@/components/UI/Icons";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { subscriptionSchema } from "@/libs/utils";
import emailjs from "emailjs-com";

const Skeleton = () => {
  return (
    <div className="flex gap-2 flex-wrap ">
      {[...Array(8)].map((_, index: number) => {
        return (
          <p
            key={index}
            className=" px-2  h-[2.5rem] border-[1px] border-juice rounded-md bg-light-juice/20 w-[7rem] flex items-center justify-center"
          >
            <LoadingDots />
          </p>
        );
      })}
    </div>
  );
};
type FormFields = z.infer<typeof subscriptionSchema>;

const Subscriptions = () => {
  const params = useSearchParams();
  const option = params.get("option");
  const [allEmails, setAllEmails] = useState<string[]>([]);
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
  const [subscriptionsOption, setSubscriptionsOption] = useState<string>("all");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {},
    resolver: zodResolver(subscriptionSchema),
  });
  useEffect(() => {
    const fetchData = async () => {
      const { subscriptions } = await getAllSubscriptions();

      setAllEmails(subscriptions);
      setIsLoading(false);
    };
    option === "subscriptions" && fetchData();
  }, [option]);
  useEffect(() => {
    selectedEmails.length === 0 && setSubscriptionsOption("all");
  }, [selectedEmails]);
  const onSubmit: SubmitHandler<FormFields> = (data) => {
    let emails =
      subscriptionsOption === "selected" ? selectedEmails : allEmails;

    if (
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID &&
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
    ) {
      emailjs
        .send(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
          {
            to_email: emails.join(","),
            name: " Musicshop Customer",
            subject: data.subject,
            message: data.message,
          },
          process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
        )
        .then((response) => {
          console.log("Email sent successfully:", response);
        })
        .catch((error) => {
          console.error("Email sending failed:", error);
        });
    }
  };

  return (
    <div className=" w-full h-max flex flex-col gap-4 m-2  md:m-10 ">
      <div className=" flex flex-col gap-2 p-2">
        <h2 className="text-2xl font-thin">All Subscriptions:</h2>
        <div className="md:flex gap-2 flex-wrap grid grid-cols-2">
          {allEmails.length > 0 &&
            !isLoading &&
            allEmails.map((email) => {
              return (
                <button
                  key={email}
                  onClick={() => {
                    const emailExists = selectedEmails.includes(email);
                    const updatedEmails = emailExists
                      ? selectedEmails.filter(
                          (existingEmail: string) => existingEmail !== email
                        )
                      : [...selectedEmails, email];
                    setSelectedEmails(updatedEmails);
                  }}
                  className={`md:px-2 px-0  h-[2.5rem] border-[1px] border-juice rounded-md md:text-base text-xs md:w-max w-full   ${
                    selectedEmails.includes(email)
                      ? "bg-light-juice/40"
                      : "bg-light-juice/20"
                  }`}
                >
                  {email}
                </button>
              );
            })}
          {isLoading && <Skeleton />}
        </div>
      </div>
      <div className=" flex flex-col gap-2 p-2">
        <h2 className="text-2xl font-thin">Selected Subscriptions:</h2>
        <div className="md:flex gap-2 flex-wrap grid grid-cols-2 ">
          {selectedEmails.length > 0 ? (
            selectedEmails.map((email) => {
              return (
                <div
                  key={email}
                  className=" px-2 py-1 border-[1px] border-juice rounded-md bg-light-juice/20 relative md:text-base text-xs"
                >
                  <p> {email}</p>
                  <button
                    className="absolute -top-2 -right-2 bg-black rounded-full"
                    onClick={() => {
                      setSelectedEmails(
                        selectedEmails.filter(
                          (existingEmail: string) => existingEmail !== email
                        )
                      );
                    }}
                  >
                    <IoMdCloseCircleOutline size={18} />
                  </button>
                </div>
              );
            })
          ) : (
            <p className="text-sm ">You have not marked any emails</p>
          )}
        </div>
      </div>
      <form
        className="flex flex-col gap-2 mt-5 bg-white/10 p-2 rounded-xl "
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col ">
          <label className="text-lg font-whin">Subject:</label>
          <p className="text-sm text-red-500">
            {errors && errors.subject && errors.subject.message}
          </p>
          <input
            {...register("subject")}
            type="text"
            className="bg-transparent text-white border-[1px] border-light-juice rounded-md md:w-1/3 w-full py-1 px-2"
            placeholder="Enter subject..."
          />
        </div>
        <div className="flex flex-col ">
          <label className="text-lg font-whin">To:</label>
          <div className="flex flex-row gap-2">
            <button
              onClick={(e) => {
                e.preventDefault();
                setSubscriptionsOption("all");
              }}
              className={`px-2 py-1 border-[1px] border-juice rounded-md md:text-base text-sm  ${
                subscriptionsOption === "all"
                  ? "bg-light-juice/40"
                  : "bg-light-juice/10"
              }`}
            >
              All Subscriptions
            </button>
            <button
              disabled={selectedEmails.length === 0}
              onClick={(e) => {
                e.preventDefault();
                setSubscriptionsOption("selected");
              }}
              className={`px-2 py-1 border-[1px] border-juice rounded-md md:text-base text-sm ${
                selectedEmails.length !== 0
                  ? "cursor-pointer"
                  : "cursor-not-allowed"
              } ${
                subscriptionsOption === "selected"
                  ? "bg-light-juice/40"
                  : "bg-light-juice/10"
              }`}
            >
              Selected Subscriptions
            </button>
          </div>
        </div>
        <div className="flex flex-col ">
          <label className="text-lg font-whin" htmlFor="">
            Message:
          </label>
          <p className="text-sm text-red-500">
            {errors && errors.message && errors.message.message}
          </p>
          <textarea
            {...register("message")}
            className="bg-transparent text-white border-[1px] border-light-juice rounded-md w-full py-1 px-2 resize-none"
            rows={6}
            placeholder="Enter message..."
          />
        </div>
        <div className="flex justify-center mt-4 ">
          {" "}
          <Button icon={<FiSend />} label="Send" isSubmitting={isLoading} />
        </div>
      </form>
    </div>
  );
};

export default Subscriptions;
