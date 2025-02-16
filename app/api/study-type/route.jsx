import { CHAPTER_NOTES_TABLE,  STUDY_TYPE_CONTENT_TABLE } from "@/configs/schema";
import { db } from "@/configs/db";
import { eq,and } from "drizzle-orm";
import { NextResponse } from "next/server";


export async function POST(req) {

    const { courseId, studyType } = await req.json();

    if (studyType == "ALL") {
        const notes = await db
            .select()
            .from(CHAPTER_NOTES_TABLE)
            .where(eq(CHAPTER_NOTES_TABLE.courseId, courseId));

            //get the all other study type records
const contentList=await db.select().from(STUDY_TYPE_CONTENT_TABLE).where(eq(STUDY_TYPE_CONTENT_TABLE?.courseId, courseId));


        const result = {
            notes: notes,
            flashcard: contentList?.find(item=>item.type=='Flashcard') ,
            quiz: contentList?.find(item=>item.type=='Quiz') ,
            qa: contentList?.find(item=>item.type=='Question/Answer') ,
        };
        return NextResponse.json(result);
    }
    else if(studyType=='notes')
    {
        const notes = await db
        .select()
        .from(CHAPTER_NOTES_TABLE)
        .where(eq(CHAPTER_NOTES_TABLE.courseId, courseId));

        return NextResponse.json(notes);
    }
    else if (studyType == 'Quiz') {
        const result = await db
            .select()
            .from(STUDY_TYPE_CONTENT_TABLE)
            .where(and(eq(STUDY_TYPE_CONTENT_TABLE.courseId, courseId), eq(STUDY_TYPE_CONTENT_TABLE.type, studyType))); 
        return NextResponse.json(result[0]);
    }
    else  {
        const qaContent = await db
            .select()
            .from(STUDY_TYPE_CONTENT_TABLE)
            .where(
                and(
                    eq(STUDY_TYPE_CONTENT_TABLE.courseId, courseId),
                    eq(STUDY_TYPE_CONTENT_TABLE.type, studyType)
                )
            );
        return NextResponse.json(qaContent[0]);
    }
    
}
