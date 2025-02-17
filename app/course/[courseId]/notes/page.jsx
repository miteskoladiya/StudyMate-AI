"use client";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";

const ViewNotes = () => {
  const { courseId } = useParams();
  const [notes, setNotes] = useState();
  const [stepCount, setStepCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    GetNotes();
  }, []);

  const GetNotes = async () => {
    setLoading(true);
    const result = await axios.post("/api/study-type", {
      courseId,
      studyType: "notes",
    });

    console.log(result?.data);
    setNotes(result?.data);
  };

  return notes &&  (
    <div>
      <div className="flex gap-5 items-center">
        {stepCount != 0 && (
          <Button size="sm" onClick={() => setStepCount(stepCount - 1)}>
            Previous
          </Button>
        )}

        {notes?.map((item, index) => (
          <div
            key={index}
            className={`w-full h-2 rounded-full ${index < stepCount ? "bg-primary" : "bg-gray-200"
              }`}
          />
        ))}

{ stepCount != notes.length &&
        <Button size="sm" onClick={() => setStepCount(stepCount + 1)}>
          Next
        </Button>
}

      </div>

      <div className="mt-7 prose max-w-none">
  
          <div
            dangerouslySetInnerHTML={{
              __html: (notes[stepCount]?.notes)?.replace(/```html/g, "")
                .replace(/[\r\n]+/g, " ")
                .replace(/\\n/g, " ")
                .replace(/\s+/g, " ")
                .trim()
                .replace(/["]/g, "")
                .replace(/[\[\]{}]/g, ""),
            }}
          />

{stepCount === notes.length  && (
        <div className="flex items-center gap-5 flex-col justify-center mt-8 p-6 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-700">End of Notes</h2>
          <Button onClick={() => router.back()}>Go to Course Page</Button>
        </div>
      )}
      </div>

    </div>
  );
};

export default ViewNotes;
