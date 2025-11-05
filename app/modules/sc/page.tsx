"use client"

import * as React from "react"
import { useMachine } from "@xstate/react"
import { AppToolbar } from "@/components/app-toolbar"
import { ControlPanel } from "@/components/control-panel"
import { StatusBar } from "@/components/status-bar"
import { Diagram } from "@/components/svg/diagram"
import { Block } from "@/components/svg/block"
import { Arrow } from "@/components/svg/arrow"
import { BitField } from "@/components/svg/bit-field"
import { scMachine } from "@/machines/sc.machine"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function SCPage() {
  const [state, send] = useMachine(scMachine)
  const [inputValue, setInputValue] = React.useState(0)

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return

      switch (e.key.toLowerCase()) {
        case "c":
          send({ type: "CLEAR" })
          break
        case "i":
          send({ type: "INCREMENT" })
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [send])

  const isActive = (signal: string) => state.context.activeSignal === signal

  return (
    <div className="min-h-screen flex flex-col">
      <AppToolbar />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold">Sequence Counter (SC)</h1>
                <Badge variant="outline">4-bit</Badge>
              </div>
              <p className="text-muted-foreground mt-2">Tracks timing states (T0-T15) during instruction execution</p>
            </div>
          </div>

          <StatusBar
            registers={[
              { name: "SC", value: state.context.value, bits: 4, format: "decimal" },
              { name: "State", value: state.context.value, bits: 4, format: "hex" },
            ]}
            lastOperation={state.context.lastOperation}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Block Diagram</CardTitle>
                  <CardDescription>4-bit counter for timing control</CardDescription>
                </CardHeader>
                <CardContent>
                  <Diagram viewBox="0 0 600 400">
                    <Block
                      x={250}
                      y={150}
                      width={100}
                      height={60}
                      label="SC"
                      active={isActive("increment") || isActive("set")}
                    />

                    <BitField
                      x={225}
                      y={240}
                      width={150}
                      height={30}
                      bits={4}
                      value={state.context.value}
                      showLabels={true}
                    />

                    <Arrow x1={150} y1={170} x2={250} y2={170} active={isActive("clear")} label="CLR" />

                    <Arrow x1={300} y1={100} x2={300} y2={150} active={isActive("increment")} label="INC" />

                    <Arrow
                      x1={350}
                      y1={180}
                      x2={450}
                      y2={180}
                      active={isActive("increment")}
                      label="T{state.context.value}"
                    />
                  </Diagram>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Timing States</CardTitle>
                  <CardDescription>Current state: T{state.context.value}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-4 gap-2">
                    {Array.from({ length: 16 }, (_, i) => (
                      <Badge
                        key={i}
                        variant={state.context.value === i ? "default" : "outline"}
                        className="justify-center"
                      >
                        T{i}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <ControlPanel
                title="SC Controls"
                description="Control the sequence counter"
                onReset={() => send({ type: "CLEAR" })}
              >
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="sc-value">Set Value (0-15)</Label>
                    <Input
                      id="sc-value"
                      type="number"
                      min={0}
                      max={15}
                      value={inputValue}
                      onChange={(e) => setInputValue(Number.parseInt(e.target.value) || 0)}
                      className="font-mono"
                    />
                  </div>

                  <div className="space-y-2">
                    <Button
                      onClick={() => send({ type: "SET", value: inputValue })}
                      className="w-full"
                      variant="default"
                    >
                      Set Value
                    </Button>
                    <Button onClick={() => send({ type: "INCREMENT" })} className="w-full" variant="default">
                      Increment (I)
                    </Button>
                    <Button onClick={() => send({ type: "CLEAR" })} className="w-full" variant="outline">
                      Clear (C)
                    </Button>
                  </div>
                </div>
              </ControlPanel>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">About SC</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-2">
                  <p>The Sequence Counter tracks timing states during instruction execution cycles.</p>
                  <p>T0-T2 are typically used for fetch, while T3+ handle execute phases based on the instruction.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
