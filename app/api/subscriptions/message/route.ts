import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { subject, message, emails } = await req.json();
  //   DEMO
}
