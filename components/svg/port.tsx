"use client"
import { cn } from "@/lib/utils"

interface PortProps {
  x: number
  y: number
  label?: string
  active?: boolean
  direction?: "in" | "out"
  className?: string
}

export function Port({ x, y, label, active = false, direction = "in", className }: PortProps) {
  return (
    <g>
      <circle
        cx={x}
        cy={y}
        r={4}
        className={cn("stroke-border", active ? "fill-[var(--active)]" : "fill-card", className)}
        strokeWidth={1.5}
      />
      {label && (
        <text
          x={direction === "in" ? x - 10 : x + 10}
          y={y}
          textAnchor={direction === "in" ? "end" : "start"}
          dominantBaseline="middle"
          className={cn("text-xs font-mono select-none", active ? "fill-[var(--active)]" : "fill-muted-foreground")}
          style={{ fontSize: "10px" }}
        >
          {label}
        </text>
      )}
    </g>
  )
}
