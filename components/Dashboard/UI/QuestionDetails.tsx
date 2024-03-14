"use client";
import { getQuestions, readQuestion } from "@/libs/actions";
import { useState } from "react";
import { FaAngleDoubleRight, FiSend } from "@/components/UI/Icons";
import { AppDispatch } from "@/libs/store";
import { useDispatch } from "react-redux";
import { QuestionType } from "@/libs/types";
import { questionsUpdate } from "@/libs/features/questionsSlice";
import Button from "../../UI/SubmitButton";
import emailjs from "emailjs-com";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { subscriptionSchema } from "@/libs/utils";
interface QuestionDetailProps {
  question: QuestionType;
  date: string;
  selectedCategory: string;
}
type FormFields = z.infer<typeof subscriptionSchema>;

const QuestionDetails: React.FC<QuestionDetailProps> = ({
  question,
  date,

  selectedCategory,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {},
    resolver: zodResolver(subscriptionSchema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data, e) => {
    if (
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID &&
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
    ) {
      emailjs
        .send(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
          {
            to_email: question.email,
            name: question.name,
            subject: data.subject,
            message: data.message,
          },
          process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
        )
        .then(async (response) => {
          console.log("Email sent successfully:", response);
          if (response.status === 200) {
            setIsLoading(true);
            await readQuestion(question._id, question.read, data.message);
            const dataQuestions = await getQuestions();

            dispatch(
              questionsUpdate({
                questions: dataQuestions.questions,
                category: selectedCategory,
              })
            );
            console.log(question);

            setIsLoading(false);
            e?.target.reset();
          }
        })
        .catch((error) => {
          console.error("Email sending failed:", error);
        });
    }
  };

  return (
    <details className=" border-b-[1px] border-b-white/10  " open={isOpen}>
      <summary className="flex  bg-white/20  cursor-pointer hover:bg-white/30 w-full">
        <div className="md:flex items-start w-[2%] justify-center text-light-juice hidden pt-2">
          <FaAngleDoubleRight />
        </div>

        <div className="md:w-[58%] w-[80%] md:px-1 py-1 px-2   overflow-hidden md:text-base text-sm ">
          <p className=" font-thin">{question.message.substring(0, 70)}...</p>
        </div>

        <p className="w-[15%] font-thin text-white/60 bg-white/5 px-1 py-1 text-center md:block hidden">
          {question.name}
        </p>
        <div className="md:w-[10%] w-[20%] flex items-center justify-center md:bg-transparent bg-white/5">
          {" "}
          <div
            className={`w-[0.5rem] h-[0.5rem] rounded-full ${
              question.read ? "bg-green-500" : "bg-white"
            }`}
          />
        </div>
        <p className="w-[15%] font-thin text-white/60  px-1 py-1 text-center bg-white/5 md:block hidden">
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
          {question.read && (
            <div className="bg-light-juice text-black rounded-lg md:w-1/2 w-[80%] float-right p-2 flex flex-col mb-5">
              <h6 className="bg-black/50 font-semibold w-max p-1 rounded-lg text-white tracking-wide ">
                Musicshop:
              </h6>
              <p className="p-2 ">{question.answer}</p>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white/10 flex flex-col justify-center items-center py-4 gap-1">
        <p>Question Status:</p>
        <p className="bg-yellow-600 w-max px-4 rounded-md font-thin text-sm">
          {!question.read && "Unread"}
        </p>
        <p className="bg-green-600 w-max px-4 rounded-md font-thin text-sm">
          {question.read && "Answered"}
        </p>
      </div>
      <div className="bg-white/10  flex justify-center items-center pb-4 gap-4 "></div>
      {!question.read && (
        <form
          className="flex flex-col gap-2 mt-5 bg-white/10 p-2 rounded-xl m-2"
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
            <Button icon={<FiSend />} label="Answer" isSubmitting={isLoading} />
          </div>
        </form>
      )}
    </details>
  );
};

export default QuestionDetails;
