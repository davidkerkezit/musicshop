"use client";
import DashboardInput from "@/components/Dashboard/UI/DashboardInput";
import useImageUploader from "@/hooks/useImageUploader";
import { editProduct } from "@/libs/actions";
import { ProductType } from "@/libs/types";
import { BASE_URL, editableProductSchema } from "@/libs/utils";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import DashboardTextArea from "../UI/DashboardTextArea";
import Button from "../../UI/SubmitButton";
import { MdDone, BiCloudUpload } from "@/components/UI/Icons";
import { useRouter } from "next/navigation";
import NoPermission from "../../UI/Modals/NoPermission";
import Portal from "../../UI/Modals/Portal";
import SuccessfullyEdit from "../../UI/Modals/SuccessfullyEdit";

type FormFields = z.infer<typeof editableProductSchema>;

const EditProduct = ({ selectedProduct }: { selectedProduct: ProductType }) => {
  const {
    imageSrc,
    handleImageUpload,
    imageFormatCheck,
    setImageSrc,
    errorMessage,
  } = useImageUploader();
  const [allErrors, setAllErrors] = useState({});
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubCategory, setSubSelectedCategory] = useState<string | null>(
    null
  );
  const [isSucces, setIsSucces] = useState<boolean>(false);
  const [showNoPermissionModal, setShowNoPermissionModal] =
    useState<boolean>(false);
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
    if (selectedCategory === "dj" && selectedSubCategory === null) {
      subCategoryChecker = false;
    } else if (selectedCategory !== "dj" && selectedSubCategory === null) {
      subCategoryChecker = true;
    } else {
      subCategoryChecker = true;
    }
    console.log(subCategoryChecker, selectedSubCategory);

    if (subCategoryChecker) {
      setHasInteracted(true);

      const { id, status } = await editProduct(formData);
      setIsSucces(status === 201);
      setTimeout(() => {
        status === 201 && router.push(`${BASE_URL}/dashboard/${id}`);
      }, 500);
    } else {
      editProductRef.current?.scrollIntoView();
    }
  };
  useEffect(() => {
    !selectedProduct.access && setShowNoPermissionModal(true);
  }, []);
  return (
    <div className="relative">
      {showNoPermissionModal && (
        <Portal setHidden={setShowNoPermissionModal}>
          <NoPermission />
        </Portal>
      )}
      {isSucces && (
        <Portal setHidden={null}>
          <SuccessfullyEdit />
        </Portal>
      )}
      <form
        ref={editProductRef}
        className="flex flex-col gap-10 md:mx-14 mx-2 my-20 "
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex md:pt-40 pt-5 md:flex-row flex-col-reverse  ">
          {/* IMG */}
          <div className="flex flex-col items-center md:mt-0 mt-5">
            <div className=" bg-white/10 flex items-center justify-center relative rounded-xl border-light-juice border-[1px] border-dashed md:h-[28rem] w-[12rem] h-[12rem] md:w-[28rem] ">
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
                  disabled={!selectedProduct.access}
                  type="button"
                  onClick={() =>
                    fileInputRef.current && fileInputRef.current.click()
                  }
                  className={`px-3 py-1 bg-light-juice/90 hover:bg-light-juice duration-100 text-black rounded-lg ${
                    selectedProduct.access
                      ? "cursor-pointer"
                      : "cursor-not-allowed"
                  }`}
                >
                  Upload File
                </button>
                <p className="text-sm font-thin text-white/60 pt-4">
                  Only PNG file is supported
                </p>
                <p className="text-sm font-thin text-white/60 pt-2">
                  Maximum allowed size limit: 1500KB
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
            {imageFormatCheck === false && (
              <p className="text-sm text-red-500">{errorMessage}</p>
            )}
          </div>
          {/* INFO */}
          <div className="md:w-1/2 w-full md:px-10 px-2 flex flex-col gap-4">
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
                  disabled={!selectedProduct.access}
                  type="button"
                  onClick={() => setSelectedCategory("dj")}
                  className={`md:w-[10rem] w-[7rem] text-sm md:text-base md:px-0 py-2 rounded-l-lg border-r-[1px] border-r-light-juice/40  ${
                    selectedCategory === "dj"
                      ? "bg-light-juice text-black/80"
                      : "bg-white/10 text-white hover:bg-white/20 duration-200"
                  } ${
                    selectedProduct.access
                      ? "cursor-pointer"
                      : "cursor-not-allowed"
                  }`}
                >
                  DJ Equipment
                </button>
                <button
                  disabled={!selectedProduct.access}
                  type="button"
                  onClick={() => {
                    setSelectedCategory("vinyls");
                    setSubSelectedCategory(null);
                  }}
                  className={`md:w-[10rem] w-[7rem] text-sm md:text-base md:px-0 py-2    ${
                    selectedCategory === "vinyls"
                      ? "bg-light-juice text-black/80"
                      : "bg-white/10 text-white hover:bg-white/20 duration-200"
                  } ${
                    selectedProduct.access
                      ? "cursor-pointer"
                      : "cursor-not-allowed"
                  }`}
                >
                  Vinyl
                </button>
                <button
                  disabled={!selectedProduct.access}
                  type="button"
                  onClick={() => {
                    setSelectedCategory("softweres");
                    setSubSelectedCategory(null);
                  }}
                  className={` md:w-[10rem] w-[7rem] text-sm md:text-base md:px-0 py-2 rounded-r-lg border-l-[1px] border-l-light-juice/40 ${
                    selectedCategory === "softweres"
                      ? "bg-light-juice text-black/80 "
                      : "bg-white/10 text-white hover:bg-white/20 duration-200"
                  } ${
                    selectedProduct.access
                      ? "cursor-pointer"
                      : "cursor-not-allowed"
                  }`}
                >
                  Software
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
                      className={`md:w-[10rem] w-[7rem] text-sm md:text-base md:px-0 py-2 rounded-l-lg border-r-[1px] border-r-light-juice/40 ${
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
            <DashboardInput
              access={selectedProduct.access}
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
              access={selectedProduct.access}
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
              access={selectedProduct.access}
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

            <div className="flex gap-2 items-center">
              <label htmlFor="">In stock:</label>
              <button
                disabled={!selectedProduct.access}
                className={`bg-juice w-[1.4rem] h-[1.4rem] rounded-sm ${
                  selectedProduct.access
                    ? "cursor-pointer"
                    : "cursor-not-allowed"
                }`}
                onClick={handleIncrease}
              >
                +
              </button>
              <input
                disabled={!selectedProduct.access}
                type="number"
                name=""
                id=""
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  e && setInStockValue(parseInt(e.target.value))
                }
                value={inStockValue}
                className={`w-[2.4rem] bg-slate-200 text-center text-black  rounded-sm ${
                  selectedProduct.access
                    ? "cursor-pointer"
                    : "cursor-not-allowed"
                }`}
              />
              <button
                disabled={!selectedProduct.access}
                className={`bg-juice w-[1.4rem] h-[1.4rem] rounded-sm ${
                  selectedProduct.access
                    ? "cursor-pointer"
                    : "cursor-not-allowed"
                }`}
                onClick={handleDecrease}
              >
                -
              </button>
            </div>
          </div>
        </div>
        <DashboardTextArea
          access={selectedProduct.access}
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
          access={selectedProduct.access}
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
          <Button
            icon={<MdDone />}
            label={selectedProduct.access ? `Submit` : "No Permission"}
            isSubmitting={isSubmitting}
          />
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
