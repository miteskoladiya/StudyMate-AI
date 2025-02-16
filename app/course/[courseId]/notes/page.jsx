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
  const [loading, setLoading] = useState(false);
  const route = useRouter(); 

  const GetNotes = async () => {
    try {
      setLoading(true);
      const result = await axios.post("/api/study-type", {
        courseId: courseId,
        studyType: "notes",
      });


   // Only update if we have new data
      if (result?.data && result.data.length > 0) {
        setNotes(result.data);
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
      setNotes([]);
    } finally {
      setLoading(false);
    }
  };


    useEffect(() => {
    GetNotes();
    }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <RefreshCcw className="animate-spin h-6 w-6" />
        <span className="ml-2">Loading notes...</span>
      </div>
    );
  }

  return (
    <div>
      <div className="flex gap-5 items-center">
        {stepCount !== 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setStepCount(stepCount - 1)}
          >
            Previous
          </Button>
        )}
        {notes?.map((_, index) => (
          <div
            key={index}
            className={`w-full h-2 rounded-full ${
              index <= stepCount ? "bg-primary" : "bg-gray-200"
            }`}
          ></div>
        ))}
        {stepCount < notes?.length - 1 && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setStepCount(stepCount + 1)}
          >
            Next
          </Button>
        )}
      </div>

      <div className="mt-7">
        {notes[stepCount]?.notes && (
          <div
            dangerouslySetInnerHTML={{
              __html: notes[stepCount]?.notes
                .replace(/```html/g, " ")
                .replace(/[\r\n]+/g, " ")
                .replace(/\\n/g, " ")
                .replace(/\s+/g, " ")
                .trim()
                .replace(/["]/g, "")
                .replace(/[\[\]{}]/g, ""),
            }}
          />
        )}
      </div>

      {notes.length === 0 && (
        <div className="text-center py-16 bg-white rounded-xl shadow-md">
          <div className="max-w-md mx-auto">
            <p className="text-gray-500 text-lg mb-6">
              No notes are available yet.
            </p>
            <Button
              onClick={GetNotes}
              variant="outline"
              className="hover:scale-105 transition-transform"
            >
              <RefreshCcw
                className={loading ? "animate-spin mr-2" : "mr-2"}
              />
              Refresh Content
            </Button>
          </div>
        </div>
      )}

      {notes.length > 0 && stepCount === notes.length - 1 && (
        <div className="flex items-center gap-5 flex-col justify-center mt-8 p-6 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-700">
            End of Notes
          </h2>
          <Button onClick={() => route.back()}>Go to Course Page</Button>
        </div>
      )}
    </div>
  );
};

export default ViewNotes;