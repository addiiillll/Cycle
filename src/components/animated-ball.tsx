import React from 'react';
import { motion } from 'framer-motion';
import { ShiningText } from './ui/shining-text';
import { Card, CardContent } from './ui/card';

const AnimatedGlassBall = () => {
  return (
    // Outer Card - Creates the doubled card effect
    <Card className="w-full max-w-sm sm:max-w-md lg:max-w-lg mx-auto aspect-[4/3] sm:aspect-[3/2] lg:aspect-[7/3]">
      <CardContent className="p-4 sm:p-6 h-full flex items-center justify-center">
        {/* Inner Card - Second layer of the doubled card */}
        <Card className="w-full h-full backdrop-blur-sm border-white/20 shadow-inner">
          <CardContent className=" h-full flex items-center justify-center">
            <div className="text-center w-full">
        {/* Static Glass Ball Container */}
        <div className="relative mb-4">
          {/* Outer subtle glow */}
          <div
            className="absolute inset-0 rounded-full blur-xl opacity-20 w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 mx-auto"
            style={{
              background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3), rgba(59, 130, 246, 0.3), rgba(6, 182, 212, 0.3))'
            }}
          />

          {/* Main Glass Ball - Static */}
          <div
            className="relative w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 mx-auto rounded-full overflow-hidden"
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
              className="absolute w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-full opacity-60"
              style={{
                background: 'radial-gradient(circle, #8B5CF6, #3B82F6)',
                filter: 'blur(2px)',
                top: '20%',
                left: '20%'
              }}
              animate={{
                x: [0, 40, 20, 0],
                y: [0, 20, 40, 0],
                scale: [1, 0.8, 1.2, 1]
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            <motion.div
              className="absolute w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 rounded-full opacity-50"
              style={{
                background: 'radial-gradient(circle, #06B6D4, #8B5CF6)',
                filter: 'blur(3px)',
                top: '60%',
                right: '20%'
              }}
              animate={{
                x: [0, -30, -10, 0],
                y: [0, -25, -35, 0],
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
              className="absolute w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 rounded-full opacity-40"
              style={{
                background: 'radial-gradient(circle, #3B82F6, #06B6D4)',
                filter: 'blur(2px)',
                top: '40%',
                left: '60%'
              }}
              animate={{
                x: [0, -20, 15, 0],
                y: [0, 30, -10, 0],
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
              className="absolute w-4 h-4 sm:w-6 sm:h-6 lg:w-7 lg:h-7 bg-white rounded-full opacity-40 blur-sm"
              style={{
                top: '20%',
                left: '25%'
              }}
            />

            <div
              className="absolute w-2 h-2 sm:w-3 sm:h-3 lg:w-4 lg:h-4 bg-white rounded-full opacity-30 blur-sm"
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
            className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-3 sm:w-16 sm:h-4 lg:w-20 lg:h-5 bg-gray-300 rounded-full blur-sm opacity-15"
          />
        </div>
        
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
         <ShiningText text={"Drop anything to capture feedback"}/>
        </motion.div>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};

export default AnimatedGlassBall;