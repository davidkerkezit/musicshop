import DashboardInput from "@/components/Dashboard/DashboardInput";
import ProductInformatiom from "@/components/Product/ProductInformatiom";
import { getEditableProduct } from "@/libs/actions";
import Image from "next/image";
import React, { useState } from "react";

import EditProduct from "@/components/Dashboard/EditProduct";
const page = async ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const { selectedProduct, category } = await getEditableProduct(id);
  return (
    <div>
      <EditProduct selectedProduct={selectedProduct} category={category} />
    </div>
  );
};

export default page;
