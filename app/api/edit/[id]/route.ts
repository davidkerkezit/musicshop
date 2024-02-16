import connectMongoDB from "@/libs/mongodb";
import { createProductPipeline } from "@/libs/pipelines";
import DJ from "@/models/dj";
import Vinyl from "@/models/vinyl";
import Softwere from "@/models/softwere";
import { NextRequest, NextResponse } from "next/server";
import Product from "@/models/product";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  console.log("wtf");

  const id = params.id;
  const models = [DJ, Vinyl, Softwere];
  console.log(id, "id", "wtf");

  await connectMongoDB();

  try {
    let modelName: string | null = null;
    for (const model of models) {
      const product = await model.findById(id);
      return NextResponse.json({
        selectedProduct: product,
      });
      if (product) {
        modelName = model.modelName;

        break;
      }
    }
  } catch (err) {
    console.error("Error:", err);
  }
}
