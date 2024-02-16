"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaRegImage } from "react-icons/fa";
import DashboardInput from "./DashboardInput";
import { addNewProduct } from "@/libs/actions";
import { MdDone } from "react-icons/md";
import RadioInputs from "./RadioInputs";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import DashboardTextArea from "./DashboardTextArea";
import LoadingDots from "../UI/LoadingDots";
import useImageUploader from "@/hooks/useImageUploader";
import {
  categories,
  dashboardInputs,
  dashboardTextAreas,
  djsSubCategories,
  productSchema,
} from "@/libs/utils";
import Button from "../UI/SubmitButton";

type FormFields = z.infer<typeof productSchema>;
const AddProduct = () => {
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
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);
  const [allErrors, setAllErrors] = useState({});
  const { imageSrc, handleImageUpload, imageFormatCheck, setImageSrc } =
    useImageUploader();

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
    console.log(formData);

    if (imageSrc && subCategoryChecker) {
      await addNewProduct(formData);

      event?.target.reset(); // Reset the form
      setImageSrc(null); // Reset image source
      setSelectedCategory(null); // Reset selected category
      setSubSelectedCategory(null); // Reset selected subcategory
      setHasInteracted(false); // Reset interaction state
    } else {
      setTimeout(() => {
        setHasInteracted(false);
      }, 1000);
    }
  };

  return (
    <div className="w-full mx-32">
      <h2 className=" py-4 text-3xl font-thin">Add New Product</h2>
      <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-row gap-20 ">
          <div className="w-1/2 flex flex-col gap-4">
            <div>
              <label htmlFor="" className="text-lg font-light">
                Category:
              </label>
              {selectedCategory === null && hasInteracted && (
                <p className="text-sm text-red-500">
                  You have not selected an option
                </p>
              )}
              <RadioInputs
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                categories={categories}
              />

              {selectedCategory === "dj" && (
                <div className=" flex mt-2  flex-col">
                  <label htmlFor="">Brand:</label>
                  {selectedSubCategory === null && hasInteracted && (
                    <p className="text-sm text-red-500">
                      You have not selected an option
                    </p>
                  )}
                  <RadioInputs
                    categories={djsSubCategories}
                    selectedCategory={selectedSubCategory}
                    setSelectedCategory={setSubSelectedCategory}
                  />
                </div>
              )}
            </div>
            {dashboardInputs.map((input) => {
              return (
                <DashboardInput
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
          <div className="w-1/2 flex flex-col gap-4 ">
            <div
              className={`border-juice/50 border-[1px] h-[18rem] w-[18rem] aspect-square  mt-5 flex justify-center items-center ${
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
                <FaRegImage size={40} className="text-white/50" />
              )}
            </div>
            <div className="flex flex-col  gap-2 ">
              {imageFormatCheck === false && (
                <p className="text-sm text-red-500">
                  Uploaded image is not in PNG format
                </p>
              )}
              <input
                className=""
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </div>
          </div>
        </div>
        <Button icon={<MdDone />} label="Submit" isSubmitting={isSubmitting} />
      </form>
    </div>
  );
};

export default AddProduct;
