"use client"

import type * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { RotateCcw, SkipForward } from "lucide-react"

interface ControlPanelProps {
  onStep?: () => void
  onReset?: () => void
  onAutoRun?: (enabled: boolean) => void
  onSpeedChange?: (speed: number) => void
  autoRun?: boolean
  speed?: number
  children?: React.ReactNode
  title?: string
  description?: string
}

export function ControlPanel({
  onStep,
  onReset,
  onAutoRun,
  onSpeedChange,
  autoRun = false,
  speed = 500,
  children,
  title = "Controls",
  description,
}: ControlPanelProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Execution Controls */}
        <div className="space-y-4">
          <div className="flex gap-2">
            <Button onClick={onStep} disabled={autoRun} className="flex-1" variant="default">
              <SkipForward className="mr-2 h-4 w-4" />
              Step
            </Button>
            <Button onClick={onReset} variant="outline" className="flex-1 bg-transparent">
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="auto-run" className="cursor-pointer">
              Auto-run
            </Label>
            <Switch id="auto-run" checked={autoRun} onCheckedChange={onAutoRun} />
          </div>

          {onSpeedChange && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="speed-slider">Speed</Label>
                <span className="text-sm text-muted-foreground">{speed}ms</span>
              </div>
              <Slider
                id="speed-slider"
                min={200}
                max={1200}
                step={100}
                value={[speed]}
                onValueChange={(values) => onSpeedChange(values[0])}
              />
            </div>
          )}
        </div>

        {/* Custom controls */}
        {children}
      </CardContent>
    </Card>
  )
}
