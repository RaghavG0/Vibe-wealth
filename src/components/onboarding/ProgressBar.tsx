import React from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  completedSteps: number[];
}

const stepNames = ["Setup", "Preferences", "Goals", "Welcome"];

interface StepIndicatorProps {
  stepNumber: number;
  stepName: string;
  isCompleted: boolean;
  isCurrent: boolean;
  isFirst: boolean;
  isLast: boolean;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({
  stepNumber,
  stepName,
  isCompleted,
  isCurrent,
  isFirst,
  isLast,
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div
      className={cn(
        "flex flex-col items-center space-y-2",
        isFirst ? "items-start" : isLast ? "items-end" : "items-center",
      )}
    >
      <div
        className={cn(
          "flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-300 cursor-pointer group",
          isCompleted && !isHovered
            ? "bg-green-500 border-green-500 text-white"
            : isCurrent
              ? "border-vibe-purple-500 bg-gray-900 text-vibe-purple-400"
              : isCompleted && isHovered
                ? "border-gray-600 bg-gray-800 text-gray-400"
                : "border-gray-600 bg-gray-800 text-gray-400",
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {isCompleted && !isHovered ? (
          <Check className="w-4 h-4" />
        ) : (
          <span className="text-sm font-medium">{stepNumber}</span>
        )}
      </div>
      <span
        className={cn(
          "text-xs font-medium transition-colors duration-300",
          isCurrent || isCompleted ? "text-white" : "text-gray-400",
        )}
      >
        {stepName}
      </span>
    </div>
  );
};

export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStep,
  totalSteps,
  completedSteps,
}) => {
  // Calculate progress based on both current step and completed steps
  // Progress should show up to the current step position
  const maxProgress = Math.max(
    currentStep - 1, // Current step position (0-based)
    completedSteps.length, // Number of completed steps
  );
  const progressPercentage = (maxProgress / (totalSteps - 1)) * 100;

  // Debug logging to help troubleshoot
  React.useEffect(() => {
    console.log("ProgressBar state:", {
      currentStep,
      completedSteps,
      maxProgress,
      progressPercentage,
    });
  }, [currentStep, completedSteps, maxProgress, progressPercentage]);

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

          return (
            <StepIndicator
              key={stepNumber}
              stepNumber={stepNumber}
              stepName={stepNames[index]}
              isCompleted={isCompleted}
              isCurrent={isCurrent}
              isFirst={stepNumber === 1}
              isLast={stepNumber === totalSteps}
            />
          );
        })}
      </div>
    </div>
  );
};
