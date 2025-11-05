"use client"

import * as React from "react"
import { useMachine } from "@xstate/react"
import { AppToolbar } from "@/components/app-toolbar"
import { ControlPanel } from "@/components/control-panel"
import { StatusBar } from "@/components/status-bar"
import { ExportMenu } from "@/components/export-menu"
import { HexInput } from "@/components/hex-input"
import { Diagram } from "@/components/svg/diagram"
import { Block } from "@/components/svg/block"
import { Bus as BusLine } from "@/components/svg/bus"
import { Arrow } from "@/components/svg/arrow"
import { busMachine, type BusSource } from "@/machines/bus.machine"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

const BUS_SOURCES: BusSource[] = ["ar", "pc", "dr", "ac", "ir", "tr", "mem", "inpr", "outr"]

export default function BusPage() {
  const [state, send] = useMachine(busMachine)
  const [source, setSource] = React.useState<BusSource>("ar")
  const [value, setValue] = React.useState(0)
  const [autoRun, setAutoRun] = React.useState(false)
  const [speed, setSpeed] = React.useState(500)
  const diagramRef = React.useRef<SVGSVGElement>(null)

  // Auto-run effect - automatically drive values on bus
  React.useEffect(() => {
    if (autoRun) {
      const timer = setInterval(() => {
        send({ type: "DRIVE", source, value })
      }, speed)
      return () => clearInterval(timer)
    }
  }, [autoRun, speed, send, source, value])

  const isActive = (signal: string) => state.context.activeSignal === signal

  return (
    <div className="min-h-screen flex flex-col">
      <AppToolbar />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold">Common Bus</h1>
                <Badge variant="outline">16-bit</Badge>
              </div>
              <p className="text-muted-foreground mt-2">Tri-state bus connecting all registers and memory</p>
            </div>
            <ExportMenu svgRef={diagramRef} state={state.context} moduleName="bus" />
          </div>

          {state.context.conflict && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Bus conflict detected! Multiple sources attempting to drive the bus simultaneously.
              </AlertDescription>
            </Alert>
          )}

          <StatusBar
            registers={[
              { name: "Bus", value: state.context.value, bits: 16, format: "hex" },
              { name: "Source", value: state.context.activeSource === "none" ? 0 : 1, bits: 1, format: "decimal" },
            ]}
            lastOperation={state.context.lastOperation}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Block Diagram</CardTitle>
                  <CardDescription>16-bit tri-state bus with multiple sources</CardDescription>
                </CardHeader>
                <CardContent>
                  <Diagram viewBox="0 0 700 500" ref={diagramRef}>
                    {/* Main horizontal bus */}
                    <BusLine
                      x1={100}
                      y1={250}
                      x2={600}
                      y2={250}
                      active={isActive("drive") || isActive("read")}
                      conflict={state.context.conflict}
                      label="COMMON BUS [15:0]"
                      orientation="horizontal"
                    />

                    {/* Register blocks connected to bus */}
                    {["AR", "PC", "DR", "AC"].map((reg, i) => (
                      <React.Fragment key={reg}>
                        <Block
                          x={120 + i * 120}
                          y={150}
                          width={80}
                          height={40}
                          label={reg}
                          active={state.context.activeSource === reg.toLowerCase()}
                        />
                        <Arrow
                          x1={160 + i * 120}
                          y1={190}
                          x2={160 + i * 120}
                          y2={250}
                          active={state.context.activeSource === reg.toLowerCase()}
                        />
                      </React.Fragment>
                    ))}

                    {["IR", "TR", "MEM"].map((reg, i) => (
                      <React.Fragment key={reg}>
                        <Block
                          x={120 + i * 120}
                          y={300}
                          width={80}
                          height={40}
                          label={reg}
                          active={state.context.activeSource === reg.toLowerCase()}
                        />
                        <Arrow
                          x1={160 + i * 120}
                          y1={250}
                          x2={160 + i * 120}
                          y2={300}
                          active={state.context.activeSource === reg.toLowerCase()}
                        />
                      </React.Fragment>
                    ))}
                  </Diagram>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <ControlPanel
                title="Bus Controls"
                description="Drive or release the common bus"
                onStep={() => send({ type: "DRIVE", source, value })}
                onReset={() => send({ type: "RELEASE" })}
                onAutoRun={setAutoRun}
                onSpeedChange={setSpeed}
                autoRun={autoRun}
                speed={speed}
              >
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Source</Label>
                    <Select value={source} onValueChange={(value) => setSource(value as BusSource)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {BUS_SOURCES.map((src) => (
                          <SelectItem key={src} value={src}>
                            {src.toUpperCase()}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <HexInput label="Value" value={value} bits={16} onChange={setValue} />

                  <div className="space-y-2">
                    <Button onClick={() => send({ type: "DRIVE", source, value })} className="w-full" variant="default">
                      Drive Bus
                    </Button>
                    <Button onClick={() => send({ type: "RELEASE" })} className="w-full" variant="outline">
                      Release Bus
                    </Button>
                  </div>
                </div>
              </ControlPanel>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Bus Status</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Active Source</span>
                    <Badge variant={state.context.activeSource === "none" ? "outline" : "default"}>
                      {state.context.activeSource.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Conflict</span>
                    <Badge variant={state.context.conflict ? "destructive" : "outline"}>
                      {state.context.conflict ? "YES" : "NO"}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">About Tri-State Bus</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-2">
                  <p>The common bus connects all registers and memory, allowing data transfer between components.</p>
                  <p>Only one source can drive the bus at a time. Multiple drivers cause a bus conflict.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
