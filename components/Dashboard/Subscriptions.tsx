"use client";
import { getAllSubscriptions } from "@/libs/actions";
import React, { useEffect, useState } from "react";
import LoadingDots from "../UI/LoadingDots";
import { useSearchParams } from "next/navigation";
import { IoMdCloseCircleOutline } from "react-icons/io";
import Button from "../UI/SubmitButton";
import { FiSend } from "react-icons/fi";
import Image from "next/image";
import EMAILLOGO from "@/assets/letters.png";
const Skeleton = () => {
  return (
    <div className="flex gap-2 flex-wrap ">
      {[...Array(8)].map((email) => {
        return (
          <p className=" px-2  h-[2.5rem] border-[1px] border-juice rounded-md bg-light-juice/20 w-[7rem] flex items-center justify-center">
            <LoadingDots />
          </p>
        );
      })}
    </div>
  );
};

const Subscriptions = () => {
  const params = useSearchParams();
  const option = params.get("option");
  const [allEmails, setAllEmails] = useState<string[]>([]);
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
  const [subscriptionsOption, setSubscriptionsOption] = useState<string>("all");
  const [isLoading, setIsLoading] = useState<boolean>(true);
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
  return (
    <div className=" w-full h-max flex flex-col gap-4   m-10 ">
      <div className=" flex flex-col gap-2 p-2">
        <h2 className="text-2xl font-thin">All Subscriptions:</h2>
        <div className="flex gap-2 flex-wrap ">
          {allEmails.length > 0 &&
            !isLoading &&
            allEmails.map((email) => {
              return (
                <button
                  onClick={() => {
                    const emailExists = selectedEmails.includes(email);
                    const updatedEmails = emailExists
                      ? selectedEmails.filter(
                          (existingEmail: string) => existingEmail !== email
                        )
                      : [...selectedEmails, email];
                    setSelectedEmails(updatedEmails);
                  }}
                  className={`px-2  h-[2.5rem] border-[1px] border-juice rounded-md  ${
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
        <div className="flex gap-2 flex-wrap ">
          {selectedEmails.length > 0 ? (
            selectedEmails.map((email) => {
              return (
                <div className=" px-2 py-1 border-[1px] border-juice rounded-md bg-light-juice/20 relative">
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
      <form className="flex flex-col gap-2 mt-5 bg-white/10 p-2 rounded-xl">
        <div className="flex flex-col ">
          <label className="text-lg font-whin">Subject:</label>
          <input
            type="text"
            className="bg-transparent text-white border-[1px] border-light-juice rounded-md w-1/3 py-1 px-2"
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
              className={`px-2 py-1 border-[1px] border-juice rounded-md  ${
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
              className={`px-2 py-1 border-[1px] border-juice rounded-md ${
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
          <textarea
            className="bg-transparent text-white border-[1px] border-light-juice rounded-md w-full py-1 px-2 resize-none"
            rows={6}
            placeholder="Enter message..."
          />
        </div>
        <div className="flex justify-center mt-4 ">
          {" "}
          <Button icon={<FiSend />} label="Send" isSubmitting={false} />
        </div>
      </form>
    </div>
  );
};

export default Subscriptions;
