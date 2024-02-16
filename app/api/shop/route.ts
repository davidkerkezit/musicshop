import DJ from "@/models/dj";
import Vinyl from "@/models/vinyl";
import Softwere from "@/models/softwere";
import Product from "@/models/product";
import connectMongoDB from "@/libs/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";

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
  let models;

  switch (collection) {
    case "allproducts":
      models = [DJ, Vinyl, Softwere];
      break;
    case "vinyls":
      models = [Vinyl];
      break;
    case "djequipments":
      models = [DJ];
      break;
    case "softweres":
      models = [Softwere];
      break;
    default:
      models = [DJ, Vinyl, Softwere];
      break;
  }
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

    return NextResponse.json({
      products,
      newProducts,
      pages:
        productsQuantity.length !== 0 &&
        Math.ceil(productsQuantity[0].totalProducts / pageSize),
    });
  } catch (err) {
    console.error("Error:", err);
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

    let model;
    let mongoCategory;

    switch (category) {
      case "dj":
        model = DJ;
        mongoCategory = "djequipment";
        break;
      case "vinyls":
        model = Vinyl;
        mongoCategory = "vinyl";
        break;
      case "softweres":
        model = Softwere;
        mongoCategory = "softwere";
        break;
      default:
        break;
    }

    await connectMongoDB(); // Connect to MongoDB

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

      console.log("Product added successfully:", createdProduct._id); // Log the ID of the created product
      return NextResponse.json(
        { id: createdProduct._id, message: "Product added successfully" },
        { status: 201 }
      );
    } else {
      console.error("Invalid category");
      return NextResponse.json({ error: "Invalid category" }, { status: 400 });
    }
  } catch (error) {
    console.error("Error adding product:", error);
    return NextResponse.json(
      { error: "Error adding product" },
      { status: 500 }
    );
  }
}
export async function DELETE(request: NextRequest, response: NextResponse) {
  console.log("here");

  const { id, category } = await request.json();
  console.log(id, category);
  let model;

  switch (category) {
    case "djequipment":
      model = DJ;
      break;
    case "vinyl":
      model = Vinyl;
      break;
    case "softwere":
      model = Softwere;
      break;
    default:
      break;
  }
  console.log(typeof id);

  // if (!model) {
  //   return NextResponse.json({ message: "Invalid category" }, { status: 400 });
  // }

  await connectMongoDB();
  if (model) {
    const product = await model.findByIdAndDelete(id);
    // Handle product deletion or any other logic here
  } else {
    // Handle the case where model is not defined
    return NextResponse.json({ message: "Product not found" }, { status: 404 });
  }

  console.log("Product deleted successfully");
  return NextResponse.json({ message: "Product deleted successfully" });
}
