"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, useAnimation, useMotionValue } from "framer-motion"
import { FolderOpen, BarChart3, Zap } from "lucide-react"

interface FloatingIcon {
  id: string
  icon: React.ReactNode
  initialX: number
  initialY: number
  color: string
  isAttracted: boolean
}

interface HeroSectionProps {
  isAnimating: boolean
  onSuckAnimation: () => void
}

export function HeroSection({ isAnimating, onSuckAnimation }: HeroSectionProps) {
  const [heroIcons, setHeroIcons] = useState<FloatingIcon[]>([
    {
      id: "folder-1",
      icon: <FolderOpen className="w-5 h-5" />,
      initialX: 120,
      initialY: 80,
      color: "bg-blue-500",
      isAttracted: false,
    },
    {
      id: "chart-1",
      icon: <BarChart3 className="w-5 h-5" />,
      initialX: 1300,
      initialY: 150,
      color: "bg-red-500",
      isAttracted: false,
    },
    {
      id: "n-logo",
      icon: (
        <div className="w-5 h-5 bg-black rounded text-white flex items-center justify-center text-xs font-bold">N</div>
      ),
      initialX: 80,
      initialY: 350,
      color: "bg-gray-800",
      isAttracted: false,
    },
    {
      id: "zap-1",
      icon: <Zap className="w-5 h-5" />,
      initialX: 1250,
      initialY: 350,
      color: "bg-purple-500",
      isAttracted: false,
    },
    {
      id: "folder-2",
      icon: <FolderOpen className="w-5 h-5" />,
      initialX: 130,
      initialY: 650,
      color: "bg-blue-500",
      isAttracted: false,
    },
    {
      id: "chart-2",
      icon: <BarChart3 className="w-5 h-5" />,
      initialX: 500,
      initialY: 700,
      color: "bg-blue-400",
      isAttracted: false,
    },
    {
      id: "folder-3",
      icon: <FolderOpen className="w-5 h-5" />,
      initialX: 1350,
      initialY: 680,
      color: "bg-blue-500",
      isAttracted: false,
    },
    {
      id: "zap-2",
      icon: <Zap className="w-5 h-5" />,
      initialX: 1280,
      initialY: 520,
      color: "bg-blue-400",
      isAttracted: false,
    },
  ])

  const orbControls = useAnimation()
  const centerX = typeof window !== "undefined" ? window.innerWidth / 2 : 700
  const centerY = 450
  const attractionRadius = 100

  const handleIconDrag = (iconId: string, x: number, y: number) => {
    const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2)

    if (distance < attractionRadius && !isAnimating) {
      triggerSuckAnimation()
    }
  }

  const triggerSuckAnimation = async () => {
    await orbControls.start({
      scale: [1, 1.5, 1.2],
      transition: { duration: 0.5 },
    })

    setHeroIcons((prev) => prev.map((icon) => ({ ...icon, isAttracted: true })))
    onSuckAnimation()
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20">
      <div className="text-center max-w-4xl mx-auto px-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-7xl font-bold text-gray-900 mb-6 leading-tight"
        >
          Your feedback hub,
          <br />
          on autopilot
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-gray-600 mb-16 max-w-2xl mx-auto"
        >
          Cycle is the fastest way for your team to capture product feedback and share customer insights – without the
          busywork.
        </motion.p>

        <motion.div animate={orbControls} className="relative mx-auto mb-6" style={{ width: 120, height: 120 }}>
          <div
            className="w-full h-full rounded-full shadow-2xl"
            style={{
              background: "linear-gradient(135deg, #60a5fa 0%, #a855f7 50%, #3b82f6 100%)",
              filter: "blur(0.5px)",
            }}
          />
        </motion.div>

        <p className="text-lg text-gray-700 font-medium">Drop anything to capture feedback</p>
      </div>

      {heroIcons.map((icon) => (
        <FloatingIconComponent
          key={icon.id}
          icon={icon}
          onDrag={handleIconDrag}
          centerX={centerX}
          centerY={centerY}
          isAnimating={isAnimating}
        />
      ))}
    </section>
  )
}

function FloatingIconComponent({
  icon,
  onDrag,
  centerX,
  centerY,
  isAnimating,
}: {
  icon: FloatingIcon
  onDrag: (iconId: string, x: number, y: number) => void
  centerX: number
  centerY: number
  isAnimating: boolean
}) {
  const x = useMotionValue(icon.initialX)
  const y = useMotionValue(icon.initialY)

  useEffect(() => {
    if (icon.isAttracted) {
      x.set(centerX - 20)
      y.set(centerY - 20)
    }
  }, [icon.isAttracted, centerX, centerY, x, y])

  return (
    <motion.div
      drag={!isAnimating && !icon.isAttracted}
      dragMomentum={false}
      style={{ x, y }}
      onDrag={(_, info) => {
        onDrag(icon.id, info.point.x, info.point.y)
      }}
      whileHover={{ scale: 1.1 }}
      whileDrag={{ scale: 1.2, zIndex: 1000 }}
      className={`absolute w-12 h-12 ${icon.color} rounded-xl shadow-lg flex items-center justify-center cursor-grab active:cursor-grabbing text-white`}
      animate={
        icon.isAttracted
          ? {
              x: centerX - 24,
              y: centerY - 24,
              scale: 0.2,
              opacity: 0,
            }
          : {}
      }
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
        duration: 1,
      }}
    >
      {icon.icon}
    </motion.div>
  )
}
