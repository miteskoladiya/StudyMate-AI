import { serve } from "inngest/next";
import { inngest } from "../../../inngest/client";
import { CreateNewUser,GenerateNotes,GenerateStudyTypeContent,helloWorld } from "@/inngest/functions";
export const runtime= 'edge';
// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  streaming:'allow',
  
  functions: [
    helloWorld, // <-- This is where you'll always add all your functions
    CreateNewUser,
    GenerateNotes ,
    GenerateStudyTypeContent
  ],
});
