"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function StickyCta() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show the CTA after scrolling down 300px
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-t border-gray-200 py-3 px-4 transition-all duration-300",
        isVisible ? "translate-y-0" : "translate-y-full",
      )}
    >
      <div className="container flex items-center justify-between">
        <p className="text-sm font-medium hidden md:block">Ready to connect your EV to trusted service providers?</p>
        <Button
          size="lg"
          className="ml-auto bg-[#F0C412] text-gray-900 hover:bg-[#EFC727] transition-transform hover:scale-105"
        >
          Sign Up Now
        </Button>
      </div>
    </div>
  )
}
