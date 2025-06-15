import React from "react";

export const OnboardingFooter: React.FC = () => {
  return (
    <footer className="py-6 px-8">
      <div className="text-center text-gray-400 text-xs">
        <p className="mb-2">© 2025, VibeWealth, Inc.</p>
        <div className="flex items-center justify-center gap-2">
          <a
            href="/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300 transition-colors duration-200"
          >
            Privacy Policy
          </a>
          <span>•</span>
          <a
            href="/terms"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300 transition-colors duration-200"
          >
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
};
