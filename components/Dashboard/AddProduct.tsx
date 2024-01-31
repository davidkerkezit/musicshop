"use client";
import Image from "next/image";
import { useState } from "react";
import { FaRegImage } from "react-icons/fa";
import DashboardInput from "./DashboardInput";

const AddProduct = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    let file;
    if (event.target.files !== null) {
      file = event.target.files[0];
    }

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImageSrc(reader.result as string);
      };

      reader.readAsDataURL(file);
    }
  };
  return (
    <div className="w-full mx-32">
      <h2 className=" py-4 text-3xl font-thin">Add New Product</h2>
      <form className="flex flex-row gap-20 ">
        <div className="w-1/2 flex flex-col gap-4">
          <DashboardInput
            label="Name"
            placeholder="Add product name"
            value={undefined}
          />
          <DashboardInput
            label="Price"
            placeholder="Add product price"
            value={undefined}
          />
          <div className="px-1">
            <label htmlFor="" className=" text-lg font-light">
              Category
            </label>
            <div className="flex gap-5  ">
              <div className="py-1">
                <input type="checkbox" className="mr-1" />
                <label className=""> DJ Equipment</label>
              </div>
              <div className="py-1">
                <input type="checkbox" className="mr-1" />
                <label className=""> Vinyl</label>
              </div>{" "}
              <div className="py-1">
                <input type="checkbox" className="mr-1" />
                <label className=""> Softwere</label>
              </div>
            </div>
          </div>
          <DashboardInput
            label="About product"
            placeholder="One sentence about product"
            value={undefined}
          />
          <DashboardInput
            label="Product description"
            placeholder="Longer description about product"
            value={undefined}
          />
          <DashboardInput
            label="About seller"
            placeholder="Longer description about seller"
            value={undefined}
          />
        </div>
        <div className="w-1/2 flex flex-col gap-4 ">
          <div className="border-juice/50 border-[1px] h-[18rem] w-[18rem] aspect-square  mt-5 flex justify-center items-center bg-gradient-to-r from-white/5 to-white/10 overflow-hidden">
            {imageSrc !== null ? (
              <Image
                src={imageSrc}
                alt="Uploaded"
                width={600}
                height={600}
                className=" object-contain"
              />
            ) : (
              <FaRegImage size={40} className="text-white/50" />
            )}
          </div>
          <div className="flex  gap-2 ">
            <input
              className=""
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
