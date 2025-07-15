"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FolderOpen, BarChart3, Zap, VideoIcon, Sparkles } from "lucide-react"
import { Button } from "./ui/button"
import Image from "next/image"

interface DashboardSectionProps {
  isVisible?: boolean
}

export function DashboardSection({ isVisible = false }: DashboardSectionProps) {
  // Calculate the center position where the ball would be (roughly center of left panel)
  const centerX = 0 // Relative to the element's container
  const centerY = 0 // Relative to the element's container

  // State for selected element
  const [selectedElement, setSelectedElement] = useState(0)

  // Content data for different selections
  const contentData = [
    {
      title: "File Management System",
      description: "Organize and manage your project files efficiently",
      image: "/video-call.jpg",
      color: "blue"
    },
    {
      title: "Analytics Dashboard",
      description: "Track performance metrics and user engagement",
      image: "/pdf-doc.svg",
      color: "red"
    },
    {
      title: "Notion Integration",
      description: "Seamlessly connect with your Notion workspace",
      image: "/feedback.svg",
      color: "gray"
    },
    {
      title: "Quick Actions Hub",
      description: "Access frequently used tools and shortcuts",
      image: "/interview.svg",
      color: "purple"
    },
    {
      title: "Automation Tools",
      description: "Streamline workflows with smart automation",
      image: "/placeholder.svg?height=192&width=320&text=Automation",
      color: "purple"
    },
    {
      title: "Reporting Suite",
      description: "Generate comprehensive reports and insights",
      image: "/placeholder.svg?height=192&width=320&text=Reports",
      color: "orange"
    },
    {
      title: "Task Management",
      description: "Organize tasks and track project progress",
      image: "/placeholder.svg?height=192&width=320&text=Tasks",
      color: "blue"
    },
    {
      title: "Document Storage",
      description: "Secure cloud storage for all your documents",
      image: "/placeholder.svg?height=192&width=320&text=Storage",
      color: "blue"
    },
    {
      title: "Google Integration",
      description: "Connect with Google Workspace tools",
      image: "/placeholder.svg?height=192&width=320&text=Google",
      color: "green"
    },
    {
      title: "Data Visualization",
      description: "Create stunning charts and visual reports",
      image: "/placeholder.svg?height=192&width=320&text=Charts",
      color: "blue"
    },
    {
      title: "Project Files",
      description: "Centralized file management for projects",
      image: "/placeholder.svg?height=192&width=320&text=Projects",
      color: "blue"
    },
    {
      title: "Tally Integration",
      description: "Form builder and data collection tools",
      image: "/placeholder.svg?height=192&width=320&text=Tally",
      color: "gray"
    }
  ]
  return (
    <div className="flex flex-col items-center justify-center min-h-screen mb-12 px-4 sm:px-6 lg:px-8">
      <section className="flex flex-col lg:flex-row max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 flex-1 gap-6 lg:gap-8">
        {/* Left Panel - Clean Grid Layout */}
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center relative p-4 sm:p-6 border border-dashed border-blue-300/60 rounded-xl">
          {/* Interactive Content Display */}
          <motion.div
            initial={{
              opacity: 0,
              x: centerX,
              y: centerY + 100, // Start from center (ball position), move up to final position
              scale: 0.2
            }}
            animate={isVisible ? {
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1
            } : {
              opacity: 0,
              x: centerX,
              y: centerY + 100,
              scale: 0.2
            }}
            transition={{
              delay: isVisible ? 0.8 : 0,
              duration: 0.8,
              type: "spring",
              stiffness: 100,
              damping: 15
            }}
            className="mb-8 sm:mb-12"
          >
            <div className="w-full max-w-xs sm:max-w-sm md:w-80 h-36 sm:h-40 md:h-48 bg-gray-800 rounded-lg overflow-hidden shadow-lg relative mx-auto">
              <motion.img
                key={selectedElement} // Re-animate when selection changes
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                src={contentData[selectedElement].image}
                alt={contentData[selectedElement].title}
                className="w-full h-full object-cover"
              />

            </div>
          </motion.div>

          {/* Icons Grid - Responsive Layout */}
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-8 sm:mb-12 max-w-xs sm:max-w-sm md:max-w-md mx-auto">
            {[
              { icon: <Image src={"https://cdn.prod.website-files.com/62b5b85dd560583e288cb389/65ee24d0e6e8f19d66230c49_bulle-video-min.svg"} height={32} width={32} alt="Video" className="w-96 h-96" />, color: "", delay: 1.2 },
              { icon: <BarChart3 className="w-6 h-6" />, color: "bg-red-500", delay: 1.3 },
              {
                icon: (
                  <div className="w-6 h-6 bg-black rounded text-white flex items-center justify-center text-sm font-bold">
                    N
                  </div>
                ),
                color: "bg-gray-800",
                delay: 1.4,
              },
              { icon: <Zap className="w-6 h-6" />, color: "bg-purple-500", delay: 1.5 },

              { icon: <Zap className="w-6 h-6" />, color: "bg-purple-500", delay: 1.6 },
              { icon: <BarChart3 className="w-6 h-6" />, color: "bg-orange-500", delay: 1.7 },
              { icon: <Zap className="w-6 h-6" />, color: "bg-blue-400", delay: 1.8 },
              { icon: <FolderOpen className="w-6 h-6" />, color: "bg-blue-500", delay: 1.9 },

              {
                icon: <div className="text-sm font-bold text-white">G</div>,
                color: "bg-green-500",
                delay: 2.0,
              },
              { icon: <BarChart3 className="w-6 h-6" />, color: "bg-blue-400", delay: 2.1 },
              { icon: <FolderOpen className="w-6 h-6" />, color: "bg-blue-500", delay: 2.2 },
              {
                icon: <div className="text-xs font-bold text-white">tally</div>,
                color: "bg-gray-600",
                delay: 2.3,
              },
            ].map((item, i) => {

              return (
                <motion.div
                  key={i}
                  initial={{
                    scale: 0.2,
                    opacity: 0,
                    x: centerX, // Start from center (ball position)
                    y: centerY + 100 // Start from center (ball position)
                  }}
                  animate={isVisible ? {
                    scale: selectedElement === i ? 1.1 : 1,
                    opacity: 1,
                    x: 0, // Final position
                    y: 0
                  } : {
                    scale: 0.2,
                    opacity: 0,
                    x: centerX,
                    y: centerY + 100
                  }}
                  transition={{
                    duration: 0.6,
                    delay: isVisible ? item.delay : 0,
                    type: "spring",
                    stiffness: 150,
                    damping: 15,
                  }}
                  whileHover={{ scale: selectedElement === i ? 1.15 : 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedElement(i)}
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full cursor-pointer transition-all duration-200 relative group ${selectedElement === i
                    ? 'ring-2 ring-white ring-offset-2 ring-offset-gray-50'
                    : 'hover:shadow-xl'
                    }`}
                  style={{
                    background: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  {/* Colored background layer */}
                  <div
                    className={`absolute inset-0 ${item.color} rounded-full opacity-80`}
                  />
                  {/* Icon content */}
                  <div className="relative z-10 text-white flex items-center justify-center w-full h-full">
                    {item.icon}
                  </div>
                  
                </motion.div>
              )
            })}
          </div>

          {/* Central Animated Glass Ball - Interactive Reset */}
          <motion.div
            initial={{
              scale: 0.2,
              opacity: 0,
              x: centerX,
              y: centerY
            }}
            animate={isVisible ? {
              scale: 1,
              opacity: 1,
              x: 0,
              y: 0
            } : {
              scale: 0.2,
              opacity: 0,
              x: centerX,
              y: centerY
            }}
            transition={{
              delay: isVisible ? 0.2 : 0,
              duration: 0.8,
              type: "spring",
              stiffness: 120,
              damping: 15
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedElement(0)}
            className="relative cursor-pointer"
          >
            {/* Just the animated glass ball without text */}
            <div className="relative">
              {/* Outer subtle glow */}
              <div
                className="absolute inset-0 rounded-full blur-xl opacity-20 w-24 h-24 mx-auto"
                style={{
                  background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3), rgba(59, 130, 246, 0.3), rgba(6, 182, 212, 0.3))'
                }}
              />

              {/* Main Glass Ball */}
              <div
                className="relative w-12 h-12 sm:w-16 sm:h-16 mx-auto rounded-full overflow-hidden"
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
                }}
              >
                {/* Animated liquid/plasma inside */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: 'radial-gradient(circle at 30% 40%, #8B5CF6, #3B82F6, #06B6D4)',
                    filter: 'blur(8px)',
                    opacity: 0.8
                  }}
                  animate={{
                    background: [
                      'radial-gradient(circle at 30% 40%, #8B5CF6, #3B82F6, #06B6D4)',
                      'radial-gradient(circle at 70% 30%, #3B82F6, #06B6D4, #8B5CF6)',
                      'radial-gradient(circle at 50% 70%, #06B6D4, #8B5CF6, #3B82F6)',
                      'radial-gradient(circle at 30% 40%, #8B5CF6, #3B82F6, #06B6D4)'
                    ]
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />

                {/* Secondary flowing color layer */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: 'linear-gradient(45deg, rgba(139, 92, 246, 0.6), rgba(59, 130, 246, 0.6), rgba(6, 182, 212, 0.6))',
                    filter: 'blur(4px)',
                    opacity: 0.7
                  }}
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.1, 0.9, 1]
                  }}
                  transition={{
                    rotate: {
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear"
                    },
                    scale: {
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }
                  }}
                />

                {/* Flowing blobs */}
                <motion.div
                  className="absolute w-6 h-6 rounded-full opacity-60"
                  style={{
                    background: 'radial-gradient(circle, #8B5CF6, #3B82F6)',
                    filter: 'blur(2px)',
                    top: '20%',
                    left: '20%'
                  }}
                  animate={{
                    x: [0, 20, 10, 0],
                    y: [0, 10, 20, 0],
                    scale: [1, 0.8, 1.2, 1]
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />

                <motion.div
                  className="absolute w-4 h-4 rounded-full opacity-50"
                  style={{
                    background: 'radial-gradient(circle, #06B6D4, #8B5CF6)',
                    filter: 'blur(3px)',
                    top: '60%',
                    right: '20%'
                  }}
                  animate={{
                    x: [0, -15, -5, 0],
                    y: [0, -12, -18, 0],
                    scale: [1, 1.3, 0.7, 1]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                />

                <motion.div
                  className="absolute w-3 h-3 rounded-full opacity-40"
                  style={{
                    background: 'radial-gradient(circle, #3B82F6, #06B6D4)',
                    filter: 'blur(2px)',
                    top: '40%',
                    left: '60%'
                  }}
                  animate={{
                    x: [0, -10, 8, 0],
                    y: [0, 15, -5, 0],
                    scale: [1, 0.6, 1.4, 1]
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                  }}
                />

                {/* Static glass highlights */}
                <div
                  className="absolute w-4 h-4 bg-white rounded-full opacity-40 blur-sm"
                  style={{
                    top: '20%',
                    left: '25%'
                  }}
                />

                <div
                  className="absolute w-2 h-2 bg-white rounded-full opacity-30 blur-sm"
                  style={{
                    top: '40%',
                    right: '30%'
                  }}
                />

                {/* Glass rim reflection */}
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.1) 40%, transparent 70%)'
                  }}
                />
              </div>

              {/* Static reflection shadow */}
              <div
                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-3 bg-gray-300 rounded-full blur-sm opacity-15"
              />
            </div>
            {/* Tooltip */}
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
              Reset to default
            </div>
          </motion.div>
        </div>

        {/* Right Panel - Charts */}
        <div className="w-full lg:w-2/3 p-4 sm:p-6 lg:p-8 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {/* Top feature requests */}
          <div className="bg-white rounded-2xl p-4 sm:p-6 relative group">
            <div className="flex items-center gap-2 mb-4 sm:mb-6">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">Top feature requests</h3>
            </div>
            {/* Tooltip */}
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none z-20">
              Demo
            </div>

            <div className="space-y-4">
              {/* Feature request items with skeleton and bars */}
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 sm:w-12 h-2 sm:h-3 bg-gray-200 rounded animate-pulse"></div>
                <div className="flex-1 bg-blue-400 h-4 sm:h-6 rounded-full" style={{ width: "60%" }}></div>
                <div className="w-12 sm:w-16 h-2 sm:h-3 bg-gray-100 rounded animate-pulse"></div>
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-12 sm:w-16 h-2 sm:h-3 bg-gray-200 rounded animate-pulse"></div>
                <div className="flex-1 bg-blue-400 h-4 sm:h-6 rounded-full" style={{ width: "45%" }}></div>
                <div className="w-16 sm:w-20 h-2 sm:h-3 bg-gray-100 rounded animate-pulse"></div>
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-10 sm:w-14 h-2 sm:h-3 bg-gray-200 rounded animate-pulse"></div>
                <div className="flex-1 bg-blue-400 h-4 sm:h-6 rounded-full" style={{ width: "70%" }}></div>
                <div className="w-8 sm:w-12 h-2 sm:h-3 bg-gray-100 rounded animate-pulse"></div>
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 sm:w-10 h-2 sm:h-3 bg-gray-200 rounded animate-pulse"></div>
                <div className="flex-1 bg-blue-400 h-4 sm:h-6 rounded-full" style={{ width: "80%" }}></div>
                <div className="w-14 sm:w-18 h-2 sm:h-3 bg-gray-100 rounded animate-pulse"></div>
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-12 sm:w-16 h-2 sm:h-3 bg-gray-200 rounded animate-pulse"></div>
                <div className="flex-1 bg-blue-400 h-4 sm:h-6 rounded-full" style={{ width: "35%" }}></div>
                <div className="w-10 sm:w-14 h-2 sm:h-3 bg-gray-100 rounded animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Feedback status */}
          <div className="bg-white rounded-2xl p-6 relative group">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">Feedback status</h3>
            </div>
            {/* Tooltip */}
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none z-20">
              Demo
            </div>

            <div className="flex items-center justify-center">
              <div className="relative">
                {/* Donut Chart */}
                <svg width="200" height="200" className="transform -rotate-90">
                  <circle cx="100" cy="100" r="80" fill="none" stroke="#f3f4f6" strokeWidth="20" />
                  {/* Pink segment */}
                  <circle
                    cx="100"
                    cy="100"
                    r="80"
                    fill="none"
                    stroke="#f472b6"
                    strokeWidth="20"
                    strokeDasharray="125.6 376.8"
                    strokeDashoffset="0"
                    strokeLinecap="round"
                  />
                  {/* Blue segment */}
                  <circle
                    cx="100"
                    cy="100"
                    r="80"
                    fill="none"
                    stroke="#60a5fa"
                    strokeWidth="20"
                    strokeDasharray="94.2 408.2"
                    strokeDashoffset="-125.6"
                    strokeLinecap="round"
                  />
                  {/* Green segment */}
                  <circle
                    cx="100"
                    cy="100"
                    r="80"
                    fill="none"
                    stroke="#4ade80"
                    strokeWidth="20"
                    strokeDasharray="157 345.4"
                    strokeDashoffset="-219.8"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              {/* Legend dots */}
              <div className="ml-8 space-y-3">
                <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                <div className="w-3 h-3 bg-pink-400 rounded-full"></div>
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Customers with most feedback */}
          <div className="bg-white rounded-2xl p-6 relative group">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">Customers with most feedback</h3>
            </div>
            {/* Tooltip */}
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none z-20">
              Demo
            </div>

            <div className="flex items-end justify-center gap-3 h-40">
              {/* Bar chart with varying heights */}
              <div className="flex flex-col items-center">
                <div className="w-8 bg-pink-300 rounded-t" style={{ height: "60px" }}></div>
                <div className="w-12 h-3 bg-gray-200 rounded mt-2 animate-pulse"></div>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-8 bg-pink-400 rounded-t" style={{ height: "40px" }}></div>
                <div className="w-10 h-3 bg-gray-200 rounded mt-2 animate-pulse"></div>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-8 bg-pink-400 rounded-t" style={{ height: "100px" }}></div>
                <div className="w-14 h-3 bg-gray-200 rounded mt-2 animate-pulse"></div>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-8 bg-pink-300 rounded-t" style={{ height: "70px" }}></div>
                <div className="w-12 h-3 bg-gray-200 rounded mt-2 animate-pulse"></div>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-8 bg-pink-200 rounded-t" style={{ height: "50px" }}></div>
                <div className="w-16 h-3 bg-gray-200 rounded mt-2 animate-pulse"></div>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-8 bg-pink-200 rounded-t" style={{ height: "30px" }}></div>
                <div className="w-10 h-3 bg-gray-200 rounded mt-2 animate-pulse"></div>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-8 bg-pink-400 rounded-t" style={{ height: "80px" }}></div>
                <div className="w-12 h-3 bg-gray-200 rounded mt-2 animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Summary of customer quotes */}
          <div className="bg-white rounded-2xl p-6 relative group">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">Summary of customer quotes</h3>
            </div>
            {/* Tooltip */}
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none z-20">
              Demo
            </div>

            <div className="space-y-4 shadow-sm p-4">
              {/* Green pill at top */}
              <div className="w-32 h-6 bg-green-400 rounded-full"></div>

              {/* Skeleton lines */}
              <div className="w-full h-3 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-4/5 h-3 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-full h-3 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-3/4 h-3 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-full h-3 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-5/6 h-3 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-2/3 h-3 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>


      </section>
      <div className="">
        <Button>
          Book Demo
        </Button>
      </div>
    </div>
  )
}
