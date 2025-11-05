import { describe, it, expect } from "vitest"
import { createActor } from "xstate"
import { memoryMachine } from "@/machines/memory.machine"

describe("Memory Machine", () => {
  it("should initialize with 4K words of memory", () => {
    const actor = createActor(memoryMachine)
    actor.start()
    expect(actor.getSnapshot().context.memory.length).toBe(4096)
  })

  it("should write and read data", () => {
    const actor = createActor(memoryMachine)
    actor.start()
    actor.send({ type: "memWrite", address: 0x100, data: 0xabcd })
    actor.send({ type: "memRead", address: 0x100 })
    expect(actor.getSnapshot().context.lastRead).toBe(0xabcd)
  })

  it("should mask address to 12 bits", () => {
    const actor = createActor(memoryMachine)
    actor.start()
    actor.send({ type: "memWrite", address: 0xffff, data: 0x1234 })
    actor.send({ type: "memRead", address: 0x0fff })
    expect(actor.getSnapshot().context.lastRead).toBe(0x1234)
  })

  it("should bulk load data", () => {
    const actor = createActor(memoryMachine)
    actor.start()
    const data = { 0: 0x1111, 1: 0x2222, 2: 0x3333 }
    actor.send({ type: "memBulkLoad", data })
    actor.send({ type: "memRead", address: 1 })
    expect(actor.getSnapshot().context.lastRead).toBe(0x2222)
  })

  it("should clear all memory", () => {
    const actor = createActor(memoryMachine)
    actor.start()
    actor.send({ type: "memWrite", address: 0x100, data: 0xffff })
    actor.send({ type: "memClear" })
    actor.send({ type: "memRead", address: 0x100 })
    expect(actor.getSnapshot().context.lastRead).toBe(0)
  })
})
