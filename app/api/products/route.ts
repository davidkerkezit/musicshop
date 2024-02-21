import DJ from "@/models/dj";
import Vinyl from "@/models/vinyl";
import Softwere from "@/models/softwere";
import Product from "@/models/product";
import connectMongoDB from "@/libs/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { NextApiResponse } from "next";

import {
  createAllProductsPipeline,
  createNewArrivalsPipeline,
  createPagesNumberPipeline,
} from "@/libs/pipelines";

export async function GET(req: NextRequest, res: NextApiResponse) {
  await connectMongoDB();
  const fullUrl = req.url;
  const urlObject = new URL(`${fullUrl}`);
  const query = urlObject.searchParams.get("q");
  const pageQuery = urlObject.searchParams.get("page");
  const collection = urlObject.searchParams.get("collection");
  const sort = urlObject.searchParams.get("sort");
  const page = (pageQuery !== null && parseInt(pageQuery)) || 1;
  const pageSize = 8;
  const collectionMap: any = {
    allproducts: [DJ, Vinyl, Softwere],
    vinyls: [Vinyl],
    djequipments: [DJ],
    softweres: [Softwere],
  };
  const models =
    collection !== null ? collectionMap[collection] : [DJ, Vinyl, Softwere];
  const newArrivalsPipeline = createNewArrivalsPipeline([DJ, Vinyl, Softwere]);
  const allProductsPipeline = createAllProductsPipeline(
    models,
    query,
    page,
    pageSize,
    sort
  );
  const productsQuantityPipeline = createPagesNumberPipeline(models, query);
  try {
    const [newProducts, products, productsQuantity] = await Promise.all([
      Product.aggregate(newArrivalsPipeline),
      Product.aggregate(allProductsPipeline),
      Product.aggregate(productsQuantityPipeline),
    ]);

    return NextResponse.json(
      {
        products,
        newProducts,
        pages:
          productsQuantity.length !== 0 &&
          Math.ceil(productsQuantity[0].totalProducts / pageSize),
      },
      { status: 201 }
    );
  } catch (err) {
    console.log("Error message: Error with GET Products API");
  }
}
export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const {
      name,
      price,
      imageUrl,
      about,
      description,
      aboutSeller,
      category,
      inStock,
    } = await request.json();

    const categoryMap: any = {
      dj: { model: DJ, mongoCategory: "djequipment" },
      vinyls: { model: Vinyl, mongoCategory: "vinyl" },
      softweres: { model: Softwere, mongoCategory: "softwere" },
    };

    const { model, mongoCategory } = categoryMap[category] || {};

    await connectMongoDB();

    if (model) {
      const createdProduct = await model.create({
        name,
        price,
        imageUrl,
        about,
        description,
        aboutSeller,
        category: mongoCategory,
        inStock,
      });

      console.log("Product added successfully");
      return NextResponse.json(
        {
          message: "Product added successfully",
          id: createdProduct._id,
          status: "success",
        },
        { status: 201 }
      );
    } else {
      console.log("Error message: Invalid category on POST Products API");
      return NextResponse.json({ error: "Invalid category" }, { status: 400 });
    }
  } catch (error) {
    console.log("Error message: Error with POST Products API");
    return NextResponse.json(
      { error: "Error adding product" },
      { status: 500 }
    );
  }
}
export async function DELETE(request: NextRequest, response: NextResponse) {
  const { id, category } = await request.json();

  const categoryModelMap: any = {
    djequipment: DJ,
    vinyl: Vinyl,
    softwere: Softwere,
  };

  const model = categoryModelMap[category];
  if (!model) {
    console.log("Error message: Invalid category on DELETE Products API");

    return NextResponse.json({ message: "Invalid category" }, { status: 400 });
  }

  await connectMongoDB();
  if (model) {
    const product = await model.findByIdAndDelete(id);
  } else {
    console.log("Error message: Product not found on DELETE Products API");

    return NextResponse.json({ message: "Product not found" }, { status: 404 });
  }

  console.log("Product deleted successfully");
  return NextResponse.json({ message: "Product deleted successfully" });
}
