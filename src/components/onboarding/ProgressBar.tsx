import React from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  completedSteps: number[];
  onStepClick?: (step: number) => void;
}

const stepNames = ["Setup", "Preferences", "Goals", "Welcome"];

interface StepIndicatorProps {
  stepNumber: number;
  stepName: string;
  isCompleted: boolean;
  isCurrent: boolean;
  isFirst: boolean;
  isLast: boolean;
  onClick?: (step: number) => void;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({
  stepNumber,
  stepName,
  isCompleted,
  isCurrent,
  isFirst,
  isLast,
  onClick,
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  // Can only click on completed steps or current step
  const isClickable = isCompleted || isCurrent;

  const handleClick = () => {
    if (isClickable && onClick) {
      onClick(stepNumber);
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col items-center space-y-2",
        isFirst ? "items-start" : isLast ? "items-end" : "items-center",
      )}
    >
      <div
        className={cn(
          "flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-300 group",
          isClickable ? "cursor-pointer hover:scale-110" : "cursor-default",
          isCompleted && !isHovered
            ? "bg-green-500 border-green-500 text-white shadow-lg"
            : isCurrent
              ? "border-vibe-purple-500 bg-vibe-purple-500/10 text-vibe-purple-400 shadow-lg shadow-vibe-purple-500/25"
              : isCompleted && isHovered
                ? "border-gray-500 bg-gray-700 text-gray-300"
                : "border-gray-600 bg-gray-800 text-gray-400",
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
        title={isClickable ? `Go to ${stepName}` : stepName}
      >
        {isCompleted && !isHovered ? (
          <Check className="w-4 h-4 font-bold" />
        ) : (
          <span className="text-sm font-medium">{stepNumber}</span>
        )}
      </div>
      <span
        className={cn(
          "text-xs font-medium transition-colors duration-300",
          isCurrent
            ? "text-vibe-purple-400 font-semibold"
            : isCompleted
              ? "text-green-400 font-medium"
              : "text-gray-400",
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
  onStepClick,
}) => {
  // Simplified calculation: show progress based on the furthest step reached
  // This includes the current step and any completed steps
  const furthestStep = Math.max(currentStep, ...completedSteps, 0);
  const progressPercentage = ((furthestStep - 1) / (totalSteps - 1)) * 100;

  // Debug logging to help troubleshoot
  React.useEffect(() => {
    console.log("ProgressBar state:", {
      currentStep,
      completedSteps,
      furthestStep,
      progressPercentage,
      stepStates: Array.from({ length: totalSteps }, (_, index) => ({
        step: index + 1,
        isCompleted: completedSteps.includes(index + 1),
        isCurrent: index + 1 === currentStep,
      })),
    });
  }, [
    currentStep,
    completedSteps,
    furthestStep,
    progressPercentage,
    totalSteps,
  ]);

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
              onClick={onStepClick}
            />
          );
        })}
      </div>
    </div>
  );
};
