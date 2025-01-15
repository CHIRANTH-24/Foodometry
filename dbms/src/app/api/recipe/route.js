import { NextResponse } from "next/server";
import db from "../../../../configs/db";
import { eq } from "drizzle-orm";
import { RECIPE_TABLE } from "../../../../configs/schema";

export async function POST(req) {
  const { createdBy } = await req.json();
  const result = await db
    .select()
    .from(RECIPE_TABLE)
    .where(eq(RECIPE_TABLE.createdBy, createdBy));
  return NextResponse.json({ result: result });
}

export async function GET(req) {
  const reqUrl = req.url;
  const { searchParams } = new URL(reqUrl);
  const recipeId = searchParams?.get("recipeId");

  const course = await db
    .select()
    .from(RECIPE_TABLE)
    .where(eq(RECIPE_TABLE?.recipeId, recipeId));
  return NextResponse.json({ result: course[0] });
}

