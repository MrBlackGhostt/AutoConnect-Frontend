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
import Link from "next/link";
import { useSearchParams } from "next/navigation";
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const searchParams = useSearchParams();

  const code = searchParams.get("code");

  useEffect(() => {
    if (code) {
      (async () => {
        try {
          const res = await fetch("/api/exchange-token", {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              code,
            }),
          });
          if (res.ok) {
            const data = await res.json();
            console.log("🚀 ---------------🚀");
            console.log("🚀 ~ data:", data);
            console.log("🚀 ---------------🚀");
            const { access_token, refresh_token } = data;

            // Store tokens in localStorage
            localStorage.setItem("access_token", access_token);
            localStorage.setItem("refresh_token", refresh_token);
          }
        } catch (error) {
          console.log("🚀 -----------------🚀");
          console.log("🚀 ~ error:", error);
          console.log("🚀 -----------------🚀");
          if (error instanceof Error) {
            throw new Error(`Something went wrong: ${error.message}`);
          } else {
            throw new Error("Something went wrong: unknown error");
          }
        }
      })();
    }
  }, []);
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
                <Image loader={() => logoUrl} src={logoUrl} alt="logo" fill />
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
              <Link
                href={`https://connect.smartcar.com/oauth/authorize?response_type=code
&client_id=df848e5f-7837-40bb-b503-f433883c75f5
&redirect_uri=http://localhost:3000/
&scope=read_battery read_alerts read_charge read_charge_locations read_climate read_compass read_diagnostics read_extended_vehicle_info read_location read_odometer read_security read_service_history read_speedometer read_thermometer read_tires read_user_profile read_vehicle_info read_vin
&mode=simulated`}>
                Connect
              </Link>
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
