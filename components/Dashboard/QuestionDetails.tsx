"use client";
import {
  completeOrder,
  getOrders,
  getQuestions,
  readQuestion,
} from "@/libs/actions";
import React, { useState } from "react";
import { FaAngleDoubleRight, FaAngleDoubleDown } from "react-icons/fa";
import LoadingDots from "../UI/LoadingDots";
import { AppDispatch, useAppSelector } from "@/libs/store";
import { useDispatch } from "react-redux";
import { ordersUpdate } from "@/libs/features/ordersSlice";
import { CartItem } from "@/libs/features/cartSlice";
import { QuestionType, checkoutType } from "@/libs/types";
import { questionsUpdate } from "@/libs/features/questionsSlice";
import Button from "../UI/SubmitButton";
import { FiSend } from "react-icons/fi";
import emailjs from "emailjs-com";

interface QuestionDetailProps {
  question: QuestionType;
  date: string;
  selectedCategory: string;
}
const QuestionDetails: React.FC<QuestionDetailProps> = ({
  question,
  date,

  selectedCategory,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const readQuestionHandler = async (id: string, isRead: boolean) => {
    setIsLoading(true);
    const data = await Promise.all([
      await readQuestion(id, isRead),
      await getQuestions(),
    ]);

    dispatch(
      questionsUpdate({
        questions: data[1].questions,
        category: selectedCategory,
      })
    );
    setIsLoading(false);
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (process.env.EMAILJS_SERVICE_ID && process.env.TEMPLETE_ID) {
      emailjs
        .send(
          process.env.EMAILJS_SERVICE_ID,
          process.env.TEMPLETE_ID,
          {
            to_email: question.email,
            name: question.name,
            subject: "Header",
            message: "MESSAGE",
          },
          process.env.EMAILJS_PUBLIC_KEY
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
    <details className=" border-b-[1px] border-b-white/10  " open={isOpen}>
      <summary className="flex  bg-white/20  cursor-pointer hover:bg-white/30 w-full">
        <div className="flex items-center w-[2%] justify-center text-light-juice">
          <FaAngleDoubleRight />
        </div>

        <div className="w-[58%] px-1 py-1   overflow-hidden ">
          <p className=" font-thin">{question.message.substring(0, 70)}...</p>
        </div>

        <p className="w-[15%] font-thin text-white/60 bg-white/5 px-1 py-1 text-center">
          {question.name}
        </p>
        <div className="w-[10%] flex items-center justify-center">
          {" "}
          <div
            className={`w-[0.5rem] h-[0.5rem] rounded-full ${
              question.read ? "bg-green-500" : "bg-white"
            }`}
          />
        </div>
        <p className="w-[15%] font-thin text-white/60  px-1 py-1 text-center bg-white/5">
          {date}
        </p>
      </summary>
      <div className="flex flex-col pt-4 px-[2%] bg-white/5 gap-1 ">
        <h2 className=" bg-juice w-max px-2 text-black/80 ">
          Question ID : {question._id}
        </h2>
        <div>
          <p>Name: {question.name}</p>
          <p>Email: {question.email}</p>
          <p className="my-4 max-w-[60rem] p-2 h-max break-words bg-white/5 rounded-lg ">
            Message:<span className="font-thin"> {question.message}</span>
          </p>
        </div>
      </div>

      <div className="bg-white/10 flex flex-col justify-center items-center py-4 gap-1">
        <p>Question Status:</p>
        <p className="bg-yellow-600 w-max px-4 rounded-md font-thin text-sm">
          {!question.read && "Unread"}
        </p>
        <p className="bg-green-600 w-max px-4 rounded-md font-thin text-sm">
          {question.read && "Read"}
        </p>
      </div>
      <div className="bg-white/10  flex justify-center items-center pb-4 gap-4">
        {/* <button
          onClick={() => readQuestionHandler(question._id, question.read)}
          className={`px-2 py-1 ${
            question.read === false
              ? "bg-green-600 hover:bg-green-500"
              : "bg-yellow-600 hover:bg-yellow-500"
          } rounded-md text-white w-[7rem] `}
        >
          {isLoading ? (
            <LoadingDots />
          ) : (
            <p> {question.read ? "Unread" : "Read"}</p>
          )}
        </button>
        <button
          onClick={toggleDetails}
          className="px-2 py-1 border-[1px] border-white/20 rounded-md font-thin w-[7rem]  hover:bg-white/10"
        >
          Close
        </button> */}
      </div>
      <form
        className="flex flex-col gap-2 mt-5 bg-white/10 p-2 rounded-xl"
        // onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col ">
          <label className="text-lg font-whin">Subject:</label>
          <input
            // {...register("subject")}
            type="text"
            className="bg-transparent text-white border-[1px] border-light-juice rounded-md w-1/3 py-1 px-2"
            placeholder="Enter subject..."
          />
        </div>
        <div className="flex  gap-4 items-center">
          <label className="text-lg font-whin">To:</label>
          <div className="flex flex-row gap-2">
            <p
              className={`px-2 py-1 border-[1px] border-juice/20 rounded-md  `}
            >
              {question.email}{" "}
            </p>
          </div>
        </div>
        <div className="flex flex-col ">
          <label className="text-lg font-whin" htmlFor="">
            Message:
          </label>
          <textarea
            // {...register("message")}
            className="bg-transparent text-white border-[1px] border-light-juice rounded-md w-full py-1 px-2 resize-none"
            rows={6}
            placeholder="Enter message..."
          />
        </div>
        <div className="flex justify-center mt-4 ">
          {" "}
          {/* <Button icon={<FiSend />} label="Send" isSubmitting={isLoading} /> */}
          <button onClick={handleSubmit}>SUBMIT</button>
        </div>
      </form>
    </details>
  );
};

export default QuestionDetails;
