import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface VoteButtonProps {
  name: string
  onClick?: () => void
  className?: string
}

export function VoteButton({ name, onClick, className }: VoteButtonProps) {
  return (
    <div className={cn("flex flex-col items-center gap-4", className)}>
      {/* Centered name */}
      <h3 className="text-center text-lg font-medium text-foreground">
        {name}
      </h3>

      {/* Centered button */}
      <Button 
        onClick={onClick}
        className="w-auto"
      >
        صوت الآن
      </Button>
    </div>
  )
} 