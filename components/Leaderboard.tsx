"use client"

import { motion, useAnimationFrame } from "framer-motion"
import type { Person } from "@/types/vote"
import { Crown } from "lucide-react"
import { useRef, useState } from "react"

type LeaderboardProps = {
  people: Person[]
  totalVotes: number
}

export function Leaderboard({ people, totalVotes }: LeaderboardProps) {
  const [randomVotes, setRandomVotes] = useState<Record<string, number>>({})
  const progressRef = useRef<Record<string, number>>({})

  // Generate random votes that fluctuate
  useAnimationFrame((t) => {
    const newVotes: Record<string, number> = {}
    const newProgress: Record<string, number> = {}
    
    people.forEach((person) => {
      // Base number between 1000-5000
      const baseVotes = 1000 + Math.random() * 4000
      // Add sine wave variation
      const variation = Math.sin(t / 1000) * 200
      const finalVotes = Math.floor(baseVotes + variation)
      newVotes[person.id] = finalVotes
      
      // Progress bar animation (0-100)
      newProgress[person.id] = 50 + Math.sin(t / 800) * 30
    })
    
    setRandomVotes(newVotes)
    progressRef.current = newProgress
  })

  // Sort people by random votes
  const sortedPeople = [...people].sort(
    (a, b) => (randomVotes[b.id] || 0) - (randomVotes[a.id] || 0)
  )

  return (
    <div className="bg-black/20 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
      <div className="flex items-center gap-2 mb-6">
        <Crown className="w-6 h-6 text-primary" />
        <h2 className="text-xl font-bold text-primary">المتصدرون</h2>
      </div>

      <div className="space-y-4">
        {sortedPeople.map((person, index) => {
          const percentage = totalVotes > 0 
            ? ((randomVotes[person.id] / totalVotes) * 100).toFixed(1)
            : '0.0'

          return (
            <motion.div
              key={person.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-400">#{index + 1}</span>
                <span className="font-medium text-gray-200">{person.name}</span>
              </div>
              <div className="flex items-baseline gap-2">
                <motion.span
                  key={randomVotes[person.id]}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xl font-bold text-primary"
                >
                  {randomVotes[person.id]?.toLocaleString()}
                </motion.span>
                <span className="text-sm text-gray-400">({percentage}%)</span>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

