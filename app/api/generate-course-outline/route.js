import { STUDY_MATERIAL_TABLE } from "@/configs/schema";
import { NextResponse } from "next/server";
import { courseOutlineAIModel } from "@/configs/AiModel";
import { db } from "@/configs/db";
import { inngest } from "../../../inngest/client";




export async function POST(req) {
    try {
        const { courseId, topic, courseType, difficultyLevel, createdBy } = await req.json();

        //console.log("Received Data:", { courseId, topic, courseType, difficultyLevel, createdBy });

        const PROMPT = `Generate a study material for ${topic} for ${courseType} and level of difficulty will be ${difficultyLevel} with summary of course, List of Chapters along with summary for each chapter, Topic list in each chapter in JSON format`;

        // Generate course outline using AI
        const aiResp = await courseOutlineAIModel.sendMessage(PROMPT);

        //console.log("AI Raw Response:", aiResp);
        
        const aiText = aiResp?.response?.text?.(); 
        if (!aiText) throw new Error("AI response text is empty.");
        
        const aiResult = JSON.parse(aiText);
        

        //console.log("AI Generated Data:", aiResult);

        // Save the result along with user input
        const dbResult = await db.insert(STUDY_MATERIAL_TABLE).values({
            courseId,
            courseType,
            topic,
            createdBy,
            difficultyLevel,
            courseLayout: aiResult,
        }).returning({ resp: STUDY_MATERIAL_TABLE });


        //console.log("Database Insert Result:", dbResult);


        //trigger the inngest function to genearte chapter notes
        const result=await inngest.send({
            name:'notes.generate',
            data:{
                course:dbResult[0].resp
            }
        });

        console.log(result);
        


        return NextResponse.json({ result: dbResult[0] });
    } catch (error) {
        console.error("Error in POST /api/generate-course-outline:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
