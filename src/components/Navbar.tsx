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

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300 ",
        scrolled ? "bg-white/95 backdrop-blur-sm shadow-sm" : "bg-transparent"
      )}>
      <div className=" flex h-16   px-4 items-center justify-between">
        <div className=" flex items-center justify-center w-40 h-full">
          <div className="relative w-full h-full cursor-pointer">
            <Image src={"/autoconnect-logo.png"} alt="logo" fill />
          </div>
          {/* <Battery className="h-6 w-6 text-[#F0C412]" />
          <span className="font-bold text-xl">Auto Connect</span> */}
        </div>

        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            {navLinks.map((link, index) => {
              return (
                <NavigationMenuItem key={index}>
                  <NavigationMenuLink
                    href={link.href}
                    className={navigationMenuTriggerStyle()}>
                    {link.name}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              );
            })}
            {/* <NavigationMenuItem>
              <NavigationMenuLink
                href="#features"
                className={navigationMenuTriggerStyle()}>
                Features
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                href="#why-choose"
                className={navigationMenuTriggerStyle()}>
                Why Choose Us
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                href="#testimonials"
                className={navigationMenuTriggerStyle()}>
                Testimonials
              </NavigationMenuLink>
            </NavigationMenuItem> */}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-4">
          <Button variant="ghost">Login</Button>
          <Button
            className="bg-[#F0C412] hover:bg-[#EFC727] text-black font-medium"
            size="sm">
            Sign Up
          </Button>
        </div>
      </div>
      <Separator className={scrolled ? "opacity-100 " : "opacity-0"} />
    </header>
  );
}
