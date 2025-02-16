"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import StepProgress from "../_components/StepProgress";
import { RefreshCcw } from "lucide-react";


const Qa = () => {
    const router = useRouter();
    const { courseId } = useParams();
    const [qaData, setQaData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stepCount, setStepCount] = useState(0);

    useEffect(() => {
        getQAContent();
    }, []);

    const getQAContent = async () => {
        try {
            const response = await axios.post("/api/study-type", {
                courseId: courseId,
                studyType: "Question/Answer",
            });
            setQaData(response.data?.content || []);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching Q&A:", error);
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    return ( <div className="max-w-4xl mx-auto p-6 min-h-screen bg-gradient-to-b from-white to-gray-50">
            <div className="mb-12 text-center">
                <h1 className="text-4xl font-bold text-primary mb-3 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                    Questions & Answers
                </h1>
                <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                    Test your knowledge and understanding with these carefully crafted questions.
                </p>
            </div>
    
            {qaData.length > 0 && (
                <div className="mb-8">
                    <StepProgress
                        data={qaData}
                        stepCount={stepCount}
                        setStepCount={(v) => setStepCount(v)}
                        isLastStep={stepCount === qaData.length - 1}
                    />
                </div>
            )}
    
            {qaData.length > 0 && stepCount < qaData.length && (
                <div className="bg-white shadow-lg rounded-xl p-8 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-start text-left mb-6">
                        <span className="text-primary font-semibold text-xl mr-3 bg-primary/10 rounded-full w-8 h-8 flex items-center justify-center">
                            {stepCount + 1}
                        </span>
                        <span className="font-semibold text-xl text-gray-800">
                            {qaData[stepCount]?.question}
                        </span>
                    </div>
                    <div className="pl-11">
                        <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                            <h3 className="text-primary font-medium mb-2">Answer:</h3>
                            <p className="text-gray-700 leading-relaxed">
                                {qaData[stepCount]?.answer}
                            </p>
                        </div>
                    </div>
                </div>
            )}
    
            {qaData.length > 0 && stepCount === qaData.length && (
                <div className="flex items-center gap-8 flex-col justify-center mt-12 bg-white p-10 rounded-xl shadow-lg">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-primary mb-3">
                            Congratulations! 🎉
                        </h2>
                        <p className="text-gray-600">
                            You've completed all the questions in this section.
                        </p>
                    </div>
                    <Button 
                        onClick={() => router.back()} 
                        className="px-8 py-6 text-lg hover:scale-105 transition-transform"
                    >
                        Return to Course
                    </Button>
                </div>
            )}
    
            {qaData.length === 0 && (
                <div className="text-center py-16 bg-white rounded-xl shadow-md">
                    <div className="max-w-md mx-auto">
                        <p className="text-gray-500 text-lg mb-6">
                            No questions are available for this topic yet.
                        </p>
                        <Button 
                            onClick={getQAContent} 
                            variant="outline" 
                            className="hover:scale-105 transition-transform"
                        >
                            Refresh Content
                        </Button>
                    </div>
                </div>
            )}
            {stepCount === qaData.length - 1 && (
    <div className="flex items-center gap-10 flex-col justify-center mt-8">
        <h2>End of Notes</h2>
        <Button onClick={() => router.back()}>Go to Course Page</Button>
    </div>
)}
        </div>

        
    );
};

export default Qa;

