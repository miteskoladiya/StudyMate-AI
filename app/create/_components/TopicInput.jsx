import React from "react";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TopiciInput = ({setTopic,setDiffcultyLevel}) => {
  return (
    <div className="mt-10 w-full flex flex-col">
      <h2>
        Enter topic or paste the content for which you want to generate study
        material
      </h2>
      <Textarea className="mt-2 w-full" placeholder="Start writing here" onChange={(e)=>setTopic(e.target.value)} />

      <h2 className="mt-5 mb-3">Select the difficulty level</h2>

      <Select onValueChange={(value)=>setDiffcultyLevel(value)}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Difficulty Level" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Easy">Easy</SelectItem>
          <SelectItem value="Modrate">Modrate</SelectItem>
          <SelectItem value="Hard">Hard</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default TopiciInput;
