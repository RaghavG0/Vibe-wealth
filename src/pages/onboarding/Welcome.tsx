import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { OnboardingLayout } from "@/components/onboarding/OnboardingLayout";
import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/hooks/useOnboarding";
import {
  Check,
  BarChart3,
  Target,
  MessageCircle,
  BookOpen,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: BarChart3,
    title: "Smart Dashboard",
    description: "Track your financial health at a glance",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Target,
    title: "Dream Budgeting",
    description: "Turn your goals into actionable plans",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: MessageCircle,
    title: "AI Financial Assistant",
    description: "Get personalized advice anytime",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: BookOpen,
    title: "Learning Hub",
    description: "Expand your financial knowledge",
    color: "from-orange-500 to-red-500",
  },
];

export const Welcome: React.FC = () => {
  const navigate = useNavigate();
  const { data, setCurrentStep, markStepCompleted, resetOnboarding } =
    useOnboarding();

  useEffect(() => {
    setCurrentStep(4);
    markStepCompleted(4);
  }, [setCurrentStep, markStepCompleted]);

  const handleGoToDashboard = () => {
    // Mark onboarding as complete and navigate to dashboard
    localStorage.setItem("onboarding-completed", "true");
    resetOnboarding();
    navigate("/");
  };

  const handleExploreBudgeting = () => {
    localStorage.setItem("onboarding-completed", "true");
    resetOnboarding();
    navigate("/budgeting");
  };

  const setupItems = [
    "Profile configured",
    "Preferences saved",
    "Goals set",
    "Account ready",
  ];

  return (
    <OnboardingLayout
      currentStep={4}
      totalSteps={4}
      completedSteps={data.completedSteps}
      className="max-w-2xl"
    >
      <div className="text-center space-y-8">
        {/* Welcome Header */}
        <div className="space-y-4">
          <div className="mx-auto w-20 h-20 bg-gradient-to-r from-vibe-purple-500 to-vibe-blue-500 rounded-full flex items-center justify-center mb-6">
            <Sparkles className="w-10 h-10 text-white" />
          </div>

          <h1 className="text-3xl font-bold mb-2">
            You're all set, {data.firstName || "there"}! 🎉
          </h1>
          <p className="text-lg text-gray-400">
            Welcome to VibeWealth - your journey to financial freedom starts
            now.
          </p>
        </div>

        {/* Setup Completion Checklist */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-semibold mb-4 text-left">
            Setup Complete
          </h3>
          <div className="space-y-3">
            {setupItems.map((item, index) => (
              <div
                key={item}
                className={cn(
                  "flex items-center gap-3 text-left opacity-0 animate-fade-in",
                  `delay-${(index + 1) * 200}`,
                )}
                style={{
                  animationDelay: `${index * 200}ms`,
                  animationFillMode: "forwards",
                }}
              >
                <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-300">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Features Overview */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">What you can do now:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className={cn(
                    "p-4 bg-gray-800 rounded-lg border border-gray-700 text-left hover:border-gray-600 transition-all duration-300 opacity-0 animate-fade-in hover:scale-105",
                    `delay-${(index + 5) * 100}`,
                  )}
                  style={{
                    animationDelay: `${(index + 4) * 100}ms`,
                    animationFillMode: "forwards",
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{
                        background: `linear-gradient(135deg, ${feature.color.split(" ")[1]}, ${feature.color.split(" ")[3]})`,
                      }}
                    >
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white mb-1">
                        {feature.title}
                      </h4>
                      <p className="text-sm text-gray-400">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4 pt-6">
          <Button
            onClick={handleGoToDashboard}
            className="w-full bg-gradient-to-r from-vibe-purple-500 to-vibe-blue-500 hover:from-vibe-purple-600 hover:to-vibe-blue-600 text-white py-3 text-lg font-semibold"
          >
            Go to Dashboard
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>

          <div className="flex gap-3">
            <Button
              onClick={handleExploreBudgeting}
              variant="outline"
              className="flex-1 bg-transparent border-gray-600 text-gray-300 hover:bg-gray-800 hover:border-gray-500"
            >
              Start Dream Budgeting
            </Button>
            <Button
              onClick={() => navigate("/learn")}
              variant="outline"
              className="flex-1 bg-transparent border-gray-600 text-gray-300 hover:bg-gray-800 hover:border-gray-500"
            >
              Explore Learning Hub
            </Button>
          </div>
        </div>

        {/* Motivational Message */}
        <div className="p-6 bg-gradient-to-r from-vibe-purple-500/10 to-vibe-blue-500/10 rounded-xl border border-vibe-purple-500/20">
          <p className="text-sm text-gray-300 leading-relaxed">
            🚀 <strong>You're on the right track!</strong> Remember, building
            wealth is a journey, not a destination. We're here to guide you
            every step of the way. Let's make your financial dreams a reality!
          </p>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default Welcome;
