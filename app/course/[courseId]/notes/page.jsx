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
  const router = useRouter();
  const [pollingCount, setPollingCount] = useState(0);

  // Improved fetch with polling
  const GetNotes = async (abortController) => {
    try {
      const { data } = await axios.post("/api/study-type", {
        courseId,
        studyType: "notes",
      });

      if (data?.length > 0) {
        setNotes(data);
        return true; // Content found
      }
      return false; // Continue polling
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error("Fetch error:", error);
      }
      return false;
    }

  };
  const handleRefresh = async () => {
    setLoading(true);
    setPollingCount(0);
    await GetNotes();
    setLoading(false);
  };

  useEffect(() => {
    const abortController = new AbortController();
    let pollingInterval;

    const startPolling = async () => {
      let attempts = 0;
      const maxAttempts = 10; // ~2 minutes total
      
      const poll = async () => {
        attempts++;
        setPollingCount(attempts);
        const success = await GetNotes(abortController);
        
        if (success || attempts >= maxAttempts) {
          clearInterval(pollingInterval);
          setLoading(false);
        }
      };

      // Immediate first check
      await poll();
      // Subsequent polls every 15 seconds
      pollingInterval = setInterval(poll, 15000);
    };

    startPolling();

    return () => {
      abortController.abort();
      clearInterval(pollingInterval);
    };
  }, [courseId]);

  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <RefreshCcw className="animate-spin h-6 w-6" />
        <div className="ml-2">
          <p>Preparing your notes...</p>
          <p className="text-sm text-muted-foreground">
            Check {pollingCount} of 10
          </p>
        </div>
      </div>
    );
  }

 
  return (
    <div>
      {/* Progress controls */}
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

      

      {/* Content display */}
      <div className="mt-7">
        { notes[stepCount]?.notes && (
          <div
            dangerouslySetInnerHTML={{
              __html: cleanNotesContent(notes[stepCount].notes)
            }}
          />
        )}
      </div>

      {/* End state */}
      {stepCount === notes.length - 1 && (
        <div className="flex items-center gap-5 flex-col justify-center mt-8 p-6 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-700">End of Notes</h2>
          <Button onClick={() => router.back()}>Go to Course Page</Button>
        </div>
      )}
    </div>
  );
};

// Add content cleaning function
const cleanNotesContent = (html) => {
  return html
    .replace(/```html/g, '')
    .replace(/[\r\n]+/g, ' ')
    .replace(/\\n/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/["]/g, '')
    .replace(/[\[\]{}]/g, '');
};

export default ViewNotes;