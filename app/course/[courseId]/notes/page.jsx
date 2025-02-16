"use client";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";

const ViewNotes = () => {
  const { courseId } = useParams();
  const [notes, setNotes] = useState([]);
  const [stepCount, setStepCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  const getNotes = async () => {
    try {
      setLoading(true);
      setError("");
      const { data } = await axios.post("/api/study-type", {
        courseId,
        studyType: "notes",
      });

      if (data?.length > 0) {
        setNotes(data);
      } else {
        setError("No notes found for this course");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setError("Failed to load notes. Please try refreshing.");
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    await getNotes();
  };

  useEffect(() => {
    getNotes();
  }, [courseId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <RefreshCcw className="animate-spin h-6 w-6" />
        <p className="ml-2">Loading notes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[200px] gap-4">
        <p className="text-red-500">{error}</p>
        <Button onClick={handleRefresh}>
          <RefreshCcw className="mr-2 h-4 w-4" />
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div>
       <div className="flex gap-5 items-center">
        {stepCount !== 0 && (
          <Button size="sm" onClick={() => setStepCount(Math.max(0, stepCount - 1))}>
            Previous
          </Button>
        )}
        
        {notes.map((_, index) => (
          <div
            key={index}
            className={`w-full h-2 rounded-full ${
              index <= stepCount ? "bg-primary" : "bg-gray-200"
            }`}
          />
        ))}
        
        {stepCount < notes.length - 1 && (
          <Button size="sm" onClick={() => setStepCount(Math.min(notes.length - 1, stepCount + 1))}>
            Next
          </Button>
        )}
      </div>


      <div className="mt-7 prose max-w-none">
        {notes[stepCount]?.notes && (
          <div
            dangerouslySetInnerHTML={{
              __html: notes[stepCount].notes
              .replace(/```html/g, '')
              .replace(/[\r\n]+/g, ' ')
              .replace(/\\n/g, ' ')
              .replace(/\s+/g, ' ')
              .trim()
              .replace(/["]/g, '')
              .replace(/[\[\]{}]/g, '')
            }}
          />
        )}
      </div>

      {stepCount === notes.length - 1 && (
        <div className="flex items-center gap-5 flex-col justify-center mt-8 p-6 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-700">End of Notes</h2>
          <Button onClick={() => router.back()}>Go to Course Page</Button>
        </div>
      )}
    </div>
  );
};

export default ViewNotes;
