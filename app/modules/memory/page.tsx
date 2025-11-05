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
import { memoryMachine } from "@/machines/memory.machine"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { toHex } from "@/lib/utils"
import { Pencil } from "lucide-react"

export default function MemoryPage() {
  const [state, send] = useMachine(memoryMachine)
  const [address, setAddress] = React.useState(0)
  const [value, setValue] = React.useState(0)
  const [editAddress, setEditAddress] = React.useState<number | null>(null)
  const [editValue, setEditValue] = React.useState(0)

  const isActive = (signal: string) => state.context.activeSignal === signal

  const handleEdit = (addr: number) => {
    setEditAddress(addr)
    setEditValue(state.context.memory[addr] || 0)
  }

  const handleSaveEdit = () => {
    if (editAddress !== null) {
      send({ type: "WRITE", address: editAddress, value: editValue })
      setEditAddress(null)
    }
  }

  // Get non-zero memory locations for display
  const nonZeroMemory = React.useMemo(() => {
    return state.context.memory
      .map((value, index) => ({ address: index, value }))
      .filter((item) => item.value !== 0)
      .slice(0, 100) // Limit display
  }, [state.context.memory])

  return (
    <div className="min-h-screen flex flex-col">
      <AppToolbar />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold">Main Memory (MEM)</h1>
                <Badge variant="outline">4K x 16-bit</Badge>
              </div>
              <p className="text-muted-foreground mt-2">4096 words of 16-bit memory with read/write operations</p>
            </div>
          </div>

          <StatusBar
            registers={[
              { name: "Addr", value: state.context.lastAddress, bits: 12, format: "hex" },
              { name: "Data", value: state.context.lastValue, bits: 16, format: "hex" },
            ]}
            lastOperation={state.context.lastOperation}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Block Diagram</CardTitle>
                  <CardDescription>Memory array with address and data buses</CardDescription>
                </CardHeader>
                <CardContent>
                  <Diagram viewBox="0 0 700 400">
                    {/* Memory Block */}
                    <Block
                      x={250}
                      y={150}
                      width={200}
                      height={100}
                      label="MEMORY 4K x 16"
                      active={isActive("read") || isActive("write")}
                    />

                    {/* Address input */}
                    <Arrow
                      x1={150}
                      y1={180}
                      x2={250}
                      y2={180}
                      active={isActive("read") || isActive("write")}
                      label="ADDR[11:0]"
                    />

                    {/* Data input (write) */}
                    <Arrow x1={150} y1={220} x2={250} y2={220} active={isActive("write")} label="DATA_IN[15:0]" />

                    {/* Data output (read) */}
                    <Arrow x1={450} y1={200} x2={550} y2={200} active={isActive("read")} label="DATA_OUT[15:0]" />

                    {/* Control signals */}
                    <Arrow x1={350} y1={100} x2={350} y2={150} active={isActive("read")} label="READ" />
                    <Arrow x1={350} y1={250} x2={350} y2={300} active={isActive("write")} label="WRITE" />
                  </Diagram>
                </CardContent>
              </Card>

              {/* Memory Contents Table */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Memory Contents</CardTitle>
                      <CardDescription>Non-zero memory locations (showing first 100)</CardDescription>
                    </div>
                    <Badge variant="secondary">
                      {nonZeroMemory.length} / {state.context.size}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[400px]">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Address</TableHead>
                          <TableHead>Hex</TableHead>
                          <TableHead>Binary</TableHead>
                          <TableHead>Decimal</TableHead>
                          <TableHead className="w-[50px]"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {nonZeroMemory.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={5} className="text-center text-muted-foreground">
                              Memory is empty
                            </TableCell>
                          </TableRow>
                        ) : (
                          nonZeroMemory.map(({ address, value }) => (
                            <TableRow key={address}>
                              <TableCell className="font-mono">0x{toHex(address, 3)}</TableCell>
                              <TableCell className="font-mono">0x{toHex(value, 4)}</TableCell>
                              <TableCell className="font-mono text-xs">{value.toString(2).padStart(16, "0")}</TableCell>
                              <TableCell className="font-mono">{value}</TableCell>
                              <TableCell>
                                <Button variant="ghost" size="icon" onClick={() => handleEdit(address)}>
                                  <Pencil className="h-4 w-4" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <ControlPanel
                title="Memory Controls"
                description="Read, write, and manage memory"
                onReset={() => send({ type: "CLEAR_ALL" })}
              >
                <div className="space-y-4">
                  <HexInput label="Address" value={address} bits={12} onChange={setAddress} />

                  <HexInput label="Data" value={value} bits={16} onChange={setValue} />

                  <div className="space-y-2">
                    <Button onClick={() => send({ type: "READ", address })} className="w-full" variant="default">
                      Read
                    </Button>
                    <Button
                      onClick={() => send({ type: "WRITE", address, value })}
                      className="w-full"
                      variant="default"
                    >
                      Write
                    </Button>
                    <Button onClick={() => send({ type: "CLEAR_ALL" })} className="w-full" variant="outline">
                      Clear All
                    </Button>
                  </div>
                </div>
              </ControlPanel>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Memory Info</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Size</span>
                    <span className="font-mono">4096 words</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Word size</span>
                    <span className="font-mono">16 bits</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Address range</span>
                    <span className="font-mono">0x000 - 0xFFF</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Used</span>
                    <span className="font-mono">{nonZeroMemory.length} words</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      {/* Edit Dialog */}
      <Dialog open={editAddress !== null} onOpenChange={(open) => !open && setEditAddress(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Memory Location</DialogTitle>
            <DialogDescription>Address: 0x{editAddress !== null ? toHex(editAddress, 3) : "000"}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <HexInput label="Value" value={editValue} bits={16} onChange={setEditValue} />
            <div className="flex gap-2">
              <Button onClick={handleSaveEdit} className="flex-1">
                Save
              </Button>
              <Button onClick={() => setEditAddress(null)} variant="outline" className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
