import { setup, assign } from "xstate"
import { mask } from "@/lib/utils"

export interface SCContext {
  value: number
  bits: number
  maxValue: number
  lastOperation: string
  activeSignal: string | null
}

export type SCEvent =
  | { type: "CLEAR" }
  | { type: "INCREMENT" }
  | { type: "SET"; value: number }
  | { type: "SIGNAL_COMPLETE" }

export const scMachine = setup({
  types: {
    context: {} as SCContext,
    events: {} as SCEvent,
  },
  actions: {
    clearValue: assign({
      value: 0,
      lastOperation: "CLEAR",
      activeSignal: "clear",
    }),
    incrementValue: assign(({ context }) => ({
      value: mask(context.value + 1, context.bits),
      lastOperation: "INCREMENT",
      activeSignal: "increment",
    })),
    setValue: assign(({ event, context }) => {
      if (event.type !== "SET") return {}
      return {
        value: mask(event.value, context.bits),
        lastOperation: "SET",
        activeSignal: "set",
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
  id: "sc",
  initial: "idle",
  context: {
    value: 0,
    bits: 4,
    maxValue: 15,
    lastOperation: "",
    activeSignal: null,
  },
  states: {
    idle: {
      on: {
        CLEAR: {
          target: "signaling",
          actions: "clearValue",
        },
        INCREMENT: {
          target: "signaling",
          actions: "incrementValue",
        },
        SET: {
          target: "signaling",
          actions: "setValue",
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
