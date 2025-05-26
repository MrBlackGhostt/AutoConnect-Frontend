"use client";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

import { useEffect, useState } from "react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Tesla Model 3 Owner",
    content:
      "Auto Connect has made managing my EV so much easier. The real-time battery insights helped me optimize my charging habits, and I've found amazing service shops I never knew existed.",
    avatar:
      "https://images.pexels.com/photos/762080/pexels-photo-762080.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Nissan Leaf Owner",
    content:
      "The scheduling feature is a game-changer. I used to struggle to find shops that could service my EV properly, but Auto Connect connected me with certified technicians who know exactly what they're doing.",
    avatar:
      "https://images.pexels.com/photos/341970/pexels-photo-341970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    rating: 5,
  },
  {
    id: 3,
    name: "Jessica Williams",
    role: "Rivian R1T Owner",
    content:
      "I love how Auto Connect gives me personalized service recommendations based on my driving patterns. The data insights are incredibly detailed, and the app is intuitive to use.",
    avatar:
      "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    rating: 4,
  },
];

export default function TestimonialCard({
  name,
  role,
  content,
  avatar,
  rating,
  delay,
}: {
  name: string;
  role: string;
  content: string;
  avatar: string;
  rating: number;
  delay: number;
}) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}>
      <Card className="h-full hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <div className="flex mb-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${
                  i < rating
                    ? "text-[#F0C412] fill-[#F0C412]"
                    : "text-muted-foreground"
                }`}
              />
            ))}
          </div>
          <p className="mb-6 text-muted-foreground">&quot;{content}&quot;</p>
          <div className="flex items-center">
            <Avatar className="h-10 w-10 mr-3 border-2 border-[#F0C412]">
              <AvatarImage src={avatar} alt={name} />
              <AvatarFallback>{name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{name}</p>
              <p className="text-sm text-muted-foreground">{role}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-24 bg-neutral-50">
      <div className="container">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our Users Are Saying
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of satisfied EV owners who trust Auto Connect for
            their vehicle management needs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              name={testimonial.name}
              role={testimonial.role}
              content={testimonial.content}
              avatar={testimonial.avatar}
              rating={testimonial.rating}
              delay={index * 0.1}
            />
          ))}
        </div>

        {/* <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 text-center">
          <div className="flex flex-col items-center justify-center">
            <p className="text-2xl font-medium mb-8">
              Ready to join them? Get started today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F0C412] w-full sm:w-64"
              />
              <button className="bg-[#F0C412] hover:bg-[#EFC727] text-black font-medium px-6 py-3 rounded-lg transition-colors">
                Sign Up Now
              </button>
            </div>
          </div>
        </motion.div> */}
      </div>
    </section>
  );
}
