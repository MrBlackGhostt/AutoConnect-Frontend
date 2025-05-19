import { Shield, Lock, CheckCircle } from "lucide-react"

export default function TrustSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <div className="p-3 mb-4 rounded-full bg-blue-50">
            <Shield className="h-8 w-8 text-blue-500" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">Your Data is Safe</h2>
          <p className="text-lg text-gray-600 mb-6">
            We use industry-leading encryption and security protocols to protect your data. Your privacy is our
            priority.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mt-4">
            <div className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-blue-500" />
              <span className="text-sm text-gray-600">SSL Encrypted</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-blue-500" />
              <span className="text-sm text-gray-600">GDPR Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-500" />
              <span className="text-sm text-gray-600">Data Protection</span>
            </div>
          </div>

          <a href="#" className="mt-6 text-blue-600 hover:underline text-sm font-medium">
            Learn More About Our Privacy Policy
          </a>
        </div>
      </div>
    </section>
  )
}
