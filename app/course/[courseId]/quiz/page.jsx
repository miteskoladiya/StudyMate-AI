"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import StepProgress from "../_components/StepProgress";
import QuizCardItem from "./_components/QuizCardItem";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import { RefreshCcw } from "lucide-react";

const Quiz = () => {
    const router = useRouter();
    const { courseId } = useParams();
    const [quizData, setQuizData] = useState();
    const [quiz, setQuiz] = useState([]);
    const [stepCount, setStepCount] = useState(0);
    const [isCorrectAns, setIsCorrectAns] = useState(null);
    const [loading, setLoading] = useState(false); 
    const [correctAns, setCorrectAns] = useState();

    const [isCompleted, setIsCompleted] = useState(false);

    const [userAnswers, setUserAnswers] = useState({}); 

    useEffect(() => {
        GetQuiz();
    }, []);

    const GetQuiz = async () => {
        try {
          const result = await axios.post("/api/study-type", {
            courseId: courseId,
            studyType: "Quiz",
          });
          
          // Add null check and default value
          setQuiz(result.data.content?.questions || []);  // Fallback to empty array
          
        } catch (error) {
          console.error("Error fetching quiz:", error);
          setQuiz([]);  // Ensure quiz stays as array on error
        }
      };
    const checkAnswer = (userAnswer, currentQue) => {

        setCorrectAns(currentQue?.correctAnswer);

        setUserAnswers(prev => ({
            ...prev,
            [stepCount]: {
                userAnswer,
                isCorrect: userAnswer == currentQue?.correctAnswer
            }
        }));


        if (userAnswer == currentQue?.correctAnswer) {
            setIsCorrectAns(true);
            // setCorrectAns(currentQue?.correctAnswer);
            return;
        }
        setIsCorrectAns(false);
    };

  useEffect(() => {
        // When step changes, show previous answer if it exists
        const previousAnswer = userAnswers[stepCount];
        if (previousAnswer) {
            setIsCorrectAns(previousAnswer.isCorrect);
            setCorrectAns(quiz[stepCount]?.correctAnswer);
        } else {
            setCorrectAns(null);
            setIsCorrectAns(null);
        }
    }, [stepCount]);

    return (
        <div>
            <h2 className="font-bold text-2xl text-center mb-4">Quiz</h2>

            {quiz?.length !== stepCount  ? (
                <>
                    <StepProgress
                        data={quiz}
                        stepCount={stepCount}
                        setStepCount={(v) => setStepCount(v)}
                    />

<div>
    {quiz && quiz.length > 0 && stepCount < quiz.length ? (
        <QuizCardItem
            quiz={quiz[stepCount]}
            userSelectedOption={(v) => checkAnswer(v, quiz[stepCount])}
        />
    ) : (
        <div className="text-center">
            {!quiz ? "Loading..." : "No questions available"}
        </div>
    )}
</div>

                    {isCorrectAns === false && (
                        <div>
                            <div className="border p-3 border-red-700 bg-red-200">
                                <h2 className="font-bold text-lg text-red-600">Incorrect</h2>
                                <p className="text-red-600">Correct Answer is : {correctAns}</p>
                            </div>
                        </div>
                    )}

                    {isCorrectAns === true && (
                        <div>
                            <div className="border p-3 border-green-700 bg-green-200">
                                <h2 className="font-bold text-lg text-green-600">Correct</h2>
                                <p className="text-green-600">Your answer is Correct</p>
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <div className="flex items-center gap-10 flex-col justify-center">
                    <h2>Quiz Completed!</h2>
                    <Button onClick={() => router.back()}>Go to Course Page</Button>
                </div>
            )}


{quiz.length === 0 && (
    <div className="text-center py-16 bg-white rounded-xl shadow-md">
        <div className="max-w-md mx-auto">
            <p className="text-gray-500 text-lg mb-6">
                No questions are available yet.
            </p>
            <Button 
                onClick={GetQuiz}
                variant="outline" 
                className="hover:scale-105 transition-transform"
            >
                <RefreshCcw className={loading ? "animate-spin mr-2" : "mr-2"}/>
                Refresh Content
            </Button>
        </div>
    </div>
)}
        </div>
    );
};

export default Quiz;
