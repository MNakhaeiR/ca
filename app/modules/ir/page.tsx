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
import { Label as SvgLabel } from "@/components/svg/label"
import { irMachine } from "@/machines/ir.machine"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { toHex } from "@/lib/utils"

const OPCODES: Record<number, string> = {
  0: "AND",
  1: "ADD",
  2: "LDA",
  3: "STA",
  4: "BUN",
  5: "BSA",
  6: "ISZ",
  7: "I/O",
}

export default function IRPage() {
  const [state, send] = useMachine(irMachine)
  const [inputValue, setInputValue] = React.useState(0)

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
                <h1 className="text-3xl font-bold">Instruction Register (IR)</h1>
                <Badge variant="outline">16-bit</Badge>
              </div>
              <p className="text-muted-foreground mt-2">Holds and decodes the current instruction</p>
            </div>
          </div>

          <StatusBar
            registers={[
              { name: "IR", value: state.context.value, bits: 16, format: "hex" },
              { name: "Opcode", value: state.context.opcode, bits: 4, format: "hex" },
              { name: "Addr", value: state.context.address, bits: 12, format: "hex" },
            ]}
            lastOperation={state.context.lastOperation}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Block Diagram</CardTitle>
                  <CardDescription>Instruction register with decode logic</CardDescription>
                </CardHeader>
                <CardContent>
                  <Diagram viewBox="0 0 700 450">
                    {/* IR Block */}
                    <Block x={250} y={150} width={120} height={60} label="IR" active={isActive("load")} />

                    {/* Decoder Block */}
                    <Block x={250} y={250} width={120} height={50} label="DECODER" active={isActive("load")} />

                    {/* Input */}
                    <Arrow x1={150} y1={180} x2={250} y2={180} active={isActive("load")} label="LOAD" />

                    {/* IR to Decoder */}
                    <Arrow x1={310} y1={210} x2={310} y2={250} active={isActive("load")} />

                    {/* Decoded outputs */}
                    <Arrow x1={370} y1={260} x2={470} y2={260} active={isActive("load")} label="OPCODE" />
                    <Arrow x1={370} y1={280} x2={470} y2={280} active={isActive("load")} label="I" />
                    <Arrow x1={370} y1={300} x2={470} y2={300} active={isActive("load")} label="ADDR" />

                    {/* Labels */}
                    <SvgLabel x={310} y={360} text="15  14  13  12  11" mono />
                    <SvgLabel x={310} y={380} text="I   OPCODE   ADDRESS" mono />
                  </Diagram>
                </CardContent>
              </Card>

              {/* Instruction Format */}
              <Card>
                <CardHeader>
                  <CardTitle>Instruction Format</CardTitle>
                  <CardDescription>16-bit instruction breakdown</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="space-y-2">
                        <div className="font-medium">Bit 15 (I)</div>
                        <Badge variant={state.context.indirect ? "default" : "outline"}>
                          {state.context.indirect ? "Indirect" : "Direct"}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="font-medium">Bits 14-12 (Opcode)</div>
                        <div className="font-mono text-lg">{OPCODES[state.context.opcode] || "UNKNOWN"}</div>
                        <div className="text-xs text-muted-foreground">0x{toHex(state.context.opcode, 1)}</div>
                      </div>
                      <div className="space-y-2">
                        <div className="font-medium">Bits 11-0 (Address)</div>
                        <div className="font-mono text-lg">0x{toHex(state.context.address, 3)}</div>
                        <div className="text-xs text-muted-foreground">{state.context.address} decimal</div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <div className="font-medium text-sm">Binary Representation</div>
                      <div className="font-mono text-xs bg-muted p-3 rounded">
                        <span className={state.context.indirect ? "text-primary font-bold" : ""}>
                          {state.context.indirect ? "1" : "0"}
                        </span>{" "}
                        <span className="text-primary font-bold">
                          {state.context.opcode.toString(2).padStart(3, "0")}
                        </span>{" "}
                        <span>{state.context.address.toString(2).padStart(12, "0")}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <ControlPanel
                title="IR Controls"
                description="Load and decode instructions"
                onReset={() => send({ type: "CLEAR" })}
              >
                <div className="space-y-4">
                  <HexInput
                    label="Instruction"
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
                  <CardTitle className="text-base">Opcode Reference</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  {Object.entries(OPCODES).map(([code, name]) => (
                    <div key={code} className="flex justify-between items-center">
                      <span className="text-muted-foreground">{name}</span>
                      <Badge variant="outline" className="font-mono">
                        {code}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
