import { useState, useCallback } from "react";

export interface OnboardingData {
  // Step 1: Setup
  profileImage?: File | null;
  firstName: string;
  lastName: string;
  age: string;
  occupation: string;
  country: string;

  // Step 2: Preferences
  colorTheme: "light" | "dark" | "system" | "default";
  language: string;
  currency: string;
  dateFormat: string;

  // Step 3: Goals
  goals: string[];
  customGoal?: string;

  // Progress tracking
  currentStep: number;
  completedSteps: number[];
}

const initialData: OnboardingData = {
  profileImage: null,
  firstName: "",
  lastName: "",
  age: "",
  occupation: "",
  country: "",
  colorTheme: "dark",
  language: "en",
  currency: "USD",
  dateFormat: "MM/DD/YYYY",
  goals: [],
  customGoal: "",
  currentStep: 1,
  completedSteps: [],
};

export const useOnboarding = () => {
  const [data, setData] = useState<OnboardingData>(initialData);

  const updateData = useCallback((updates: Partial<OnboardingData>) => {
    console.log("updateData called with:", updates);
    setData((prev) => {
      const newData = { ...prev, ...updates };
      console.log("Data updated from:", prev, "to:", newData);
      return newData;
    });
  }, []);

  const setCurrentStep = useCallback((step: number) => {
    setData((prev) => {
      // Only clear completed steps when going backward (step < prev.currentStep)
      let updatedCompletedSteps = prev.completedSteps;

      if (step < prev.currentStep) {
        // Going backward - remove completed status from future steps
        updatedCompletedSteps = prev.completedSteps.filter(
          (completedStep) => completedStep < step,
        );
      }

      return {
        ...prev,
        currentStep: step,
        completedSteps: updatedCompletedSteps,
      };
    });
  }, []);

  const markStepCompleted = useCallback((step: number) => {
    console.log("markStepCompleted called with step:", step);
    setData((prev) => {
      const newCompletedSteps = [...new Set([...prev.completedSteps, step])];
      console.log("Previous completed steps:", prev.completedSteps);
      console.log("New completed steps:", newCompletedSteps);
      return {
        ...prev,
        completedSteps: newCompletedSteps,
      };
    });
  }, []);

  const isStepCompleted = useCallback(
    (step: number) => {
      return data.completedSteps.includes(step);
    },
    [data.completedSteps],
  );

  const resetOnboarding = useCallback(() => {
    setData(initialData);
  }, []);

  const validateStep = useCallback(
    (step: number): boolean => {
      console.log("Validating step", step, "with data:", data);
      switch (step) {
        case 1:
          // Temporarily more lenient - just require first and last name
          const isValid = !!(data.firstName && data.lastName);
          console.log("Step 1 validation:", {
            firstName: data.firstName,
            lastName: data.lastName,
            isValid,
          });
          return isValid;
        case 2:
          return !!(
            data.colorTheme &&
            data.language &&
            data.currency &&
            data.dateFormat
          );
        case 3:
          return data.goals.length > 0;
        case 4:
          return true;
        default:
          return false;
      }
    },
    [data],
  );

  return {
    data,
    updateData,
    setCurrentStep,
    markStepCompleted,
    isStepCompleted,
    resetOnboarding,
    validateStep,
  };
};
