import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface VoteCardProps {
  name: string
  onClick?: () => void
  className?: string
}

export function VoteCard({ name, onClick, className }: VoteCardProps) {
  return (
    <div className={cn("flex flex-col items-center space-y-4", className)}>
      {/* Name */}
      <h3 className="text-center text-xl font-medium text-foreground" dir="rtl">
        {name}
      </h3>

      {/* Vote Button */}
      <Button 
        onClick={onClick}
        className="w-auto bg-primary hover:bg-primary/90"
        dir="rtl"
      >
        صوت الآن
      </Button>

      {/* Removed the vote count section:
      <div class="flex items-center gap-2">
        <span class="text-2xl font-bold text-primary-light">0</span>
        <div class="flex flex-col">
          <span class="text-sm text-gray-400">صوت</span>
          <span class="text-xs text-gray-500">(0.0%)</span>
        </div>
      </div>
      */}
    </div>
  )
} 