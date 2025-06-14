import { Header } from "../components/ui/Header";
import { Hero } from "../components/ui/Hero";
import { Features } from "../components/ui/Features";
import { WhyUs } from "../components/ui/WhyUs";
import { BlogCarousel } from "../components/ui/BlogCarousel";
import { FinalCTA } from "../components/ui/FinalCTA";
import { Footer } from "../components/ui/Footer";

export default function Index() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <Features />
        <WhyUs />
        <BlogCarousel />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
