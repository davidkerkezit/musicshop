import connectMongoDB from "@/libs/mongodb";
import { NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import DJ from "@/models/dj";
import Vinyl from "@/models/vinyl";
import Softwere from "@/models/softwere";
import { ProductType } from "@/libs/types";

export async function POST(req: NextRequest, res: NextApiResponse) {
  const { cart } = await req.json();
  await connectMongoDB();

  const models = [DJ, Vinyl, Softwere];

  let ids: string[] = [];
  for (const product of cart) {
    ids.push(product.productId);
  }

  try {
    let products: ProductType[] = [];

    for (const Model of models) {
      // Find products by ID for each model
      const foundProducts = await Model.find({ _id: { $in: ids } });
      products = products.concat(foundProducts);
    }

    return NextResponse.json({
      products,
    });
  } catch (err) {
    console.error("Error:", err);
    return NextResponse.json({ message: "error" });
  }
}
