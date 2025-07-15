"use client"

import { useState, useRef } from "react"
import { Header } from "@/components/header"
// import { HeroSection } from "@/components/hero-section"
import { DashboardSection } from "@/components/dashboard-section"
import { HeroSectionDemo } from "@/components/hero-demo"
import { InfiniteBrand } from "@/components/infinity-brand"
import { SingleTestimonial } from "@/components/single-testimonial"

export default function CycleApp() {
  const [isAnimating, setIsAnimating] = useState(false)
  const [showSectionTwo, setShowSectionTwo] = useState(false)
  const sectionTwoRef = useRef<HTMLDivElement>(null)

  const handleSuckAnimation = async () => {
    setIsAnimating(true)

    setTimeout(() => {
      setShowSectionTwo(true)
      setTimeout(() => {
        sectionTwoRef.current?.scrollIntoView({ behavior: "smooth" })
        // Reset animation state after scrolling to section two
        setTimeout(() => {
          setIsAnimating(false)
          console.log("Animation state reset to false")
        }, 1000)
      }, 500)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      {/* First Section */}
      {/* <HeroSection isAnimating={isAnimating} onSuckAnimation={handleSuckAnimation} /> */}
      <HeroSectionDemo isAnimating={isAnimating} onSuckAnimation={handleSuckAnimation} />

{/* Second Section */}
      {showSectionTwo && (
        <div ref={sectionTwoRef}>
          <DashboardSection />
        </div>
      )}

{/* Third Section */}
      <InfiniteBrand />

      {/* Fourth Section */}
      <SingleTestimonial />
    </div>
  )
}


