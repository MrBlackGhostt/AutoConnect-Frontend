"use client";
import { motion } from "framer-motion";
import { LineChart, MapPin, Calendar } from "lucide-react";
import { TabsContent, Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function FeaturesSection() {
  const src1 =
    "https://images.pexels.com/photos/3059654/pexels-photo-3059654.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
  const src2 =
    "https://images.pexels.com/photos/5835359/pexels-photo-5835359.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
  const src3 =
    "https://images.pexels.com/photos/4481326/pexels-photo-4481326.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";

  const features = [
    {
      id: "insights",
      icon: <LineChart className="h-8 w-8 text-[#F0C412] mr-3" />,
      title: "EV Data Insights",
      description:
        "Track battery health, mileage, and overall performance with real-time diagnostics and comprehensive analytics.",
      listItems: [
        {
          title: "Battery health monitoring",
          description: "Track degradation and optimize charging patterns",
        },
        {
          title: "Performance analytics",
          description: "Get insights on energy usage and driving efficiency",
        },
        {
          title: "Custom alerts",
          description: "Receive notifications for potential issues",
        },
      ],
      buttonText: "Learn More",
      imgSrc: src2,
      imgAlt: "EV data dashboard",
    },
    {
      id: "service",
      icon: <MapPin className="h-8 w-8 text-[#F0C412] mr-3" />,
      title: "Service Suggestions",
      description:
        "Get service recommendations tailored to your EV's specific needs and find the best service providers near you.",
      listItems: [
        {
          title: "Personalized recommendations",
          description: "Based on your vehicle's specific needs and history",
        },
        {
          title: "Local service provider map",
          description: "Find certified EV specialists near you",
        },
        {
          title: "Provider ratings",
          description: "See reviews from other EV owners",
        },
      ],
      buttonText: "Explore Service Providers",
      imgSrc: src1,
      imgAlt: "EV service suggestions",
    },
    {
      id: "scheduling",
      icon: <Calendar className="h-8 w-8 text-[#F0C412] mr-3" />,
      title: "Seamless Scheduling",
      description:
        "Easily book appointments with certified independent auto shops for maintenance or repairs with just a few clicks.",
      listItems: [
        {
          title: "One-click booking",
          description: "Schedule appointments in seconds",
        },
        {
          title: "Maintenance reminders",
          description: "Never miss a scheduled service",
        },
        {
          title: "Service history",
          description: "Keep track of all your maintenance and repairs",
        },
      ],
      buttonText: "Book a Service",
      imgSrc: src3,
      imgAlt: "Seamless Scheduling",
    },
  ];

  return (
    <section id="features" className="py-24 bg-white">
      <div className="overflow-x-auto md:overflow-hidden md:container">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Explore Auto Connect`s Features
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our platform is designed to provide a seamless experience for EV
            owners.
          </p>
        </motion.div>

        <Tabs defaultValue="insights" className="w-full">
          <TabsList className="flex flex-wrap md:grid w-full grid-cols-3 mb-12 cursor-pointer">
            {features.map((feature) => (
              <TabsTrigger key={feature.id} value={feature.id}>
                {feature.title}
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="mt-8">
            {features.map((feature) => (
              <TabsContent key={feature.id} value={feature.id} className="mt-0">
                <div className="flex flex-col md:flex-row items-center gap-12">
                  <motion.div
                    initial={{ x: -40, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="md:w-1/2 order-2 md:order-1">
                    <div className="flex items-center mb-4">
                      {feature.icon}
                      <h3 className="text-2xl font-bold">{feature.title}</h3>
                    </div>
                    <p className="text-lg mb-6 text-muted-foreground">
                      {feature.description}
                    </p>
                    <ul className="space-y-3 mb-6">
                      {feature.listItems.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <div className="h-6 w-6 rounded-full bg-[#F0C412]/20 flex items-center justify-center text-[#F0C412] mr-3 mt-1">
                            ✓
                          </div>
                          <div>
                            <span className="font-medium">{item.title}</span>
                            <p className="text-sm text-muted-foreground">
                              {item.description}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <Button className="bg-[#F0C412] hover:bg-[#EFC727] text-black font-medium">
                      {feature.buttonText}
                    </Button>
                  </motion.div>
                  <motion.div
                    initial={{ x: 40, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="w-full md:w-1/2 order-1 md:order-2">
                    <div className="relative w-full h-0 pb-[75%]">
                      <Image
                        loader={() => feature.imgSrc}
                        src={feature.imgSrc}
                        alt={feature.imgAlt}
                        fill
                        className="rounded-xl shadow-lg w-full h-full object-cover"
                      />
                    </div>
                  </motion.div>
                </div>
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </div>
    </section>
  );
}
