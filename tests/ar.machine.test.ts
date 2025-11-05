import { describe, it, expect } from "vitest"
import { createActor } from "xstate"
import { arMachine } from "@/machines/ar.machine"

describe("AR Machine", () => {
  it("should initialize with value 0", () => {
    const actor = createActor(arMachine)
    actor.start()
    expect(actor.getSnapshot().context.value).toBe(0)
  })

  it("should load a value", () => {
    const actor = createActor(arMachine)
    actor.start()
    actor.send({ type: "loadAR", value: 0x123 })
    expect(actor.getSnapshot().context.value).toBe(0x123)
  })

  it("should mask to 12 bits", () => {
    const actor = createActor(arMachine)
    actor.start()
    actor.send({ type: "loadAR", value: 0xffff })
    expect(actor.getSnapshot().context.value).toBe(0xfff)
  })

  it("should increment with wraparound", () => {
    const actor = createActor(arMachine)
    actor.start()
    actor.send({ type: "loadAR", value: 0xfff })
    actor.send({ type: "incAR" })
    expect(actor.getSnapshot().context.value).toBe(0)
  })

  it("should clear to 0", () => {
    const actor = createActor(arMachine)
    actor.start()
    actor.send({ type: "loadAR", value: 0x456 })
    actor.send({ type: "clrAR" })
    expect(actor.getSnapshot().context.value).toBe(0)
  })

  it("should track active signals", () => {
    const actor = createActor(arMachine)
    actor.start()
    actor.send({ type: "loadAR", value: 0x100 })
    const snapshot = actor.getSnapshot()
    expect(snapshot.context.activeSignals).toContain("load")
  })
})
