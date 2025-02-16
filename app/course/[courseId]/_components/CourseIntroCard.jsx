import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import React from "react";

const CourseIntroCard = ({course}) => {
    return (
        <div className="flex gap-5 items-center p-10 border shadow-md rounded-lg">
            <Image src={"/knowledge.png"} alt="other" width={70} height={70} />

            <div >
                <h2  className="font-bold text-2xl">{course?.courseLayout.course_name}</h2>
                <p  className="line-clamp-2 text-gray-600 overflow-hidden">{course?.courseLayout.course_summary}</p>
                {/* <Progress className='mt-3' value={0}/> */}

                <h2 className="mt-3 text-lg text-primary">Total Chapter: {course?.courseLayout?.chapters?.length}</h2>
            </div>
        </div>
        
    );
};

export default CourseIntroCard;
