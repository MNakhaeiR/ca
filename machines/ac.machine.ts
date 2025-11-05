import { setup, assign } from "xstate"
import { mask, computeFlags } from "@/lib/utils"
import { and, complement, shiftLeft, shiftRight, increment } from "@/lib/arithmetic"

export interface ACContext {
  value: number
  bits: number
  lastOperation: string
  activeSignal: string | null
  flags: {
    Z: boolean
    N: boolean
  }
}

export type ACEvent =
  | { type: "LOAD"; value: number }
  | { type: "CLEAR" }
  | { type: "INCREMENT" }
  | { type: "COMPLEMENT" }
  | { type: "AND"; value: number }
  | { type: "OR"; value: number }
  | { type: "XOR"; value: number }
  | { type: "SHIFT_LEFT" }
  | { type: "SHIFT_RIGHT" }
  | { type: "SIGNAL_COMPLETE" }

export const acMachine = setup({
  types: {
    context: {} as ACContext,
    events: {} as ACEvent,
  },
  actions: {
    loadValue: assign({
      value: ({ event }) => {
        if (event.type !== "LOAD") return 0
        return mask(event.value, 16)
      },
      flags: ({ event }) => {
        if (event.type !== "LOAD") return { Z: false, N: false }
        return computeFlags(mask(event.value, 16), 16)
      },
      lastOperation: "LOAD",
      activeSignal: "load",
    }),
    clearValue: assign({
      value: 0,
      flags: { Z: true, N: false },
      lastOperation: "CLEAR",
      activeSignal: "clear",
    }),
    incrementValue: assign(({ context }) => {
      const result = increment(context.value, 16)
      return {
        value: result.result,
        flags: { Z: result.Z, N: result.N },
        lastOperation: "INCREMENT",
        activeSignal: "increment",
      }
    }),
    complementValue: assign(({ context }) => {
      const result = complement(context.value, 16)
      return {
        value: result.result,
        flags: { Z: result.Z, N: result.N },
        lastOperation: "COMPLEMENT",
        activeSignal: "complement",
      }
    }),
    andValue: assign(({ context, event }) => {
      if (event.type !== "AND") return {}
      const result = and(context.value, event.value, 16)
      return {
        value: result.result,
        flags: { Z: result.Z, N: result.N },
        lastOperation: "AND",
        activeSignal: "and",
      }
    }),
    orValue: assign(({ context, event }) => {
      if (event.type !== "OR") return {}
      const result = mask(context.value | event.value, 16)
      return {
        value: result,
        flags: computeFlags(result, 16),
        lastOperation: "OR",
        activeSignal: "or",
      }
    }),
    xorValue: assign(({ context, event }) => {
      if (event.type !== "XOR") return {}
      const result = mask(context.value ^ event.value, 16)
      return {
        value: result,
        flags: computeFlags(result, 16),
        lastOperation: "XOR",
        activeSignal: "xor",
      }
    }),
    shiftLeftValue: assign(({ context }) => {
      const result = shiftLeft(context.value, 16)
      return {
        value: result.result,
        flags: { Z: result.Z, N: result.N },
        lastOperation: "SHIFT_LEFT",
        activeSignal: "shift",
      }
    }),
    shiftRightValue: assign(({ context }) => {
      const result = shiftRight(context.value, 16)
      return {
        value: result.result,
        flags: { Z: result.Z, N: result.N },
        lastOperation: "SHIFT_RIGHT",
        activeSignal: "shift",
      }
    }),
    clearSignal: assign({
      activeSignal: null,
    }),
  },
  delays: {
    signalDuration: 160,
  },
}).createMachine({
  id: "ac",
  initial: "idle",
  context: {
    value: 0,
    bits: 16,
    lastOperation: "",
    activeSignal: null,
    flags: { Z: true, N: false },
  },
  states: {
    idle: {
      on: {
        LOAD: { target: "signaling", actions: "loadValue" },
        CLEAR: { target: "signaling", actions: "clearValue" },
        INCREMENT: { target: "signaling", actions: "incrementValue" },
        COMPLEMENT: { target: "signaling", actions: "complementValue" },
        AND: { target: "signaling", actions: "andValue" },
        OR: { target: "signaling", actions: "orValue" },
        XOR: { target: "signaling", actions: "xorValue" },
        SHIFT_LEFT: { target: "signaling", actions: "shiftLeftValue" },
        SHIFT_RIGHT: { target: "signaling", actions: "shiftRightValue" },
      },
    },
    signaling: {
      after: {
        signalDuration: {
          target: "idle",
          actions: "clearSignal",
        },
      },
    },
  },
})
