import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { OnboardingLayout } from "@/components/onboarding/OnboardingLayout";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useOnboarding } from "@/hooks/useOnboarding";
import { Moon, Sun, Monitor, Palette } from "lucide-react";
import { cn } from "@/lib/utils";

const themeOptions = [
  {
    value: "dark",
    label: "Dark",
    icon: Moon,
    description: "Dark theme for comfortable viewing",
  },
  {
    value: "light",
    label: "Light",
    icon: Sun,
    description: "Light theme for bright environments",
  },
  {
    value: "system",
    label: "System",
    icon: Monitor,
    description: "Follow your device settings",
  },
  {
    value: "default",
    label: "Auto",
    icon: Palette,
    description: "Smart theme based on time",
  },
];

const languages = [
  { value: "en", label: "English" },
  { value: "es", label: "Español" },
  { value: "fr", label: "Français" },
  { value: "de", label: "Deutsch" },
  { value: "pt", label: "Português" },
  { value: "zh", label: "中文" },
  { value: "ja", label: "日本語" },
  { value: "hi", label: "हिन्दी" },
];

const currencies = [
  { value: "USD", label: "$ USD - US Dollar" },
  { value: "INR", label: "₹ INR - Indian Rupee" },
  { value: "EUR", label: "€ EUR - Euro" },
  { value: "GBP", label: "£ GBP - British Pound" },
  { value: "CAD", label: "$ CAD - Canadian Dollar" },
  { value: "AUD", label: "$ AUD - Australian Dollar" },
  { value: "JPY", label: "¥ JPY - Japanese Yen" },
  { value: "CNY", label: "¥ CNY - Chinese Yuan" },
];

const dateFormats = [
  { value: "MM/DD/YYYY", label: "MM/DD/YYYY (US)", example: "12/31/2024" },
  { value: "DD/MM/YYYY", label: "DD/MM/YYYY (EU)", example: "31/12/2024" },
  { value: "YYYY-MM-DD", label: "YYYY-MM-DD (ISO)", example: "2024-12-31" },
  { value: "DD MMM YYYY", label: "DD MMM YYYY", example: "31 Dec 2024" },
];

export const Preferences: React.FC = () => {
  const navigate = useNavigate();
  const { data, updateData, setCurrentStep, markStepCompleted, validateStep } =
    useOnboarding();
  const [selectedCurrency, setSelectedCurrency] = useState(data.currency);
  const [selectedDateFormat, setSelectedDateFormat] = useState(data.dateFormat);

  useEffect(() => {
    // Always set current step to 2 when on preferences page
    setCurrentStep(2);
  }, [setCurrentStep]);

  const handleThemeSelect = (theme: string) => {
    updateData({ colorTheme: theme as any });
  };

  const handleNext = () => {
    if (validateStep(2)) {
      markStepCompleted(2);
      navigate("/onboarding/goals");
    }
  };

  const handleBack = () => {
    navigate("/onboarding/setup");
  };

  const handleStepClick = (step: number) => {
    const routes = [
      "/onboarding/setup",
      "/onboarding/preferences",
      "/onboarding/goals",
      "/onboarding/welcome",
    ];

    if (step === 2) {
      // Already on preferences page
      return;
    }

    navigate(routes[step - 1]);
  };

  const isFormValid = validateStep(2);

  const formatCurrencyExample = (currency: string) => {
    const examples: Record<string, string> = {
      USD: "$1,234.56",
      INR: "₹1,23,456.78",
      EUR: "€1.234,56",
      GBP: "£1,234.56",
      CAD: "$1,234.56",
      AUD: "$1,234.56",
      JPY: "¥1,235",
      CNY: "¥1,234.56",
    };
    return examples[currency] || "$1,234.56";
  };

  return (
    <OnboardingLayout
      currentStep={2}
      totalSteps={4}
      completedSteps={data.completedSteps}
      onNext={handleNext}
      onBack={handleBack}
      onStepClick={handleStepClick}
      isNextDisabled={!isFormValid}
      showSkip={true}
      onSkip={() => navigate("/onboarding/goals")}
    >
      <div className="text-center mb-8">
        <h1 className="text-2xl font-semibold mb-2">
          Make VibeWealth feel like home
        </h1>
        <p className="text-gray-400">
          Customize your experience to match your preferences.
        </p>
      </div>

      <div className="space-y-8">
        {/* Color Theme Selection */}
        <div className="space-y-4">
          <Label className="text-sm font-medium text-gray-300">
            Preferred Color Theme
          </Label>
          <div className="grid grid-cols-2 gap-3">
            {themeOptions.map((theme) => {
              const Icon = theme.icon;
              const isSelected = data.colorTheme === theme.value;

              return (
                <button
                  key={theme.value}
                  onClick={() => handleThemeSelect(theme.value)}
                  className={cn(
                    "p-4 rounded-lg border-2 text-left transition-all duration-200 hover:border-vibe-purple-400",
                    isSelected
                      ? "border-vibe-purple-500 bg-vibe-purple-500/10"
                      : "border-gray-700 bg-gray-800 hover:bg-gray-750",
                  )}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <Icon
                      className={cn(
                        "w-5 h-5",
                        isSelected ? "text-vibe-purple-400" : "text-gray-400",
                      )}
                    />
                    <span
                      className={cn(
                        "font-medium",
                        isSelected ? "text-white" : "text-gray-300",
                      )}
                    >
                      {theme.label}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">{theme.description}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Language */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-300">Language</Label>
          <Select
            value={data.language}
            onValueChange={(value) => updateData({ language: value })}
          >
            <SelectTrigger className="bg-gray-800 border-gray-700 text-white focus:border-vibe-purple-500 focus:ring-vibe-purple-500">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              {languages.map((language) => (
                <SelectItem
                  key={language.value}
                  value={language.value}
                  className="text-white hover:bg-gray-700"
                >
                  {language.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Currency */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-300">Currency</Label>
          <Select
            value={selectedCurrency}
            onValueChange={(value) => {
              setSelectedCurrency(value);
              updateData({ currency: value });
            }}
          >
            <SelectTrigger className="bg-gray-800 border-gray-700 text-white focus:border-vibe-purple-500 focus:ring-vibe-purple-500">
              <SelectValue placeholder="Select currency" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              {currencies.map((currency) => (
                <SelectItem
                  key={currency.value}
                  value={currency.value}
                  className="text-white hover:bg-gray-700"
                >
                  {currency.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {selectedCurrency && (
            <p className="text-xs text-gray-500">
              Preview: {formatCurrencyExample(selectedCurrency)}
            </p>
          )}
        </div>

        {/* Date Format */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-300">
            Date Format
          </Label>
          <Select
            value={selectedDateFormat}
            onValueChange={(value) => {
              setSelectedDateFormat(value);
              updateData({ dateFormat: value });
            }}
          >
            <SelectTrigger className="bg-gray-800 border-gray-700 text-white focus:border-vibe-purple-500 focus:ring-vibe-purple-500">
              <SelectValue placeholder="Select date format" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              {dateFormats.map((format) => (
                <SelectItem
                  key={format.value}
                  value={format.value}
                  className="text-white hover:bg-gray-700"
                >
                  <div className="flex items-center justify-between w-full">
                    <span>{format.label}</span>
                    <span className="text-gray-400 text-xs ml-2">
                      {format.example}
                    </span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {selectedDateFormat && (
            <p className="text-xs text-gray-500">
              Preview: Today would be{" "}
              {dateFormats.find((f) => f.value === selectedDateFormat)?.example}
            </p>
          )}
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default Preferences;
