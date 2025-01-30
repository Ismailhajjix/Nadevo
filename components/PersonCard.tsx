"use client"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import type { Person } from '../types/vote'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useEffect, useRef } from "react"

type PersonCardProps = {
  person: Person
  isVoted: boolean
  onVote: (id: string) => void
  loading?: boolean
}

export function PersonCard({ person, isVoted, onVote, loading }: PersonCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  
  // 3D rotation values
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Smooth springs for rotation
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]))
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]))

  // Handle card hover effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ z: 20 }}
      className="group relative h-[500px] cursor-pointer perspective-1000"
    >
      {/* Premium Border Glow Effect */}
      <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-white/30 via-primary-light/30 to-white/30 opacity-0 blur transition-all duration-500 group-hover:opacity-100" />
      
      {/* Animated Border */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/20 via-primary-light/20 to-white/20 opacity-0 group-hover:opacity-100">
        <div className="absolute inset-0 animate-spin-slow rounded-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <div className="relative flex h-full flex-col items-center space-y-6 rounded-2xl bg-black/40 p-6 backdrop-blur-xl transition-all duration-500 group-hover:bg-black/60">
        {/* White Border Frame */}
        <div className="absolute inset-0 rounded-2xl border border-white/10" />
        
        {/* 3D floating image with premium border */}
        <motion.div
          style={{ translateZ: 50 }}
          className="relative h-64 w-64"
        >
          {/* Image Border Glow */}
          <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-white/30 via-primary-light/30 to-white/30 opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-100" />
          
          {/* Image Container */}
          <div className="relative h-full w-full overflow-hidden rounded-xl border border-white/10">
            <Image
              src={person.image}
              alt={person.name}
              fill
              className="object-cover transition-all duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
            />
            {/* Premium glass overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </div>
        </motion.div>

        {/* Floating name with glow */}
        <motion.h3 
          style={{ translateZ: 75 }}
          className="relative text-center text-2xl font-bold"
          dir="rtl"
        >
          <span className="bg-gradient-to-r from-white via-primary-light to-white bg-clip-text text-transparent">
            {person.name}
          </span>
          <div className="absolute -inset-2 -z-10 animate-pulse-slow opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-40"
               style={{
                 background: "linear-gradient(90deg, var(--primary) -10%, var(--primary-light) 50%, var(--primary) 110%)"
               }}
          />
        </motion.h3>

        {/* Enhanced 3D Button with white border */}
        <motion.div
          style={{ translateZ: 100 }}
          className="relative w-full"
          whileTap={{ scale: 0.95 }}
        >
          {/* Button Border Glow */}
          <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-white/30 via-primary-light/30 to-white/30 opacity-0 blur transition-opacity duration-500 group-hover:opacity-100" />
          
          <Button
            onClick={() => !isVoted && onVote(person.id)}
            disabled={isVoted || loading}
            className={cn(
              "relative w-full overflow-hidden rounded-xl border border-white/10 py-6 text-lg font-medium",
              "bg-gradient-to-r from-primary to-primary-light",
              "shadow-lg shadow-primary/20 transition-all duration-500",
              "hover:shadow-xl hover:shadow-primary/30",
              "disabled:opacity-80",
              isVoted && "bg-accent"
            )}
            dir="rtl"
          >
            <span className="relative z-10 flex items-center justify-center gap-3">
              {loading ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : isVoted ? (
                <>
                  تم التصويت
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-xl"
                  >
                    ✓
                  </motion.span>
                </>
              ) : (
                "صوت الآن"
              )}
            </span>
          </Button>
        </motion.div>
      </div>
    </motion.div>
  )
}

