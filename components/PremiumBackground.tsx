"use client"

import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export function PremiumBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()
  
  // Parallax effect
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-background to-black opacity-90" />

      {/* Animated grid */}
      <div className="absolute inset-0 bg-grid-premium opacity-20" />

      {/* Cyber lines */}
      <div className="absolute inset-0">
        <div className="cyber-lines" />
      </div>

      {/* Floating orbs */}
      <motion.div
        style={{ y }}
        className="absolute inset-0"
      >
        <div className="premium-orbs" />
      </motion.div>

      {/* Light rays */}
      <div className="absolute inset-0">
        <div className="light-rays" />
      </div>

      {/* Glassmorphism fog */}
      <div className="absolute inset-0 backdrop-blur-[100px]">
        <div className="glass-fog" />
      </div>

      {/* Luxury overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-primary/20" />
    </div>
  )
} 