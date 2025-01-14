import { NextResponse } from "next/server";
import { inngest } from "@/inngest/client";
import { recipeOutline } from "../../../../configs/AI";
import { RECIPE_TABLE } from "../../../../configs/schema";
import db from "../../../../configs/db";

export async function POST(req) {
  const { recipeId, ingridients, calories, createdBy } = await req.json();

  const PROMPT =
    "Generate a recipe using these ingredients:" +
    ingridients +
    " , with a calorie limit of" +
    calories +
    "per serving, in JSON format with title, description, ingredients (name, quantity, notes), steps, total calories, calories per serving, servings, prep time, cook time, total time, cuisine, dietary preferences, difficulty, and tags.";
  //Generate
  const aiResp = await recipeOutline.sendMessage(PROMPT);
  const aiResult = JSON.parse(aiResp.response.text());
  console.log("Here is the error");

  //Save to DB
  const dbResult = await db.insert(RECIPE_TABLE)
    .values({
      recipeId: recipeId,
      ingridients: ingridients,
      calories: calories,
      recipeLayout: aiResult,
      createdBy: createdBy,
    })
    .returning({ resp: RECIPE_TABLE });

  console.log(dbResult);

  //Trigger the inngest fucntion to generate notes

  // const result = await inngest.send({
  //   name: "notes.generate",
  //   data: {
  //     course: dbResult[0].resp,
  //   },
  // });
  // console.log(result);

  return NextResponse.json({ result: dbResult[0] });
}



// export const recipeTable = pgTable("recipeTable", {
//   id: serial().primaryKey(),
//   recipeId: varchar().notNull(),
//   ingridients: varchar().notNull(),
//   calories: varchar().notNull(),
//   recipeLayout: json(),
//   createdBy: varchar().notNull(),
//   status: varchar().default('Genrating')
// })