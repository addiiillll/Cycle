import Image from "next/image"
import { Quote, Star, Copy } from "lucide-react"

export function SingleTestimonial() {
  return (
    <div className="relative max-w-6xl mx-auto p-8 bg-white mt-16 pb-32">
      {/* Desktop Layout */}
      <div className="hidden md:flex items-start gap-8">
        {/* Profile Image */}
        <div className="flex-shrink-0">
          <Image
            src="https://cdn.prod.website-files.com/62b5b85dd560583e288cb389/65efdb0da3246cf09f570a9e_image%20726.jpg"
            alt="Olivier Godement"
            width={200}
            height={200}
            className="rounded-2xl object-cover"
          />
        </div>

        {/* Testimonial Content */}
        <div className="flex-1">
          <div className="relative">
            <p className="max-w-2xl text-3xl font-semibold font-sans text-gray-800 italic leading-relaxed mb-8">
              Cycle is a slick AI tool that enables teams to build better products by getting smarter on what their
              customers want.
            </p>

            {/* Large Quote Icon */}
            <Quote className="absolute -top-2 -right-4 w-16 h-16 text-blue-600 fill-current" />
          </div>

          {/* Author Info */}
          <div className="flex items-center gap-5 text-gray-700">
            <span className="font-medium">Olivier Godement</span>
            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
            <div className="flex items-center gap-2">
              <Image
                src="https://cdn.prod.website-files.com/62b5b85dd560583e288cb389/65f090a8edcd338803ed6bf3_openai-wordmark.svg"
                height={32}
                width={32}
                alt="Open AI"
                className="h-6 w-auto filter grayscale brightness-0"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden">
        {/* Profile Image */}
        <div className="mb-6">
          <Image
            src="https://cdn.prod.website-files.com/62b5b85dd560583e288cb389/65efdb0da3246cf09f570a9e_image%20726.jpg"
            alt="Olivier Godement"
            width={120}
            height={120}
            className="rounded-2xl object-cover"
          />
        </div>

        {/* Testimonial Content */}
        <div className="relative">
          <div className="bg-blue-50 p-6 rounded-2xl mb-6 relative">
            <p className="text-lg text-gray-800 italic leading-relaxed">
              Cycle is a slick AI tool that enables teams to build better products by getting smarter on what their
              customers want.
            </p>
            <Quote className="absolute top-2 right-2 w-8 h-8 text-blue-600 fill-current opacity-30" />
          </div>

          {/* Author Info */}
          <div className="flex items-center gap-3 text-gray-700">
            <span className="font-medium">Olivier Godement</span>
            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
            <div className="flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" className="fill-current">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
              </svg>
              <span>OpenAI</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <span className="absolute bottom-4 -left-32 text-purple-600 fill-current">
        <Image 
          src="https://cdn.prod.website-files.com/62b5b85dd560583e288cb389/65eb2179be7ad7c7192eb394_bubble-page-gong.png"
          height={120}
          width={120}
          alt="Star"
          className="h-full w-full object-contain"
        />
      </span>

      <span className="absolute bottom-4 right-96 text-purple-600 fill-current">
        <Image 
          src="https://cdn.prod.website-files.com/62b5b85dd560583e288cb389/65eb2289ce65b2ceebcedef6_bubble-page-intercom.png"
          height={120}
          width={120}
          alt="Star"
          className="h-full w-full object-contain"
        />
      </span>
    </div>
  )
}
