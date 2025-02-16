"use client";
import React, { useState } from "react";
import SelectOption from "./_components/SelectOption";
import { Button } from "@/components/ui/button";
import TopicInput from "./_components/TopicInput";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";



const Create = () => {
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState([]);
    const { user } = useUser();
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const handleUserInput = (fieldName, fieldValue) => {
        setFormData((prev) => ({ ...prev, [fieldName]: fieldValue }));
        console.log(formData);
    };

    // used to save user input and generate course outline using ai
    const GenerateCourseOutline = async () => {
        try {
            const courseId = uuidv4();
            setLoading(true);
            const result = await axios.post("/api/generate-course-outline", {
                courseId: courseId,
                ...formData,
                createdBy: user?.primaryEmailAddress?.emailAddress,
            });
            
            //console.log(createdBy);
            if(result.data.error) {
                throw new Error(result.data.error);
            }
            

            toast.success("Your study material has been generated successfully.", {
                description: "Redirecting to dashboard..."
            });

            router.replace('/dashboard');
        } catch (error) {
            console.error('Generation failed:', error);
            toast.error("Failed to generate course", {
                description: "Please try again."
            });
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="flex flex-col items-center p-5 md:px-24 lg:px-36 mt-20">
            <h2 className="font-bold text-4xl text-primary">
                Start Building Your Personal Study Material{" "}
            </h2>
            <p className="text-gray-500 text-lg">
                Fill All Details in order to genrate study material for your next
                project
            </p>

            <div className="mt-10">
                {step == 0 ? (
                    <SelectOption
                        selectedStudyType={(value) => handleUserInput("courseType", value)}
                    />
                ) : (
                    <TopicInput
                        setTopic={(value) => handleUserInput("topic", value)}
                        setDiffcultyLevel={(value) =>
                            handleUserInput("difficultyLevel", value)
                        }
                    />
                )}
            </div>

            <div className="flex justify-between w-full mt-32">
                {step != 0 ? (
                    <Button onClick={() => setStep(step - 1)} variant="outline">
                        Previous
                    </Button>
                ) : (
                    "-"
                )}
                {step == 0 ? (
                    <Button onClick={() => setStep(step + 1)}>Next</Button>
                ) : (
                    <Button onClick={GenerateCourseOutline} disabled={loading}>
                        {loading ? <Loader className="animate-spin" /> : "Generate"}
                    </Button>
                )}
            </div>
        </div>
    );
};

export default Create;
