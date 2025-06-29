"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "./button";
import { LoginModal } from "@/components/landing/LoginModal";
import { FloatingIcons } from "@/components/ui/FloatingIcons";
import { CardPreview } from "@/components/ui/CardPreview";

export function Hero() {
  const router = useRouter();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Animation variants for parent and child elements
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white pt-16 md:pt-0">
      {/* Decorative SVG background pattern */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='graph' width='100' height='100' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 0,50 Q 25,30 50,40 T 100,35' stroke='%23a855f7' stroke-width='1' fill='none' opacity='0.3'/%3E%3Cpath d='M 0,70 Q 25,45 50,55 T 100,50' stroke='%230ea5e9' stroke-width='1' fill='none' opacity='0.3'/%3E%3Cpath d='M 0,60 Q 25,80 50,70 T 100,65' stroke='%2314b8a6' stroke-width='1' fill='none' opacity='0.3'/%3E%3Cg stroke='%23e5e7eb' stroke-width='0.5' opacity='0.5'%3E%3Cline x1='0' y1='25' x2='100' y2='25'/%3E%3Cline x1='0' y1='50' x2='100' y2='50'/%3E%3Cline x1='0' y1='75' x2='100' y2='75'/%3E%3Cline x1='25' y1='0' x2='25' y2='100'/%3E%3Cline x1='50' y1='0' x2='50' y2='100'/%3E%3Cline x1='75' y1='0' x2='75' y2='100'/%3E%3C/g%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100' height='100' fill='url(%23graph)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />
      <div className="absolute inset-0 bg-white/60" />

      {/* Floating animated icons */}
      <FloatingIcons />

      {/* Animated gradient blobs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-vibe-purple-300/20 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-vibe-blue-300/20 rounded-full blur-3xl animate-pulse-slow delay-1000" />
      <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-vibe-mint-300/20 rounded-full blur-3xl animate-pulse-slow delay-2000" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          {/* Text content */}
          <div className="text-center lg:text-left">
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-vibe-gradient/10 border border-vibe-purple-200 text-vibe-purple-700 text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4 mr-2" /> AI-Powered Finance for Gen Z
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6"
            >
              Master Your <span className="text-vibe-purple-700">Finances</span> with Ease
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl text-vibe-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0"
            >
              AI-powered finance tracker, budget planner & dream visualizer designed specifically for Gen Z.
            </motion.p>

            {/* Call-to-action buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button
                size="lg"
                onClick={() => router.push("/signup")}
                className="vibe-gradient hover:opacity-90 text-white shadow-xl hover:shadow-2xl group cursor-pointer"
              >
                Get Started Free
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                onClick={() => setIsLoginModalOpen(true)}
                className="border-vibe-purple-200 text-vibe-purple-700 hover:bg-vibe-purple-50 group cursor-pointer"
              >
                <span className="mr-2">Login</span>
                <ArrowRight className="w-5 h-5 -rotate-45 group-hover:scale-125 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
              </Button>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mt-8 flex items-center justify-center lg:justify-start space-x-6 text-sm text-vibe-gray-500"
            >
              <div className="flex items-center">
                <div className="w-2 h-2 bg-vibe-mint-500 rounded-full mr-2" /> Forever Free Plan
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-vibe-blue-500 rounded-full mr-2" /> 24/7 AI Support
              </div>
            </motion.div>
          </div>

          {/* Visual card preview */}
          <CardPreview variants={itemVariants} />
        </motion.div>
      </div>

      {/* Auth Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSignUpClick={() => {
          setIsLoginModalOpen(false);
          router.push("/signup");
        }}
      />
    </section>
  );
}