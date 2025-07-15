"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FolderOpen, BarChart3, Zap } from "lucide-react"

export function DashboardSection() {
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
      image: "/placeholder.svg?height=192&width=320&text=File+Management",
      color: "blue"
    },
    {
      title: "Analytics Dashboard",
      description: "Track performance metrics and user engagement",
      image: "/placeholder.svg?height=192&width=320&text=Analytics",
      color: "red"
    },
    {
      title: "Notion Integration",
      description: "Seamlessly connect with your Notion workspace",
      image: "/placeholder.svg?height=192&width=320&text=Notion",
      color: "gray"
    },
    {
      title: "Quick Actions Hub",
      description: "Access frequently used tools and shortcuts",
      image: "/placeholder.svg?height=192&width=320&text=Quick+Actions",
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
    <section className="min-h-screen bg-gray-50 flex">
      {/* Left Panel - Clean Grid Layout */}
      <div className="w-1/2 flex flex-col items-center justify-center relative p-12">
        {/* Interactive Content Display */}
        <motion.div
          initial={{
            opacity: 0,
            x: centerX,
            y: centerY + 200, // Start from center, move up to final position
            scale: 0.3
          }}
          animate={{
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1
          }}
          transition={{
            delay: 0.5,
            duration: 0.8,
            type: "spring",
            stiffness: 100,
            damping: 15
          }}
          className="mb-12"
        >
          <div className="w-80 h-48 bg-gray-800 rounded-lg overflow-hidden shadow-lg relative">
            <motion.img
              key={selectedElement} // Re-animate when selection changes
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              src={contentData[selectedElement].image}
              alt={contentData[selectedElement].title}
              className="w-full h-full object-cover"
            />
            {/* Content overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <motion.h3
                key={`title-${selectedElement}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="text-white font-semibold text-sm mb-1"
              >
                {contentData[selectedElement].title}
              </motion.h3>
              <motion.p
                key={`desc-${selectedElement}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="text-white/80 text-xs"
              >
                {contentData[selectedElement].description}
              </motion.p>
            </div>
          </div>
        </motion.div>

        {/* Icons Grid - 4x3 Layout */}
        <div className="grid grid-cols-4 gap-6 mb-12">
          {[
            { icon: <FolderOpen className="w-5 h-5" />, color: "bg-blue-500", delay: 1.2 },
            { icon: <BarChart3 className="w-5 h-5" />, color: "bg-red-500", delay: 1.3 },
            {
              icon: (
                <div className="w-5 h-5 bg-black rounded text-white flex items-center justify-center text-xs font-bold">
                  N
                </div>
              ),
              color: "bg-gray-800",
              delay: 1.4,
            },
            { icon: <Zap className="w-5 h-5" />, color: "bg-purple-500", delay: 1.5 },

            { icon: <Zap className="w-5 h-5" />, color: "bg-purple-500", delay: 1.6 },
            { icon: <BarChart3 className="w-5 h-5" />, color: "bg-orange-500", delay: 1.7 },
            { icon: <Zap className="w-5 h-5" />, color: "bg-blue-400", delay: 1.8 },
            { icon: <FolderOpen className="w-5 h-5" />, color: "bg-blue-500", delay: 1.9 },

            {
              icon: <div className="text-xs font-bold text-white">G</div>,
              color: "bg-green-500",
              delay: 2.0,
            },
            { icon: <BarChart3 className="w-5 h-5" />, color: "bg-blue-400", delay: 2.1 },
            { icon: <FolderOpen className="w-5 h-5" />, color: "bg-blue-500", delay: 2.2 },
            {
              icon: <div className="text-xs font-bold text-white">tally</div>,
              color: "bg-gray-600",
              delay: 2.3,
            },
          ].map((item, i) => {
            // Calculate position in 4x3 grid
            const row = Math.floor(i / 4)
            const col = i % 4

            // Calculate offset from center for throwing effect
            const offsetX = (col - 1.5) * -60 // Negative to throw outward from center
            const offsetY = (row - 1) * -60   // Negative to throw outward from center

            return (
              <motion.div
                key={i}
                initial={{
                  scale: 0,
                  opacity: 0,
                  x: centerX + offsetX * 0.3, // Start closer to center
                  y: centerY + offsetY * 0.3
                }}
                animate={{
                  scale: selectedElement === i ? 1.1 : 1,
                  opacity: 1,
                  x: 0, // Final position
                  y: 0
                }}
                transition={{
                  duration: 0.6,
                  delay: item.delay,
                  type: "spring",
                  stiffness: 150,
                  damping: 15,
                }}
                whileHover={{ scale: selectedElement === i ? 1.15 : 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedElement(i)}
                className={`w-12 h-12 ${item.color} rounded-xl shadow-lg flex items-center justify-center text-white cursor-pointer transition-all duration-200 ${
                  selectedElement === i
                    ? 'ring-2 ring-white ring-offset-2 ring-offset-gray-50'
                    : 'hover:shadow-xl'
                }`}
              >
                {item.icon}
              </motion.div>
            )
          })}
        </div>

        {/* Central Orb - Interactive Reset */}
        <motion.div
          initial={{
            scale: 0.2,
            opacity: 0,
            x: centerX,
            y: centerY
          }}
          animate={{
            scale: 1,
            opacity: 1,
            x: 0,
            y: 0
          }}
          transition={{
            delay: 1,
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
          <div
            className="w-24 h-24 rounded-full shadow-2xl transition-all duration-200 hover:shadow-3xl"
            style={{
              background: "linear-gradient(135deg, #60a5fa 0%, #a855f7 50%, #3b82f6 100%)",
            }}
          />
          {/* Tooltip */}
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
            Reset to default
          </div>
        </motion.div>
      </div>

      {/* Right Panel - Charts */}
      <div className="w-1/2 p-12 grid grid-cols-2 gap-8">
        {/* Top Feature Requests */}
        <motion.div
          initial={{
            opacity: 0,
            x: centerX - 200, // Start from center-left, move right to final position
            y: centerY - 100,
            scale: 0.5
          }}
          animate={{
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1
          }}
          transition={{
            delay: 1,
            duration: 0.8,
            type: "spring",
            stiffness: 100,
            damping: 15
          }}
        >
          <Card className={`h-full transition-all duration-300 ${
            selectedElement === 1 ? 'ring-2 ring-red-200 bg-red-50/50' : ''
          }`}>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <Zap className="w-4 h-4 text-blue-500" />
                Top feature requests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[100, 85, 95, 75, 45].map((width, i) => (
                  <motion.div
                    key={i}
                    initial={{ width: 0 }}
                    animate={{ width: `${width}%` }}
                    transition={{ duration: 1, delay: 1.5 + i * 0.1 }}
                    className="h-4 bg-blue-400 rounded-full"
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Feedback Status */}
        <motion.div
          initial={{
            opacity: 0,
            x: centerX - 150, // Start from center, move right-up to final position
            y: centerY - 100,
            scale: 0.5
          }}
          animate={{
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1
          }}
          transition={{
            delay: 1.2,
            duration: 0.8,
            type: "spring",
            stiffness: 100,
            damping: 15
          }}
        >
          <Card className={`h-full transition-all duration-300 ${
            [2, 3, 4].includes(selectedElement) ? 'ring-2 ring-purple-200 bg-purple-50/50' : ''
          }`}>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <Zap className="w-4 h-4 text-blue-500" />
                Feedback status
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center">
              <div className="relative w-28 h-28">
                <svg className="w-28 h-28 transform -rotate-90">
                  <circle cx="56" cy="56" r="45" stroke="#e5e7eb" strokeWidth="10" fill="none" />
                  <motion.circle
                    cx="56"
                    cy="56"
                    r="45"
                    stroke="#60a5fa"
                    strokeWidth="10"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 45}`}
                    initial={{ strokeDashoffset: 2 * Math.PI * 45 }}
                    animate={{ strokeDashoffset: 2 * Math.PI * 45 * 0.4 }}
                    transition={{ duration: 1.5, delay: 1.8 }}
                    strokeLinecap="round"
                  />
                  <motion.circle
                    cx="56"
                    cy="56"
                    r="45"
                    stroke="#f472b6"
                    strokeWidth="10"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 45 * 0.3} ${2 * Math.PI * 45}`}
                    initial={{ strokeDashoffset: 2 * Math.PI * 45 }}
                    animate={{ strokeDashoffset: 2 * Math.PI * 45 * 0.1 }}
                    transition={{ duration: 1.5, delay: 2 }}
                    strokeLinecap="round"
                  />
                  <motion.circle
                    cx="56"
                    cy="56"
                    r="45"
                    stroke="#34d399"
                    strokeWidth="10"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 45 * 0.1} ${2 * Math.PI * 45}`}
                    initial={{ strokeDashoffset: 2 * Math.PI * 45 }}
                    animate={{ strokeDashoffset: 2 * Math.PI * 45 * 0.0 }}
                    transition={{ duration: 1.5, delay: 2.2 }}
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Customers with Most Feedback */}
        <motion.div
          initial={{
            opacity: 0,
            x: centerX - 200, // Start from center, move right-down to final position
            y: centerY + 50,
            scale: 0.5
          }}
          animate={{
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1
          }}
          transition={{
            delay: 1.4,
            duration: 0.8,
            type: "spring",
            stiffness: 100,
            damping: 15
          }}
        >
          <Card className={`h-full transition-all duration-300 ${
            [5, 6, 9].includes(selectedElement) ? 'ring-2 ring-orange-200 bg-orange-50/50' : ''
          }`}>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <Zap className="w-4 h-4 text-blue-500" />
                Customers with most feedback
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between h-24 gap-1">
                {[60, 40, 85, 30, 55, 75, 95, 35].map((height, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ duration: 0.8, delay: 2.5 + i * 0.1 }}
                    className="bg-pink-300 rounded-t flex-1"
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Summary of Customer Quotes */}
        <motion.div
          initial={{
            opacity: 0,
            x: centerX - 150, // Start from center, move right-down to final position
            y: centerY + 50,
            scale: 0.5
          }}
          animate={{
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1
          }}
          transition={{
            delay: 1.6,
            duration: 0.8,
            type: "spring",
            stiffness: 100,
            damping: 15
          }}
        >
          <Card className={`h-full transition-all duration-300 ${
            [0, 7, 8, 10, 11].includes(selectedElement) ? 'ring-2 ring-blue-200 bg-blue-50/50' : ''
          }`}>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <Zap className="w-4 h-4 text-blue-500" />
                Summary of customer quotes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "75%" }}
                  transition={{ duration: 1, delay: 3 }}
                  className="h-3 bg-green-400 rounded-full"
                />
                <div className="h-3 bg-gray-200 rounded-full w-full" />
                <div className="h-3 bg-gray-200 rounded-full w-1/2" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
