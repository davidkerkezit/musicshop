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
// export async function POST(request: NextResponse) {
//   const { name, price, imageUrl } = await request.json();
//   await connectMongoDB();
//   await Softwere.create({ name, price, imageUrl });
//   return NextResponse.json({ message: "DJ equipment added" }, { status: 201 });
// }
