import connectMongoDB from "@/libs/mongodb";
import { createProductPipeline } from "@/libs/pipelines";
import DJ from "@/models/dj";
import Vinyl from "@/models/vinyl";
import Softwere from "@/models/softwere";
import { NextRequest, NextResponse } from "next/server";
import Product from "@/models/product";

export async function GET() {
  // req: NextRequest,
  // { params }: { params: { id: string } }
  console.log("here");

  const id = "659eb288bf0d600243bc0200";
  const models = [DJ, Vinyl, Softwere];

  await connectMongoDB();

  try {
    const product = await DJ.findById(id);

    return NextResponse.json({
      selectedProduct: product,
    });
  } catch (err) {
    console.error("Error:", err);
  }
}
