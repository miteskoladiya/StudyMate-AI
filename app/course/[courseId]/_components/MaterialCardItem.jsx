import { Button } from "@/components/ui/button";
import axios from "axios";
import { RefreshCcw } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation"; // Add missing import

const MaterialCardItem = ({ item, studyTypeContent, course, refreshData ,href}) => {
    const router = useRouter(); // Initialize router
    const [loading, setLoading] = useState(false);
    const [localContent, setLocalContent] = useState(false);

    // Improved content check
    const hasContent = () => {
        if (localContent) return true;
        if (studyTypeContent?.[item.type]?.length > 0) return true;
        
        // Specific type checks
        switch(item.type) {
            case 'notes':
                return studyTypeContent?.notes?.length > 0;
            case 'Flashcards':
                return !!studyTypeContent?.flashcard?.content;
            case 'quiz':
                return !!studyTypeContent?.quiz?.content;
            case 'qa':
                return !!studyTypeContent?.qa?.content;
            default:
                return false;
        }
    };

    const GenerateContent = async () => {
        try {
            setLoading(true);
            toast('Generating your content...');
            
            const { data } = await axios.post("/api/study-type-content", {
                courseId: course.courseId,
                type: item.name,
                chapters: course.courseLayout.chapters
                    .map(ch => ch.chapter_title || ch.chapterTitle)
                    .join(',')
            });

            if (data) {
                setLocalContent(true); // Correct state update
                refreshData?.(true); // Force parent refresh
                router.prefetch(`/course/${course.courseId}${item.path}`);
                toast.success('Content generated successfully!');
            }
        } catch (error) {
            toast.error('Failed to generate content');
            console.error("Generation error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Link href={href}>
        <div className={`border shadow-md rounded-lg p-5 flex flex-col items-center
            ${!hasContent() && "grayscale"}`}
        >
            {/* Status Badge */}
            <div className="mb-2">
                {hasContent() ? (
                    <span className="px-2 py-1 text-white rounded-lg bg-green-500 text-[10px]">
                        Ready
                    </span>
                ) : (
                    <span className="px-2 py-1 text-white rounded-lg bg-gray-500 text-[10px]">
                        {loading ? 'Generating...' : 'Generate'}
                    </span>
                )}
            </div>

            <Image 
                src={item.icon} 
                alt={item.name} 
                width={50} 
                height={50}
                className="min-h-[50px]"
            />
            <h2 className="font-medium mt-3">{item.name}</h2>
            <p className="text-gray-500 text-sm text-center">{item.desc}</p>

            {hasContent() ? (
                <Link 
                    href={`/course/${course?.courseId}${item.path}`} 
                    className="w-full mt-3"
                    onClick={(e) => {
                        if (loading) e.preventDefault();
                    }}
                >
                    <Button className="w-full" variant="outline">
                        View
                    </Button>
                </Link>
            ) : (
                <Button
                    className="mt-3 w-full"
                    variant="outline"
                    onClick={GenerateContent}
                    disabled={loading}
                >
                    {loading && <RefreshCcw className="animate-spin mr-2 h-4 w-4" />}
                    {loading ? 'Generating...' : 'Generate'}
                </Button>
            )}
        </div>
        </Link>
    );
};

export default MaterialCardItem;