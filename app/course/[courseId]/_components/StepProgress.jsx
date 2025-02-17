import { Button } from "@/components/ui/button";
import React from 'react'

const StepProgress = ({ data, stepCount, setStepCount, isLastStep }) => {
    return (
        <div className="flex items-center justify-between">
            <Button
            className="text-white bg-primary"
                onClick={() => setStepCount(stepCount - 1)}
            >
                Previous
            </Button>
            <div className="text-sm text-gray-500">
                {stepCount + 1} of {data.length}
            </div>
            {!isLastStep && (
                <Button
                className="text-white bg-primary"
                    onClick={() => setStepCount(stepCount + 1)}
                >
                    Next
                </Button>
            )}
        </div>
    );
};

export default StepProgress;