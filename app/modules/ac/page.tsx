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
import { Label } from "@/components/svg/label"
import { BitField } from "@/components/svg/bit-field"
import { acMachine } from "@/machines/ac.machine"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { loadStateFromURL } from "@/lib/export"
import { useToast } from "@/hooks/use-toast"

export default function ACPage() {
  const [state, send] = useMachine(acMachine)
  const [inputValue, setInputValue] = React.useState(0)
  const [operandValue, setOperandValue] = React.useState(0)
  const [autoRun, setAutoRun] = React.useState(false)
  const [speed, setSpeed] = React.useState(500)
  const diagramRef = React.useRef<SVGSVGElement>(null)
  const { toast } = useToast()

  // Load state from URL on mount
  React.useEffect(() => {
    const sharedState = loadStateFromURL()
    if (sharedState && sharedState.module === "ac") {
      try {
        // Restore context if available
        if (sharedState.context && typeof sharedState.context === 'object') {
          const ctx = sharedState.context as any
          if (typeof ctx.value === 'number') {
            send({ type: "LOAD", value: ctx.value })
          }
        }
        
        // Restore UI state
        if (typeof sharedState.inputValue === 'number') setInputValue(sharedState.inputValue)
        if (typeof sharedState.operandValue === 'number') setOperandValue(sharedState.operandValue)
        if (typeof sharedState.speed === 'number') setSpeed(sharedState.speed)
        
        toast({
          title: "State loaded",
          description: "Shared state has been restored",
        })
      } catch (error) {
        console.error("Failed to restore state:", error)
      }
    }
  }, [send, toast])

  // Auto-run effect - automatically increment
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
        case "[":
          e.preventDefault()
          send({ type: "SHIFT_LEFT" })
          break
        case "]":
          e.preventDefault()
          send({ type: "SHIFT_RIGHT" })
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
                <h1 className="text-3xl font-bold">Accumulator (AC)</h1>
                <Badge variant="outline">16-bit</Badge>
              </div>
              <p className="text-muted-foreground mt-2">
                General-purpose register with ALU operations and flag computation
              </p>
            </div>
            <ExportMenu 
              svgRef={diagramRef} 
              state={state.context} 
              moduleName="ac"
              fullState={{
                value: state.value,
                context: state.context,
                status: state.status,
                tags: Array.from(state.tags || []),
                historyValue: state.historyValue,
                inputValue,
                operandValue,
                autoRun,
                speed
              }}
            />
          </div>

          <StatusBar
            registers={[{ name: "AC", value: state.context.value, bits: 16, format: "hex" }]}
            flags={state.context.flags}
            lastOperation={state.context.lastOperation}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Block Diagram with ALU</CardTitle>
                  <CardDescription>Accumulator with arithmetic and logic operations</CardDescription>
                </CardHeader>
                <CardContent>
                  <Diagram viewBox="0 0 700 500" ref={diagramRef}>
                    {/* Title */}
                    <Label x={350} y={30} text="Accumulator Architecture" className="fill-muted-foreground font-semibold" background backgroundPadding={8} />

                    {/* ALU Block */}
                    <Block
                      x={200}
                      y={180}
                      width={100}
                      height={80}
                      label="ALU"
                      active={isActive("and") || isActive("or") || isActive("xor")}
                    />
                    <Label x={250} y={305} text="Logic & Arith" className="text-xs fill-muted-foreground" background />

                    {/* AC Block */}
                    <Block
                      x={370}
                      y={195}
                      width={100}
                      height={50}
                      label="AC"
                      active={isActive("load") || isActive("increment")}
                    />

                    {/* Bit field */}
                    <BitField
                      x={300}
                      y={350}
                      width={200}
                      height={30}
                      bits={16}
                      value={state.context.value}
                      showLabels={false}
                    />
                    <Label x={400} y={420} text={`Value: 0x${state.context.value.toString(16).padStart(4, "0").toUpperCase()}`} className="text-sm fill-foreground" mono background />

                    {/* Input to ALU */}
                    <Arrow x1={80} y1={220} x2={200} y2={220} active={isActive("and") || isActive("or")} label="DATA IN" />

                    {/* ALU to AC */}
                    <Arrow x1={300} y1={220} x2={370} y2={220} active={isActive("load")} label="RESULT" />

                    {/* AC output */}
                    <Arrow x1={470} y1={220} x2={590} y2={220} active={isActive("load")} label="DATA OUT" />

                    {/* Shift operations */}
                    <Arrow x1={420} y1={130} x2={420} y2={195} active={isActive("shift")} label="SHIFT" />

                    {/* Flags output */}
                    <Arrow x1={420} y1={245} x2={420} y2={320} active={isActive("load")} label="FLAGS" />

                    {/* Status */}
                    <Label x={100} y={380} text={`Operation: ${state.context.lastOperation || "IDLE"}`} className="text-sm fill-muted-foreground" mono background />
                  </Diagram>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <ControlPanel
                title="AC Controls"
                description="Arithmetic and logic operations"
                onStep={() => send({ type: "INCREMENT" })}
                onReset={() => send({ type: "CLEAR" })}
                onAutoRun={setAutoRun}
                onSpeedChange={setSpeed}
                autoRun={autoRun}
                speed={speed}
              >
                <Tabs defaultValue="basic" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="basic">Basic</TabsTrigger>
                    <TabsTrigger value="alu">ALU</TabsTrigger>
                  </TabsList>

                  <TabsContent value="basic" className="space-y-4">
                    <HexInput
                      label="Value"
                      value={inputValue}
                      bits={16}
                      onChange={setInputValue}
                      onSubmit={() => send({ type: "LOAD", value: inputValue })}
                    />

                    <div className="space-y-2">
                      <Button onClick={() => send({ type: "LOAD", value: inputValue })} className="w-full">
                        Load (L)
                      </Button>
                      <Button onClick={() => send({ type: "CLEAR" })} className="w-full" variant="outline">
                        Clear (C)
                      </Button>
                      <Button onClick={() => send({ type: "INCREMENT" })} className="w-full" variant="outline">
                        Increment (I)
                      </Button>
                      <Button onClick={() => send({ type: "COMPLEMENT" })} className="w-full" variant="outline">
                        Complement
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="alu" className="space-y-4">
                    <HexInput label="Operand" value={operandValue} bits={16} onChange={setOperandValue} />

                    <div className="space-y-2">
                      <Button
                        onClick={() => send({ type: "AND", value: operandValue })}
                        className="w-full"
                        variant="outline"
                      >
                        AND
                      </Button>
                      <Button
                        onClick={() => send({ type: "OR", value: operandValue })}
                        className="w-full"
                        variant="outline"
                      >
                        OR
                      </Button>
                      <Button
                        onClick={() => send({ type: "XOR", value: operandValue })}
                        className="w-full"
                        variant="outline"
                      >
                        XOR
                      </Button>
                      <Button onClick={() => send({ type: "SHIFT_LEFT" })} className="w-full" variant="outline">
                        Shift Left ([)
                      </Button>
                      <Button onClick={() => send({ type: "SHIFT_RIGHT" })} className="w-full" variant="outline">
                        Shift Right (])
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </ControlPanel>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Flags</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Z (Zero)</span>
                    <Badge variant={state.context.flags.Z ? "default" : "outline"}>
                      {state.context.flags.Z ? "1" : "0"}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">N (Negative)</span>
                    <Badge variant={state.context.flags.N ? "default" : "outline"}>
                      {state.context.flags.N ? "1" : "0"}
                    </Badge>
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
