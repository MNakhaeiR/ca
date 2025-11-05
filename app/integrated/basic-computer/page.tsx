"use client"

import * as React from "react"
import { useMachine } from "@xstate/react"
import { AppToolbar } from "@/components/app-toolbar"
import { ControlPanel } from "@/components/control-panel"
import { StatusBar } from "@/components/status-bar"
import { ExportMenu } from "@/components/export-menu"
import { Diagram } from "@/components/svg/diagram"
import { Block } from "@/components/svg/block"
import { Arrow } from "@/components/svg/arrow"
import { Bus as BusLine } from "@/components/svg/bus"
import { Label } from "@/components/svg/label"
import { basicComputerMachine } from "@/machines/basic-computer.machine"
import { samplePrograms } from "@/lib/sample-programs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Play, Pause } from "lucide-react"

export default function BasicComputerPage() {
  const [state, send] = useMachine(basicComputerMachine)
  const [selectedProgram, setSelectedProgram] = React.useState<string>("")
  const diagramRef = React.useRef<SVGSVGElement>(null)

  // Auto-run effect
  React.useEffect(() => {
    if (state.context.autoRun && !state.context.halted) {
      const timer = setInterval(() => {
        send({ type: "STEP" })
      }, state.context.intervalMs)
      return () => clearInterval(timer)
    }
  }, [state.context.autoRun, state.context.halted, state.context.intervalMs, send])

  // Keyboard shortcuts
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return

      switch (e.key.toLowerCase()) {
        case " ":
        case "enter":
          e.preventDefault()
          send({ type: "STEP" })
          break
        case "a":
          send({ type: "SET_AUTO_RUN", enabled: !state.context.autoRun })
          break
        case "r":
          send({ type: "RESET" })
          break
        case "h":
          if (state.context.halted) {
            send({ type: "RESUME" })
          } else {
            send({ type: "HALT" })
          }
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [send, state.context.autoRun, state.context.halted])

  const handleLoadProgram = (programName: string) => {
    const program = samplePrograms.find((p) => p.name === programName)
    if (program) {
      send({ type: "LOAD_PROGRAM", program: program.code })
      setSelectedProgram(programName)
    }
  }

  const isExecuting = !state.matches("idle")

  return (
    <div className="min-h-screen flex flex-col">
      <AppToolbar />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-[1800px] mx-auto space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold">Basic Computer</h1>
                <Badge variant={state.context.halted ? "destructive" : "default"}>
                  {state.context.halted ? "Halted" : "Running"}
                </Badge>
              </div>
              <p className="text-muted-foreground mt-2">
                Complete Morris Mano Basic Computer with all components integrated
              </p>
            </div>
            <ExportMenu svgRef={diagramRef} state={state.context} moduleName="basic-computer" />
          </div>

          <StatusBar
            registers={[
              { name: "PC", value: state.context.pc, bits: 12, format: "hex" },
              { name: "AR", value: state.context.ar, bits: 12, format: "hex" },
              { name: "IR", value: state.context.ir, bits: 16, format: "hex" },
              { name: "AC", value: state.context.ac, bits: 16, format: "hex" },
              { name: "DR", value: state.context.dr, bits: 16, format: "hex" },
            ]}
            flags={state.context.flags}
            lastOperation={state.context.currentMicroOp}
          />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Main Diagram */}
            <div className="lg:col-span-3 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>System Architecture</CardTitle>
                  <CardDescription>Complete Basic Computer with all registers and memory</CardDescription>
                </CardHeader>
                <CardContent>
                  <Diagram viewBox="0 0 1000 800" ref={diagramRef}>
                    {/* Section Labels with backgrounds */}
                    <Label x={500} y={30} text="REGISTERS" className="fill-muted-foreground font-semibold text-base" background backgroundPadding={8} />
                    <Label x={200} y={500} text="CONTROL & ALU" className="fill-muted-foreground font-semibold" background backgroundPadding={8} />

                    {/* Common Bus - positioned lower to avoid overlaps */}
                    <BusLine
                      x1={100}
                      y1={420}
                      x2={900}
                      y2={420}
                      active={isExecuting}
                      label="COMMON BUS [15:0]"
                      orientation="horizontal"
                      labelPosition="bottom"
                    />

                    {/* Registers - Top Row with better spacing */}
                    <Block
                      x={70}
                      y={80}
                      width={90}
                      height={60}
                      label="PC"
                      active={state.context.sc === 0 || state.context.sc === 1}
                    />
                    <Label x={115} y={160} text="12-bit" className="text-xs fill-muted-foreground" mono background />
                    <Arrow x1={115} y1={185} x2={115} y2={420} active={isExecuting} />

                    <Block
                      x={190}
                      y={80}
                      width={90}
                      height={60}
                      label="AR"
                      active={state.context.sc === 0 || state.context.sc === 2}
                    />
                    <Label x={235} y={160} text="12-bit" className="text-xs fill-muted-foreground" mono background />
                    <Arrow x1={235} y1={185} x2={235} y2={420} active={isExecuting} />

                    <Block x={310} y={80} width={90} height={60} label="IR" active={state.context.sc === 1} />
                    <Label x={355} y={160} text="16-bit" className="text-xs fill-muted-foreground" mono background />
                    <Arrow x1={355} y1={185} x2={355} y2={420} active={isExecuting} />

                    <Block x={430} y={80} width={90} height={60} label="DR" active={state.context.sc === 3} />
                    <Label x={475} y={160} text="16-bit" className="text-xs fill-muted-foreground" mono background />
                    <Arrow x1={475} y1={185} x2={475} y2={420} active={isExecuting} />

                    <Block x={550} y={80} width={90} height={60} label="AC" active={state.context.sc === 3} />
                    <Label x={595} y={160} text="16-bit" className="text-xs fill-muted-foreground" mono background />
                    <Arrow x1={595} y1={185} x2={595} y2={420} active={isExecuting} />

                    <Block x={670} y={80} width={90} height={60} label="TR" />
                    <Label x={715} y={160} text="16-bit" className="text-xs fill-muted-foreground" mono background />
                    <Arrow x1={715} y1={185} x2={715} y2={420} active={false} />

                    {/* Memory - positioned with more space */}
                    <Block
                      x={800}
                      y={80}
                      width={110}
                      height={100}
                      label="MEMORY"
                      active={state.context.sc === 1 || state.context.sc === 3}
                    />
                    <Label x={855} y={135} text="4K x 16" className="text-xs fill-muted-foreground" mono background />
                    <Arrow x1={855} y1={195} x2={855} y2={420} active={isExecuting} />

                    {/* Control Unit - better positioned */}
                    <Block x={70} y={540} width={150} height={100} label="CONTROL" active={isExecuting} />
                    <Label x={145} y={595} text={`SC: T${state.context.sc}`} className="text-base fill-foreground font-semibold" mono background />

                    {/* ALU - separated from control */}
                    <Block x={260} y={540} width={130} height={100} label="ALU" active={state.context.sc === 3} />
                    <Label x={325} y={595} text="Arithmetic" className="text-xs fill-muted-foreground" background />

                    {/* I/O Registers - better spacing */}
                    <Block x={430} y={540} width={90} height={45} label="INPR" />
                    <Label x={475} y={620} text="8-bit" className="text-xs fill-muted-foreground" mono background />
                    
                    <Block x={430} y={595} width={90} height={45} label="OUTR" />
                    <Label x={475} y={665} text="8-bit" className="text-xs fill-muted-foreground" mono background />

                    {/* Flags - clearly separated */}
                    <Block x={560} y={540} width={60} height={45} label="E" active={state.context.e === 1} />
                    <Label x={590} y={610} text="Carry" className="text-xs fill-muted-foreground" background />
                    
                    <Block x={560} y={595} width={60} height={45} label="I" active={state.context.i === 1} />
                    <Label x={590} y={665} text="Int" className="text-xs fill-muted-foreground" background />

                    {/* Status indicators with backgrounds to prevent overlap */}
                    <Label
                      x={730}
                      y={560}
                      text={`Opcode: ${state.context.opcode.toString(16).toUpperCase()}`}
                      className="text-sm fill-foreground"
                      mono
                      background
                    />
                    <Label
                      x={730}
                      y={600}
                      text={`Addr: 0x${state.context.address.toString(16).padStart(3, "0").toUpperCase()}`}
                      className="text-sm fill-foreground"
                      mono
                      background
                    />
                    <Label
                      x={730}
                      y={640}
                      text={`Indirect: ${state.context.indirect ? "Yes" : "No"}`}
                      className="text-sm fill-foreground"
                      mono
                      background
                    />
                  </Diagram>
                </CardContent>
              </Card>

              {/* Micro-operations Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle>Micro-Operations Timeline</CardTitle>
                  <CardDescription>Step-by-step execution history</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[200px] w-full">
                    <div className="space-y-2 pr-4">
                      {state.context.microOpHistory.length === 0 ? (
                        <p className="text-sm text-muted-foreground text-center py-8">
                          No operations yet. Load a program and step through execution.
                        </p>
                      ) : (
                        state.context.microOpHistory.map((op, i) => (
                          <div
                            key={i}
                            className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 p-3 rounded bg-muted/50 hover:bg-muted/70 transition-colors"
                          >
                            <Badge variant="outline" className="shrink-0 w-fit">
                              Step {i + 1}
                            </Badge>
                            <span className="font-mono text-xs sm:text-sm break-all">{op}</span>
                          </div>
                        ))
                      )}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>

            {/* Control Panel */}
            <div className="space-y-6">
              <ControlPanel
                title="Execution Controls"
                description="Step through or auto-run programs"
                onStep={() => send({ type: "STEP" })}
                onReset={() => send({ type: "RESET" })}
                onAutoRun={(enabled) => send({ type: "SET_AUTO_RUN", enabled })}
                onSpeedChange={(ms) => send({ type: "SET_SPEED", ms })}
                autoRun={state.context.autoRun}
                speed={state.context.intervalMs}
              >
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Button
                      onClick={() => (state.context.halted ? send({ type: "RESUME" }) : send({ type: "HALT" }))}
                      variant={state.context.halted ? "default" : "destructive"}
                      className="flex-1"
                    >
                      {state.context.halted ? <Play className="mr-2 h-4 w-4" /> : <Pause className="mr-2 h-4 w-4" />}
                      {state.context.halted ? "Resume" : "Halt"}
                    </Button>
                  </div>
                </div>
              </ControlPanel>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Load Sample Program</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Select value={selectedProgram} onValueChange={handleLoadProgram}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a program..." />
                    </SelectTrigger>
                    <SelectContent>
                      {samplePrograms.map((program) => (
                        <SelectItem key={program.name} value={program.name}>
                          {program.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {selectedProgram && (
                    <p className="text-sm text-muted-foreground">
                      {samplePrograms.find((p) => p.name === selectedProgram)?.description}
                    </p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Keyboard Shortcuts</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Step</span>
                    <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono">Space</kbd>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Auto-run</span>
                    <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono">A</kbd>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Reset</span>
                    <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono">R</kbd>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Halt/Resume</span>
                    <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono">H</kbd>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Current State</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Timing State</span>
                    <Badge>T{state.context.sc}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Machine State</span>
                    <Badge variant="outline">{state.value.toString()}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Opcode</span>
                    <Badge variant="outline">{state.context.opcode}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Indirect</span>
                    <Badge variant={state.context.indirect ? "default" : "outline"}>
                      {state.context.indirect ? "Yes" : "No"}
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
