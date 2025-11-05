"use client"
import { cn } from "@/lib/utils"

interface LabelProps {
  x: number
  y: number
  text: string
  anchor?: "start" | "middle" | "end"
  className?: string
  mono?: boolean
  background?: boolean
  backgroundPadding?: number
}

export function Label({
  x,
  y,
  text,
  anchor = "middle",
  className,
  mono = false,
  background = false,
  backgroundPadding = 6,
}: LabelProps) {
  // Calculate text width for background (approximate, adjusted for better accuracy)
  const charWidth = mono ? 8 : 7.5
  const textWidth = text.length * charWidth
  const textHeight = 18

  let bgX = x
  if (anchor === "middle") {
    bgX = x - textWidth / 2
  } else if (anchor === "end") {
    bgX = x - textWidth
  }

  return (
    <g className="pointer-events-none">
      {background && (
        <rect
          x={bgX - backgroundPadding}
          y={y - textHeight / 2 - backgroundPadding}
          width={textWidth + backgroundPadding * 2}
          height={textHeight + backgroundPadding * 2}
          className="fill-background/95 stroke-border"
          strokeWidth={0.5}
          rx={3}
          style={{ filter: "drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1))" }}
        />
      )}
      <text
        x={x}
        y={y}
        textAnchor={anchor}
        dominantBaseline="middle"
        className={cn(
          "text-sm select-none",
          mono ? "font-mono" : "font-medium",
          "fill-foreground",
          background && "font-semibold",
          className
        )}
        style={{ fontSize: mono ? "12px" : "13px" }}
      >
        {text}
      </text>
    </g>
  )
}
