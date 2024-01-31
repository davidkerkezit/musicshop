"use client";
import DashboardInput from "@/components/Dashboard/DashboardInput";
import ProductInformatiom from "@/components/Product/ProductInformatiom";
import { getProduct } from "@/libs/actions";
import { ProductType } from "@/libs/types";
import Image from "next/image";
import React, { useState } from "react";

const EditProduct = ({
  selectedProduct,
  category,
}: {
  selectedProduct: any[];
  category: string;
}) => {
  const [imageSrc, setImageSrc] = useState<null | string>(null);
  const [value, setValue] = useState<number>(0);

  const handleIncrease = () => {
    setValue(value + 1);
  };

  const handleDecrease = () => {
    setValue(value - 1);
  };
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    let file;
    if (event.target.files !== null) {
      file = event.target.files[0];
    }

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        // Set the image source to the data URL obtained from FileReader
        setImageSrc(reader.result as string);
      };
      console.log(imageSrc);

      // Read the contents of the uploaded image
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className="flex flex-col gap-10 mx-14 ">
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
              src={selectedProduct[0].imageUrl}
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
          <DashboardInput
            label="Product name"
            placeholder=""
            value={selectedProduct[0].name}
          />

          <p className="text-xl">Category: {category}</p>
          <DashboardInput
            label="About product"
            placeholder=""
            value={selectedProduct[0].about}
          />
          <DashboardInput
            label="Product price ($)"
            placeholder=""
            value={selectedProduct[0].price}
          />
          <div>
            <label htmlFor="">In stock:</label>
            <button onClick={() => setValue((value) => value + 1)}>+</button>
            <input
              type="number"
              name=""
              id=""
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                e && setValue(parseInt(e.target.value))
              }
              value={value}
              className="w-[4rem] text-black px-2"
            />
            <button onClick={() => value > 1 && setValue((value) => value - 1)}>
              -
            </button>
          </div>
        </div>
      </div>
      <ProductInformatiom
        aboutProduct={selectedProduct[0].description}
        aboutSeller={selectedProduct[0].aboutSeller}
      />
    </div>
  );
};

export default EditProduct;
