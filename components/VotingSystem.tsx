"use client"

import { useVotingSystem } from "../hooks/useVotingSystem"
import { PersonCard } from "./PersonCard"
import { Leaderboard } from "./Leaderboard"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from 'react-hot-toast'
import { CATEGORIES } from "@/types/vote"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { PremiumBackground } from "./PremiumBackground"

export function VotingSystem() {
  const { people, vote, castVote, loading, error } = useVotingSystem()

  // Group people by category with proper sorting
  const categoriesWithParticipants = CATEGORIES.map(category => ({
    ...category,
    participants: people
      .filter(person => person.category_id === category.id)
      .sort((a, b) => b.votes - a.votes)
  }))

  const handleVote = async (personId: string) => {
    try {
      const success = await castVote(personId)
      if (success) {
        toast.success('تم التصويت بنجاح', {
          style: {
            background: 'rgba(var(--primary), 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(var(--primary), 0.2)',
            color: 'white'
          }
        })
      }
    } catch (error: any) {
      toast.error(error.message || 'حدث خطأ أثناء التصويت')
    }
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        {error}
      </div>
    )
  }

  if (loading && people.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  console.log('People:', people)
  console.log('Categories with participants:', categoriesWithParticipants)

  return (
    <>
      <PremiumBackground />
      
      <div className="relative min-h-screen w-full overflow-hidden bg-transparent px-4 pb-20 pt-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mx-auto max-w-7xl"
        >
          {/* Premium Header */}
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="relative mb-16 text-center"
          >
            <h1 className="relative z-10 bg-gradient-to-b from-white to-white/70 bg-clip-text text-4xl font-bold text-transparent md:text-5xl lg:text-6xl">
              التصويت النهائي
            </h1>
            <div className="absolute inset-0 -z-10 animate-pulse-slow bg-gradient-to-t from-primary/20 via-primary/5 to-transparent blur-3xl" />
          </motion.div>

          {/* Categories with Participants */}
          <div className="space-y-20">
            {categoriesWithParticipants.map((category) => (
              <motion.section
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative"
              >
                {/* Category Header */}
                <div className="relative mb-8 text-center">
                  <motion.h2 
                    className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {category.name}
                  </motion.h2>
                  <div className="absolute inset-0 -z-10 animate-pulse-slow bg-gradient-to-t from-primary/10 via-primary/5 to-transparent blur-2xl" />
                </div>

                {/* Participants Grid */}
                <motion.div 
                  className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
                  variants={{
                    hidden: { opacity: 0 },
                    show: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.1
                      }
                    }
                  }}
                  initial="hidden"
                  animate="show"
                >
                  {category.participants.map((person) => (
                    <PersonCard
                      key={person.id}
                      person={person}
                      isVoted={vote === person.id}
                      onVote={handleVote}
                      loading={loading}
                    />
                  ))}
                </motion.div>

                {/* Category Separator */}
                <div className="mt-16 h-px w-full bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
              </motion.section>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-12"
      >
        <Leaderboard people={people} totalVotes={people.reduce((sum, person) => sum + person.votes, 0)} />
      </motion.div>
    </>
  )
}

