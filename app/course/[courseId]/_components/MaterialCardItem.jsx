import { Button } from "@/components/ui/button";
import axios from "axios";
import { RefreshCcw } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "sonner";

const MaterialCardItem = ({ item, studyTypeContent, course, refreshData }) => {
    const [loading, setLoading] = useState(false);

    // Helper function to check if content exists for a specific type
    const hasContent = () => {
        if (item.type === 'notes') {
            return studyTypeContent?.notes && studyTypeContent.notes.length > 0;
        }
        if (item.type === 'Flashcards') {
            return studyTypeContent?.flashcard && studyTypeContent.flashcard?.content;
        }
        if (item.type === 'quiz') {
            return studyTypeContent?.quiz && studyTypeContent.quiz?.content;
        }
        if (item.type === 'qa') {
            return studyTypeContent?.qa && studyTypeContent.qa?.content;
        }
        return studyTypeContent?.[item.type] && studyTypeContent[item.type].length > 0;
    };

    const GenerateContent = async (event) => {
        toast('Generating your content');
        //event.preventDefault();
        setLoading(true);
        
        let chapters = '';
        course?.courseLayout.chapters.forEach((chapter) => {
            chapters = (chapter.chapter_title || chapter.chapterTitle) + ',' + chapters;
        });

        try {
            const result = await axios.post("/api/study-type-content", {
                courseId: course?.courseId,
                type: item.name,
                chapters: chapters
            });

            if (result?.data) {
                refreshData(true);
                toast('Your content is ready to view');
            }
        } catch (error) {
            toast('Failed to generate content');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`border shadow-md rounded-lg p-5 flex flex-col items-center
            ${!hasContent() && "grayscale"}`}
        >
            {!hasContent() ? (
                <h2 className="px-2 p-1 mb-2 text-white rounded-lg bg-gray-500 text-[10px]">
                    Generate
                </h2>
            ) : (
                <h2 className="px-2 p-1 mb-2 text-white rounded-lg bg-green-500 text-[10px]">
                    Ready
                </h2>
            )}
            <Image src={item.icon} alt={item.name} width={50} height={50} />
            <h2 className="font-medium mt-3">{item.name}</h2>
            <p className="text-gray-500 text-sm text-center">{item.desc}</p>

            {!hasContent() ? (
                <Button
                    className="mt-3 w-full"
                    variant="outline"
                    onClick={(e) => GenerateContent(e)}
                    disabled={loading}
                >
                    {loading && <RefreshCcw className="animate-spin mr-2"/>}
                    Generate
                </Button>
            ) : (
                <Link href={`/course/${course?.courseId}${item.path}`} className="w-full">
                    <Button className="mt-3 w-full" variant="outline">
                        View
                    </Button>
                </Link>
            )}
        </div>
    );
};

export default MaterialCardItem;