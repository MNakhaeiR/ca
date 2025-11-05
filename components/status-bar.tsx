"use client"

import * as React from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { toHex, toBinary } from "@/lib/utils"

interface RegisterDisplay {
  name: string
  value: number
  bits: number
  format?: "hex" | "binary" | "decimal"
}

interface StatusBarProps {
  registers: RegisterDisplay[]
  flags?: Record<string, boolean>
  lastOperation?: string
  className?: string
}

export function StatusBar({ registers, flags, lastOperation, className }: StatusBarProps) {
  return (
    <Card className={className}>
      <div className="p-4">
        <div className="flex flex-wrap items-center gap-4" role="status" aria-live="polite">
          {registers.map((reg, index) => (
            <React.Fragment key={reg.name}>
              {index > 0 && <Separator orientation="vertical" className="h-6" />}
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-muted-foreground">{reg.name}:</span>
                <code className="font-mono text-sm font-semibold">
                  {reg.format === "binary"
                    ? toBinary(reg.value, reg.bits)
                    : reg.format === "decimal"
                      ? reg.value
                      : `0x${toHex(reg.value, Math.ceil(reg.bits / 4))}`}
                </code>
              </div>
            </React.Fragment>
          ))}

          {flags && Object.keys(flags).length > 0 && (
            <>
              <Separator orientation="vertical" className="h-6" />
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-muted-foreground">Flags:</span>
                <div className="flex gap-1">
                  {Object.entries(flags).map(([name, value]) => (
                    <Badge key={name} variant={value ? "default" : "outline"} className="font-mono text-xs">
                      {name}
                    </Badge>
                  ))}
                </div>
              </div>
            </>
          )}

          {lastOperation && (
            <>
              <Separator orientation="vertical" className="h-6" />
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-muted-foreground">Last:</span>
                <code className="text-sm text-primary">{lastOperation}</code>
              </div>
            </>
          )}
        </div>
      </div>
    </Card>
  )
}
