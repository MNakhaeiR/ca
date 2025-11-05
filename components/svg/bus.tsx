"use client"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface BusProps {
  x1: number
  y1: number
  x2: number
  y2: number
  active?: boolean
  conflict?: boolean
  label?: string
  orientation?: "horizontal" | "vertical"
  className?: string
  labelPosition?: "top" | "bottom" | "left" | "right"
}

export function Bus({
  x1,
  y1,
  x2,
  y2,
  active = false,
  conflict = false,
  label,
  orientation = "horizontal",
  className,
  labelPosition,
}: BusProps) {
  const busVariants = {
    inactive: {
      strokeWidth: 3,
      opacity: 0.5,
    },
    active: {
      strokeWidth: 4,
      opacity: 1,
      transition: {
        duration: 0.16,
        ease: "easeOut",
      },
    },
    conflict: {
      strokeWidth: 4,
      opacity: 1,
      stroke: "rgb(239, 68, 68)",
    },
  }

  const state = conflict ? "conflict" : active ? "active" : "inactive"

  let labelX = (x1 + x2) / 2
  let labelY = y1 - 12

  if (labelPosition === "bottom") {
    labelY = y1 + 20
  } else if (labelPosition === "left") {
    labelX = x1 - 60
    labelY = (y1 + y2) / 2
  } else if (labelPosition === "right") {
    labelX = x2 + 60
    labelY = (y1 + y2) / 2
  }

  const charWidth = 7
  const textWidth = label ? label.length * charWidth : 0
  const textHeight = 16

  return (
    <g>
      {/* Main bus line */}
      <motion.line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        className={cn(
          conflict
            ? "stroke-[var(--bus-conflict)]"
            : active
              ? "stroke-[var(--bus-active)]"
              : "stroke-[var(--bus-inactive)]",
          className,
        )}
        variants={busVariants}
        animate={state}
      />

      {/* Bus indicator lines (perpendicular marks) */}
      {orientation === "horizontal" ? (
        <>
          <line
            x1={x1}
            y1={y1 - 6}
            x2={x1}
            y2={y1 + 6}
            className={cn(
              conflict
                ? "stroke-[var(--bus-conflict)]"
                : active
                  ? "stroke-[var(--bus-active)]"
                  : "stroke-[var(--bus-inactive)]",
            )}
            strokeWidth={2}
          />
          <line
            x1={x2}
            y1={y2 - 6}
            x2={x2}
            y2={y2 + 6}
            className={cn(
              conflict
                ? "stroke-[var(--bus-conflict)]"
                : active
                  ? "stroke-[var(--bus-active)]"
                  : "stroke-[var(--bus-inactive)]",
            )}
            strokeWidth={2}
          />
        </>
      ) : (
        <>
          <line
            x1={x1 - 6}
            y1={y1}
            x2={x1 + 6}
            y2={y1}
            className={cn(
              conflict
                ? "stroke-[var(--bus-conflict)]"
                : active
                  ? "stroke-[var(--bus-active)]"
                  : "stroke-[var(--bus-inactive)]",
            )}
            strokeWidth={2}
          />
          <line
            x1={x2 - 6}
            y1={y2}
            x2={x2 + 6}
            y2={y2}
            className={cn(
              conflict
                ? "stroke-[var(--bus-conflict)]"
                : active
                  ? "stroke-[var(--bus-active)]"
                  : "stroke-[var(--bus-inactive)]",
            )}
            strokeWidth={2}
          />
        </>
      )}

      {label && (
        <g>
          <rect
            x={labelX - textWidth / 2 - 4}
            y={labelY - textHeight / 2 - 2}
            width={textWidth + 8}
            height={textHeight + 4}
            className="fill-background stroke-border"
            strokeWidth={0.5}
            rx={3}
          />
          <text
            x={labelX}
            y={labelY}
            textAnchor="middle"
            dominantBaseline="middle"
            className={cn(
              "text-xs font-mono font-semibold select-none",
              conflict ? "fill-[var(--bus-conflict)]" : active ? "fill-[var(--bus-active)]" : "fill-muted-foreground",
            )}
            style={{ fontSize: "12px" }}
          >
            {label}
          </text>
        </g>
      )}
    </g>
  )
}
