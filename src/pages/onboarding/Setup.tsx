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
import { SuccessToast } from "@/components/ui/SuccessToast";
import { useOnboarding } from "@/hooks/useOnboarding";

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
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  useEffect(() => {
    setCurrentStep(1);
    // Show success toast only on first visit (simulating after signup)
    const hasShownToast = sessionStorage.getItem("onboarding-toast-shown");
    if (!hasShownToast) {
      setShowSuccessToast(true);
      sessionStorage.setItem("onboarding-toast-shown", "true");
    }
  }, [setCurrentStep]);

  const handleInputChange = (field: string, value: string) => {
    updateData({ [field]: value });
  };

  const handleImageChange = (file: File | null) => {
    updateData({ profileImage: file });
  };

  const handleNext = () => {
    if (validateStep(1)) {
      markStepCompleted(1);
      navigate("/onboarding/preferences");
    }
  };

  const isFormValid = validateStep(1);

  return (
    <>
      <SuccessToast
        message="Signed up successfully! Welcome to VibeWealth!"
        isVisible={showSuccessToast}
        onClose={() => setShowSuccessToast(false)}
      />

      <OnboardingLayout
        currentStep={1}
        totalSteps={4}
        completedSteps={data.completedSteps}
        onNext={handleNext}
        isNextDisabled={!isFormValid}
        showSkip={true}
        onSkip={() => navigate("/onboarding/preferences")}
      >
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold mb-2">
            Let's get to know you!
          </h1>
          <p className="text-gray-400">
            First things first, let's set up your profile.
          </p>
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
