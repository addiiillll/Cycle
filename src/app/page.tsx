"use client"

import { useState, useRef } from "react"
import { Header } from "@/components/header"
// import { HeroSection } from "@/components/hero-section"
import { DashboardSection } from "@/components/dashboard-section"
import { HeroSectionDemo } from "@/components/hero-demo"

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
      }, 500)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* <HeroSection isAnimating={isAnimating} onSuckAnimation={handleSuckAnimation} /> */}
      <HeroSectionDemo isAnimating={isAnimating} onSuckAnimation={handleSuckAnimation} />

      {showSectionTwo && (
        <div ref={sectionTwoRef}>
          <DashboardSection />
        </div>
      )}
    </div>
  )
}


