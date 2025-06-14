import { motion } from "framer-motion";
import {
  ArrowRight,
  Play,
  Sparkles,
  TrendingUp,
  DollarSign,
  Target,
} from "lucide-react";
import { Button } from "./button";

export function Hero() {
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
        ease: "easeOut",
      },
    },
  };

  const floatingIcons = [
    { Icon: TrendingUp, delay: 0, position: "top-20 left-20" },
    { Icon: DollarSign, delay: 2, position: "top-40 right-32" },
    { Icon: Target, delay: 4, position: "bottom-32 left-32" },
    { Icon: Sparkles, delay: 1, position: "bottom-20 right-20" },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-vibe-purple-50/30 to-vibe-blue-50/30">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-hero-pattern opacity-60" />

      {/* Floating Icons */}
      {floatingIcons.map(({ Icon, delay, position }, index) => (
        <motion.div
          key={index}
          className={`absolute hidden lg:block ${position}`}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 4,
            delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30">
            <Icon className="w-6 h-6 text-vibe-purple-600" />
          </div>
        </motion.div>
      ))}

      {/* Gradient Orbs */}
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
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-vibe-gradient/10 border border-vibe-purple-200 text-vibe-purple-700 text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4 mr-2" />
                AI-Powered Finance for Gen Z
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6"
            >
              Master Your <span className="hero-text-gradient">Finances</span>{" "}
              with Ease
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl text-vibe-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0"
            >
              AI-powered finance tracker, budget planner & dream visualizer
              designed specifically for Gen Z. Turn your money goals into
              reality with style.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button
                size="lg"
                className="bg-vibe-gradient hover:opacity-90 text-white shadow-xl hover:shadow-2xl transition-all duration-300 group"
              >
                Get Started Free
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-vibe-purple-200 text-vibe-purple-700 hover:bg-vibe-purple-50 group"
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
                <div className="w-2 h-2 bg-vibe-mint-500 rounded-full mr-2" />
                Free Forever P
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-vibe-blue-500 rounded-full mr-2" />
                24/7 AI Support
              </div>
            </motion.div>
          </div>

          {/* Right Visual */}
          <motion.div
            variants={itemVariants}
            className="relative flex items-center justify-center"
          >
            <div className="relative w-full max-w-lg">
              {/* Main Card */}
              <div className="bg-white rounded-3xl shadow-2xl p-8 border border-vibe-gray-100">
                <div className="text-center">
                  <div className="w-16 h-16 bg-vibe-gradient rounded-2xl mx-auto mb-4 flex items-center justify-center">
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-vibe-gray-800 mb-2">
                    Monthly Budget
                  </h3>
                  <p className="text-3xl font-bold hero-text-gradient mb-4">
                    $2,847
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-vibe-gray-600">
                        Saved this month
                      </span>
                      <span className="font-semibold text-vibe-mint-600">
                        +$421
                      </span>
                    </div>
                    <div className="w-full bg-vibe-gray-200 rounded-full h-2">
                      <div className="bg-vibe-gradient h-2 rounded-full w-3/4"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Stats */}
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-lg p-4 border border-vibe-gray-100">
                <div className="text-center">
                  <div className="text-lg font-bold text-vibe-purple-600">
                    🎯
                  </div>
                  <div className="text-xs text-vibe-gray-600 mt-1">
                    Dream Goal
                  </div>
                  <div className="text-sm font-bold text-vibe-gray-800">
                    78% Complete
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-lg p-4 border border-vibe-gray-100">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-vibe-mint-100 rounded-lg flex items-center justify-center">
                    <span className="text-sm">💰</span>
                  </div>
                  <div>
                    <div className="text-xs text-vibe-gray-600">AI Tip</div>
                    <div className="text-sm font-bold text-vibe-gray-800">
                      Save $50 more
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
