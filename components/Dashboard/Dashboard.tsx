"use client";
import { ProductType } from "@/libs/types";
import { useAppSelector } from "@/libs/store";
import { AddProduct, EditProducts } from "..";
import { useSearchParams } from "next/navigation";
import Orders from "./Orders";

const Dashboard = ({
  products,
  pages,
}: {
  products: ProductType[];
  pages: number;
}) => {
  const searchParams = useSearchParams();
  const option = searchParams.get("option") || "addproduct";
  return (
    <>
      {option === "addproduct" && <AddProduct />}
      {option === "editproducts" && (
        <EditProducts products={products} pages={pages} />
      )}
      {option === "orders" && <Orders />}
    </>
  );
};

export default Dashboard;
