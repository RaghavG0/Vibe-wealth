import React from "react";
import { ProgressBar } from "./ProgressBar";
import { OnboardingFooter } from "./OnboardingFooter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface OnboardingLayoutProps {
  children: React.ReactNode;
  currentStep: number;
  totalSteps: number;
  completedSteps: number[];
  onNext?: () => void;
  onBack?: () => void;
  isNextDisabled?: boolean;
  nextButtonText?: string;
  showSkip?: boolean;
  onSkip?: () => void;
  className?: string;
}

export const OnboardingLayout: React.FC<OnboardingLayoutProps> = ({
  children,
  currentStep,
  totalSteps,
  completedSteps,
  onNext,
  onBack,
  isNextDisabled = false,
  nextButtonText = "Continue",
  showSkip = false,
  onSkip,
  className,
}) => {
  const showBackButton = currentStep > 1;
  const isLastStep = currentStep === totalSteps;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header with logo and progress */}
      <header className="flex items-center justify-between p-8 bg-gray-900">
        <div className="flex items-center">
          <img
            src="https://app.maybefinance.com/assets/logomark-color-338c2794.svg"
            alt="VibeWealth"
            className="h-10 w-auto"
          />
        </div>
        {showSkip && !isLastStep && (
          <button
            onClick={onSkip}
            className="text-gray-400 hover:text-gray-300 text-sm font-medium transition-colors duration-200"
          >
            Skip for now
          </button>
        )}
      </header>

      {/* Progress Bar */}
      <div className="px-8">
        <ProgressBar
          currentStep={currentStep}
          totalSteps={totalSteps}
          completedSteps={completedSteps}
        />
      </div>

      {/* Main Content */}
      <main className="flex-1 px-8 pb-32">
        <div className={cn("max-w-lg mx-auto", className)}>{children}</div>
      </main>

      {/* Navigation Controls */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 p-6">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          {showBackButton ? (
            <Button
              variant="outline"
              onClick={onBack}
              className="flex items-center gap-2 bg-transparent border-gray-600 text-gray-300 hover:bg-gray-800 hover:border-gray-500"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          ) : (
            <div />
          )}

          {onNext && (
            <Button
              onClick={onNext}
              disabled={isNextDisabled}
              className={cn(
                "flex items-center gap-2 bg-white text-gray-900 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed",
                isLastStep &&
                  "bg-gradient-to-r from-vibe-purple-500 to-vibe-blue-500 text-white hover:from-vibe-purple-600 hover:to-vibe-blue-600",
              )}
            >
              {nextButtonText}
              {!isLastStep && <ArrowRight className="w-4 h-4" />}
            </Button>
          )}
        </div>
      </div>

      {/* Footer */}
      <OnboardingFooter />
    </div>
  );
};
