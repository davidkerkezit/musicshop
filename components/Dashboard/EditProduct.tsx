"use client";
import DashboardInput from "@/components/Dashboard/DashboardInput";
import ProductInformatiom from "@/components/Product/ProductInformatiom";
import useImageUploader from "@/hooks/useImageUploader";
import { editProduct, getProduct } from "@/libs/actions";
import { ProductType } from "@/libs/types";
import {
  BASE_URL,
  categories,
  djsSubCategories,
  editableProductSchema,
  productSchema,
} from "@/libs/utils";
import { BiCloudUpload } from "react-icons/bi";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import DashboardTextArea from "./DashboardTextArea";
import RadioInputs from "./RadioInputs";
import Button from "../UI/SubmitButton";
import { MdDone } from "react-icons/md";
import { useRouter } from "next/navigation";

type FormFields = z.infer<typeof editableProductSchema>;

const EditProduct = ({ selectedProduct }: { selectedProduct: ProductType }) => {
  const { imageSrc, handleImageUpload, imageFormatCheck, setImageSrc } =
    useImageUploader();
  const [allErrors, setAllErrors] = useState({});
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubCategory, setSubSelectedCategory] = useState<string | null>(
    null
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editProductRef = useRef<HTMLFormElement>(null);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);
  const [inStockValue, setInStockValue] = useState<number>(
    selectedProduct.inStock
  );
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      name: selectedProduct.name,
      price: selectedProduct.price.toString(),
      aboutProduct: selectedProduct.about,
      productDescription: selectedProduct.description,
      aboutSeller: selectedProduct.aboutSeller,
    },
    resolver: zodResolver(editableProductSchema),
  });
  useEffect(() => {
    setAllErrors(errors);
  }, [errors]);

  const handleIncrease = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setInStockValue(inStockValue + 1);
  };

  const handleDecrease = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setInStockValue(inStockValue - 1);
  };
  const onSubmit: SubmitHandler<FormFields> = async (data, event) => {
    setHasInteracted(true);
    const formData = {
      ...data,
      id: selectedProduct._id,
      imageSrc,
      selectedCategory,
      selectedSubCategory,
      inStockValue,
      currentCategory: selectedProduct.category,
      currentImage: selectedProduct.imageUrl,
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

    if (subCategoryChecker) {
      const { id, status } = await editProduct(formData);
      status === "success" && router.push(`${BASE_URL}/dashboard/${id}`);
      setHasInteracted(false);
      event?.target.reset(); // Reset the form
      setImageSrc(null); // Reset image source
      setSelectedCategory(null); // Reset selected category
      setSubSelectedCategory(null); // Reset selected subcategory
    } else {
      editProductRef.current?.scrollIntoView();
    }
  };

  return (
    <form
      ref={editProductRef}
      className="flex flex-col gap-10 mx-14 my-20 "
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex pt-40  ">
        {/* IMG */}
        <div className=" bg-white/10 flex items-center justify-center relative rounded-xl border-light-juice border-[1px] border-dashed h-[28rem]  w-[28rem] ">
          <div className="absolute  bottom-0 left-0 right-0 top-0 bg-black/60 z-10 " />

          {imageSrc !== null ? (
            <Image
              src={imageSrc}
              alt="Uploaded"
              width={300}
              height={300}
              className=" object-contain"
            />
          ) : (
            <Image
              src={selectedProduct.imageUrl}
              alt="product"
              width={300}
              height={300}
              className="white-shadow "
            />
          )}
          <div className="flex flex-col items-center  z-10  absolute">
            <BiCloudUpload size={80} className="text-light-juice/90" />
            <button
              type="button"
              onClick={() =>
                fileInputRef.current && fileInputRef.current.click()
              }
              className="px-3 py-1 bg-light-juice/90 hover:bg-light-juice duration-100 text-black rounded-lg"
            >
              Upload File
            </button>
            <p className="text-sm font-thin text-white/60 pt-4">
              Only PNG file is supported
            </p>
          </div>
          <input
            ref={fileInputRef}
            className="absolute bottom-0 left-0 right-0 top-0 mx-auto my-auto  w-max h-max z-10 hidden"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </div>
        {/* INFO */}
        <div className="w-1/2 px-10 flex flex-col gap-4">
          <div>
            <label htmlFor="" className="text-lg font-light">
              Category:
            </label>
            {selectedCategory === null && hasInteracted && (
              <p className="text-sm text-red-500">
                You have not selected an option
              </p>
            )}
            <div className="mt-2">
              <button
                type="button"
                onClick={() => setSelectedCategory("dj")}
                className={` w-[10rem] py-2 rounded-l-lg border-r-[1px] border-r-light-juice/40  ${
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
                className={` w-[10rem] py-2   ${
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
                className={` w-[10rem] py-2 rounded-r-lg border-l-[1px] border-l-light-juice/40 ${
                  selectedCategory === "softweres"
                    ? "bg-light-juice text-black/80 "
                    : "bg-white/10 text-white hover:bg-white/20 duration-200"
                }`}
              >
                Softwere
              </button>
            </div>

            {selectedCategory === "dj" && (
              <div className=" flex mt-2  flex-col">
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
                    className={` w-[10rem] py-2 rounded-l-lg border-r-[1px] border-r-light-juice/40  ${
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
                    className={` w-[10rem] py-2 rounded-r-lg border-l-[1px] border-l-light-juice/40 ${
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
          <DashboardInput
            setValue={setValue}
            name="name"
            registerValue="name"
            type="text"
            error={allErrors}
            label="Product name"
            placeholder=""
            value={selectedProduct.name}
            register={register}
          />
          <DashboardInput
            setValue={setValue}
            name="price"
            registerValue="price"
            type="number"
            error={allErrors}
            label="Price"
            placeholder=""
            value={selectedProduct.price}
            register={register}
          />
          <DashboardInput
            setValue={setValue}
            name="about-product"
            registerValue="aboutProduct"
            type="text"
            error={allErrors}
            label="About product "
            placeholder=""
            value={selectedProduct.about}
            register={register}
          />
          {/*
          <p className="text-xl">Category: {category}</p>
          <DashboardInput
            label="About product"
            placeholder=""
            value={selectedProduct.about}
          />
          <DashboardInput
            label="Product price ($)"
            placeholder=""
            value={selectedProduct.price}
          /> */}
          <div className="flex gap-2 items-center">
            <label htmlFor="">In stock:</label>
            <button
              className="bg-juice w-[1.4rem] h-[1.4rem] rounded-sm"
              onClick={handleIncrease}
            >
              +
            </button>
            <input
              type="number"
              name=""
              id=""
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                e && setInStockValue(parseInt(e.target.value))
              }
              value={inStockValue}
              className="w-[2.4rem] bg-slate-200 text-center text-black  rounded-sm"
            />
            <button
              className="bg-juice w-[1.4rem] h-[1.4rem] rounded-sm"
              onClick={handleDecrease}
            >
              -
            </button>
          </div>
        </div>
      </div>
      <DashboardTextArea
        setValue={setValue}
        error={allErrors}
        key={selectedProduct._id}
        type="text"
        label="About seller"
        placeholder=""
        value=""
        name="about-seller"
        registerValue="aboutSeller"
        register={register}
      />
      <DashboardTextArea
        setValue={setValue}
        error={allErrors}
        key={selectedProduct.name}
        type="text"
        label="Product description"
        placeholder=""
        value=""
        name="product-description"
        registerValue="productDescription"
        register={register}
      />
      <div className=" flex  items-center justify-center">
        {" "}
        <Button icon={<MdDone />} label="Submit" isSubmitting={isSubmitting} />
      </div>
    </form>
  );
};

export default EditProduct;
