// import { inngest } from "./client";

// export const helloWorld = inngest.createFunction(
//   { id: "hello-world" },
//   { event: "test/hello.world" },
//   async ({ event, step }) => {
//     await step.sleep("wait-a-moment", "1s");
//     return { message: `Hello ${event.data.email}!` };
//   }
// );
import { eq } from "drizzle-orm";
import { generateNotesAiModel } from "../../configs/AIModal";
import {
  CHAPTER_NOTES_TABLE,
  STUDY_MATERIAL_TABLE,
  USER_TABLE,
} from "../../configs/schema";
import { inngest } from "./client";
import db from "../../configs/db";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  }
);

// export const createNewUser = inngest.createFunction(
//   // { id: 'create-user' },
//   // { event: 'user.create' },
//   // async ({ event, step }) => {
//   //   await step.run('Check User create New if Not in DB', async () => {
//   //     const result = await db.select().from(USER_TABLE).where(eq(USER_TABLE.name, user?.fullName))
//   //   })
//   // }
// );

export const GenerateNotes = inngest.createFunction(
  { id: "generate-course" },
  { event: "notes.generate" },
  async ({ event, step }) => {
    const { course } = event.data;

    const notesResult = await step.run("Generate Chapter", async () => {
      const Chapters = course?.courseLayout?.chapters;
      let index = 0;
      Chapters.forEach(async (chapter) => {
        const PROMPT =
          "Generate exam material detail for each chapter, Make sure to include all topics point in the content, make sure to give content in HTML, format (Do not add HTMLK, Head, Body, title tag), The chapters:" +
          JSON.stringify(chapter);
        const result = await generateNotesAiModel.sendMessage(PROMPT);
        const aiResp = result.response.text();

        await db.insert(CHAPTER_NOTES_TABLE).values({
          chapterId: index,
          courseId: course?.courseId,
          notes: aiResp,
        });
        index = index + 1;
      });
      return "Completed";
    });

    //Update Status to Ready
    const updateCourseStatusResult = await step.run(
      "Update Course Status to Ready",
      async () => {
        const result = await db
          .update(STUDY_MATERIAL_TABLE)
          .set({
            status: "Ready",
          })
          .where(eq(STUDY_MATERIAL_TABLE.courseId, course?.courseId));
        return "Success";
      }
    );
  }
);
