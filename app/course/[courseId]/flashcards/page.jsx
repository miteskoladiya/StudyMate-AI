"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import FlashcardItem from "./_components/flashcardItem";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";

const Flashcards = () => {
    const { courseId } = useParams();

    const [flashCards, setFlashCards] = useState([]);
    const [isFlipped, setIsFlipped] = useState();
const[api,setApi]=useState();
const [loading, setLoading] = useState(false); 

    useEffect(() => {
        GetFlashCards();
    }, []);

    useEffect(() => {
if(!api){
    return ;
}
api.on('select',()=>{
    setIsFlipped(false);
})
    }, [api])
    

    const GetFlashCards = async () => {
        const result = await axios.post("/api/study-type", {
            courseId: courseId,
            studyType: "Flashcard",
        });
        setFlashCards(result?.data);

        console.log("Flashcard", result.data);
    };

    const handleClick = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <div>
            <h2 className="font-bold text-2xl">FlashCards</h2>
            <p>Flashcards: The Ultimate Tool to Lock in Concepts!</p>

            <div className= "mt-10">
                <Carousel setApi={setApi}>
                    <CarouselContent>
                        {flashCards?.content &&flashCards.content?.map((flashcard, index) => (
                            <CarouselItem key={index} className="flex items-center justify-center mt-10">
                                <FlashcardItem
                                    handleClick={handleClick}
                                    isFlipped={isFlipped}
                                    flashcard={flashcard}
                                    flas
                                />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
            {!flashCards?.content && (
    <div className="text-center py-16 bg-white rounded-xl shadow-md">
        <div className="max-w-md mx-auto">
            <p className="text-gray-500 text-lg mb-6">
                No flashcards available yet.
            </p>
            <Button
                onClick={GetFlashCards}
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

export default Flashcards;
