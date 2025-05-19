"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const slides = [
  {
    id: 1,
    title: "Connect Your EV to Trusted Service Providers.",
    subtitle:
      "Get real-time data insights, service recommendations, and access to expert auto shops.",
    cta: "Get Started Now",
    image:
      "https://images.pexels.com/photos/10373777/pexels-photo-10373777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    altText: "Modern electric vehicle being charged",
  },
  {
    id: 2,
    title: "Real-time EV data insights & personalized service recommendations.",
    subtitle:
      "Monitor your vehicle's health and get tailored maintenance suggestions.",
    cta: "Learn More",
    image: "/placeholder.svg?height=600&width=1200",
    alt: "EV diagnostics dashboard",
  },
  {
    id: 3,
    title: "Access to expert auto shops & seamless scheduling.",
    subtitle:
      "Find certified mechanics and book appointments with just a few clicks.",
    cta: "Find Shops",
    image:
      "https://images.pexels.com/photos/3807386/pexels-photo-3807386.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    altText: "Mechanic servicing an electric vehicle",
  },
  {
    id: 4,
    title: "Experience the Auto Connect difference.",
    subtitle: "Join thousands of satisfied EV owners who trust our service.",
    cta: "Start Connecting",
    image: "/placeholder.svg?height=600&width=1200",
    alt: "EV being serviced",
    isVideo: true,
  },
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      className="relative h-[80vh] min-h-[600px] w-full overflow-hidden bg-white">
      <div className="absolute inset-0 z-10 flex items-center justify-between px-4">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40"
          onClick={prevSlide}>
          <ChevronLeft className="h-6 w-6" />
          <span className="sr-only">Previous slide</span>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40"
          onClick={nextSlide}>
          <ChevronRight className="h-6 w-6" />
          <span className="sr-only">Next slide</span>
        </Button>
      </div>

      <div className="relative h-full w-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={cn(
              "absolute inset-0 flex h-full w-full flex-col items-center justify-center transition-opacity duration-1000",
              currentSlide === index
                ? "opacity-100"
                : "opacity-0 pointer-events-none"
            )}>
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${slides[currentSlide].image})`,
              }}>
              <div className="absolute inset-0 bg-black/40" />
            </div>
            <div className="absolute inset-0 z-0">
              {slide.isVideo ? (
                <div className="h-full w-full bg-gray-100">
                  <video
                    className="h-full w-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline>
                    <source
                      src="/placeholder.svg?height=600&width=1200"
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                </div>
              ) : (
                <div
                  className="h-full w-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${slide.image})` }}>
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/80" />
                </div>
              )}
            </div>

            <div className="z-10 flex max-w-4xl flex-col items-center justify-center gap-6 px-4 text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 md:text-5xl lg:text-6xl/none">
                {slide.title}
              </h1>
              <p className="max-w-2xl text-lg text-gray-600 md:text-xl">
                {slide.subtitle}
              </p>
              <Button
                size="lg"
                className="mt-4 bg-[#F0C412] text-gray-900 hover:bg-[#EFC727] transition-transform hover:scale-105">
                {slide.cta}
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-6 left-0 right-0 z-10 flex justify-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={cn(
              "h-2 w-2 rounded-full transition-all",
              currentSlide === index ? "w-8 bg-[#F0C412]" : "bg-gray-300"
            )}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
