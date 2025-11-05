"use client"

import type * as React from "react"
import { motion } from "framer-motion"
import { useReducedMotion } from "@/components/reduced-motion-provider"
import { cn } from "@/lib/utils"

interface BlockProps {
  x: number
  y: number
  width: number
  height: number
  label: string
  active?: boolean
  className?: string
  children?: React.ReactNode
}

export function Block({ x, y, width, height, label, active = false, className, children }: BlockProps) {
  const { prefersReducedMotion } = useReducedMotion()

  const blockVariants = {
    inactive: {
      scale: 1,
      filter: "drop-shadow(0 1px 2px rgba(0, 0, 0, 0.05))",
    },
    active: {
      scale: prefersReducedMotion ? 1 : 1.02,
      filter: prefersReducedMotion
        ? "drop-shadow(0 1px 2px rgba(0, 0, 0, 0.05))"
        : "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.08))",
      transition: {
        duration: 0.16,
        ease: "easeOut",
      },
    },
  }

  return (
    <motion.g
      variants={blockVariants}
      animate={active ? "active" : "inactive"}
      style={{ originX: `${x + width / 2}px`, originY: `${y + height / 2}px` }}
    >
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        className={cn("fill-card stroke-border", active && "stroke-primary", className)}
        strokeWidth={active ? 2 : 1}
        rx={4}
      />
      <text
        x={x + width / 2}
        y={y + height / 2}
        textAnchor="middle"
        dominantBaseline="middle"
        className="fill-foreground text-sm font-medium select-none"
        style={{ fontSize: "14px" }}
      >
        {label}
      </text>
      {children}
    </motion.g>
  )
}
