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
import { Port } from "@/components/svg/port"
import { BitField } from "@/components/svg/bit-field"
import { arMachine } from "@/machines/ar.machine"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function ARPage() {
  const [state, send] = useMachine(arMachine)
  const [inputValue, setInputValue] = React.useState(0)
  const [autoRun, setAutoRun] = React.useState(false)
  const [speed, setSpeed] = React.useState(500)
  const diagramRef = React.useRef<SVGSVGElement>(null)

  // Auto-run effect - automatically increment through addresses
  React.useEffect(() => {
    if (autoRun) {
      const timer = setInterval(() => {
        send({ type: "INCREMENT" })
      }, speed)
      return () => clearInterval(timer)
    }
  }, [autoRun, speed, send])

  // Keyboard shortcuts
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return

      switch (e.key.toLowerCase()) {
        case " ":
        case "enter":
          e.preventDefault()
          send({ type: "INCREMENT" })
          break
        case "l":
          e.preventDefault()
          send({ type: "LOAD", value: inputValue })
          break
        case "c":
          e.preventDefault()
          send({ type: "CLEAR" })
          break
        case "i":
          e.preventDefault()
          send({ type: "INCREMENT" })
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
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold">Address Register (AR)</h1>
                <Badge variant="outline">12-bit</Badge>
              </div>
              <p className="text-muted-foreground mt-2">Holds memory addresses for read/write operations</p>
            </div>
            <ExportMenu svgRef={diagramRef} state={state.context} moduleName="ar" />
          </div>

          {/* Status Bar */}
          <StatusBar
            registers={[{ name: "AR", value: state.context.value, bits: 12, format: "hex" }]}
            lastOperation={state.context.lastOperation}
          />

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Diagram */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Block Diagram</CardTitle>
                  <CardDescription>Visual representation of the Address Register</CardDescription>
                </CardHeader>
                <CardContent>
                  <Diagram viewBox="0 0 600 400" ref={diagramRef}>
                    {/* Main AR Block */}
                    <Block
                      x={250}
                      y={150}
                      width={100}
                      height={60}
                      label="AR"
                      active={isActive("load") || isActive("increment")}
                    />

                    {/* Bit field visualization */}
                    <BitField
                      x={200}
                      y={240}
                      width={200}
                      height={30}
                      bits={12}
                      value={state.context.value}
                      showLabels={true}
                    />

                    {/* Input signals */}
                    <Arrow x1={150} y1={170} x2={250} y2={170} active={isActive("load")} label="LOAD" />

                    <Arrow x1={150} y1={190} x2={250} y2={190} active={isActive("clear")} label="CLR" />

                    <Arrow x1={300} y1={100} x2={300} y2={150} active={isActive("increment")} label="INC" />

                    {/* Output */}
                    <Arrow
                      x1={350}
                      y1={180}
                      x2={450}
                      y2={180}
                      active={isActive("load") || isActive("increment")}
                      label="OUT"
                    />

                    {/* Ports */}
                    <Port x={250} y={170} label="IN" active={isActive("load")} direction="in" />
                    <Port x={350} y={180} label="OUT" active={isActive("load")} direction="out" />
                  </Diagram>
                </CardContent>
              </Card>
            </div>

            {/* Control Panel */}
            <div className="space-y-6">
              <ControlPanel
                title="AR Controls"
                description="Load, clear, or increment the address register"
                onStep={() => send({ type: "INCREMENT" })}
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
                    bits={12}
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
                    <Button onClick={() => send({ type: "INCREMENT" })} className="w-full" variant="outline">
                      Increment (I)
                    </Button>
                  </div>
                </div>
              </ControlPanel>

              {/* Info Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Keyboard Shortcuts</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Load value</span>
                    <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono">L</kbd>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Clear</span>
                    <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono">C</kbd>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Increment</span>
                    <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono">I</kbd>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
