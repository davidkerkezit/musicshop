import connectMongoDB from "@/libs/mongodb";
import { NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import DJ from "@/models/dj";
import Vinyl from "@/models/vinyl";
import Softwere from "@/models/softwere";

export async function POST(req: NextRequest, res: NextApiResponse) {
  const { cart } = await req.json();
  console.log(cart);
  await connectMongoDB();

  const models = [DJ, Vinyl, Softwere];

  let ids: any[] = [];
  for (const product of cart) {
    ids.push(product.id);
  }
  try {
    let products: any[] = [];

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
