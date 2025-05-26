"use client";

import { useState, useEffect } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AuthDialog } from "./AuthDialog";

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
    cta: "Watch Video",
    image: "/placeholder.svg?height=600&width=1200",
    alt: "EV being serviced",
    isVideo: true,
    videoId: "https://www.youtube.com/embed/Jf_wKkV5dwQ", // YouTube Video URL
  },
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [videoPlaying, setVideoPlaying] = useState(false); // state to control video playback

  // Reset video playing state when changing slides
  useEffect(() => {
    // Reset video playing state when navigating away from video slide
    if (!slides[currentSlide].isVideo) {
      setVideoPlaying(false);
    }
  }, [currentSlide]);

  useEffect(() => {
    // Only auto-rotate when NOT on video slide or when video is not playing
    if (!slides[currentSlide].isVideo || !videoPlaying) {
      const interval = setInterval(() => {
        nextSlide();
      }, 5000);

      return () => clearInterval(interval);
    }
    // FIXED: Added currentSlide and videoPlaying as dependencies
  }, [currentSlide, videoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handlePlayVideo = () => {
    setVideoPlaying(true); // Start video when user clicks the play button
  };

  // Handle button click based on current slide
  const handleButtonClick = () => {
    // If current slide is video slide, play the video
    if (slides[currentSlide].isVideo) {
      handlePlayVideo();
    }
    // For other slides, you can add navigation or other actions
    // e.g., redirect to specific pages based on button text
  };

  return (
    <section
      id="hero"
      className="relative h-[80vh] min-h-[600px] w-full overflow-hidden bg-black">
      <div className="absolute inset-0 z-10 flex items-center justify-between px-4">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40 cursor-pointer"
          onClick={prevSlide}>
          <ChevronLeft className="h-6 w-6" />
          <span className="sr-only">Previous slide</span>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40 cursor-pointer"
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
                backgroundImage: `url(${slide.image})`,
              }}>
              <div className="absolute inset-0 bg-black/40" />
            </div>
            <div className="absolute inset-0 z-0">
              {slide.isVideo && videoPlaying ? (
                // Video iframe - only show when video is playing
                <div className="h-full w-full bg-gray-100">
                  <div className="h-full w-full z-50">
                    <iframe
                      src={`https://www.youtube.com/embed/Jf_wKkV5dwQ?si=iIGc0wsfBEztiIgG&autoplay=1&mute=0&enablejsapi=1&controls=1&rel=0`}
                      title="YouTube video player"
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>
                </div>
              ) : (
                // Background image for all slides (and video slide before playing)
                <div
                  className="h-full w-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${slide.image})` }}>
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-yellow-500/80" />
                </div>
              )}
            </div>

            <div
              className={cn(
                "z-10 flex max-w-4xl flex-col items-center justify-center gap-6 px-4 text-center",
                slide.isVideo && videoPlaying
                  ? "opacity-0 pointer-events-none"
                  : "opacity-100"
              )}>
              <h1 className="text-4xl font-bold tracking-tight text-[#EFC727] md:text-5xl lg:text-6xl/none">
                {slide.title}
              </h1>
              <p className="max-w-2xl text-lg text-white md:text-xl">
                {slide.subtitle}
              </p>
              {slide.cta == "Get Started Now" ? (
                <AuthDialog
                  mode="signup"
                  trigger={
                    <Button
                      size="lg"
                      className="mt-4 bg-[#F0C412] text-gray-900 hover:bg-[#EFC727] transition-transform hover:scale-105 "
                      // onClick={handleSignUp}
                    >
                      Get Started Now
                      <ArrowRight className="ml-2 h-6 w-6" />
                    </Button>
                  }
                />
              ) : (
                <Button
                  size="lg"
                  onClick={handleButtonClick}
                  className="mt-4 bg-[#F0C412] text-gray-900 hover:bg-[#EFC727] transition-transform hover:scale-105 cursor-pointer">
                  {slide.cta}
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-6 left-0 right-0 z-10 flex justify-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={cn(
              "h-2 w-2 rounded-full transition-all cursor-pointer",
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
