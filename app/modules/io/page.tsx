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
import { ioMachine } from "@/machines/io.machine"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

export default function IOPage() {
  const [state, send] = useMachine(ioMachine)
  const [inprValue, setInprValue] = React.useState(0)
  const [outrValue, setOutrValue] = React.useState(0)
  const [autoRun, setAutoRun] = React.useState(false)
  const [speed, setSpeed] = React.useState(500)
  const diagramRef = React.useRef<SVGSVGElement>(null)

  // Auto-run effect - automatically load INPR
  React.useEffect(() => {
    if (autoRun) {
      const timer = setInterval(() => {
        send({ type: "LOAD_INPR", value: inprValue })
      }, speed)
      return () => clearInterval(timer)
    }
  }, [autoRun, speed, send, inprValue])

  const isActive = (signal: string) => state.context.activeSignal === signal

  return (
    <div className="min-h-screen flex flex-col">
      <AppToolbar />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold">I/O and Flag Registers</h1>
                <div className="flex gap-2">
                  <Badge variant="outline">INPR: 8-bit</Badge>
                  <Badge variant="outline">OUTR: 8-bit</Badge>
                  <Badge variant="outline">E, I: 1-bit</Badge>
                </div>
              </div>
              <p className="text-muted-foreground mt-2">
                Input/Output registers and flag bits (E: Carry, I: Interrupt Enable)
              </p>
            </div>
            <ExportMenu svgRef={diagramRef} state={state.context} moduleName="io" />
          </div>

          <StatusBar
            registers={[
              { name: "INPR", value: state.context.inpr, bits: 8, format: "hex" },
              { name: "OUTR", value: state.context.outr, bits: 8, format: "hex" },
              { name: "E", value: state.context.e, bits: 1, format: "decimal" },
              { name: "I", value: state.context.i, bits: 1, format: "decimal" },
            ]}
            lastOperation={state.context.lastOperation}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Block Diagram</CardTitle>
                  <CardDescription>I/O registers and flag bits</CardDescription>
                </CardHeader>
                <CardContent>
                  <Diagram viewBox="0 0 700 500" ref={diagramRef}>
                    {/* INPR Block */}
                    <Block x={100} y={150} width={100} height={50} label="INPR" active={isActive("inpr")} />
                    <BitField
                      x={75}
                      y={220}
                      width={150}
                      height={25}
                      bits={8}
                      value={state.context.inpr}
                      showLabels={false}
                    />

                    {/* OUTR Block */}
                    <Block x={300} y={150} width={100} height={50} label="OUTR" active={isActive("outr")} />
                    <BitField
                      x={275}
                      y={220}
                      width={150}
                      height={25}
                      bits={8}
                      value={state.context.outr}
                      showLabels={false}
                    />

                    {/* E Flag */}
                    <Block x={500} y={150} width={80} height={50} label="E" active={isActive("e")} />
                    <text x={540} y={230} textAnchor="middle" className="fill-foreground font-mono text-2xl font-bold">
                      {state.context.e}
                    </text>

                    {/* I Flag */}
                    <Block x={500} y={300} width={80} height={50} label="I" active={isActive("i")} />
                    <text x={540} y={380} textAnchor="middle" className="fill-foreground font-mono text-2xl font-bold">
                      {state.context.i}
                    </text>

                    {/* Input arrows */}
                    <Arrow x1={50} y1={175} x2={100} y2={175} active={isActive("inpr")} label="IN" />
                    <Arrow x1={250} y1={175} x2={300} y2={175} active={isActive("outr")} label="LOAD" />

                    {/* Output arrows */}
                    <Arrow x1={200} y1={175} x2={250} y2={175} active={isActive("inpr")} label="OUT" />
                    <Arrow x1={400} y1={175} x2={450} y2={175} active={isActive("outr")} label="OUT" />
                  </Diagram>
                </CardContent>
              </Card>

              <div className="grid grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">E Flag (Carry)</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Current Value</span>
                      <Badge variant={state.context.e === 1 ? "default" : "outline"} className="text-lg px-4">
                        {state.context.e}
                      </Badge>
                    </div>
                    <Separator />
                    <p className="text-sm text-muted-foreground">
                      The E (Extended) flag stores the carry bit from arithmetic operations and is used in circular
                      shift operations.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">I Flag (Interrupt)</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Current Value</span>
                      <Badge variant={state.context.i === 1 ? "default" : "outline"} className="text-lg px-4">
                        {state.context.i}
                      </Badge>
                    </div>
                    <Separator />
                    <p className="text-sm text-muted-foreground">
                      The I flag enables or disables interrupt handling. When set to 1, interrupts are enabled.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="space-y-6">
              <ControlPanel
                title="I/O Controls"
                description="Control I/O registers and flags"
                onStep={() => send({ type: "LOAD_INPR", value: inprValue })}
                onReset={() => send({ type: "CLEAR_OUTR" })}
                onAutoRun={setAutoRun}
                onSpeedChange={setSpeed}
                autoRun={autoRun}
                speed={speed}
              >
                <Tabs defaultValue="io" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="io">I/O</TabsTrigger>
                    <TabsTrigger value="flags">Flags</TabsTrigger>
                  </TabsList>

                  <TabsContent value="io" className="space-y-4">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>INPR (Input)</Label>
                        <HexInput label="" value={inprValue} bits={8} onChange={setInprValue} />
                        <Button
                          onClick={() => send({ type: "LOAD_INPR", value: inprValue })}
                          className="w-full"
                          variant="default"
                        >
                          Load INPR
                        </Button>
                      </div>

                      <Separator />

                      <div className="space-y-2">
                        <Label>OUTR (Output)</Label>
                        <HexInput label="" value={outrValue} bits={8} onChange={setOutrValue} />
                        <div className="grid grid-cols-2 gap-2">
                          <Button onClick={() => send({ type: "LOAD_OUTR", value: outrValue })} variant="default">
                            Load
                          </Button>
                          <Button onClick={() => send({ type: "CLEAR_OUTR" })} variant="outline">
                            Clear
                          </Button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="flags" className="space-y-4">
                    <div className="space-y-4">
                      <Card>
                        <CardContent className="pt-6 space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label htmlFor="e-flag">E Flag (Carry)</Label>
                              <p className="text-xs text-muted-foreground">Extended accumulator bit</p>
                            </div>
                            <Switch
                              id="e-flag"
                              checked={state.context.e === 1}
                              onCheckedChange={(checked) => send({ type: "SET_E", value: checked ? 1 : 0 })}
                            />
                          </div>
                          <Button onClick={() => send({ type: "TOGGLE_E" })} className="w-full" variant="outline">
                            Toggle E
                          </Button>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="pt-6 space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label htmlFor="i-flag">I Flag (Interrupt)</Label>
                              <p className="text-xs text-muted-foreground">Interrupt enable/disable</p>
                            </div>
                            <Switch
                              id="i-flag"
                              checked={state.context.i === 1}
                              onCheckedChange={(checked) => send({ type: "SET_I", value: checked ? 1 : 0 })}
                            />
                          </div>
                          <Button onClick={() => send({ type: "TOGGLE_I" })} className="w-full" variant="outline">
                            Toggle I
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                </Tabs>
              </ControlPanel>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Register Info</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">INPR</span>
                    <span className="font-mono">8-bit input</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">OUTR</span>
                    <span className="font-mono">8-bit output</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">E</span>
                    <span className="font-mono">1-bit carry</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">I</span>
                    <span className="font-mono">1-bit interrupt</span>
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
