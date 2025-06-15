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
    setData((prev) => ({ ...prev, ...updates }));
  }, []);

  const setCurrentStep = useCallback((step: number) => {
    setData((prev) => ({ ...prev, currentStep: step }));
  }, []);

  const markStepCompleted = useCallback((step: number) => {
    setData((prev) => ({
      ...prev,
      completedSteps: [...new Set([...prev.completedSteps, step])],
    }));
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
      switch (step) {
        case 1:
          return !!(
            data.firstName &&
            data.lastName &&
            data.age &&
            data.occupation &&
            data.country
          );
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
