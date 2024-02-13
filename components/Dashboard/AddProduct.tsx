"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaRegImage } from "react-icons/fa";
import DashboardInput from "./DashboardInput";
import { useFormState } from "react-dom";
import { addNewProduct } from "@/libs/actions";
import SubmitButton from "../UI/SubmitButton";
import { MdDone } from "react-icons/md";
import RadioInputs from "./RadioInputs";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import DashboardTextArea from "./DashboardTextArea";
const dashboardInputs = [
  {
    label: "Name",
    placeholder: "Add product name",
    value: undefined,
    name: "name",
    registerValue: "name",
    type: "text",
  },
  {
    label: "Price",
    placeholder: "Add product price",
    value: undefined,
    name: "price",
    registerValue: "price",
    type: "number",
  },
];
const dashboardTextAreas = [
  {
    label: "Short product description",
    placeholder: "One sentence about product",
    value: undefined,
    name: "about-product",
    registerValue: "aboutProduct",
    type: "text",
  },
  {
    label: "Longer product description",
    placeholder: "Longer description about product",
    value: undefined,
    name: "product-description",
    registerValue: "productDescription",
    type: "text",
  },
  {
    label: "About seller",
    placeholder: "Longer description about seller",
    value: undefined,
    name: "about-seller",
    registerValue: "aboutSeller",
    type: "text",
  },
];
const categories = [
  { name: "DJ Equipment", path: "dj" },
  { name: "Vinyl", path: "vinyls" },
  { name: "Softwere", path: "softweres" },
];
const djsSubCategories = [
  { name: "Pioneer", path: "pioneer" },
  { name: "Dennon", path: "denon" },
];

const schema = z.object({
  name: z.string().min(1),
  price: z.string().min(1),
  aboutProduct: z.string().min(10),
  productDescription: z.string().min(60),
  aboutSeller: z.string().min(60),
});
type FormFields = z.infer<typeof schema>;

const AddProduct = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubCategory, setSubSelectedCategory] = useState<string | null>(
    null
  );
  const [hasInteracted, setHasInteracted] = useState(false);
  const [imageFormatCheck, setImageFormatCheck] = useState(true);
  const [imageSrc, setImageSrc] = useState<any>(null);
  const [allErrors, setAllErrors] = useState({});
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    let file;
    if (event.target.files !== null) {
      file = event.target.files[0];
    }

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        // Check if the file starts with the PNG data URL prefix
        if (
          typeof reader.result === "string" &&
          reader.result.startsWith("data:image/png;base64,")
        ) {
          setImageFormatCheck(true);

          setImageSrc(reader.result);
          console.log("Uploaded image is in PNG format");
        } else {
          setImageFormatCheck(false);
          console.log("Uploaded image is not in PNG format");
          // Handle the case where the uploaded image is not in PNG format
        }
      };

      reader.readAsDataURL(file);
    }
  };
  useEffect(() => {
    setAllErrors(errors);
  }, [errors]);

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
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
    //    && ;
    // subCategoryChecker === false && setSubSelectedCategory(null);
    // console.log(subCategoryChecker);

    imageSrc && subCategoryChecker && (await addNewProduct(formData));
    setTimeout(() => {
      setHasInteracted(false);
    }, 1000);
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
        <SubmitButton label="Submit" icon={<MdDone />} />
      </form>
    </div>
  );
};

export default AddProduct;
{
  /* <div className="flex gap-5">
              <div className="py-1">
                <input
                  type="checkbox"
                  className="mr-1"
                  value="DJ Equipment"
                  onChange={handleCategoryChange}
                />
                <label> DJ Equipment</label>
              </div>
              <div className="py-1">
                <input
                  type="checkbox"
                  className="mr-1"
                  value="Vinyl"
                  onChange={handleCategoryChange}
                />
                <label> Vinyl</label>
              </div>
              <div className="py-1">
                <input
                  type="checkbox"
                  className="mr-1"
                  value="Software"
                  onChange={handleCategoryChange}
                />
                <label> Software</label>
              </div>
</div>*/
}
