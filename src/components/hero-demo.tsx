"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useAnimation, useScroll, useTransform } from "framer-motion"
import { FolderOpen, BarChart3, Zap, FileText, Star } from "lucide-react"
import AnimatedGlassBall from "./animated-ball"

interface HeroSectionProps {
  isAnimating: boolean
  isLoading: boolean
  onSuckAnimation: () => void
}

export function HeroSectionDemo({ isAnimating, isLoading, onSuckAnimation }: HeroSectionProps) {
  const heroRef = useRef<HTMLElement>(null)
  const [scrollTriggered, setScrollTriggered] = useState(false)
  const [iconsAttracted, setIconsAttracted] = useState(false)
  const [scrollSuckProgress, setScrollSuckProgress] = useState(0)
  const [manualTrigger, setManualTrigger] = useState(false) // Track manual triggers (drag/click)
  const [animationCompleted, setAnimationCompleted] = useState(false) // Track if any animation has completed
  const [windowHeight, setWindowHeight] = useState(800) // Default fallback
  const [windowWidth, setWindowWidth] = useState(1400) // Default fallback

  const ballControls = useAnimation()

  // Set window dimensions on client side only
  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowHeight(window.innerHeight)
      setWindowWidth(window.innerWidth)

      const handleResize = () => {
        setWindowHeight(window.innerHeight)
        setWindowWidth(window.innerWidth)
      }
      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Use window scroll instead of section scroll since hero is fixed
  const { scrollY } = useScroll()
  // Adjust the scroll range to trigger at 70% of viewport height
  const scrollProgress = useTransform(scrollY, [0, windowHeight * 0.7], [0, 1])



  // Monitor scroll for gradual sucking animation
  useEffect(() => {
    const unsubscribe = scrollProgress.on("change", (latest) => {
      const clampedValue = Math.min(Math.max(latest, 0), 1)

      // Only update scroll progress if no animation has been triggered yet
      if (!manualTrigger && !scrollTriggered && !iconsAttracted && !animationCompleted) {
        setScrollSuckProgress(clampedValue)
      }

      // Only handle scroll-based triggers if not manually triggered and not currently animating
      if (!manualTrigger && !isAnimating && !isLoading && !scrollTriggered && !animationCompleted) {
        // Trigger full suck animation when scroll reaches 95% (mapped to 1.0 in our transform)
        if (clampedValue >= 0.95) {
          console.log('Triggering suck animation from scroll at progress:', clampedValue)
          setScrollTriggered(true)
          setAnimationCompleted(true)
          // Set manual trigger to prevent conflicts and trigger the full animation sequence
          setManualTrigger(true)
          triggerSuckAnimation()
        }
      }

      // Allow reset when scrolling back up, but only if not currently animating or loading
      if (clampedValue < 0.05 && (scrollTriggered || iconsAttracted || manualTrigger || animationCompleted) && !isAnimating && !isLoading) {
        console.log('Resetting animation state - scroll back up to:', clampedValue)
        resetAnimationState()
      }
    })

    return () => unsubscribe()
  }, [scrollProgress, scrollTriggered, isAnimating, manualTrigger, iconsAttracted, animationCompleted])

  // Reset all animation states and positions
  const resetAnimationState = () => {
    console.log('Resetting all animation states to original')

    // Reset all state variables to initial values
    setScrollTriggered(false)
    setIconsAttracted(false)
    setManualTrigger(false)
    setAnimationCompleted(false)

    // Important: Set scroll progress to 0 to prevent any partial animations
    setScrollSuckProgress(0)

    // Reset ball animation if needed
    ballControls.set({ scale: 1 })
  }

  const triggerSuckAnimation = async () => {
    await ballControls.start({
      scale: [1, 1.5, 1.2],
      transition: { duration: 0.5 },
    })

    setIconsAttracted(true)
    // Call the parent callback to handle loading state and section transition
    onSuckAnimation()
  }

  const triggerManualSuck = () => {
    console.log('Manual suck triggered')
    setManualTrigger(true)
    setAnimationCompleted(true)
    setScrollSuckProgress(0) // Reset scroll progress
    triggerSuckAnimation()
  }

  // Calculate center coordinates from window dimensions
  const centerX = windowWidth / 2
  const centerY = windowHeight / 2

  // Create drag handlers for each element
  const createDragHandlers = (elementId: string) => ({
    onDragStart: () => {
      console.log(`Started dragging element: ${elementId}`)
    },

    onDrag: (_: any, info: any) => {
      // Check if we're close enough to the ball for visual feedback
      const distance = Math.sqrt((info.point.x - centerX) ** 2 + (info.point.y - centerY) ** 2)
      if (distance < 100 && !isAnimating && !manualTrigger && !isLoading) {
        // Visual feedback could be added here if desired
      }
    },

    onDragEnd: (_: any, info: any) => {
      const distance = Math.sqrt((info.point.x - centerX) ** 2 + (info.point.y - centerY) ** 2)

      if (distance < 100 && !isAnimating && !manualTrigger && !isLoading) {
        // Close enough to the ball - trigger suck animation
        triggerManualSuck()
      }
      // If not close enough, the element will snap back due to dragMomentum={false}
      // and the animate prop will handle the return to original position
    }
  })

  // Helper function to calculate gradual movement towards center based on scroll
  const getScrollBasedAnimation = (_elementId: string, targetX: number, targetY: number) => {
    if (iconsAttracted) {
      // Full attraction animation (when dragged, clicked, or scroll completed)
      return {
        x: targetX,
        y: targetY,
        scale: 0.2,
        opacity: 0,
      }
    } else if (scrollSuckProgress > 0.05 && scrollSuckProgress < 0.95 && !animationCompleted) {
      // Only apply gradual movement if no animation has been completed yet
      // This prevents the dancing effect when scrolling back up after animation
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
      // Default state - clean original position
      return {
        x: 0,
        y: 0,
        scale: 1,
        opacity: 1,
      }
    }
  }



  return (
    <section ref={heroRef} className="fixed inset-0 h-screen flex items-center justify-center overflow-hidden z-20">
      <div className="text-center max-w-4xl mx-auto px-6 z-50 relative">
        <h1
          className="max-w-2xl mx-auto text-7xl font-semibold text-gray-900/95 mb-6 tracking-tighter relative z-50"
        >
          Your feedback hub, on autopilot
        </h1>

        <p
          className="text-lg/6 text-slate-500 mb-8 max-w-2xl mx-auto relative z-50"
        >
          Cycle is the fastest way for your team to capture product feedback and share customer insights – without the
          busywork.
        </p>

        <div className="relative z-50">
          <div
            onClick={() => !isAnimating && !manualTrigger && triggerManualSuck()}
            className="cursor-pointer"
            
          >
            <AnimatedGlassBall isLoading={isLoading} />
          </div>
        </div>
      </div>

      {/* Top left - Blue folder */}
      <motion.div
        className="absolute top-24 left-16 group w-12 h-12 bg-blue-500 rounded-xl shadow-lg flex items-center justify-center cursor-grab active:cursor-grabbing text-white"
        drag={!isAnimating && !iconsAttracted && !animationCompleted}
        dragMomentum={false}
        dragElastic={0}
        dragTransition={{
          bounceStiffness: 600,
          bounceDamping: 20,
          power: 0
        }}
        {...createDragHandlers("blue-folder-top-left")}
        whileHover={{ scale: 1.1 }}
        whileDrag={{ scale: 1.2, zIndex: 1000 }}
        animate={
          iconsAttracted || (scrollSuckProgress > 0.05 && !animationCompleted)
            ? getScrollBasedAnimation("blue-folder-top-left", centerX - 64 - 24, centerY - 96 - 24)
            : {
              x: 0,
              y: -5,
              scale: 1,
              opacity: 1,
            }
        }
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
        {/* Drag me badge - appears on hover */}
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-blue-300/50 text-black text-xs px-2 py-1 rounded-full whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 border border-blue-400">
          Drag me
        </div>

        {/* Preview image with dotted border - appears on hover */}
        <div className="absolute -bottom-36 -left-16 w-48 h-32 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg border-2 border-dashed border-blue-400 p-4 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 shadow-lg">
          <div className="w-full h-full bg-white rounded border flex items-center justify-center">
            <div className="text-center">
              <FolderOpen className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <p className="text-xs text-gray-600">File Management</p>
            </div>
          </div>
        </div>

        {/* Original icon */}
        <FolderOpen className="w-5 h-5" />
      </motion.div>

      {/* Top right - Red chart */}
      <motion.div
        className="absolute top-24 right-16 group w-12 h-12 bg-red-500 rounded-xl shadow-lg flex items-center justify-center cursor-grab active:cursor-grabbing text-white"
        drag={!isAnimating && !iconsAttracted && !animationCompleted}
        dragMomentum={false}
        dragElastic={0.1}
        dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
        {...createDragHandlers("red-chart-top-right")}
        whileHover={{ scale: 1.1 }}
        whileDrag={{ scale: 1.2, zIndex: 1000 }}
        animate={
          iconsAttracted || (scrollSuckProgress > 0.05 && !animationCompleted)
            ? getScrollBasedAnimation("red-chart-top-right", centerX - (windowWidth - 112) - 24, centerY - 96 - 24)
            : {
              y: -5,
              scale: 1,
              opacity: 1,
            }
        }
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
        {/* Drag me badge - appears on hover */}
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-blue-300/50 text-black text-xs px-2 py-1 rounded-full whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 border border-blue-400">
          Drag me
        </div>
        {/* Preview image with dotted border - appears on hover */}
        <div className="absolute -bottom-36 -right-16 w-48 h-32 bg-gradient-to-br from-red-100 to-red-200 rounded-lg border-2 border-dashed border-red-400 p-4 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 shadow-lg">
          <div className="w-full h-full bg-white rounded border flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="w-8 h-8 text-red-500 mx-auto mb-2" />
              <p className="text-xs text-gray-600">Analytics Dashboard</p>
            </div>
          </div>
        </div>

        {/* Original icon */}
        <BarChart3 className="w-5 h-5" />
      </motion.div>

      {/* Left side upper - Black N logo */}
      <motion.div
        className="absolute top-60 left-52 w-12 h-12 bg-gray-800 rounded-xl shadow-lg flex items-center justify-center cursor-grab active:cursor-grabbing text-white"
        drag={!isAnimating && !iconsAttracted && !animationCompleted}
        dragMomentum={false}
        dragElastic={0.1}
        dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
        {...createDragHandlers("black-n-left-upper")}
        whileHover={{ scale: 1.1 }}
        whileDrag={{ scale: 1.2, zIndex: 1000 }}
        animate={
          iconsAttracted || (scrollSuckProgress > 0.05 && !animationCompleted)
            ? getScrollBasedAnimation("black-n-left-upper", centerX - 208 - 24, centerY - 240 - 24)
            : {
              y: -5,
              scale: 1,
              opacity: 1,
            }
        }
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
        className="absolute top-60 right-52 group w-12 h-12 bg-purple-500 rounded-xl shadow-lg flex items-center justify-center cursor-grab active:cursor-grabbing text-white"
        drag={!isAnimating && !iconsAttracted && !animationCompleted}
        dragMomentum={false}
        dragElastic={0.1}
        dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
        {...createDragHandlers("purple-star-right-upper")}
        whileHover={{ scale: 1.1 }}
        whileDrag={{ scale: 1.2, zIndex: 1000 }}
        animate={
          iconsAttracted || (scrollSuckProgress > 0.05 && !animationCompleted)
            ? getScrollBasedAnimation("purple-star-right-upper", centerX - (windowWidth - 256) - 24, centerY - 240 - 24)
            : {
              y: -5,
              scale: 1,
              opacity: 1,
            }
        }
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
        {/* Drag me badge - appears on hover */}
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-blue-300/50 text-black text-xs px-2 py-1 rounded-full whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 border border-blue-400">
          Drag me
        </div>

        {/* Preview image with dotted border - appears on hover */}
        <div className="absolute -bottom-36 -right-16 w-48 h-32 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg border-2 border-dashed border-purple-400 p-4 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 shadow-lg">
          <div className="w-full h-full bg-white rounded border flex items-center justify-center">
            <div className="text-center">
              <Star className="w-8 h-8 text-purple-500 mx-auto mb-2" />
              <p className="text-xs text-gray-600">Favorites & Reviews</p>
            </div>
          </div>
        </div>

        {/* Original icon */}
        <Star className="w-5 h-5" />
      </motion.div>

      {/* Left side middle - Orange zap */}
      <motion.div
        className="absolute top-96 left-16 w-12 h-12 bg-orange-500 rounded-xl shadow-lg flex items-center justify-center cursor-grab active:cursor-grabbing text-white"
        drag={!isAnimating && !iconsAttracted && !animationCompleted}
        dragMomentum={false}
        dragElastic={0.1}
        dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
        {...createDragHandlers("orange-zap-left-middle")}
        whileHover={{ scale: 1.1 }}
        whileDrag={{ scale: 1.2, zIndex: 1000 }}
        animate={
          iconsAttracted || (scrollSuckProgress > 0.05 && !animationCompleted)
            ? getScrollBasedAnimation("orange-zap-left-middle", centerX - 64 - 24, centerY - 384 - 24)
            : {
              y: -5,
              scale: 1,
              opacity: 1,
            }
        }
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
        {/* Drag me badge - appears on hover */}
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-blue-300/50 text-black text-xs px-2 py-1 rounded-full whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 border border-blue-400">
          Drag me
        </div>

        {/* Preview image with dotted border - appears on hover */}
        <div className="absolute -top-32 -left-16 w-48 h-32 bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg border-2 border-dashed border-orange-400 p-4 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 shadow-lg">
          <div className="w-full h-full bg-white rounded border flex items-center justify-center">
            <div className="text-center">
              <Zap className="w-8 h-8 text-orange-500 mx-auto mb-2" />
              <p className="text-xs text-gray-600">Quick Actions</p>
            </div>
          </div>
        </div>

        {/* Original icon */}
        <Zap className="w-5 h-5" />
      </motion.div>

      {/* Right side middle - Blue star */}
      <motion.div
        className="absolute top-96 right-16 w-12 h-12 bg-blue-400 rounded-xl shadow-lg flex items-center justify-center cursor-grab active:cursor-grabbing text-white"
        drag={!isAnimating && !iconsAttracted && !animationCompleted}
        dragMomentum={false}
        dragElastic={0.1}
        dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
        {...createDragHandlers("blue-star-right-middle")}
        whileHover={{ scale: 1.1 }}
        whileDrag={{ scale: 1.2, zIndex: 1000 }}
        animate={
          iconsAttracted || (scrollSuckProgress > 0.05 && !animationCompleted)
            ? getScrollBasedAnimation("blue-star-right-middle", centerX - (windowWidth - 112) - 24, centerY - 384 - 24)
            : {
              y: -5,
              scale: 1,
              opacity: 1,
            }
        }
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
        drag={!isAnimating && !iconsAttracted && !animationCompleted}
        dragMomentum={false}
        dragElastic={0.1}
        dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
        {...createDragHandlers("blue-folder-bottom-left")}
        whileHover={{ scale: 1.1 }}
        whileDrag={{ scale: 1.2, zIndex: 1000 }}
        animate={
          iconsAttracted || (scrollSuckProgress > 0.05 && !animationCompleted)
            ? getScrollBasedAnimation("blue-folder-bottom-left", centerX - 208 - 24, centerY - (windowHeight - 176) - 24)
            : {
              y: -5,
              scale: 1,
              opacity: 1,
            }
        }
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
        drag={!isAnimating && !iconsAttracted && !animationCompleted}
        dragMomentum={false}
        dragElastic={0.1}
        dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
        {...createDragHandlers("google-bottom-right")}
        whileHover={{ scale: 1.1 }}
        whileDrag={{ scale: 1.2, zIndex: 1000 }}
        animate={
          iconsAttracted || (scrollSuckProgress > 0.05 && !animationCompleted)
            ? getScrollBasedAnimation("google-bottom-right", centerX - (windowWidth - 256) - 24, centerY - (windowHeight - 176) - 24)
            : {
              y: -5,
              scale: 1,
              opacity: 1,
            }
        }
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
        drag={!isAnimating && !iconsAttracted && !animationCompleted}
        dragMomentum={false}
        dragElastic={0.1}
        dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
        {...createDragHandlers("audio-wave-bottom-center")}
        whileHover={{ scale: 1.1 }}
        whileDrag={{ scale: 1.2, zIndex: 1000 }}
        animate={
          iconsAttracted || (scrollSuckProgress > 0.05 && !animationCompleted)
            ? getScrollBasedAnimation("audio-wave-bottom-center", centerX - 500 - 24, centerY - (windowHeight - 80) - 24)
            : {
              y: -5,
              scale: 1,
              opacity: 1,
            }
        }
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
        drag={!isAnimating && !iconsAttracted && !animationCompleted}
        dragMomentum={false}
        dragElastic={0.1}
        dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
        {...createDragHandlers("blue-document-bottom-right")}
        whileHover={{ scale: 1.1 }}
        whileDrag={{ scale: 1.2, zIndex: 1000 }}
        animate={
          iconsAttracted || (scrollSuckProgress > 0.05 && !animationCompleted)
            ? getScrollBasedAnimation("blue-document-bottom-right", centerX - 800 - 24, centerY - (windowHeight - 80) - 24)
            : {
              y: -5,
              scale: 1,
              opacity: 1,
            }
        }
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
