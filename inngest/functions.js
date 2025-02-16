import {
    generateNotesAiModel,
    GenerateStudyTypeContentAiModel,
    GenerateQuizAiModel,
    GenerateQaAiModel
} from "@/configs/AiModel";
import { inngest } from "./client";
import { db } from "@/configs/db";
import {
    STUDY_MATERIAL_TABLE,
    CHAPTER_NOTES_TABLE,
    USER_TABLE,
    STUDY_TYPE_CONTENT_TABLE,
} from "@/configs/schema";
import { eq } from "drizzle-orm";

export const helloWorld = inngest.createFunction(
    { id: "hello-world" },
    { event: "test/hello.world" },
    async ({ event, step }) => {
        await step.sleep("wait-a-moment", "1s");
        return { event, body: "Hello, World!" };
    }
);

export const CreateNewUser = inngest.createFunction(
    { id: "create-user" },
    { event: "user.create" },
    async ({ event, step }) => {
        const { user } = event.data;
        //Get Event Data
        const result = await step.run(
            "Check User and Create new if not in DB",
            async () => {
                //check is user already exist in database
                const result = await db
                    .select()
                    .from(USER_TABLE)
                    .where(eq(USER_TABLE.email, user?.primaryEmailAddress?.emailAddress));

                // console.log(result);

                if (result?.length == 0) {
                    //if not then add to DB
                    const userRes = await db
                        .insert(USER_TABLE)
                        .values({
                            name: user?.fullName,
                            email: user?.primaryEmailAddress?.emailAddress,
                        })
                        .returning({ id: USER_TABLE.id });
                    return userRes;

                    //console.log(userRes);
                }
                return result;
            }
        );

        return "Success";
    }

    //step is to send welcome email notification

    //step to send email notification after 3 days once user join it
);

export const GenerateNotes = inngest.createFunction(
    { id: "generate-notes" },
    { event: "notes.generate" },
    async ({ event, step }) => {
        const { course } = event.data; //all records info

        //generate notes using AI
        const notesResult = await step.run("Generate Chaptes Notes", async () => {
            const Chapters = course?.courseLayout?.chapters;
            let index = 0;
            Chapters.forEach(async (chapter) => {
                const PROMPT =
                    `Generate exam material detail content for each chapter, Make sure to include all topic point in the content; make sure to give content in HTML format (Do not Add HTML, Head, Body, title tag) , The chapters : ` +
                    JSON.stringify(chapter);

                const result = await generateNotesAiModel.sendMessage(PROMPT);

                const airesp = result?.response?.text?.();

                await db.insert(CHAPTER_NOTES_TABLE).values({
                    chapterId: index,
                    courseId: course?.courseId,
                    notes: airesp,
                });

                index++;
            });
            return "Completed";
        });

        //update status to ready
        const updateCourseStatusResult = await step.run(
            "Update Course Status to Ready",
            async () => {
                const result = await db
                    .update(STUDY_MATERIAL_TABLE)
                    .set({ status: "Ready" })
                    .where(eq(STUDY_MATERIAL_TABLE.courseId, course?.courseId));

                return "Success";
            }
        );
    }
);

//Used to generate flashcard ,quiz, question answer
export const GenerateStudyTypeContent = inngest.createFunction(
    { id: "Generate Study Type Content" },
    { event: "studyType.content" },

    async ({ event, step }) => {
        const { studyType, prompt, courseId, recordId } = event.data;

            const AiResult = await step.run("Generating Flashcard using AI",
                async () => {
                    const result = studyType=='Flashcard'? await GenerateStudyTypeContentAiModel.sendMessage(
                        prompt
                    ):studyType=='Quiz'? await GenerateQuizAiModel.sendMessage(
                        prompt
                    ): await GenerateQaAiModel.sendMessage(prompt);

                    const AIResult = JSON.parse(result.response.text());

                    return AIResult;
                }
            )
        
        //save the result

        const DbResult = await step.run("Save Result to DB", async () => {
            const result = await db
                .update(STUDY_TYPE_CONTENT_TABLE)
                .set({
                    content: AiResult,
                    status: "Ready",
                })
                .where(eq(STUDY_TYPE_CONTENT_TABLE.id, recordId));
        });
        return "Data Inserted";
        // return {
        //     aiResult: FlashcardAiResult,
        //     dbStatus: DbResult
        // };
    }
);
