"use client";
import { motion } from "framer-motion";
import { LineChart, MapPin, Calendar } from "lucide-react";
import { TabsContent, Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="container">
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
          <TabsList className="grid w-full grid-cols-3 mb-12">
            <TabsTrigger value="insights">EV Data Insights</TabsTrigger>
            <TabsTrigger value="service">Service Suggestions</TabsTrigger>
            <TabsTrigger value="scheduling">Seamless Scheduling</TabsTrigger>
          </TabsList>

          <div className="mt-8">
            <TabsContent value="insights" className="mt-0">
              <div className="flex flex-col md:flex-row items-center gap-12">
                <motion.div
                  initial={{ x: -40, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="md:w-1/2 order-2 md:order-1">
                  <div className="flex items-center mb-4">
                    <LineChart className="h-8 w-8 text-[#F0C412] mr-3" />
                    <h3 className="text-2xl font-bold">EV Data Insights</h3>
                  </div>
                  <p className="text-lg mb-6 text-muted-foreground">
                    Track battery health, mileage, and overall performance with
                    real-time diagnostics and comprehensive analytics.
                  </p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <div className="h-6 w-6 rounded-full bg-[#F0C412]/20 flex items-center justify-center text-[#F0C412] mr-3 mt-1">
                        ✓
                      </div>
                      <div>
                        <span className="font-medium">
                          Battery health monitoring
                        </span>
                        <p className="text-sm text-muted-foreground">
                          Track degradation and optimize charging patterns
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="h-6 w-6 rounded-full bg-[#F0C412]/20 flex items-center justify-center text-[#F0C412] mr-3 mt-1">
                        ✓
                      </div>
                      <div>
                        <span className="font-medium">
                          Performance analytics
                        </span>
                        <p className="text-sm text-muted-foreground">
                          Get insights on energy usage and driving efficiency
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="h-6 w-6 rounded-full bg-[#F0C412]/20 flex items-center justify-center text-[#F0C412] mr-3 mt-1">
                        ✓
                      </div>
                      <div>
                        <span className="font-medium">Custom alerts</span>
                        <p className="text-sm text-muted-foreground">
                          Receive notifications for potential issues
                        </p>
                      </div>
                    </li>
                  </ul>
                  <Button className="bg-[#F0C412] hover:bg-[#EFC727] text-black font-medium">
                    Learn More
                  </Button>
                </motion.div>
                <motion.div
                  initial={{ x: 40, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="md:w-1/2 order-1 md:order-2">
                  <img
                    src="https://images.pexels.com/photos/3059654/pexels-photo-3059654.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt="EV data dashboard"
                    className="rounded-xl shadow-lg w-full"
                  />
                </motion.div>
              </div>
            </TabsContent>

            <TabsContent value="service" className="mt-0">
              <div className="flex flex-col md:flex-row items-center gap-12">
                <motion.div
                  initial={{ x: -40, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="md:w-1/2">
                  <img
                    src="https://images.pexels.com/photos/5835359/pexels-photo-5835359.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt="Service suggestions map"
                    className="rounded-xl shadow-lg w-full"
                  />
                </motion.div>
                <motion.div
                  initial={{ x: 40, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="md:w-1/2">
                  <div className="flex items-center mb-4">
                    <MapPin className="h-8 w-8 text-[#F0C412] mr-3" />
                    <h3 className="text-2xl font-bold">Service Suggestions</h3>
                  </div>
                  <p className="text-lg mb-6 text-muted-foreground">
                    Get service recommendations tailored to your EV's specific
                    needs and find the best service providers near you.
                  </p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <div className="h-6 w-6 rounded-full bg-[#F0C412]/20 flex items-center justify-center text-[#F0C412] mr-3 mt-1">
                        ✓
                      </div>
                      <div>
                        <span className="font-medium">
                          Personalized recommendations
                        </span>
                        <p className="text-sm text-muted-foreground">
                          Based on your vehicle's specific needs and history
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="h-6 w-6 rounded-full bg-[#F0C412]/20 flex items-center justify-center text-[#F0C412] mr-3 mt-1">
                        ✓
                      </div>
                      <div>
                        <span className="font-medium">
                          Local service provider map
                        </span>
                        <p className="text-sm text-muted-foreground">
                          Find certified EV specialists near you
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="h-6 w-6 rounded-full bg-[#F0C412]/20 flex items-center justify-center text-[#F0C412] mr-3 mt-1">
                        ✓
                      </div>
                      <div>
                        <span className="font-medium">Provider ratings</span>
                        <p className="text-sm text-muted-foreground">
                          See reviews from other EV owners
                        </p>
                      </div>
                    </li>
                  </ul>
                  <Button className="bg-[#F0C412] hover:bg-[#EFC727] text-black font-medium">
                    Explore Service Providers
                  </Button>
                </motion.div>
              </div>
            </TabsContent>

            <TabsContent value="scheduling" className="mt-0">
              <div className="flex flex-col md:flex-row items-center gap-12">
                <motion.div
                  initial={{ x: -40, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="md:w-1/2 order-2 md:order-1">
                  <div className="flex items-center mb-4">
                    <Calendar className="h-8 w-8 text-[#F0C412] mr-3" />
                    <h3 className="text-2xl font-bold">Seamless Scheduling</h3>
                  </div>
                  <p className="text-lg mb-6 text-muted-foreground">
                    Easily book appointments with certified independent auto
                    shops for maintenance or repairs with just a few clicks.
                  </p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <div className="h-6 w-6 rounded-full bg-[#F0C412]/20 flex items-center justify-center text-[#F0C412] mr-3 mt-1">
                        ✓
                      </div>
                      <div>
                        <span className="font-medium">One-click booking</span>
                        <p className="text-sm text-muted-foreground">
                          Schedule appointments in seconds
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="h-6 w-6 rounded-full bg-[#F0C412]/20 flex items-center justify-center text-[#F0C412] mr-3 mt-1">
                        ✓
                      </div>
                      <div>
                        <span className="font-medium">
                          Maintenance reminders
                        </span>
                        <p className="text-sm text-muted-foreground">
                          Never miss a scheduled service
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="h-6 w-6 rounded-full bg-[#F0C412]/20 flex items-center justify-center text-[#F0C412] mr-3 mt-1">
                        ✓
                      </div>
                      <div>
                        <span className="font-medium">Service history</span>
                        <p className="text-sm text-muted-foreground">
                          Keep track of all your maintenance and repairs
                        </p>
                      </div>
                    </li>
                  </ul>
                  <Button className="bg-[#F0C412] hover:bg-[#EFC727] text-black font-medium">
                    Book a Service
                  </Button>
                </motion.div>
                <motion.div
                  initial={{ x: 40, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="md:w-1/2 order-1 md:order-2">
                  <img
                    src="https://images.pexels.com/photos/4481326/pexels-photo-4481326.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt="Scheduling calendar"
                    className="rounded-xl shadow-lg w-full"
                  />
                </motion.div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </section>
  );
}
