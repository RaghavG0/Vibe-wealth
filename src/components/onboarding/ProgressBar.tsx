import React from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  completedSteps: number[];
}

const stepNames = ["Setup", "Preferences", "Goals", "Welcome"];

export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStep,
  totalSteps,
  completedSteps,
}) => {
  const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      {/* Progress bar */}
      <div className="relative">
        <div className="overflow-hidden h-2 text-xs flex rounded-full bg-gray-800">
          <div
            style={{ width: `${progressPercentage}%` }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-vibe-purple-500 to-vibe-blue-500 transition-all duration-500 ease-out"
          />
        </div>
      </div>

      {/* Step indicators */}
      <div className="flex justify-between mt-4">
        {Array.from({ length: totalSteps }, (_, index) => {
          const stepNumber = index + 1;
          const isCompleted = completedSteps.includes(stepNumber);
          const isCurrent = stepNumber === currentStep;
          const isPassed = stepNumber < currentStep;

          return (
            <div
              key={stepNumber}
              className={cn(
                "flex flex-col items-center space-y-2",
                stepNumber === 1
                  ? "items-start"
                  : stepNumber === totalSteps
                    ? "items-end"
                    : "items-center",
              )}
            >
              <div
                className={cn(
                  "flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-300",
                  isCompleted || isPassed
                    ? "bg-gradient-to-r from-vibe-purple-500 to-vibe-blue-500 border-transparent text-white"
                    : isCurrent
                      ? "border-vibe-purple-500 bg-gray-900 text-vibe-purple-400"
                      : "border-gray-600 bg-gray-800 text-gray-400",
                )}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <span className="text-sm font-medium">{stepNumber}</span>
                )}
              </div>
              <span
                className={cn(
                  "text-xs font-medium transition-colors duration-300",
                  isCurrent || isCompleted || isPassed
                    ? "text-white"
                    : "text-gray-400",
                )}
              >
                {stepNames[index]}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
