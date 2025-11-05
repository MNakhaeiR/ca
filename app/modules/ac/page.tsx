"use client"

import * as React from "react"
import { useMachine } from "@xstate/react"
import { AppToolbar } from "@/components/app-toolbar"
import { ControlPanel } from "@/components/control-panel"
import { StatusBar } from "@/components/status-bar"
import { HexInput } from "@/components/hex-input"
import { Diagram } from "@/components/svg/diagram"
import { Block } from "@/components/svg/block"
import { Arrow } from "@/components/svg/arrow"
import { BitField } from "@/components/svg/bit-field"
import { acMachine } from "@/machines/ac.machine"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ACPage() {
  const [state, send] = useMachine(acMachine)
  const [inputValue, setInputValue] = React.useState(0)
  const [operandValue, setOperandValue] = React.useState(0)

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return

      switch (e.key.toLowerCase()) {
        case "l":
          send({ type: "LOAD", value: inputValue })
          break
        case "c":
          send({ type: "CLEAR" })
          break
        case "i":
          send({ type: "INCREMENT" })
          break
        case "[":
          send({ type: "SHIFT_LEFT" })
          break
        case "]":
          send({ type: "SHIFT_RIGHT" })
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [send, inputValue])

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
                  <Diagram viewBox="0 0 700 450">
                    {/* ALU Block */}
                    <Block
                      x={200}
                      y={150}
                      width={100}
                      height={80}
                      label="ALU"
                      active={isActive("and") || isActive("or") || isActive("xor")}
                    />

                    {/* AC Block */}
                    <Block
                      x={350}
                      y={165}
                      width={100}
                      height={50}
                      label="AC"
                      active={isActive("load") || isActive("increment")}
                    />

                    {/* Bit field */}
                    <BitField
                      x={300}
                      y={280}
                      width={200}
                      height={30}
                      bits={16}
                      value={state.context.value}
                      showLabels={false}
                    />

                    {/* Input to ALU */}
                    <Arrow x1={100} y1={180} x2={200} y2={180} active={isActive("and") || isActive("or")} label="IN" />

                    {/* ALU to AC */}
                    <Arrow x1={300} y1={190} x2={350} y2={190} active={isActive("load")} label="LOAD" />

                    {/* AC output */}
                    <Arrow x1={450} y1={190} x2={550} y2={190} active={isActive("load")} label="OUT" />

                    {/* Shift operations */}
                    <Arrow x1={400} y1={120} x2={400} y2={165} active={isActive("shift")} label="SHIFT" />

                    {/* Flags output */}
                    <Arrow x1={400} y1={215} x2={400} y2={260} active={isActive("load")} label="FLAGS" />
                  </Diagram>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <ControlPanel
                title="AC Controls"
                description="Arithmetic and logic operations"
                onReset={() => send({ type: "CLEAR" })}
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
