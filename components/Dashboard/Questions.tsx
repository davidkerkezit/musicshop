"use client";
import { getQuestions } from "@/libs/actions";
import { questionsUpdate } from "@/libs/features/questionsSlice";
import { AppDispatch, useAppSelector } from "@/libs/store";
import { QuestionType } from "@/libs/types";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import QuestionDetails from "./UI/QuestionDetails";

const Questions = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const dispatch = useDispatch<AppDispatch>();
  const selectedQuestionsCategory = useAppSelector(
    (state) => state.questionsSlice.selectedQuestionsCategory
  );
  const allQuestions = useAppSelector(
    (state) => state.questionsSlice.allQuestions
  );
  const unreadQuestions = useAppSelector(
    (state) => state.questionsSlice.unreadQuestions
  );
  const readQuestions = useAppSelector(
    (state) => state.questionsSlice.readQuestions
  );
  useEffect(() => {
    const fetchData = async () => {
      const data = await getQuestions();

      dispatch(
        questionsUpdate({
          questions: data.questions,
          category: selectedCategory,
        })
      );
    };
    fetchData();
  }, [selectedCategory]);
  return (
    <div className="w-full md:mx-32 mt-10">
      <div>
        <div className="flex justify-center mb-4">
          {" "}
          <button
            type="button"
            onClick={() => setSelectedCategory("all")}
            className={` w-[8rem] md:w-[10rem] py-2 rounded-l-lg border-r-[1px] border-r-light-juice/40 flex items-center gap-2 justify-center md:text-base text-sm  ${
              selectedCategory === "all"
                ? "bg-light-juice text-black/80"
                : "bg-white/10 text-white hover:bg-white/20 duration-200"
            }`}
          >
            <p> All Questions</p>
            <p className="bg-white rounded-full text-black w-[0.8rem]  md:w-[1rem] h-[0.8rem]  md:h-[1rem] flex items-center justify-center md:p-3 p-2">
              {allQuestions.length}
            </p>
          </button>
          <button
            onClick={() => setSelectedCategory("unread")}
            type="button"
            className={` w-[6rem] md:w-[10rem] py-2 flex items-center gap-2 justify-center md:text-base text-sm ${
              selectedCategory === "unread"
                ? "bg-light-juice text-black/80"
                : "bg-white/10 text-white hover:bg-white/20 duration-200"
            } `}
          >
            <p>Unread</p>{" "}
            <p className="bg-white text-black rounded-full w-[0.8rem]  md:w-[1rem] h-[0.8rem]  md:h-[1rem] flex items-center justify-center md:p-3 p-2 gap-2">
              {unreadQuestions.length}
            </p>
          </button>
          <button
            onClick={() => setSelectedCategory("read")}
            type="button"
            className={` w-[8rem] md:w-[10rem] py-2 rounded-r-lg border-l-[1px] border-l-light-juice/40 flex items-center justify-center p-3 gap-2 md:text-base text-sm ${
              selectedCategory === "read"
                ? "bg-light-juice text-black/80"
                : "bg-white/10 text-white hover:bg-white/20 duration-200"
            } `}
          >
            <p>Answered</p>
            <p className="bg-white text-black rounded-full w-[0.8rem]  md:w-[1rem] h-[0.8rem]  md:h-[1rem] flex items-center justify-center md:p-3 p-2">
              {readQuestions.length}
            </p>
          </button>
        </div>
        <div className="md:flex hidden">
          <p className="w-[60%]  text-white/80 bg-white/10 px-1 py-1 text-center border-r-[1px] border-r-light-juice/20">
            Question{" "}
          </p>
          <p className="w-[15%] px-1 py-1 text-white/80 bg-white/10  text-center border-r-[1px] border-r-light-juice/20">
            Name
          </p>
          <p className="w-[10%] px-1 py-1 text-white/80 bg-white/10  text-center border-r-[1px] border-r-light-juice/20">
            Status
          </p>
          <p className="w-[15%]  text-white/80 bg-white/10 px-1 py-1 text-center md">
            Created At
          </p>
        </div>
        <div className="flex md:hidden">
          <p className="w-[80%]  text-white/80 bg-white/10 px-1 py-1 text-center border-r-[1px] border-r-light-juice/20">
            Question{" "}
          </p>

          <p className="w-[20%] px-1 py-1 text-white/80 bg-white/10  text-center border-r-[1px] border-r-light-juice/20">
            Status
          </p>
        </div>
        {selectedQuestionsCategory.length > 0 &&
          selectedQuestionsCategory.map((question: QuestionType) => {
            const dateObject = new Date(question.createdAt);
            const formattedDate = `${dateObject
              .getDate()
              .toString()
              .padStart(2, "0")}.${(dateObject.getMonth() + 1)
              .toString()
              .padStart(2, "0")}.${dateObject.getFullYear()}  
           ${dateObject.getHours().toString().padStart(2, "0")}:${dateObject
              .getMinutes()
              .toString()
              .padStart(2, "0")}`;

            return (
              <QuestionDetails
                key={question._id}
                question={question}
                date={formattedDate}
                selectedCategory={selectedCategory}
              />
            );
          })}{" "}
        *
      </div>
    </div>
  );
};

export default Questions;
