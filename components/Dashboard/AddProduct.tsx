"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import DashboardInput from "./UI/DashboardInput";
import { addNewProduct } from "@/libs/actions";
import { MdDone, BiCloudUpload } from "@/components/UI/Icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import DashboardTextArea from "./UI/DashboardTextArea";
import useImageUploader from "@/hooks/useImageUploader";
import {
  dashboardInputs,
  dashboardTextAreas,
  productSchema,
} from "@/libs/utils";

import Button from "../UI/SubmitButton";
import { useRouter } from "next/navigation";
import Portal from "../UI/Modals/Portal";
import ProductAdded from "../UI/Modals/ProductAdded";

type FormFields = z.infer<typeof productSchema>;
const AddProduct = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(productSchema),
  });
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubCategory, setSubSelectedCategory] = useState<string | null>(
    null
  );
  const addProductRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);
  const [allErrors, setAllErrors] = useState({});
  const {
    imageSrc,
    handleImageUpload,
    imageFormatCheck,
    setImageSrc,
    errorMessage,
  } = useImageUploader();

  useEffect(() => {
    setAllErrors(errors);
  }, [errors]);

  const onSubmit: SubmitHandler<FormFields> = async (data, event) => {
    setHasInteracted(true);
    const formData = {
      ...data,
      imageSrc,
      selectedCategory,
      selectedSubCategory,
    };
    let subCategoryChecker;
    if (selectedCategory === "dj" && selectedSubCategory !== null) {
      subCategoryChecker = true;
    } else if (selectedCategory !== "dj" && selectedCategory !== null) {
      setSubSelectedCategory(null);
      subCategoryChecker = true;
    } else {
      subCategoryChecker = false;
    }

    if (imageSrc !== null && subCategoryChecker !== null) {
      let dataProduct = await addNewProduct(formData);
      setShowModal(true);
      if (dataProduct.status === 201) {
        event?.target.reset();
        setImageSrc(null);
        setSelectedCategory(null);
        setSubSelectedCategory(null);
      }
    } else {
      addProductRef.current?.scrollIntoView();
    }
  };

  return (
    <div className="w-full md:mx-32 md:mt-5 mt-2 " ref={addProductRef}>
      {showModal && (
        <Portal setHidden={setShowModal}>
          <ProductAdded setHidden={setShowModal} />
        </Portal>
      )}
      <h2 className=" py-1 md:py-4 text-3xl font-thin md:mb-5 mb-2  text-center md:text-left">
        Add New Product
      </h2>
      <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex md:flex-row flex-col md:gap-20 gap-5 items-center md:items-start ">
          <div className="md:w-1/2 w-[90%] flex flex-col gap-4   ">
            <div className="md:block flex justify-center flex-col items-center">
              <label htmlFor="" className="text-lg font-light ">
                Category:
              </label>
              {selectedCategory === null && hasInteracted && (
                <p className="text-sm text-red-500">
                  You have not selected an option
                </p>
              )}
              <div className="mt-2 md:block flex justify-center">
                <button
                  type="button"
                  onClick={() => setSelectedCategory("dj")}
                  className={` md:w-[10rem] w-[7rem] text-sm md:text-base md:px-0 py-2 rounded-l-lg border-r-[1px] border-r-light-juice/40  ${
                    selectedCategory === "dj"
                      ? "bg-light-juice text-black/80"
                      : "bg-white/10 text-white hover:bg-white/20 duration-200"
                  }`}
                >
                  DJ Equipment
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedCategory("vinyls")}
                  className={`md:w-[10rem] w-[7rem] text-sm md:text-base md:px-0 py-2   ${
                    selectedCategory === "vinyls"
                      ? "bg-light-juice text-black/80"
                      : "bg-white/10 text-white hover:bg-white/20 duration-200"
                  }`}
                >
                  Vinyl
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedCategory("softweres")}
                  className={` md:w-[10rem] w-[7rem] text-sm md:text-base md:px-0 py-2 rounded-r-lg border-l-[1px] border-l-light-juice/40 ${
                    selectedCategory === "softweres"
                      ? "bg-light-juice text-black/80 "
                      : "bg-white/10 text-white hover:bg-white/20 duration-200"
                  }`}
                >
                  Software
                </button>
              </div>

              {selectedCategory === "dj" && (
                <div className=" flex mt-2  flex-col md:items-start items-center">
                  <label htmlFor="">Brand:</label>
                  {selectedSubCategory === null && hasInteracted && (
                    <p className="text-sm text-red-500">
                      You have not selected an option
                    </p>
                  )}
                  <div className="mt-2">
                    <button
                      type="button"
                      onClick={() => setSubSelectedCategory("pioneer")}
                      className={`md:w-[10rem] w-[7rem] text-sm md:text-base md:px-0 py-2 rounded-l-lg border-r-[1px] border-r-light-juice/40  ${
                        selectedSubCategory === "pioneer"
                          ? "bg-light-juice text-black/80"
                          : "bg-white/10 text-white hover:bg-white/20 duration-200"
                      }`}
                    >
                      Pioneer
                    </button>

                    <button
                      type="button"
                      onClick={() => setSubSelectedCategory("dennon")}
                      className={` md:w-[10rem] w-[7rem] text-sm md:text-base md:px-0 py-2 rounded-r-lg border-l-[1px] border-l-light-juice/40 ${
                        selectedSubCategory === "dennon"
                          ? "bg-light-juice text-black/80 "
                          : "bg-white/10 text-white hover:bg-white/20 duration-200"
                      }`}
                    >
                      Dennon
                    </button>
                  </div>
                </div>
              )}
            </div>
            {dashboardInputs.map((input) => {
              return (
                <DashboardInput
                  access={true}
                  setValue={setValue}
                  error={allErrors}
                  key={input.name}
                  type={input.type}
                  label={input.label}
                  placeholder={input.placeholder}
                  value={input.value}
                  name={input.name}
                  registerValue={input.registerValue}
                  register={register}
                />
              );
            })}
            {dashboardTextAreas.map((input) => {
              return (
                <DashboardTextArea
                  access={true}
                  setValue={setValue}
                  error={allErrors}
                  key={input.name}
                  type={input.type}
                  label={input.label}
                  placeholder={input.placeholder}
                  value={input.value}
                  name={input.name}
                  registerValue={input.registerValue}
                  register={register}
                />
              );
            })}
          </div>
          <div className="md:w-1/2 w-full  flex flex-col gap-4 md:justify-start justify-center items-center md:items-start ">
            <div
              className={`border-light-juice border-dashed border-[1px] h-[18rem]  w-[90%] md:w-[18rem]  aspect-square md:mt-5 mt-1 flex justify-center items-center relative rounded-lg ${
                imageSrc === null && hasInteracted && "animate-shake"
              } bg-gradient-to-r from-white/5 to-white/10 overflow-hidden`}
            >
              {imageSrc !== null ? (
                <Image
                  src={imageSrc}
                  alt="Uploaded"
                  width={200}
                  height={200}
                  className="  "
                />
              ) : (
                <div className="flex flex-col items-center">
                  <BiCloudUpload size={80} className="text-light-juice/70" />
                  <button
                    type="button"
                    onClick={() =>
                      fileInputRef.current && fileInputRef.current.click()
                    }
                    className="px-3 py-1 bg-light-juice/90 hover:bg-light-juice duration-100 text-black rounded-lg"
                  >
                    Upload File
                  </button>
                  <p className="absolute bottom-8 text-sm font-thin text-white/60">
                    Only PNG file is supported
                  </p>
                  <p className="absolute bottom-2 text-sm font-thin text-white/60">
                    Maximum allowed size limit: 1500KB
                  </p>
                </div>
              )}
            </div>
            <div className="flex flex-col  gap-2 ">
              {imageFormatCheck === false && (
                <p className="text-sm text-red-500">{errorMessage}</p>
              )}
              {imageSrc !== null && (
                <button
                  type="button"
                  onClick={() =>
                    fileInputRef.current && fileInputRef.current.click()
                  }
                  className="px-3 py-1 bg-light-juice/90 hover:bg-light-juice duration-100 text-black rounded-lg w-max"
                >
                  Upload image{" "}
                </button>
              )}

              <input
                ref={fileInputRef}
                className="hidden"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </div>
          </div>
        </div>
        <div className=" md:block flex justify-center">
          <Button
            icon={<MdDone />}
            label="Submit"
            isSubmitting={isSubmitting}
          />
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
