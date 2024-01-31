"use client";
import { ProductType } from "@/libs/types";
import { useAppSelector } from "@/libs/store";
import { AddProduct, EditProducts } from "..";

const Dashboard = ({
  products,
  pages,
}: {
  products: ProductType[];
  pages: number;
}) => {
  const dashboardOption = useAppSelector((state) => state.dashboardSlice);
  return (
    <>
      {dashboardOption === "add" ? (
        <AddProduct />
      ) : (
        <EditProducts products={products} pages={pages} />
      )}
    </>
  );
};

export default Dashboard;
