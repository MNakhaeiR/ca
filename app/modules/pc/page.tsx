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
import { pcMachine, type NextPCSource } from "@/machines/pc.machine"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

export default function PCPage() {
  const [state, send] = useMachine(pcMachine)
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
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold">Program Counter (PC)</h1>
                <Badge variant="outline">12-bit</Badge>
              </div>
              <p className="text-muted-foreground mt-2">
                Tracks the address of the next instruction with MUX for branch control
              </p>
            </div>
            <ExportMenu svgRef={diagramRef} state={state.context} moduleName="pc" />
          </div>

          <StatusBar
            registers={[
              { name: "PC", value: state.context.value, bits: 12, format: "hex" },
              { name: "Next", value: state.context.value + 1, bits: 12, format: "hex" },
            ]}
            lastOperation={state.context.lastOperation}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Block Diagram with Next-PC MUX</CardTitle>
                  <CardDescription>Program counter with multiplexer for next address selection</CardDescription>
                </CardHeader>
                <CardContent>
                  <Diagram viewBox="0 0 700 450" ref={diagramRef}>
                    {/* PC Block */}
                    <Block
                      x={300}
                      y={200}
                      width={100}
                      height={60}
                      label="PC"
                      active={isActive("load") || isActive("increment")}
                    />

                    {/* MUX Block */}
                    <Block x={150} y={180} width={80} height={100} label="MUX" active={isActive("increment")} />

                    {/* Bit field */}
                    <BitField
                      x={250}
                      y={290}
                      width={200}
                      height={30}
                      bits={12}
                      value={state.context.value}
                      showLabels={true}
                    />

                    {/* MUX inputs */}
                    <Arrow
                      x1={50}
                      y1={190}
                      x2={150}
                      y2={190}
                      label="PC+1"
                      active={state.context.nextSource === "increment"}
                    />
                    <Arrow
                      x1={50}
                      y1={220}
                      x2={150}
                      y2={220}
                      label="Branch"
                      active={state.context.nextSource === "branch"}
                    />
                    <Arrow
                      x1={50}
                      y1={250}
                      x2={150}
                      y2={250}
                      label="Return"
                      active={state.context.nextSource === "return"}
                    />
                    <Arrow
                      x1={50}
                      y1={280}
                      x2={150}
                      y2={280}
                      label="INT"
                      active={state.context.nextSource === "interrupt"}
                    />

                    {/* MUX to PC */}
                    <Arrow x1={230} y1={230} x2={300} y2={230} active={isActive("load")} label="LOAD" />

                    {/* PC output */}
                    <Arrow x1={400} y1={230} x2={500} y2={230} active={isActive("increment")} label="OUT" />

                    {/* Increment feedback */}
                    <Arrow x1={350} y1={150} x2={350} y2={200} active={isActive("increment")} label="INC" />
                  </Diagram>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <ControlPanel
                title="PC Controls"
                description="Control program counter and next-PC source"
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
                    <Label>Next PC Source</Label>
                    <Select
                      value={state.context.nextSource}
                      onValueChange={(value) => send({ type: "SET_NEXT_SOURCE", source: value as NextPCSource })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="increment">PC + 1</SelectItem>
                        <SelectItem value="branch">Branch Target</SelectItem>
                        <SelectItem value="return">Return Address</SelectItem>
                        <SelectItem value="interrupt">Interrupt Vector</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

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

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Next-PC MUX</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  <p className="text-muted-foreground">
                    The multiplexer selects the next PC value from multiple sources:
                  </p>
                  <ul className="space-y-1 text-muted-foreground list-disc list-inside">
                    <li>PC+1: Sequential execution</li>
                    <li>Branch: Conditional/unconditional jump</li>
                    <li>Return: Subroutine return</li>
                    <li>Interrupt: Interrupt handler</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
