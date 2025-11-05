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
  backgroundPadding = 4,
}: LabelProps) {
  // Calculate text width for background (approximate)
  const charWidth = mono ? 7.5 : 7
  const textWidth = text.length * charWidth
  const textHeight = 16

  let bgX = x
  if (anchor === "middle") {
    bgX = x - textWidth / 2
  } else if (anchor === "end") {
    bgX = x - textWidth
  }

  return (
    <g>
      {background && (
        <rect
          x={bgX - backgroundPadding}
          y={y - textHeight / 2 - backgroundPadding}
          width={textWidth + backgroundPadding * 2}
          height={textHeight + backgroundPadding * 2}
          className="fill-background stroke-border"
          strokeWidth={0.5}
          rx={2}
        />
      )}
      <text
        x={x}
        y={y}
        textAnchor={anchor}
        dominantBaseline="middle"
        className={cn("text-sm select-none", mono ? "font-mono" : "font-medium", "fill-foreground", className)}
        style={{ fontSize: "13px" }}
      >
        {text}
      </text>
    </g>
  )
}
