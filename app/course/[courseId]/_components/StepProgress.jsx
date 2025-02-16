import { Button } from "@/components/ui/button";
import React from 'react'

const StepProgress = ({ data, stepCount, setStepCount, isLastStep }) => {
    return (
        <div className="flex items-center justify-between">
            <Button
                onClick={() => setStepCount(stepCount - 1)}
                disabled={stepCount === 0}
                variant="outline"
            >
                Previous
            </Button>
            <div className="text-sm text-gray-500">
                {stepCount + 1} of {data.length}
            </div>
            {!isLastStep && (
                <Button
                    onClick={() => setStepCount(stepCount + 1)}
                    variant="outline"
                >
                    Next
                </Button>
            )}
        </div>
    );
};

export default StepProgress;