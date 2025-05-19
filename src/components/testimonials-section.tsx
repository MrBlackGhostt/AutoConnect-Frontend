import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Tesla Model 3 Owner",
    content:
      "Auto Connect has completely changed how I maintain my EV. The real-time diagnostics have saved me from potential battery issues twice now!",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "SJ",
  },
  {
    name: "Michael Chen",
    role: "Nissan Leaf Owner",
    content:
      "Finding qualified EV mechanics used to be a nightmare. With Auto Connect, I can easily find shops that specialize in my vehicle and book appointments instantly.",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "MC",
  },
  {
    name: "Emma Rodriguez",
    role: "Rivian R1T Owner",
    content:
      "The personalized service recommendations are spot-on. I love how the app learns my driving patterns and suggests maintenance before issues arise.",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "ER",
  },
]

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">What Our Users Are Saying</h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-none shadow-sm">
              <CardHeader className="pb-2 pt-6">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-[#F0C412] text-[#F0C412]" />
                  ))}
                </div>
                <p className="text-gray-600">{testimonial.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
