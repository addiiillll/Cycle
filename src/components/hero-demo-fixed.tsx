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
  const ballControls = useAnimation()

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  const scrollProgress = useTransform(scrollYProgress, [0, 0.5], [0, 1])

  // Monitor scroll for animation trigger
  useEffect(() => {
    const unsubscribe = scrollProgress.on("change", (latest) => {
      if (latest >= 0.3 && !scrollTriggered && !isAnimating) {
        setScrollTriggered(true)
        triggerSuckAnimation()
      }
    })

    return () => unsubscribe()
  }, [scrollProgress, scrollTriggered, isAnimating])

  const triggerSuckAnimation = async () => {
    await ballControls.start({
      scale: [1, 1.5, 1.2],
      transition: { duration: 0.5 },
    })

    setIconsAttracted(true)
    onSuckAnimation()
  }

  const centerX = typeof window !== "undefined" ? window.innerWidth / 2 : 700
  const centerY = typeof window !== "undefined" ? window.innerHeight / 2 : 400

  const handleIconDrag = (_: any, info: any) => {
    const distance = Math.sqrt((info.point.x - centerX) ** 2 + (info.point.y - centerY) ** 2)
    if (distance < 100 && !isAnimating) {
      triggerSuckAnimation()
    }
  }

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="text-center max-w-4xl mx-auto px-6 z-10">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto text-7xl font-semibold text-gray-900/95 mb-6 tracking-tighter"
        >
          Your feedback hub, on autopilot
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg/6 text-slate-500 mb-8 max-w-2xl mx-auto"
        >
          Cycle is the fastest way for your team to capture product feedback and share customer insights – without the
          busywork.
        </motion.p>

        <motion.div
          animate={ballControls}
          onClick={() => !isAnimating && triggerSuckAnimation()}
          className="cursor-pointer"
        >
          <AnimatedGlassBall />
        </motion.div>
      </div>

      {/* Top left - Blue folder */}
      <motion.div 
        className="absolute top-24 left-16 w-12 h-12 bg-blue-500 rounded-xl shadow-lg flex items-center justify-center cursor-grab active:cursor-grabbing text-white"
        drag={!isAnimating && !iconsAttracted}
        dragMomentum={false}
        onDrag={handleIconDrag}
        whileHover={{ scale: 1.1 }}
        whileDrag={{ scale: 1.2, zIndex: 1000 }}
        animate={
          iconsAttracted
            ? {
                x: centerX - 64 - 24,
                y: centerY - 96 - 24,
                scale: 0.2,
                opacity: 0,
              }
            : {
                y: [0, -5, 0],
              }
        }
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
          duration: iconsAttracted ? 1.5 : 4,
          repeat: iconsAttracted ? 0 : Infinity,
          ease: "easeInOut",
          delay: 0,
        }}
      >
        <FolderOpen className="w-5 h-5" />
      </motion.div>

      {/* Top right - Red chart */}
      <motion.div 
        className="absolute top-24 right-16 w-12 h-12 bg-red-500 rounded-xl shadow-lg flex items-center justify-center cursor-grab active:cursor-grabbing text-white"
        drag={!isAnimating && !iconsAttracted}
        dragMomentum={false}
        onDrag={handleIconDrag}
        whileHover={{ scale: 1.1 }}
        whileDrag={{ scale: 1.2, zIndex: 1000 }}
        animate={
          iconsAttracted
            ? {
                x: centerX - window.innerWidth + 112 - 24,
                y: centerY - 96 - 24,
                scale: 0.2,
                opacity: 0,
              }
            : {
                y: [0, -5, 0],
              }
        }
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
          duration: iconsAttracted ? 1.5 : 4,
          repeat: iconsAttracted ? 0 : Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      >
        <BarChart3 className="w-5 h-5" />
      </motion.div>

      {/* Left side upper - Black N logo */}
      <motion.div 
        className="absolute top-60 left-52 w-12 h-12 bg-gray-800 rounded-xl shadow-lg flex items-center justify-center cursor-grab active:cursor-grabbing text-white"
        drag={!isAnimating && !iconsAttracted}
        dragMomentum={false}
        onDrag={handleIconDrag}
        whileHover={{ scale: 1.1 }}
        whileDrag={{ scale: 1.2, zIndex: 1000 }}
        animate={
          iconsAttracted
            ? {
                x: centerX - 208 - 24,
                y: centerY - 240 - 24,
                scale: 0.2,
                opacity: 0,
              }
            : {
                y: [0, -5, 0],
              }
        }
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
          duration: iconsAttracted ? 1.5 : 4,
          repeat: iconsAttracted ? 0 : Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      >
        <div className="w-5 h-5 bg-black rounded text-white flex items-center justify-center text-xs font-bold">N</div>
      </motion.div>

      {/* Right side upper - Purple star */}
      <motion.div 
        className="absolute top-60 right-52 w-12 h-12 bg-purple-500 rounded-xl shadow-lg flex items-center justify-center cursor-grab active:cursor-grabbing text-white"
        drag={!isAnimating && !iconsAttracted}
        dragMomentum={false}
        onDrag={handleIconDrag}
        whileHover={{ scale: 1.1 }}
        whileDrag={{ scale: 1.2, zIndex: 1000 }}
        animate={
          iconsAttracted
            ? {
                x: centerX - (window.innerWidth - 256) - 24,
                y: centerY - 240 - 24,
                scale: 0.2,
                opacity: 0,
              }
            : {
                y: [0, -5, 0],
              }
        }
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
          duration: iconsAttracted ? 1.5 : 4,
          repeat: iconsAttracted ? 0 : Infinity,
          ease: "easeInOut",
          delay: 1.5,
        }}
      >
        <Star className="w-5 h-5" />
      </motion.div>

      {/* Left side middle - Orange zap */}
      <motion.div 
        className="absolute top-96 left-16 w-12 h-12 bg-orange-500 rounded-xl shadow-lg flex items-center justify-center cursor-grab active:cursor-grabbing text-white"
        drag={!isAnimating && !iconsAttracted}
        dragMomentum={false}
        onDrag={handleIconDrag}
        whileHover={{ scale: 1.1 }}
        whileDrag={{ scale: 1.2, zIndex: 1000 }}
        animate={
          iconsAttracted
            ? {
                x: centerX - 64 - 24,
                y: centerY - 384 - 24,
                scale: 0.2,
                opacity: 0,
              }
            : {
                y: [0, -5, 0],
              }
        }
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
          duration: iconsAttracted ? 1.5 : 4,
          repeat: iconsAttracted ? 0 : Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      >
        <Zap className="w-5 h-5" />
      </motion.div>
    </section>
  )
}
