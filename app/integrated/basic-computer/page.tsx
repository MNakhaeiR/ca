"use client"

import * as React from "react"
import { useMachine } from "@xstate/react"
import { AppToolbar } from "@/components/app-toolbar"
import { ControlPanel } from "@/components/control-panel"
import { StatusBar } from "@/components/status-bar"
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

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Main Diagram */}
            <div className="xl:col-span-3 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>System Architecture</CardTitle>
                  <CardDescription>Complete Basic Computer with all registers and memory</CardDescription>
                </CardHeader>
                <CardContent>
                  <Diagram viewBox="0 0 1000 750">
                    {/* Section Labels */}
                    <Label x={500} y={50} text="REGISTERS" className="fill-muted-foreground font-semibold" />
                    <Label x={200} y={480} text="CONTROL & ALU" className="fill-muted-foreground font-semibold" />

                    {/* Common Bus - positioned lower to avoid overlaps */}
                    <BusLine
                      x1={100}
                      y1={400}
                      x2={900}
                      y2={400}
                      active={isExecuting}
                      label="COMMON BUS [15:0]"
                      orientation="horizontal"
                      labelPosition="bottom"
                    />

                    {/* Registers - Top Row with better spacing */}
                    <Block
                      x={80}
                      y={100}
                      width={90}
                      height={60}
                      label="PC"
                      active={state.context.sc === 0 || state.context.sc === 1}
                    />
                    <Arrow x1={125} y1={160} x2={125} y2={400} active={isExecuting} labelOffset={-15} />

                    <Block
                      x={200}
                      y={100}
                      width={90}
                      height={60}
                      label="AR"
                      active={state.context.sc === 0 || state.context.sc === 2}
                    />
                    <Arrow x1={245} y1={160} x2={245} y2={400} active={isExecuting} labelOffset={-15} />

                    <Block x={320} y={100} width={90} height={60} label="IR" active={state.context.sc === 1} />
                    <Arrow x1={365} y1={160} x2={365} y2={400} active={isExecuting} labelOffset={-15} />

                    <Block x={440} y={100} width={90} height={60} label="DR" active={state.context.sc === 3} />
                    <Arrow x1={485} y1={160} x2={485} y2={400} active={isExecuting} labelOffset={-15} />

                    <Block x={560} y={100} width={90} height={60} label="AC" active={state.context.sc === 3} />
                    <Arrow x1={605} y1={160} x2={605} y2={400} active={isExecuting} labelOffset={-15} />

                    <Block x={680} y={100} width={90} height={60} label="TR" />
                    <Arrow x1={725} y1={160} x2={725} y2={400} active={false} labelOffset={-15} />

                    {/* Memory - positioned with more space */}
                    <Block
                      x={810}
                      y={100}
                      width={110}
                      height={90}
                      label="MEMORY"
                      active={state.context.sc === 1 || state.context.sc === 3}
                    />
                    <Label x={865} y={150} text="4K x 16" className="text-xs fill-muted-foreground" mono />
                    <Arrow x1={865} y1={190} x2={865} y2={400} active={isExecuting} labelOffset={-15} />

                    {/* Control Unit - better positioned */}
                    <Block x={80} y={520} width={140} height={90} label="CONTROL" active={isExecuting} />
                    <Label x={150} y={570} text={`SC: T${state.context.sc}`} className="text-sm fill-foreground" mono />

                    {/* ALU - separated from control */}
                    <Block x={260} y={520} width={120} height={90} label="ALU" active={state.context.sc === 3} />

                    {/* I/O Registers - better spacing */}
                    <Block x={420} y={520} width={90} height={40} label="INPR" />
                    <Block x={420} y={570} width={90} height={40} label="OUTR" />

                    {/* Flags - clearly separated */}
                    <Block x={550} y={520} width={60} height={40} label="E" active={state.context.e === 1} />
                    <Block x={550} y={570} width={60} height={40} label="I" active={state.context.i === 1} />

                    {/* Status indicators */}
                    <Label
                      x={700}
                      y={540}
                      text={`Opcode: ${state.context.opcode}`}
                      className="text-sm fill-muted-foreground"
                      mono
                      background
                    />
                    <Label
                      x={700}
                      y={570}
                      text={`Indirect: ${state.context.indirect ? "Yes" : "No"}`}
                      className="text-sm fill-muted-foreground"
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
                  <ScrollArea className="h-[200px]">
                    <div className="space-y-2">
                      {state.context.microOpHistory.length === 0 ? (
                        <p className="text-sm text-muted-foreground text-center py-8">
                          No operations yet. Load a program and step through execution.
                        </p>
                      ) : (
                        state.context.microOpHistory.map((op, i) => (
                          <div key={i} className="flex items-center gap-3 p-2 rounded bg-muted/50 font-mono text-sm">
                            <Badge variant="outline" className="shrink-0">
                              {i + 1}
                            </Badge>
                            <span>{op}</span>
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
