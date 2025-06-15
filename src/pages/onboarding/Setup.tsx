import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { OnboardingLayout } from "@/components/onboarding/OnboardingLayout";
import { ProfileImageUpload } from "@/components/ui/ProfileImageUpload";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useOnboarding } from "@/hooks/useOnboarding";
import { CheckCircle, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const countries = [
  { value: "US", label: "🇺🇸 United States" },
  { value: "IN", label: "🇮🇳 India" },
  { value: "GB", label: "🇬🇧 United Kingdom" },
  { value: "CA", label: "🇨🇦 Canada" },
  { value: "AU", label: "🇦🇺 Australia" },
  { value: "DE", label: "🇩🇪 Germany" },
  { value: "FR", label: "🇫🇷 France" },
  { value: "JP", label: "🇯🇵 Japan" },
  { value: "BR", label: "🇧🇷 Brazil" },
  { value: "MX", label: "🇲🇽 Mexico" },
  // Add more countries as needed
];

const occupations = [
  "Software Engineer",
  "Product Manager",
  "Designer",
  "Marketing Professional",
  "Sales Representative",
  "Teacher",
  "Healthcare Professional",
  "Financial Analyst",
  "Consultant",
  "Student",
  "Entrepreneur",
  "Other",
];

export const Setup: React.FC = () => {
  const navigate = useNavigate();
  const { data, updateData, setCurrentStep, markStepCompleted, validateStep } =
    useOnboarding();
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    // Always set current step to 1 when on setup page
    setCurrentStep(1);

    // Check if user just signed up
    const storedUserData = sessionStorage.getItem("userData");
    if (storedUserData) {
      const user = JSON.parse(storedUserData);
      setUserData(user);

      // Pre-fill form with signup data
      updateData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
      });

      // Show welcome message only on first visit
      const hasShownWelcome = sessionStorage.getItem("welcome-shown");
      if (!hasShownWelcome) {
        setShowWelcomeMessage(true);
        sessionStorage.setItem("welcome-shown", "true");

        // Hide welcome message after 4 seconds
        setTimeout(() => {
          setShowWelcomeMessage(false);
        }, 4000);
      }
    }
  }, [setCurrentStep, updateData]);

  const handleInputChange = (field: string, value: string) => {
    updateData({ [field]: value });
  };

  const handleImageChange = (file: File | null) => {
    updateData({ profileImage: file });
  };

  const handleNext = () => {
    console.log("Setup handleNext called", {
      isValid: validateStep(1),
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        age: data.age,
        occupation: data.occupation,
        country: data.country,
      },
      completedSteps: data.completedSteps,
    });

    if (validateStep(1)) {
      console.log("Marking step 1 as completed");
      markStepCompleted(1);
      console.log("Completed steps after marking:", data.completedSteps);
      navigate("/onboarding/preferences");
    } else {
      console.log("Validation failed for step 1");
    }
  };

  const handleStepClick = (step: number) => {
    // Only allow navigation to completed steps or current step
    const routes = [
      "/onboarding/setup",
      "/onboarding/preferences",
      "/onboarding/goals",
      "/onboarding/welcome",
    ];

    if (step <= 1) {
      // Already on setup page
      return;
    }

    // Can navigate to any step if we have the data for it
    navigate(routes[step - 1]);
  };

  const isFormValid = validateStep(1);

  return (
    <>
      {/* Welcome Message Banner */}
      {showWelcomeMessage && (
        <div
          className={cn(
            "fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-green-600 to-emerald-600 text-white p-4 shadow-lg transition-all duration-500 ease-out",
            showWelcomeMessage
              ? "translate-y-0 opacity-100"
              : "-translate-y-full opacity-0",
          )}
        >
          <div className="max-w-lg mx-auto flex items-center justify-center gap-3">
            <div className="flex-shrink-0">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div className="text-center">
              <p className="font-semibold">
                🎉 Welcome to VibeWealth, {userData?.firstName || "there"}!
              </p>
              <p className="text-sm text-green-100">
                Account created successfully. Let's set up your profile!
              </p>
            </div>
            <div className="flex-shrink-0">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
          </div>
        </div>
      )}

      <OnboardingLayout
        currentStep={1}
        totalSteps={4}
        completedSteps={data.completedSteps}
        onNext={handleNext}
        onStepClick={handleStepClick}
        isNextDisabled={!isFormValid}
        showSkip={true}
        onSkip={() => navigate("/onboarding/preferences")}
        className={cn(showWelcomeMessage && "pt-20")}
      >
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold mb-2">
            Let's get to know you!
          </h1>
          <p className="text-gray-400">
            First things first, let's set up your profile.
          </p>
        </div>

        {/* Debug Section - Remove in production */}
        <div className="mb-4 p-4 bg-yellow-900/20 border border-yellow-600 rounded-lg">
          <p className="text-yellow-400 text-sm mb-2">
            Debug: Current completed steps:{" "}
            {JSON.stringify(data.completedSteps)}
          </p>
          <button
            onClick={() => {
              console.log("Debug: Manually marking step 1 completed");
              markStepCompleted(1);
            }}
            className="px-3 py-1 bg-yellow-600 text-white rounded text-xs mr-2"
          >
            Test: Mark Step 1 Complete
          </button>
          <button
            onClick={() => {
              console.log("Debug: Current form validation:", validateStep(1));
              console.log("Debug: Current form data:", {
                firstName: data.firstName,
                lastName: data.lastName,
              });
            }}
            className="px-3 py-1 bg-blue-600 text-white rounded text-xs"
          >
            Test: Check Validation
          </button>
        </div>

        <div className="space-y-6">
          {/* Profile Image Upload */}
          <div className="flex justify-center">
            <ProfileImageUpload
              image={data.profileImage}
              onImageChange={handleImageChange}
            />
          </div>

          {/* Name Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="firstName"
                className="text-sm font-medium text-gray-300"
              >
                First name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="firstName"
                placeholder="First name"
                value={data.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-vibe-purple-500 focus:ring-vibe-purple-500"
                required
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="lastName"
                className="text-sm font-medium text-gray-300"
              >
                Last name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="lastName"
                placeholder="Last name"
                value={data.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-vibe-purple-500 focus:ring-vibe-purple-500"
                required
              />
            </div>
          </div>

          {/* Age */}
          <div className="space-y-2">
            <Label htmlFor="age" className="text-sm font-medium text-gray-300">
              Age <span className="text-red-500">*</span>
            </Label>
            <Input
              id="age"
              type="number"
              placeholder="Your age"
              value={data.age}
              onChange={(e) => handleInputChange("age", e.target.value)}
              className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-vibe-purple-500 focus:ring-vibe-purple-500"
              min="13"
              max="120"
              required
            />
          </div>

          {/* Occupation */}
          <div className="space-y-2">
            <Label
              htmlFor="occupation"
              className="text-sm font-medium text-gray-300"
            >
              Occupation <span className="text-red-500">*</span>
            </Label>
            <Select
              value={data.occupation}
              onValueChange={(value) => handleInputChange("occupation", value)}
            >
              <SelectTrigger className="bg-gray-800 border-gray-700 text-white focus:border-vibe-purple-500 focus:ring-vibe-purple-500">
                <SelectValue placeholder="Select your occupation" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                {occupations.map((occupation) => (
                  <SelectItem
                    key={occupation}
                    value={occupation}
                    className="text-white hover:bg-gray-700"
                  >
                    {occupation}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Country */}
          <div className="space-y-2">
            <Label
              htmlFor="country"
              className="text-sm font-medium text-gray-300"
            >
              Country <span className="text-red-500">*</span>
            </Label>
            <Select
              value={data.country}
              onValueChange={(value) => handleInputChange("country", value)}
            >
              <SelectTrigger className="bg-gray-800 border-gray-700 text-white focus:border-vibe-purple-500 focus:ring-vibe-purple-500">
                <SelectValue placeholder="Select your country" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                {countries.map((country) => (
                  <SelectItem
                    key={country.value}
                    value={country.value}
                    className="text-white hover:bg-gray-700"
                  >
                    {country.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </OnboardingLayout>
    </>
  );
};

export default Setup;
