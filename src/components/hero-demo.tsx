"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useAnimation, useScroll, useTransform } from "framer-motion"
import { FolderOpen, BarChart3, Zap, FileText, Star } from "lucide-react"
import AnimatedGlassBall from "./animated-ball"

interface HeroSectionProps {
  isAnimating: boolean
  onSuckAnimation: () => void
}

export function HeroSectionDemo({ isAnimating, onSuckAnimation }: HeroSectionProps) {
  const heroRef = useRef<HTMLElement>(null)
  const [scrollTriggered, setScrollTriggered] = useState(false)
  const [iconsAttracted, setIconsAttracted] = useState(false)
  const [scrollSuckProgress, setScrollSuckProgress] = useState(0)
  const [manualTrigger, setManualTrigger] = useState(false) // Track manual triggers (drag/click)
  const ballControls = useAnimation()

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  // Use a wider range for gradual scroll animation
  const scrollProgress = useTransform(scrollYProgress, [0, 0.8], [0, 1])



  // Monitor scroll for gradual sucking animation
  useEffect(() => {
    const unsubscribe = scrollProgress.on("change", (latest) => {
      // Always update scroll progress for visual feedback
      const clampedValue = Math.min(Math.max(latest, 0), 1)
      setScrollSuckProgress(clampedValue)

      // Only handle scroll-based triggers if not manually triggered and not currently animating
      if (!manualTrigger && !isAnimating) {
        // Trigger full suck animation when scroll reaches 100%
        if (clampedValue >= 0.95 && !scrollTriggered) {
          console.log('Triggering suck animation from scroll at progress:', clampedValue)
          setScrollTriggered(true)
          triggerSuckAnimation()
        }
      }

      // Always allow reset when scrolling back up (regardless of manual trigger)
      if (clampedValue < 0.05 && (scrollTriggered || iconsAttracted)) {
        console.log('Resetting animation state - scroll back up to:', clampedValue)
        setScrollTriggered(false)
        setIconsAttracted(false)
        setManualTrigger(false) // Reset manual trigger too
        setScrollSuckProgress(0)
      }
    })

    return () => unsubscribe()
  }, [scrollProgress, scrollTriggered, isAnimating, manualTrigger])

  const triggerSuckAnimation = async () => {
    await ballControls.start({
      scale: [1, 1.5, 1.2],
      transition: { duration: 0.5 },
    })

    setIconsAttracted(true)
    onSuckAnimation()
  }

  const triggerManualSuck = () => {
    console.log('Manual suck triggered')
    setManualTrigger(true)
    setScrollSuckProgress(0) // Reset scroll progress
    triggerSuckAnimation()
  }

  const centerX = typeof window !== "undefined" ? window.innerWidth / 2 : 700
  const centerY = typeof window !== "undefined" ? window.innerHeight / 2 : 400

  const handleIconDrag = (_: any, info: any) => {
    const distance = Math.sqrt((info.point.x - centerX) ** 2 + (info.point.y - centerY) ** 2)
    if (distance < 100 && !isAnimating && !manualTrigger) {
      triggerManualSuck()
    }
  }

  // Helper function to calculate gradual movement towards center based on scroll
  const getScrollBasedAnimation = (targetX: number, targetY: number) => {
    if (iconsAttracted) {
      // Full attraction animation (when dragged, clicked, or scroll completed)
      return {
        x: targetX,
        y: targetY,
        scale: 0.2,
        opacity: 0,
      }
    } else if (scrollSuckProgress > 0.05 && scrollSuckProgress < 0.95) {
      // Gradual movement based on scroll progress (from original position to target)
      const progressX = targetX * scrollSuckProgress
      const progressY = targetY * scrollSuckProgress
      const progressScale = 1 - (0.4 * scrollSuckProgress) // Scale from 1 to 0.6
      const progressOpacity = 1 - (0.2 * scrollSuckProgress) // Opacity from 1 to 0.8

      return {
        x: progressX,
        y: progressY,
        scale: progressScale,
        opacity: progressOpacity,
      }
    } else {
      // Default floating animation - reset to original position
      return {
        x: 0,
        y: -5,
        scale: 1,
        opacity: 1,
      }
    }
  }



  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="text-center max-w-4xl mx-auto px-6 z-50 relative">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto text-7xl font-semibold text-gray-900/95 mb-6 tracking-tighter relative z-50"
        >
          Your feedback hub, on autopilot
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-lg/6 text-slate-500 mb-8 max-w-2xl mx-auto relative z-50"
        >
          Cycle is the fastest way for your team to capture product feedback and share customer insights – without the
          busywork.
        </motion.p>

        <div className="relative z-50">
          <motion.div
            onClick={() => !isAnimating && !manualTrigger && triggerManualSuck()}
            className="cursor-pointer"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <AnimatedGlassBall />
          </motion.div>
        </div>
      </div>

      {/* Top left - Blue folder */}
      <motion.div
        className="absolute top-24 left-16 w-12 h-12 bg-blue-500 rounded-xl shadow-lg flex items-center justify-center cursor-grab active:cursor-grabbing text-white"
        drag={!isAnimating && !iconsAttracted && scrollSuckProgress < 0.1}
        dragMomentum={false}
        onDrag={handleIconDrag}
        whileHover={{ scale: 1.1 }}
        whileDrag={{ scale: 1.2, zIndex: 1000 }}
        animate={getScrollBasedAnimation(centerX - 64 - 24, centerY - 96 - 24)}
        transition={
          iconsAttracted
            ? {
                type: "spring",
                stiffness: 300,
                damping: 30,
                duration: 1.5,
              }
            : scrollSuckProgress > 0 && scrollSuckProgress < 1
            ? {
                type: "spring",
                stiffness: 200,
                damping: 25,
                duration: 0.3,
              }
            : {
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }
        }
      >
        <FolderOpen className="w-5 h-5" />
      </motion.div>

      {/* Top right - Red chart */}
      <motion.div
        className="absolute top-24 right-16 w-12 h-12 bg-red-500 rounded-xl shadow-lg flex items-center justify-center cursor-grab active:cursor-grabbing text-white"
        drag={!isAnimating && !iconsAttracted && scrollSuckProgress < 0.1}
        dragMomentum={false}
        onDrag={handleIconDrag}
        whileHover={{ scale: 1.1 }}
        whileDrag={{ scale: 1.2, zIndex: 1000 }}
        animate={getScrollBasedAnimation(centerX - (typeof window !== "undefined" ? window.innerWidth - 112 : 1200) - 24, centerY - 96 - 24)}
        transition={
          iconsAttracted
            ? {
                type: "spring",
                stiffness: 300,
                damping: 30,
                duration: 1.5,
              }
            : scrollSuckProgress > 0 && scrollSuckProgress < 1
            ? {
                type: "spring",
                stiffness: 200,
                damping: 25,
                duration: 0.3,
              }
            : {
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: 0.2,
              }
        }
      >
        <BarChart3 className="w-5 h-5" />
      </motion.div>

      {/* Left side upper - Black N logo */}
      <motion.div
        className="absolute top-60 left-52 w-12 h-12 bg-gray-800 rounded-xl shadow-lg flex items-center justify-center cursor-grab active:cursor-grabbing text-white"
        drag={!isAnimating && !iconsAttracted && scrollSuckProgress < 0.1}
        dragMomentum={false}
        onDrag={handleIconDrag}
        whileHover={{ scale: 1.1 }}
        whileDrag={{ scale: 1.2, zIndex: 1000 }}
        animate={getScrollBasedAnimation(centerX - 208 - 24, centerY - 240 - 24)}
        transition={
          iconsAttracted
            ? {
                type: "spring",
                stiffness: 300,
                damping: 30,
                duration: 1.5,
              }
            : scrollSuckProgress > 0 && scrollSuckProgress < 1
            ? {
                type: "spring",
                stiffness: 200,
                damping: 25,
                duration: 0.3,
              }
            : {
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: 0.4,
              }
        }
      >
        <div className="w-5 h-5 bg-black rounded text-white flex items-center justify-center text-xs font-bold">N</div>
      </motion.div>

      {/* Right side upper - Purple star */}
      <motion.div
        className="absolute top-60 right-52 w-12 h-12 bg-purple-500 rounded-xl shadow-lg flex items-center justify-center cursor-grab active:cursor-grabbing text-white"
        drag={!isAnimating && !iconsAttracted && scrollSuckProgress < 0.1}
        dragMomentum={false}
        onDrag={handleIconDrag}
        whileHover={{ scale: 1.1 }}
        whileDrag={{ scale: 1.2, zIndex: 1000 }}
        animate={getScrollBasedAnimation(centerX - (typeof window !== "undefined" ? window.innerWidth - 256 : 1000) - 24, centerY - 240 - 24)}
        transition={
          iconsAttracted
            ? {
                type: "spring",
                stiffness: 300,
                damping: 30,
                duration: 1.5,
              }
            : scrollSuckProgress > 0 && scrollSuckProgress < 1
            ? {
                type: "spring",
                stiffness: 200,
                damping: 25,
                duration: 0.3,
              }
            : {
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: 0.6,
              }
        }
      >
        <Star className="w-5 h-5" />
      </motion.div>

      {/* Left side middle - Orange zap */}
      <motion.div
        className="absolute top-96 left-16 w-12 h-12 bg-orange-500 rounded-xl shadow-lg flex items-center justify-center cursor-grab active:cursor-grabbing text-white"
        drag={!isAnimating && !iconsAttracted && scrollSuckProgress < 0.1}
        dragMomentum={false}
        onDrag={handleIconDrag}
        whileHover={{ scale: 1.1 }}
        whileDrag={{ scale: 1.2, zIndex: 1000 }}
        animate={getScrollBasedAnimation(centerX - 64 - 24, centerY - 384 - 24)}
        transition={
          iconsAttracted
            ? {
                type: "spring",
                stiffness: 300,
                damping: 30,
                duration: 1.5,
              }
            : scrollSuckProgress > 0 && scrollSuckProgress < 1
            ? {
                type: "spring",
                stiffness: 200,
                damping: 25,
                duration: 0.3,
              }
            : {
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: 0.8,
              }
        }
      >
        <Zap className="w-5 h-5" />
      </motion.div>

      {/* Right side middle - Blue star */}
      <motion.div
        className="absolute top-96 right-16 w-12 h-12 bg-blue-400 rounded-xl shadow-lg flex items-center justify-center cursor-grab active:cursor-grabbing text-white"
        drag={!isAnimating && !iconsAttracted && scrollSuckProgress < 0.1}
        dragMomentum={false}
        onDrag={handleIconDrag}
        whileHover={{ scale: 1.1 }}
        whileDrag={{ scale: 1.2, zIndex: 1000 }}
        animate={getScrollBasedAnimation(centerX - (typeof window !== "undefined" ? window.innerWidth - 112 : 1200) - 24, centerY - 384 - 24)}
        transition={
          iconsAttracted
            ? {
                type: "spring",
                stiffness: 300,
                damping: 30,
                duration: 1.5,
              }
            : scrollSuckProgress > 0 && scrollSuckProgress < 1
            ? {
                type: "spring",
                stiffness: 200,
                damping: 25,
                duration: 0.3,
              }
            : {
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: 1.0,
              }
        }
      >
        <Star className="w-5 h-5" />
      </motion.div>

      {/* Bottom left - Blue folder */}
      <motion.div
        className="absolute bottom-32 left-52 w-12 h-12 bg-blue-500 rounded-xl shadow-lg flex items-center justify-center cursor-grab active:cursor-grabbing text-white"
        drag={!isAnimating && !iconsAttracted && scrollSuckProgress < 0.1}
        dragMomentum={false}
        onDrag={handleIconDrag}
        whileHover={{ scale: 1.1 }}
        whileDrag={{ scale: 1.2, zIndex: 1000 }}
        animate={getScrollBasedAnimation(centerX - 208 - 24, centerY - (typeof window !== "undefined" ? window.innerHeight - 176 : 600) - 24)}
        transition={
          iconsAttracted
            ? {
                type: "spring",
                stiffness: 300,
                damping: 30,
                duration: 1.5,
              }
            : scrollSuckProgress > 0 && scrollSuckProgress < 1
            ? {
                type: "spring",
                stiffness: 200,
                damping: 25,
                duration: 0.3,
              }
            : {
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: 1.2,
              }
        }
      >
        <FolderOpen className="w-5 h-5" />
      </motion.div>

      {/* Bottom center left - Colorful Google element */}
      <motion.div
        className="absolute bottom-32 right-52 w-12 h-12 bg-white border-2 border-gray-200 rounded-xl shadow-lg flex items-center justify-center cursor-grab active:cursor-grabbing"
        drag={!isAnimating && !iconsAttracted && scrollSuckProgress < 0.1}
        dragMomentum={false}
        onDrag={handleIconDrag}
        whileHover={{ scale: 1.1 }}
        whileDrag={{ scale: 1.2, zIndex: 1000 }}
        animate={getScrollBasedAnimation(centerX - (typeof window !== "undefined" ? window.innerWidth - 256 : 1000) - 24, centerY - (typeof window !== "undefined" ? window.innerHeight - 176 : 600) - 24)}
        transition={
          iconsAttracted
            ? {
                type: "spring",
                stiffness: 300,
                damping: 30,
                duration: 1.5,
              }
            : scrollSuckProgress > 0 && scrollSuckProgress < 1
            ? {
                type: "spring",
                stiffness: 200,
                damping: 25,
                duration: 0.3,
              }
            : {
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: 1.4,
              }
        }
      >
        <div className="w-5 h-5 flex items-center justify-center">
          <div className="w-3 h-3 bg-gradient-to-r from-blue-500 via-green-500 to-red-500 rounded-full"></div>
        </div>
      </motion.div>

      {/* Bottom center - Audio wave */}
      <motion.div
        className="absolute bottom-8 left-[80vh] w-12 h-12 bg-gray-100 border border-gray-300 rounded-xl shadow-lg flex items-center justify-center cursor-grab active:cursor-grabbing"
        drag={!isAnimating && !iconsAttracted && scrollSuckProgress < 0.1}
        dragMomentum={false}
        onDrag={handleIconDrag}
        whileHover={{ scale: 1.1 }}
        whileDrag={{ scale: 1.2, zIndex: 1000 }}
        animate={getScrollBasedAnimation(centerX - 500 - 24, centerY - (typeof window !== "undefined" ? window.innerHeight - 80 : 700) - 24)}
        transition={
          iconsAttracted
            ? {
                type: "spring",
                stiffness: 300,
                damping: 30,
                duration: 1.5,
              }
            : scrollSuckProgress > 0 && scrollSuckProgress < 1
            ? {
                type: "spring",
                stiffness: 200,
                damping: 25,
                duration: 0.3,
              }
            : {
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: 1.6,
              }
        }
      >
        <div className="w-5 h-5 flex items-center justify-center space-x-0.5">
          <div className="w-0.5 h-2 bg-blue-500 rounded"></div>
          <div className="w-0.5 h-3 bg-blue-500 rounded"></div>
          <div className="w-0.5 h-1 bg-blue-500 rounded"></div>
          <div className="w-0.5 h-4 bg-blue-500 rounded"></div>
        </div>
      </motion.div>

      {/* Bottom right - Blue document */}
      <motion.div
        className="absolute bottom-8 right-[80vh] w-12 h-12 bg-blue-500 rounded-xl shadow-lg flex items-center justify-center cursor-grab active:cursor-grabbing text-white"
        drag={!isAnimating && !iconsAttracted && scrollSuckProgress < 0.1}
        dragMomentum={false}
        onDrag={handleIconDrag}
        whileHover={{ scale: 1.1 }}
        whileDrag={{ scale: 1.2, zIndex: 1000 }}
        animate={getScrollBasedAnimation(centerX - 800 - 24, centerY - (typeof window !== "undefined" ? window.innerHeight - 80 : 700) - 24)}
        transition={
          iconsAttracted
            ? {
                type: "spring",
                stiffness: 300,
                damping: 30,
                duration: 1.5,
              }
            : scrollSuckProgress > 0 && scrollSuckProgress < 1
            ? {
                type: "spring",
                stiffness: 200,
                damping: 25,
                duration: 0.3,
              }
            : {
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: 1.8,
              }
        }
      >
        <FileText className="w-5 h-5" />
      </motion.div>
    </section>
  )
}
