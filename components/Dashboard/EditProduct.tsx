"use client";
import DashboardInput from "@/components/Dashboard/DashboardInput";
import ProductInformatiom from "@/components/Product/ProductInformatiom";
import useImageUploader from "@/hooks/useImageUploader";
import { editProduct, getProduct } from "@/libs/actions";
import { ProductType } from "@/libs/types";
import {
  categories,
  djsSubCategories,
  editableProductSchema,
  productSchema,
} from "@/libs/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import DashboardTextArea from "./DashboardTextArea";
import RadioInputs from "./RadioInputs";
import Button from "../UI/SubmitButton";
import { MdDone } from "react-icons/md";

type FormFields = z.infer<typeof editableProductSchema>;

const EditProduct = ({ selectedProduct }: { selectedProduct: ProductType }) => {
  const { imageSrc, handleImageUpload, imageFormatCheck, setImageSrc } =
    useImageUploader();
  const [allErrors, setAllErrors] = useState({});
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubCategory, setSubSelectedCategory] = useState<string | null>(
    null
  );
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);
  const [inStockValue, setInStockValue] = useState<number>(
    selectedProduct.inStock
  );

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
      await editProduct(formData);

      // event?.target.reset(); // Reset the form
      // setImageSrc(null); // Reset image source
      // setSelectedCategory(null); // Reset selected category
      // setSubSelectedCategory(null); // Reset selected subcategory
      // setHasInteracted(false); // Reset interaction state
    } else {
      setTimeout(() => {
        setHasInteracted(false);
      }, 1000);
    }
  };

  return (
    <form
      className="flex flex-col gap-10 mx-14 my-20 "
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex pt-40  ">
        {/* IMG */}
        <div className="w-1/2 bg-white/10 flex items-center justify-center relative">
          <div className="absolute  bottom-0 left-0 right-0 top-0 bg-black/40 z-10" />

          {imageSrc !== null ? (
            <Image
              src={imageSrc}
              alt="Uploaded"
              width={600}
              height={600}
              className=" object-contain"
            />
          ) : (
            <Image
              src={selectedProduct.imageUrl}
              alt="product"
              width={600}
              height={600}
              className="white-shadow "
            />
          )}

          <input
            className="absolute bottom-0 left-0 right-0 top-0 mx-auto my-auto  w-max h-max z-10"
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
