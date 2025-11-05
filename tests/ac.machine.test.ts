import { describe, it, expect } from "vitest"
import { createActor } from "xstate"
import { acMachine } from "@/machines/ac.machine"

describe("AC Machine", () => {
  it("should initialize with value 0 and no flags", () => {
    const actor = createActor(acMachine)
    actor.start()
    const context = actor.getSnapshot().context
    expect(context.value).toBe(0)
    expect(context.flags.Z).toBe(true)
    expect(context.flags.N).toBe(false)
  })

  it("should set zero flag when value is 0", () => {
    const actor = createActor(acMachine)
    actor.start()
    actor.send({ type: "loadAC", value: 0 })
    expect(actor.getSnapshot().context.flags.Z).toBe(true)
  })

  it("should set negative flag for negative values", () => {
    const actor = createActor(acMachine)
    actor.start()
    actor.send({ type: "loadAC", value: 0x8000 })
    expect(actor.getSnapshot().context.flags.N).toBe(true)
  })

  it("should complement accumulator", () => {
    const actor = createActor(acMachine)
    actor.start()
    actor.send({ type: "loadAC", value: 0x00ff })
    actor.send({ type: "cmaAC" })
    expect(actor.getSnapshot().context.value).toBe(0xff00)
  })

  it("should perform AND operation", () => {
    const actor = createActor(acMachine)
    actor.start()
    actor.send({ type: "loadAC", value: 0xff00 })
    actor.send({ type: "andAC", operand: 0x0ff0 })
    expect(actor.getSnapshot().context.value).toBe(0x0f00)
  })

  it("should shift left", () => {
    const actor = createActor(acMachine)
    actor.start()
    actor.send({ type: "loadAC", value: 0x0001 })
    actor.send({ type: "shlAC" })
    expect(actor.getSnapshot().context.value).toBe(0x0002)
  })

  it("should shift right", () => {
    const actor = createActor(acMachine)
    actor.start()
    actor.send({ type: "loadAC", value: 0x0002 })
    actor.send({ type: "shrAC" })
    expect(actor.getSnapshot().context.value).toBe(0x0001)
  })
})
