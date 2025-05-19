import { BarChart3, MapPin, Wrench } from "lucide-react"
import { Button } from "@/components/ui/button"

const benefits = [
  {
    icon: BarChart3,
    title: "EV Data Insights",
    description: "Track battery health, mileage, and performance with real-time diagnostics.",
  },
  {
    icon: MapPin,
    title: "Service Recommendations",
    description: "Get personalized service suggestions based on your EV's needs and location.",
  },
  {
    icon: Wrench,
    title: "Independent Auto Shops",
    description: "Access a network of trusted independent auto shops for expert care and maintenance.",
  },
]

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Why Choose Auto Connect?</h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm transition-all duration-200 hover:shadow-md"
            >
              <div className="p-3 mb-4 rounded-full bg-[#F0C412]/10">
                <benefit.icon className="h-8 w-8 text-[#F0C412]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Button className="bg-[#F0C412] text-gray-900 hover:bg-[#EFC727]">Start Connecting Your EV Today</Button>
        </div>
      </div>
    </section>
  )
}
