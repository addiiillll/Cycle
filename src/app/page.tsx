// "use client"

// import type React from "react"

// import { useState, useEffect, useRef } from "react"
// import { motion, useAnimation, useMotionValue, AnimatePresence } from "framer-motion"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { ChevronDown, FolderOpen, BarChart3, Zap } from "lucide-react"

// interface FloatingIcon {
//   id: string
//   icon: React.ReactNode
//   initialX: number
//   initialY: number
//   color: string
//   isDragging: boolean
//   isAttracted: boolean
// }

// export default function CycleApp() {
//   const [heroIcons, setHeroIcons] = useState<FloatingIcon[]>([
//     {
//       id: "folder-1",
//       icon: <FolderOpen className="w-5 h-5" />,
//       initialX: 120,
//       initialY: 80,
//       color: "bg-blue-500",
//       isDragging: false,
//       isAttracted: false,
//     },
//     {
//       id: "chart-1",
//       icon: <BarChart3 className="w-5 h-5" />,
//       initialX: 1300,
//       initialY: 150,
//       color: "bg-red-500",
//       isDragging: false,
//       isAttracted: false,
//     },
//     {
//       id: "n-logo",
//       icon: (
//         <div className="w-5 h-5 bg-black rounded text-white flex items-center justify-center text-xs font-bold">N</div>
//       ),
//       initialX: 80,
//       initialY: 350,
//       color: "bg-gray-800",
//       isDragging: false,
//       isAttracted: false,
//     },
//     {
//       id: "zap-1",
//       icon: <Zap className="w-5 h-5" />,
//       initialX: 1250,
//       initialY: 350,
//       color: "bg-purple-500",
//       isDragging: false,
//       isAttracted: false,
//     },
//     {
//       id: "folder-2",
//       icon: <FolderOpen className="w-5 h-5" />,
//       initialX: 130,
//       initialY: 650,
//       color: "bg-blue-500",
//       isDragging: false,
//       isAttracted: false,
//     },
//     {
//       id: "chart-2",
//       icon: <BarChart3 className="w-5 h-5" />,
//       initialX: 500,
//       initialY: 700,
//       color: "bg-blue-400",
//       isDragging: false,
//       isAttracted: false,
//     },
//     {
//       id: "folder-3",
//       icon: <FolderOpen className="w-5 h-5" />,
//       initialX: 1350,
//       initialY: 680,
//       color: "bg-blue-500",
//       isDragging: false,
//       isAttracted: false,
//     },
//     {
//       id: "zap-2",
//       icon: <Zap className="w-5 h-5" />,
//       initialX: 1280,
//       initialY: 520,
//       color: "bg-blue-400",
//       isDragging: false,
//       isAttracted: false,
//     },
//   ])

//   const [isAnimating, setIsAnimating] = useState(false)
//   const [showSectionTwo, setShowSectionTwo] = useState(false)
//   const orbControls = useAnimation()
//   const sectionTwoRef = useRef<HTMLDivElement>(null)

//   const centerX = typeof window !== "undefined" ? window.innerWidth / 2 : 700
//   const centerY = 450
//   const attractionRadius = 100

//   const handleIconDrag = (iconId: string, x: number, y: number) => {
//     const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2)

//     if (distance < attractionRadius && !isAnimating) {
//       triggerSuckAnimation()
//     }
//   }

//   const triggerSuckAnimation = async () => {
//     setIsAnimating(true)

//     // Animate orb expansion
//     await orbControls.start({
//       scale: [1, 1.5, 1.2],
//       transition: { duration: 0.5 },
//     })

//     // Suck all icons to center
//     setHeroIcons((prev) => prev.map((icon) => ({ ...icon, isAttracted: true })))

//     // Wait for icons to reach center
//     setTimeout(() => {
//       // Scroll to next section
//       setShowSectionTwo(true)
//       setTimeout(() => {
//         sectionTwoRef.current?.scrollIntoView({ behavior: "smooth" })
//       }, 500)
//     }, 1500)
//   }

//   return (
//     <div className="min-h-screen bg-white">
//       {/* Header */}
//       <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-100">
//         <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
//           <div className="flex items-center gap-2">
//             <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
//               <div className="w-4 h-4 bg-white rounded-full"></div>
//             </div>
//             <span className="text-xl font-semibold">Cycle</span>
//           </div>

//           <nav className="hidden md:flex items-center gap-8">
//             <div className="flex items-center gap-1">
//               <span>Product</span>
//               <ChevronDown className="w-4 h-4" />
//             </div>
//             <span>Changelog</span>
//             <span>Manifesto</span>
//             <div className="flex items-center gap-1">
//               <span>Resources</span>
//               <ChevronDown className="w-4 h-4" />
//             </div>
//           </nav>

//           <div className="flex items-center gap-4">
//             <Button variant="ghost">Log in</Button>
//             <Button className="bg-black text-white hover:bg-gray-800">Get started</Button>
//           </div>
//         </div>
//       </header>

//       {/* Hero Section */}
//       <section className="relative min-h-screen flex items-center justify-center pt-20">
//         <div className="text-center max-w-4xl mx-auto px-6">
//           <motion.h1
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="text-7xl font-bold text-gray-900 mb-6 leading-tight"
//           >
//             Your feedback hub,
//             <br />
//             on autopilot
//           </motion.h1>

//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2 }}
//             className="text-xl text-gray-600 mb-16 max-w-2xl mx-auto"
//           >
//             Cycle is the fastest way for your team to capture product feedback and share customer insights – without the
//             busywork.
//           </motion.p>

//           {/* Central Orb */}
//           <motion.div animate={orbControls} className="relative mx-auto mb-6" style={{ width: 120, height: 120 }}>
//             <div
//               className="w-full h-full rounded-full shadow-2xl"
//               style={{
//                 background: "linear-gradient(135deg, #60a5fa 0%, #a855f7 50%, #3b82f6 100%)",
//                 filter: "blur(0.5px)",
//               }}
//             />
//           </motion.div>

//           <p className="text-lg text-gray-700 font-medium">Drop anything to capture feedback</p>
//         </div>

//         {/* Floating Icons */}
//         {heroIcons.map((icon) => (
//           <FloatingIconComponent
//             key={icon.id}
//             icon={icon}
//             onDrag={handleIconDrag}
//             centerX={centerX}
//             centerY={centerY}
//             isAnimating={isAnimating}
//           />
//         ))}
//       </section>

//       {/* Section Two - Dashboard */}
//       {showSectionTwo && (
//         <section ref={sectionTwoRef} className="min-h-screen bg-gray-50 flex">
//           {/* Left Panel - Explosion Effect with Icons */}
//           <div className="w-1/2 flex flex-col items-center justify-center relative p-12">
//             {/* Video/Testimonial at top */}
//             <motion.div
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.5 }}
//               className="mb-8"
//             >
//               <div className="w-80 h-48 bg-gray-800 rounded-lg overflow-hidden shadow-lg">
//                 <img
//                   src="/placeholder.svg?height=192&width=320"
//                   alt="Customer testimonial"
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//             </motion.div>

//             {/* Central Orb */}
//             <motion.div
//               initial={{ scale: 0.5, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               transition={{ delay: 1 }}
//               className="relative mb-16"
//             >
//               <div
//                 className="w-24 h-24 rounded-full shadow-2xl"
//                 style={{
//                   background: "linear-gradient(135deg, #60a5fa 0%, #a855f7 50%, #3b82f6 100%)",
//                 }}
//               />
//             </motion.div>

//             {/* Thrown out icons */}
//             <AnimatePresence>
//               {[
//                 { icon: <FolderOpen className="w-5 h-5" />, color: "bg-blue-500", x: -120, y: -80, delay: 1.5 },
//                 { icon: <BarChart3 className="w-5 h-5" />, color: "bg-red-500", x: 80, y: -60, delay: 1.6 },
//                 {
//                   icon: (
//                     <div className="w-5 h-5 bg-black rounded text-white flex items-center justify-center text-xs font-bold">
//                       N
//                     </div>
//                   ),
//                   color: "bg-gray-800",
//                   x: 120,
//                   y: -20,
//                   delay: 1.7,
//                 },
//                 { icon: <Zap className="w-5 h-5" />, color: "bg-purple-500", x: -80, y: 40, delay: 1.8 },
//                 { icon: <BarChart3 className="w-5 h-5" />, color: "bg-orange-500", x: -140, y: 80, delay: 1.9 },
//                 { icon: <Zap className="w-5 h-5" />, color: "bg-blue-400", x: 100, y: 60, delay: 2.0 },
//                 { icon: <FolderOpen className="w-5 h-5" />, color: "bg-blue-500", x: -60, y: 120, delay: 2.1 },
//                 { icon: <BarChart3 className="w-5 h-5" />, color: "bg-green-500", x: -100, y: -40, delay: 2.2 },
//                 {
//                   icon: <div className="text-xs font-bold">tally</div>,
//                   color: "bg-gray-600",
//                   x: 60,
//                   y: 100,
//                   delay: 2.3,
//                 },
//                 { icon: <FolderOpen className="w-5 h-5" />, color: "bg-blue-500", x: 140, y: 40, delay: 2.4 },
//                 { icon: <BarChart3 className="w-5 h-5" />, color: "bg-blue-400", x: -20, y: 140, delay: 2.5 },
//               ].map((item, i) => (
//                 <motion.div
//                   key={i}
//                   initial={{ x: 0, y: 0, scale: 0.3, opacity: 0 }}
//                   animate={{
//                     x: item.x,
//                     y: item.y,
//                     scale: 1,
//                     opacity: 1,
//                   }}
//                   transition={{
//                     duration: 0.8,
//                     delay: item.delay,
//                     type: "spring",
//                     stiffness: 200,
//                     damping: 20,
//                   }}
//                   className={`absolute w-12 h-12 ${item.color} rounded-xl shadow-lg flex items-center justify-center text-white`}
//                   style={{
//                     left: "50%",
//                     top: "60%",
//                     transform: "translate(-50%, -50%)",
//                   }}
//                 >
//                   {item.icon}
//                 </motion.div>
//               ))}
//             </AnimatePresence>
//           </div>

//           {/* Right Panel - Charts (keep existing) */}
//           <div className="w-1/2 p-12 grid grid-cols-2 gap-8">
//             {/* Top Feature Requests */}
//             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}>
//               <Card className="h-full">
//                 <CardHeader>
//                   <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
//                     <Zap className="w-4 h-4 text-blue-500" />
//                     Top feature requests
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="space-y-4">
//                     {[100, 85, 95, 75, 45].map((width, i) => (
//                       <motion.div
//                         key={i}
//                         initial={{ width: 0 }}
//                         animate={{ width: `${width}%` }}
//                         transition={{ duration: 1, delay: 1.5 + i * 0.1 }}
//                         className="h-4 bg-blue-400 rounded-full"
//                       />
//                     ))}
//                   </div>
//                 </CardContent>
//               </Card>
//             </motion.div>

//             {/* Feedback Status */}
//             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }}>
//               <Card className="h-full">
//                 <CardHeader>
//                   <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
//                     <Zap className="w-4 h-4 text-blue-500" />
//                     Feedback status
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent className="flex items-center justify-center">
//                   <div className="relative w-28 h-28">
//                     <svg className="w-28 h-28 transform -rotate-90">
//                       <circle cx="56" cy="56" r="45" stroke="#e5e7eb" strokeWidth="10" fill="none" />
//                       <motion.circle
//                         cx="56"
//                         cy="56"
//                         r="45"
//                         stroke="#60a5fa"
//                         strokeWidth="10"
//                         fill="none"
//                         strokeDasharray={`${2 * Math.PI * 45}`}
//                         initial={{ strokeDashoffset: 2 * Math.PI * 45 }}
//                         animate={{ strokeDashoffset: 2 * Math.PI * 45 * 0.4 }}
//                         transition={{ duration: 1.5, delay: 1.8 }}
//                         strokeLinecap="round"
//                       />
//                       <motion.circle
//                         cx="56"
//                         cy="56"
//                         r="45"
//                         stroke="#f472b6"
//                         strokeWidth="10"
//                         fill="none"
//                         strokeDasharray={`${2 * Math.PI * 45 * 0.3} ${2 * Math.PI * 45}`}
//                         initial={{ strokeDashoffset: 2 * Math.PI * 45 }}
//                         animate={{ strokeDashoffset: 2 * Math.PI * 45 * 0.1 }}
//                         transition={{ duration: 1.5, delay: 2 }}
//                         strokeLinecap="round"
//                       />
//                       <motion.circle
//                         cx="56"
//                         cy="56"
//                         r="45"
//                         stroke="#34d399"
//                         strokeWidth="10"
//                         fill="none"
//                         strokeDasharray={`${2 * Math.PI * 45 * 0.1} ${2 * Math.PI * 45}`}
//                         initial={{ strokeDashoffset: 2 * Math.PI * 45 }}
//                         animate={{ strokeDashoffset: 2 * Math.PI * 45 * 0.0 }}
//                         transition={{ duration: 1.5, delay: 2.2 }}
//                         strokeLinecap="round"
//                       />
//                     </svg>
//                   </div>
//                 </CardContent>
//               </Card>
//             </motion.div>

//             {/* Customers with Most Feedback */}
//             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4 }}>
//               <Card className="h-full">
//                 <CardHeader>
//                   <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
//                     <Zap className="w-4 h-4 text-blue-500" />
//                     Customers with most feedback
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="flex items-end justify-between h-24 gap-1">
//                     {[60, 40, 85, 30, 55, 75, 95, 35].map((height, i) => (
//                       <motion.div
//                         key={i}
//                         initial={{ height: 0 }}
//                         animate={{ height: `${height}%` }}
//                         transition={{ duration: 0.8, delay: 2.5 + i * 0.1 }}
//                         className="bg-pink-300 rounded-t flex-1"
//                       />
//                     ))}
//                   </div>
//                 </CardContent>
//               </Card>
//             </motion.div>

//             {/* Summary of Customer Quotes */}
//             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.6 }}>
//               <Card className="h-full">
//                 <CardHeader>
//                   <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
//                     <Zap className="w-4 h-4 text-blue-500" />
//                     Summary of customer quotes
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="space-y-3">
//                     <motion.div
//                       initial={{ width: 0 }}
//                       animate={{ width: "75%" }}
//                       transition={{ duration: 1, delay: 3 }}
//                       className="h-3 bg-green-400 rounded-full"
//                     />
//                     <div className="h-3 bg-gray-200 rounded-full w-full" />
//                     <div className="h-3 bg-gray-200 rounded-full w-1/2" />
//                   </div>
//                 </CardContent>
//               </Card>
//             </motion.div>
//           </div>
//         </section>
//       )}
//     </div>
//   )
// }

// function FloatingIconComponent({
//   icon,
//   onDrag,
//   centerX,
//   centerY,
//   isAnimating,
// }: {
//   icon: FloatingIcon
//   onDrag: (iconId: string, x: number, y: number) => void
//   centerX: number
//   centerY: number
//   isAnimating: boolean
// }) {
//   const x = useMotionValue(icon.initialX)
//   const y = useMotionValue(icon.initialY)

//   useEffect(() => {
//     if (icon.isAttracted) {
//       x.set(centerX - 20)
//       y.set(centerY - 20)
//     }
//   }, [icon.isAttracted, centerX, centerY, x, y])

//   return (
//     <motion.div
//       drag={!isAnimating && !icon.isAttracted}
//       dragMomentum={false}
//       style={{ x, y }}
//       onDrag={(_, info) => {
//         onDrag(icon.id, info.point.x, info.point.y)
//       }}
//       whileHover={{ scale: 1.1 }}
//       whileDrag={{ scale: 1.2, zIndex: 1000 }}
//       className={`absolute w-12 h-12 ${icon.color} rounded-xl shadow-lg flex items-center justify-center cursor-grab active:cursor-grabbing text-white`}
//       animate={
//         icon.isAttracted
//           ? {
//               x: centerX - 24,
//               y: centerY - 24,
//               scale: 0.2,
//               opacity: 0,
//             }
//           : {}
//       }
//       transition={{
//         type: "spring",
//         stiffness: 300,
//         damping: 30,
//         duration: 1,
//       }}
//     >
//       {icon.icon}
//     </motion.div>
//   )
// }


"use client"

import { useEffect } from "react"

import type React from "react"
import { useState, useRef } from "react"
import { motion, useMotionValue } from "framer-motion"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { DashboardSection } from "@/components/dashboard-section"

interface FloatingIcon {
  id: string
  icon: React.ReactNode
  initialX: number
  initialY: number
  color: string
  isDragging: boolean
  isAttracted: boolean
}

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

      <HeroSection isAnimating={isAnimating} onSuckAnimation={handleSuckAnimation} />

      {showSectionTwo && (
        <div ref={sectionTwoRef}>
          <DashboardSection />
        </div>
      )}
    </div>
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
