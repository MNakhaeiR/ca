import { setup, assign } from "xstate"
import { mask } from "@/lib/utils"

export interface TRContext {
  value: number
  bits: number
  lastOperation: string
  activeSignal: string | null
}

export type TREvent = { type: "LOAD"; value: number } | { type: "CLEAR" } | { type: "SIGNAL_COMPLETE" }

export const trMachine = setup({
  types: {
    context: {} as TRContext,
    events: {} as TREvent,
  },
  actions: {
    loadValue: assign({
      value: ({ event }) => {
        if (event.type !== "LOAD") return 0
        return mask(event.value, 16)
      },
      lastOperation: "LOAD",
      activeSignal: "load",
    }),
    clearValue: assign({
      value: 0,
      lastOperation: "CLEAR",
      activeSignal: "clear",
    }),
    clearSignal: assign({
      activeSignal: null,
    }),
  },
  delays: {
    signalDuration: 160,
  },
}).createMachine({
  id: "tr",
  initial: "idle",
  context: {
    value: 0,
    bits: 16,
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
