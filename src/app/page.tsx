import HeroSection from "@/components/hero-section";
import WhyChooseSection from "@/components/why-choose-section";
import TrustSection from "@/components/trust-section";
import FeaturesSection from "@/components/features-section";
import TestimonialsSection from "@/components/testimonials-section";
import Footer from "@/components/footer";
import StickyCta from "@/components/sticky-cta";
// import { Header } from "@/components/Navbar";

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      {/* <Header /> */}
      <HeroSection />
      <WhyChooseSection />
      <TrustSection />
      <FeaturesSection />
      <TestimonialsSection />
      <Footer />
      <StickyCta />
    </div>
  );
}
