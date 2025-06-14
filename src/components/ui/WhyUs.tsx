import { motion } from "framer-motion";
import {
  Shield,
  Users,
  Award,
  Zap,
  Star,
  Quote,
  CheckCircle,
} from "lucide-react";
import { AnimatedCounter } from "./AnimatedCounter";

const stats = [
  {
    number: "50K+",
    label: "Gen Z Users",
    icon: Users,
    color: "vibe-purple",
  },
  {
    number: "98%",
    label: "Satisfaction Rate",
    icon: Star,
    color: "vibe-blue",
  },
  {
    number: "$2M+",
    label: "Money Saved",
    icon: Award,
    color: "vibe-mint",
  },
  {
    number: "24/7",
    label: "AI Support",
    icon: Zap,
    color: "vibe-purple",
  },
];

const testimonials = [
  {
    quote:
      "Finally, a finance app that doesn't make me feel like I need a business degree! VibeWealth actually gets Gen Z.",
    author: "Alex M.",
    role: "College Student",
    avatar: "👨‍🎓",
  },
  {
    quote:
      "The AI chatbot is like having a financial advisor who speaks my language. No more boring bank apps!",
    author: "Zoe L.",
    role: "Content Creator",
    avatar: "👩‍💻",
  },
  {
    quote:
      "I saved $1,200 in 3 months using their dream tracker. The memes make budgeting actually fun lol",
    author: "Jordan K.",
    role: "Recent Grad",
    avatar: "🎓",
  },
];

const differentiators = [
  {
    title: "Built for Gen Z",
    description:
      "Unlike traditional finance apps, we understand your lifestyle, language, and financial challenges.",
  },
  {
    title: "Actually Fun",
    description:
      "We turned boring budgeting into an engaging experience with gamification and memes.",
  },
  {
    title: "AI-First Approach",
    description:
      "Our AI learns your habits and provides personalized advice that evolves with you.",
  },
  {
    title: "Privacy Protected",
    description:
      "Bank-level security with complete transparency about how we use your data.",
  },
];

export function WhyUs() {
  return (
    <section id="why-us" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-vibe-gradient/10 border border-vibe-purple-200 text-vibe-purple-700 text-sm font-medium mb-4">
            <Shield className="w-4 h-4 mr-2" />
            Why Choose VibeWealth?
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            The <span className="text-vibe-purple-700">smarter choice</span> for
            your money
          </h2>
          <p className="text-xl text-vibe-gray-600 max-w-3xl mx-auto">
            We're not just another finance app. We're a movement that's changing
            how Gen Z thinks about money.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center group"
              >
                <div
                  className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r from-${stat.color}-500 to-${stat.color}-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <div className="mb-2">
                  <AnimatedCounter value={stat.number} />
                </div>
                <div className="text-vibe-gray-600 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Differentiators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-center mb-12">
            What makes us{" "}
            <span className="text-vibe-purple-700">different</span>
          </h3>

          <div className="grid md:grid-cols-2 gap-8">
            {differentiators.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex items-start space-x-4 p-6 rounded-2xl hover:bg-vibe-gray-50 transition-colors duration-300"
              >
                <div className="flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-vibe-mint-500" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-vibe-gray-800 mb-2">
                    {item.title}
                  </h4>
                  <p className="text-vibe-gray-600">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-center mb-12">
            What our <span className="text-vibe-purple-700">community</span>{" "}
            says
          </h3>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg border border-vibe-gray-100 hover:shadow-xl hover:border-vibe-purple-200 transition-all duration-300"
              >
                <Quote className="w-8 h-8 text-vibe-purple-400 mb-4" />
                <p className="text-vibe-gray-700 mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full bg-vibe-gradient flex items-center justify-center text-xl">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-vibe-gray-800">
                      {testimonial.author}
                    </div>
                    <div className="text-sm text-vibe-gray-600">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
