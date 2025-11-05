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
import { trMachine } from "@/machines/tr.machine"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function TRPage() {
  const [state, send] = useMachine(trMachine)
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
                <h1 className="text-3xl font-bold">Temporary Register (TR)</h1>
                <Badge variant="outline">16-bit</Badge>
              </div>
              <p className="text-muted-foreground mt-2">
                Temporary storage for intermediate values during instruction execution
              </p>
            </div>
            <ExportMenu svgRef={diagramRef} state={state.context} moduleName="tr" />
          </div>

          <StatusBar
            registers={[{ name: "TR", value: state.context.value, bits: 16, format: "hex" }]}
            lastOperation={state.context.lastOperation}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Block Diagram</CardTitle>
                  <CardDescription>Temporary register for intermediate storage</CardDescription>
                </CardHeader>
                <CardContent>
                  <Diagram viewBox="0 0 600 400" ref={diagramRef}>
                    {/* TR Block */}
                    <Block x={250} y={150} width={100} height={60} label="TR" active={isActive("load")} />

                    {/* Bit field visualization */}
                    <BitField
                      x={200}
                      y={240}
                      width={200}
                      height={30}
                      bits={16}
                      value={state.context.value}
                      showLabels={false}
                    />

                    {/* Input signals */}
                    <Arrow x1={150} y1={170} x2={250} y2={170} active={isActive("load")} label="LOAD" />

                    <Arrow x1={150} y1={190} x2={250} y2={190} active={isActive("clear")} label="CLR" />

                    {/* Output */}
                    <Arrow x1={350} y1={180} x2={450} y2={180} active={isActive("load")} label="OUT" />
                  </Diagram>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <ControlPanel
                title="TR Controls"
                description="Load or clear the temporary register"
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

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">About TR</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-2">
                  <p>
                    The Temporary Register (TR) is used to hold intermediate values during multi-cycle instruction
                    execution.
                  </p>
                  <p>
                    It&apos;s particularly useful for operations that require multiple memory accesses or complex
                    arithmetic operations.
                  </p>
                </CardContent>
              </Card>

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
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
