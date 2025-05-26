import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Navbar";
import { Toaster } from "@/components/ui/sonner";

// import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Auto Connect - EV Service Provider",
  description:
    "Connect your EV to trusted service providers for maintenance and care",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {/* <ThemeProvider attribute="class" defaultTheme="light" enableSystem> */}
        <main>{children}</main>
        <Toaster
        // toastOptions={{
        //   unstyled: true,
        //   classNames: {
        //     error: "bg-red-400",
        //     success: "text-green-400",
        //     warning: "text-yellow-400",
        //     info: "bg-blue-400",
        //   },
        // }}
        />
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
