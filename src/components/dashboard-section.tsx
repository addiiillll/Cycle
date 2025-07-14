"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FolderOpen, BarChart3, Zap } from "lucide-react"

export function DashboardSection() {
  return (
    <section className="min-h-screen bg-gray-50 flex">
      {/* Left Panel - Clean Grid Layout */}
      <div className="w-1/2 flex flex-col items-center justify-center relative p-12">
        {/* Video Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-12"
        >
          <div className="w-80 h-48 bg-gray-800 rounded-lg overflow-hidden shadow-lg">
            <img
              src="/placeholder.svg?height=192&width=320"
              alt="Customer testimonial"
              className="w-full h-full object-cover"
            />
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
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.5,
                delay: item.delay,
                type: "spring",
                stiffness: 200,
                damping: 20,
              }}
              className={`w-12 h-12 ${item.color} rounded-xl shadow-lg flex items-center justify-center text-white`}
            >
              {item.icon}
            </motion.div>
          ))}
        </div>

        {/* Central Orb */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1 }}
          className="relative"
        >
          <div
            className="w-24 h-24 rounded-full shadow-2xl"
            style={{
              background: "linear-gradient(135deg, #60a5fa 0%, #a855f7 50%, #3b82f6 100%)",
            }}
          />
        </motion.div>
      </div>

      {/* Right Panel - Charts */}
      <div className="w-1/2 p-12 grid grid-cols-2 gap-8">
        {/* Top Feature Requests */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}>
          <Card className="h-full">
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
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }}>
          <Card className="h-full">
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
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4 }}>
          <Card className="h-full">
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
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.6 }}>
          <Card className="h-full">
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
