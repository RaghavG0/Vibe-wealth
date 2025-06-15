import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { OnboardingLayout } from "@/components/onboarding/OnboardingLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useOnboarding } from "@/hooks/useOnboarding";
import {
  GraduationCap,
  Home,
  TrendingUp,
  Receipt,
  DollarSign,
  Shield,
  BarChart3,
  Plus,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";

const goalOptions = [
  {
    id: "learn-financial-literacy",
    title: "Learn financial literacy",
    description: "Build knowledge about personal finance",
    icon: GraduationCap,
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "save-for-dream",
    title: "Save for a dream",
    description: "Trip, house, car, or other goals",
    icon: Home,
    color: "from-purple-500 to-pink-500",
  },
  {
    id: "invest-smartly",
    title: "Invest smartly",
    description: "Make informed investment decisions",
    icon: TrendingUp,
    color: "from-green-500 to-emerald-500",
  },
  {
    id: "track-expenses",
    title: "Track expenses",
    description: "Monitor spending and budgets",
    icon: Receipt,
    color: "from-orange-500 to-red-500",
  },
  {
    id: "build-side-income",
    title: "Build a side income",
    description: "Explore additional revenue streams",
    icon: DollarSign,
    color: "from-yellow-500 to-orange-500",
  },
  {
    id: "prepare-emergencies",
    title: "Prepare for emergencies",
    description: "Build an emergency fund",
    icon: Shield,
    color: "from-indigo-500 to-purple-500",
  },
  {
    id: "explore-market-trends",
    title: "Explore market trends",
    description: "Stay updated with financial markets",
    icon: BarChart3,
    color: "from-teal-500 to-blue-500",
  },
];

export const Goals: React.FC = () => {
  const navigate = useNavigate();
  const { data, updateData, setCurrentStep, markStepCompleted, validateStep } =
    useOnboarding();
  const [selectedGoals, setSelectedGoals] = useState<string[]>(
    data.goals || [],
  );
  const [customGoal, setCustomGoal] = useState(data.customGoal || "");
  const [showCustomInput, setShowCustomInput] = useState(false);

  useEffect(() => {
    setCurrentStep(3);
  }, [setCurrentStep]);

  const handleGoalToggle = (goalId: string) => {
    const updatedGoals = selectedGoals.includes(goalId)
      ? selectedGoals.filter((id) => id !== goalId)
      : [...selectedGoals, goalId];

    setSelectedGoals(updatedGoals);
    updateData({ goals: updatedGoals });
  };

  const handleCustomGoalChange = (value: string) => {
    setCustomGoal(value);
    updateData({ customGoal: value });
  };

  const handleAddCustomGoal = () => {
    if (customGoal.trim()) {
      const customGoalId = `custom-${Date.now()}`;
      const updatedGoals = [...selectedGoals, customGoalId];
      setSelectedGoals(updatedGoals);
      updateData({
        goals: updatedGoals,
        customGoal: customGoal.trim(),
      });
      setShowCustomInput(false);
      setCustomGoal("");
    }
  };

  const handleNext = () => {
    if (validateStep(3)) {
      markStepCompleted(3);
      navigate("/onboarding/welcome");
    }
  };

  const handleBack = () => {
    navigate("/onboarding/preferences");
  };

  const isFormValid = validateStep(3);

  return (
    <OnboardingLayout
      currentStep={3}
      totalSteps={4}
      completedSteps={data.completedSteps}
      onNext={handleNext}
      onBack={handleBack}
      isNextDisabled={!isFormValid}
      className="max-w-2xl"
    >
      <div className="text-center mb-8">
        <h1 className="text-2xl font-semibold mb-2">
          What's bringing you here?
        </h1>
        <p className="text-gray-400">
          Select all the financial goals that interest you. You can always
          change these later.
        </p>
      </div>

      <div className="space-y-6">
        {/* Goal Selection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {goalOptions.map((goal) => {
            const Icon = goal.icon;
            const isSelected = selectedGoals.includes(goal.id);

            return (
              <button
                key={goal.id}
                onClick={() => handleGoalToggle(goal.id)}
                className={cn(
                  "relative p-6 rounded-xl border-2 text-left transition-all duration-300 hover:scale-105 group",
                  isSelected
                    ? "border-transparent bg-gradient-to-br shadow-lg shadow-purple-500/25"
                    : "border-gray-700 bg-gray-800 hover:border-gray-600 hover:bg-gray-750",
                )}
                style={
                  isSelected
                    ? {
                        background: `linear-gradient(135deg, ${goal.color.split(" ")[1]} 0%, ${goal.color.split(" ")[3]} 100%)`,
                      }
                    : {}
                }
              >
                {/* Selection indicator */}
                {isSelected && (
                  <div className="absolute top-3 right-3 w-6 h-6 bg-white rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-gray-900" />
                  </div>
                )}

                <div className="flex items-start gap-4">
                  <div
                    className={cn(
                      "flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300",
                      isSelected
                        ? "bg-white/20 text-white"
                        : "bg-gray-700 text-gray-400 group-hover:bg-gray-600 group-hover:text-gray-300",
                    )}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3
                      className={cn(
                        "font-semibold mb-1 transition-colors duration-300",
                        isSelected ? "text-white" : "text-gray-200",
                      )}
                    >
                      {goal.title}
                    </h3>
                    <p
                      className={cn(
                        "text-sm transition-colors duration-300",
                        isSelected ? "text-white/80" : "text-gray-400",
                      )}
                    >
                      {goal.description}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}

          {/* Custom Goal Option */}
          {!showCustomInput ? (
            <button
              onClick={() => setShowCustomInput(true)}
              className="p-6 rounded-xl border-2 border-dashed border-gray-600 bg-gray-800 text-left transition-all duration-300 hover:border-gray-500 hover:bg-gray-750 group"
            >
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gray-700 flex items-center justify-center group-hover:bg-gray-600 transition-colors duration-300">
                  <Plus className="w-6 h-6 text-gray-400 group-hover:text-gray-300" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1 text-gray-200">Other</h3>
                  <p className="text-sm text-gray-400">
                    Add your own financial goal
                  </p>
                </div>
              </div>
            </button>
          ) : (
            <div className="p-6 rounded-xl border-2 border-vibe-purple-500 bg-gray-800">
              <div className="space-y-4">
                <Label className="text-sm font-medium text-gray-300">
                  Describe your custom goal
                </Label>
                <Input
                  placeholder="e.g., Start a business, Pay off debt..."
                  value={customGoal}
                  onChange={(e) => handleCustomGoalChange(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-500 focus:border-vibe-purple-500 focus:ring-vibe-purple-500"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleAddCustomGoal();
                    }
                  }}
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleAddCustomGoal}
                    disabled={!customGoal.trim()}
                    className="px-4 py-2 bg-vibe-purple-500 text-white rounded-lg text-sm font-medium hover:bg-vibe-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    Add Goal
                  </button>
                  <button
                    onClick={() => {
                      setShowCustomInput(false);
                      setCustomGoal("");
                    }}
                    className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-600 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Selected goals summary */}
        {selectedGoals.length > 0 && (
          <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
            <p className="text-sm text-gray-400 mb-2">
              {selectedGoals.length} goal{selectedGoals.length > 1 ? "s" : ""}{" "}
              selected
            </p>
            <div className="flex flex-wrap gap-2">
              {selectedGoals.map((goalId) => {
                const goal = goalOptions.find((g) => g.id === goalId);
                const displayText = goal
                  ? goal.title
                  : data.customGoal || "Custom Goal";

                return (
                  <span
                    key={goalId}
                    className="px-3 py-1 bg-vibe-purple-500/20 text-vibe-purple-400 rounded-full text-xs font-medium border border-vibe-purple-500/30"
                  >
                    {displayText}
                  </span>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </OnboardingLayout>
  );
};

export default Goals;
