"use client"
import { motion } from "framer-motion"
import { useReducedMotion } from "@/components/reduced-motion-provider"
import { cn } from "@/lib/utils"

interface ArrowProps {
  x1: number
  y1: number
  x2: number
  y2: number
  active?: boolean
  label?: string
  dashed?: boolean
  className?: string
  labelOffset?: number
}

export function Arrow({
  x1,
  y1,
  x2,
  y2,
  active = false,
  label,
  dashed = false,
  className,
  labelOffset = -8,
}: ArrowProps) {
  const { prefersReducedMotion } = useReducedMotion()

  const pathVariants = {
    inactive: {
      strokeWidth: 1.5,
      opacity: 0.7,
      strokeDashoffset: 0,
    },
    active: {
      strokeWidth: 2.5,
      opacity: 1,
      strokeDashoffset: prefersReducedMotion ? 0 : [0, -20],
      transition: {
        strokeWidth: { duration: 0.16, ease: "easeOut" },
        opacity: { duration: 0.16, ease: "easeOut" },
        strokeDashoffset: {
          duration: 1,
          ease: "linear",
          repeat: Number.POSITIVE_INFINITY,
        },
      },
    },
  }

  const labelX = (x1 + x2) / 2
  const labelY = (y1 + y2) / 2 + labelOffset
  const charWidth = 6.5
  const textWidth = label ? label.length * charWidth : 0
  const textHeight = 14

  return (
    <g>
      <motion.line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        className={cn(active ? "stroke-[var(--active)]" : "stroke-[var(--line)]", className)}
        variants={pathVariants}
        animate={active ? "active" : "inactive"}
        strokeDasharray={dashed ? (active ? "5,5" : "3,3") : undefined}
        markerEnd={active ? "url(#arrowhead-active)" : "url(#arrowhead)"}
      />
      {label && (
        <g>
          <rect
            x={labelX - textWidth / 2 - 3}
            y={labelY - textHeight / 2 - 2}
            width={textWidth + 6}
            height={textHeight + 4}
            className="fill-background"
            rx={2}
          />
          <text
            x={labelX}
            y={labelY}
            textAnchor="middle"
            dominantBaseline="middle"
            className={cn("text-xs font-mono select-none", active ? "fill-[var(--active)]" : "fill-muted-foreground")}
            style={{ fontSize: "11px" }}
          >
            {label}
          </text>
        </g>
      )}
    </g>
  )
}
