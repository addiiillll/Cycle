"use client"

import { useState, useRef, useEffect } from "react"
import { Header } from "@/components/header"
// import { HeroSection } from "@/components/hero-section"
import { DashboardSection } from "@/components/dashboard-section"
import { HeroSectionDemo } from "@/components/hero-demo"
import { InfiniteBrand } from "@/components/infinity-brand"
import { SingleTestimonial } from "@/components/single-testimonial"

export default function CycleApp() {
  const [isAnimating, setIsAnimating] = useState(false)
  const [showSectionTwo, setShowSectionTwo] = useState(false)
  const [showLoadingScreen, setShowLoadingScreen] = useState(false)
  const [animationCompleted, setAnimationCompleted] = useState(false)
  const sectionTwoRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)

  const handleSuckAnimation = async () => {
    // Start the animation sequence
    setIsAnimating(true)
    setAnimationCompleted(false)

    // First show the sucking animation for 1 second
    setTimeout(() => {
      // Then show the loading screen
      setShowLoadingScreen(true)

      // After 1.5 more seconds, show section two and scroll to it
      setTimeout(() => {
        setShowSectionTwo(true)
        setShowLoadingScreen(false)

        // Scroll to section two
        setTimeout(() => {
          sectionTwoRef.current?.scrollIntoView({ behavior: "smooth" })

          // Mark animation as completed and reset animation state
          setTimeout(() => {
            setIsAnimating(false)
            setAnimationCompleted(true)
            console.log("Animation completed and state reset")
          }, 800)
        }, 100)
      }, 1500)
    }, 1000)
  }

  // Listen for scroll events to handle section cycling
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY

      // If user scrolls back up to the top, reset everything for the next cycle
      // Only reset if we're not currently animating to avoid conflicts
      if (scrollY < 100 && (showSectionTwo || animationCompleted) && !isAnimating && !showLoadingScreen) {
        console.log("User scrolled back to top - resetting for next cycle")
        setShowSectionTwo(false)
        setAnimationCompleted(false)
        setShowLoadingScreen(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [showSectionTwo, animationCompleted, showLoadingScreen, isAnimating])

  return (
    <div className="bg-white relative">
      <Header />

      {/* Fixed Hero Section - Always visible */}
      <div ref={heroRef} className="relative">
        <HeroSectionDemo
          isAnimating={isAnimating}
          isLoading={showLoadingScreen}
          onSuckAnimation={handleSuckAnimation}
        />
      </div>

      {/* Spacer to allow scrolling */}
      <div className="h-screen"></div>

      {/* Content container for all sections after hero - Always present for scrolling */}
      <div className={`relative bg-white transition-all duration-500 ${
        showSectionTwo ? 'z-30 opacity-100' : 'z-0 opacity-0'
      }`}>
        {/* Second Section - Always in DOM but hidden until animation completes */}
        <div ref={sectionTwoRef} className="relative bg-white">
          <DashboardSection />
        </div>

        {/* Third Section - Always in DOM but hidden until animation completes */}
        <div className="relative bg-white">
          <InfiniteBrand />
        </div>

        {/* Fourth Section - Always in DOM but hidden until animation completes */}
        <div className="relative bg-white">
          <SingleTestimonial />
        </div>
      </div>
    </div>
  )
}


