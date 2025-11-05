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
import { Arrow } from "@/components/svg/arrow"
import { BitField } from "@/components/svg/bit-field"
import { drMachine } from "@/machines/dr.machine"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function DRPage() {
  const [state, send] = useMachine(drMachine)
  const [inputValue, setInputValue] = React.useState(0)
  const [autoRun, setAutoRun] = React.useState(false)
  const [speed, setSpeed] = React.useState(500)
  const diagramRef = React.useRef<SVGSVGElement>(null)

  // Auto-run effect - automatically load values
  React.useEffect(() => {
    if (autoRun) {
      const timer = setInterval(() => {
        send({ type: "LOAD", value: inputValue })
      }, speed)
      return () => clearInterval(timer)
    }
  }, [autoRun, speed, send, inputValue])

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return

      switch (e.key.toLowerCase()) {
        case " ":
        case "enter":
          e.preventDefault()
          send({ type: "LOAD", value: inputValue })
          break
        case "l":
          e.preventDefault()
          send({ type: "LOAD", value: inputValue })
          break
        case "c":
          e.preventDefault()
          send({ type: "CLEAR" })
          break
        case "a":
          e.preventDefault()
          setAutoRun(!autoRun)
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [send, inputValue, autoRun])

  const isActive = (signal: string) => state.context.activeSignal === signal

  return (
    <div className="min-h-screen flex flex-col">
      <AppToolbar />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold">Data Register (DR)</h1>
                <Badge variant="outline">16-bit</Badge>
              </div>
              <p className="text-muted-foreground mt-2">Holds data read from or to be written to memory</p>
            </div>
            <ExportMenu svgRef={diagramRef} state={state.context} moduleName="dr" />
          </div>

          <StatusBar
            registers={[{ name: "DR", value: state.context.value, bits: 16, format: "hex" }]}
            lastOperation={state.context.lastOperation}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Block Diagram</CardTitle>
                  <CardDescription>Data register for memory operations</CardDescription>
                </CardHeader>
                <CardContent>
                  <Diagram viewBox="0 0 600 400" ref={diagramRef}>
                    <Block x={250} y={150} width={100} height={60} label="DR" active={isActive("load")} />

                    <BitField
                      x={200}
                      y={240}
                      width={200}
                      height={30}
                      bits={16}
                      value={state.context.value}
                      showLabels={false}
                    />

                    <Arrow x1={150} y1={170} x2={250} y2={170} active={isActive("load")} label="LOAD" />
                    <Arrow x1={150} y1={190} x2={250} y2={190} active={isActive("clear")} label="CLR" />
                    <Arrow x1={350} y1={180} x2={450} y2={180} active={isActive("load")} label="OUT" />
                  </Diagram>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <ControlPanel
                title="DR Controls"
                description="Load or clear the data register"
                onStep={() => send({ type: "LOAD", value: inputValue })}
                onReset={() => send({ type: "CLEAR" })}
                onAutoRun={setAutoRun}
                onSpeedChange={setSpeed}
                autoRun={autoRun}
                speed={speed}
              >
                <div className="space-y-4">
                  <HexInput
                    label="Value"
                    value={inputValue}
                    bits={16}
                    onChange={setInputValue}
                    onSubmit={() => send({ type: "LOAD", value: inputValue })}
                  />

                  <div className="space-y-2">
                    <Button
                      onClick={() => send({ type: "LOAD", value: inputValue })}
                      className="w-full"
                      variant="default"
                    >
                      Load (L)
                    </Button>
                    <Button onClick={() => send({ type: "CLEAR" })} className="w-full" variant="outline">
                      Clear (C)
                    </Button>
                  </div>
                </div>
              </ControlPanel>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
