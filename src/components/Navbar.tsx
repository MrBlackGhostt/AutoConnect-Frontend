"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { MobileNavbar } from "./mobile-navbar";
import { AuthDialog } from "./AuthDialog";
export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#hero" },
    { name: "Why Us", href: "#why-autoconnect" },
    { name: "Features", href: "#features" },
    { name: "Testimonials", href: "#testimonials" },
  ];

  const logoUrl = "/autoconnect-logo.png";

  return (
    <>
      <div className="sticky top-0 right-0 z-50 md:hidden">
        <MobileNavbar />
      </div>

      <header
        className={cn(
          " sticky top-0 z-50 md:transition-all md:duration-300 ",
          scrolled
            ? " bg-white/95 backdrop-blur-sm shadow-sm"
            : "bg-transparent"
        )}>
        <div className="hidden md:block">
          <div className=" flex h-16 px-4 items-center justify-between">
            <div className=" flex items-center justify-center w-40 h-full">
              <div className="relative w-full h-full cursor-pointer">
                <Image
                  loader={() => logoUrl}
                  src={logoUrl}
                  alt="logo"
                  fill
                  placeholder="blur"
                  loading="lazy"
                />
              </div>
            </div>

            <NavigationMenu>
              <NavigationMenuList>
                {navLinks.map((link, index) => {
                  return (
                    <NavigationMenuItem key={index}>
                      <NavigationMenuLink
                        href={link.href}
                        className={cn(
                          navigationMenuTriggerStyle(),
                          "hover:bg-[#EFC727]/50"
                        )}>
                        {link.name}
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  );
                })}
              </NavigationMenuList>
            </NavigationMenu>

            <div className="flex items-center gap-4">
              <AuthDialog mode="login" />
              <AuthDialog
                mode="signup"
                trigger={
                  <Button
                    className="bg-[#F0C412] hover:bg-[#EFC727] text-black font-medium"
                    size="sm">
                    Sign Up
                  </Button>
                }
              />
            </div>
          </div>
          <Separator
            className={scrolled ? "md:opacity-100 " : "md:opacity-0"}
          />
        </div>
      </header>
    </>
  );
}
