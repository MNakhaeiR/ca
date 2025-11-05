import { setup, assign } from "xstate"
import { mask } from "@/lib/utils"

export type NextPCSource = "increment" | "branch" | "return" | "interrupt"

export interface PCContext {
  value: number
  bits: number
  lastOperation: string
  activeSignal: string | null
  nextSource: NextPCSource
  branchTarget: number
  returnAddress: number
  interruptVector: number
}

export type PCEvent =
  | { type: "LOAD"; value: number }
  | { type: "CLEAR" }
  | { type: "INCREMENT" }
  | { type: "SET_NEXT_SOURCE"; source: NextPCSource }
  | { type: "SET_BRANCH_TARGET"; value: number }
  | { type: "SIGNAL_COMPLETE" }
  | { type: "SET_RETURN_ADDRESS"; value: number }
  | { type: "SET_INTERRUPT_VECTOR"; value: number }

export const pcMachine = setup({
  types: {
    context: {} as PCContext,
    events: {} as PCEvent,
  },
  actions: {
    loadValue: assign({
      value: ({ event }) => {
        if (event.type !== "LOAD") return 0
        return mask(event.value, 12)
      },
      lastOperation: "LOAD",
      activeSignal: "load",
    }),
    clearValue: assign({
      value: 0,
      lastOperation: "CLEAR",
      activeSignal: "clear",
    }),
    incrementValue: assign({
      value: ({ context }) => mask(context.value + 1, context.bits),
      lastOperation: "INCREMENT",
      activeSignal: "increment",
    }),
    setNextSource: assign({
      nextSource: ({ event }) => {
        if (event.type !== "SET_NEXT_SOURCE") return "increment"
        return event.source
      },
    }),
    setBranchTarget: assign({
      branchTarget: ({ event }) => {
        if (event.type !== "SET_BRANCH_TARGET") return 0
        return mask(event.value, 12)
      },
    }),
    setReturnAddress: assign({
      returnAddress: ({ event }) => {
        if (event.type !== "SET_RETURN_ADDRESS") return 0
        return mask(event.value, 12)
      },
    }),
    setInterruptVector: assign({
      interruptVector: ({ event }) => {
        if (event.type !== "SET_INTERRUPT_VECTOR") return 0
        return mask(event.value, 12)
      },
    }),
    clearSignal: assign({
      activeSignal: null,
    }),
  },
  delays: {
    signalDuration: 160,
  },
}).createMachine({
  id: "pc",
  initial: "idle",
  context: {
    value: 0,
    bits: 12,
    lastOperation: "",
    activeSignal: null,
    nextSource: "increment",
    branchTarget: 0,
    returnAddress: 0,
    interruptVector: 0,
  },
  states: {
    idle: {
      on: {
        LOAD: {
          target: "signaling",
          actions: "loadValue",
        },
        CLEAR: {
          target: "signaling",
          actions: "clearValue",
        },
        INCREMENT: {
          target: "signaling",
          actions: "incrementValue",
        },
        SET_NEXT_SOURCE: {
          actions: "setNextSource",
        },
        SET_BRANCH_TARGET: {
          actions: "setBranchTarget",
        },
        SET_RETURN_ADDRESS: {
          actions: "setReturnAddress",
        },
        SET_INTERRUPT_VECTOR: {
          actions: "setInterruptVector",
        },
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
