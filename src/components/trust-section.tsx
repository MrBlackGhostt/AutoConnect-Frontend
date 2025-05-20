"use client";
import { motion } from "framer-motion";
import { Lock, ShieldCheck, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function TrustSection() {
  const src =
    "https://images.pexels.com/photos/5474296/pexels-photo-5474296.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
  return (
    <section className="py-24 bg-neutral-50 ">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-center md:space-x-12">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:w-1/2 mb-8 md:mb-0 " // Added text-center for mobile
          >
            <h2 className=" lg:text-4xl font-bold mb-4 text-lg md:text-3xl">
              {" "}
              {/* Adjusted text size for mobile */}
              Your Data is Safe
            </h2>
            <p className=" text-muted-foreground mb-6 text-sm md:text-lg">
              {" "}
              {/* Adjusted text size for mobile */}
              We use industry-leading encryption and security protocols to
              protect your data. Auto Connect is committed to maintaining the
              highest standards of privacy and security.
            </p>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="mr-4 mt-1 bg-[#F0C412]/10 p-2 rounded-full">
                  <Lock className="h-5 w-5 text-[#F0C412]" />
                </div>
                <div>
                  <h3 className="font-medium">End-to-end encryption</h3>
                  <p className="text-sm text-muted-foreground">
                    Your EV data is encrypted at all times and only accessible
                    to you.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="mr-4 mt-1 bg-[#F0C412]/10 p-2 rounded-full">
                  <ShieldCheck className="h-5 w-5 text-[#F0C412]" />
                </div>
                <div>
                  <h3 className="font-medium">ISO 27001 Certified</h3>
                  <p className="text-sm text-muted-foreground">
                    We meet the highest international standards for information
                    security.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="mr-4 mt-1 bg-[#F0C412]/10 p-2 rounded-full">
                  <Eye className="h-5 w-5 text-[#F0C412]" />
                </div>
                <div>
                  <h3 className="font-medium">Full transparency</h3>
                  <p className="text-sm text-muted-foreground">
                    You control what data is shared with service providers.
                  </p>
                </div>
              </div>
            </div>
            <Button variant="link" className="mt-4 pl-0 font-medium">
              Learn More About Our Privacy Policy
            </Button>
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:w-1/2">
            <div className="relative rounded-xl overflow-hidden shadow-xl bg-white p-1">
              <div className=" relative rounded-lg w-full h-0 pb-[80%] md:pb-[75%]">
                <Image
                  loader={() => src}
                  src={src}
                  alt="Secure data visualization"
                  fill
                  className="rounded-lg w-full h-auto"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-lg flex flex-col justify-end p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="bg-green-500 rounded-full h-3 w-3 animate-pulse" />
                  <span className="text-white text-sm font-medium">
                    Secure connection active
                  </span>
                </div>
                <h3 className="text-white text-xl font-bold mb-1">
                  Protected EV Data
                </h3>
                <p className="text-white/80 text-sm">
                  Your vehicle information is encrypted and securely stored
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
