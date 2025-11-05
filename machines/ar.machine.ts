import { setup, assign } from "xstate"
import { mask } from "@/lib/utils"

export interface ARContext {
  value: number
  bits: number
  lastOperation: string
  activeSignal: string | null
}

export type AREvent =
  | { type: "LOAD"; value: number }
  | { type: "CLEAR" }
  | { type: "INCREMENT" }
  | { type: "SIGNAL_COMPLETE" }

const arSetup = setup({
  types: {
    context: {} as ARContext,
    events: {} as AREvent,
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
    clearSignal: assign({
      activeSignal: null,
    }),
  },
  delays: {
    signalDuration: 160,
  },
})

export const arMachine = arSetup.createMachine({
  id: "ar",
  initial: "idle",
  context: {
    value: 0,
    bits: 12,
    lastOperation: "",
    activeSignal: null,
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
      },
    },
    signaling: {
      after: {
        signalDuration: {
          target: "idle",
          actions: "clearSignal",
        },
      },
      on: {
        SIGNAL_COMPLETE: {
          target: "idle",
          actions: "clearSignal",
        },
      },
    },
  },
})
