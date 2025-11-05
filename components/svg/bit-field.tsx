"use client"
import { cn } from "@/lib/utils"

interface BitFieldProps {
  x: number
  y: number
  width: number
  height: number
  bits: number
  value: number
  highlightBits?: number[]
  showLabels?: boolean
  className?: string
}

export function BitField({
  x,
  y,
  width,
  height,
  bits,
  value,
  highlightBits = [],
  showLabels = true,
  className,
}: BitFieldProps) {
  const bitWidth = width / bits
  const binaryString = value.toString(2).padStart(bits, "0")

  return (
    <g>
      {/* Bit cells */}
      {Array.from({ length: bits }).map((_, i) => {
        const bitIndex = bits - 1 - i
        const bitValue = binaryString[i]
        const isHighlighted = highlightBits.includes(bitIndex)

        return (
          <g key={i}>
            <rect
              x={x + i * bitWidth}
              y={y}
              width={bitWidth}
              height={height}
              className={cn("stroke-border", isHighlighted ? "fill-primary/10 stroke-primary" : "fill-card", className)}
              strokeWidth={isHighlighted ? 1.5 : 0.5}
            />
            <text
              x={x + i * bitWidth + bitWidth / 2}
              y={y + height / 2}
              textAnchor="middle"
              dominantBaseline="middle"
              className={cn(
                "text-xs font-mono select-none",
                isHighlighted ? "fill-primary font-semibold" : "fill-foreground",
              )}
              style={{ fontSize: "11px" }}
            >
              {bitValue}
            </text>
            {showLabels && (
              <text
                x={x + i * bitWidth + bitWidth / 2}
                y={y - 8}
                textAnchor="middle"
                className="text-xs fill-muted-foreground select-none"
                style={{ fontSize: "9px" }}
              >
                {bitIndex}
              </text>
            )}
          </g>
        )
      })}
    </g>
  )
}
