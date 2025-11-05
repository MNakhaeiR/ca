"use client"

import type * as React from "react"
import { cn } from "@/lib/utils"

interface DiagramProps extends React.SVGProps<SVGSVGElement> {
  children: React.ReactNode
  viewBox?: string
}

export function Diagram({ children, viewBox = "0 0 800 600", className, ...props }: DiagramProps) {
  return (
    <svg viewBox={viewBox} className={cn("w-full h-auto", className)} xmlns="http://www.w3.org/2000/svg" {...props}>
      <defs>
        {/* Arrow marker for signal paths */}
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="10"
          refX="9"
          refY="3"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <path d="M0,0 L0,6 L9,3 z" fill="currentColor" className="text-muted-foreground" />
        </marker>

        {/* Active arrow marker */}
        <marker
          id="arrowhead-active"
          markerWidth="10"
          markerHeight="10"
          refX="9"
          refY="3"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <path d="M0,0 L0,6 L9,3 z" fill="var(--active)" />
        </marker>

        {/* Subtle shadow filter */}
        <filter id="block-shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
          <feOffset dx="0" dy="2" result="offsetblur" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.08" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {children}
    </svg>
  )
}
