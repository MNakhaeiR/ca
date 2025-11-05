import { setup, assign } from "xstate"
import { mask } from "@/lib/utils"

export interface IOContext {
  inpr: number
  outr: number
  e: number
  i: number
  lastOperation: string
  activeSignal: string | null
}

export type IOEvent =
  | { type: "LOAD_INPR"; value: number }
  | { type: "LOAD_OUTR"; value: number }
  | { type: "CLEAR_OUTR" }
  | { type: "SET_E"; value: number }
  | { type: "TOGGLE_E" }
  | { type: "SET_I"; value: number }
  | { type: "TOGGLE_I" }
  | { type: "SIGNAL_COMPLETE" }

export const ioMachine = setup({
  types: {
    context: {} as IOContext,
    events: {} as IOEvent,
  },
  actions: {
    loadINPR: assign({
      inpr: ({ event }) => {
        if (event.type !== "LOAD_INPR") return 0
        return mask(event.value, 8)
      },
      lastOperation: "LOAD_INPR",
      activeSignal: "inpr",
    }),
    loadOUTR: assign({
      outr: ({ event }) => {
        if (event.type !== "LOAD_OUTR") return 0
        return mask(event.value, 8)
      },
      lastOperation: "LOAD_OUTR",
      activeSignal: "outr",
    }),
    clearOUTR: assign({
      outr: 0,
      lastOperation: "CLEAR_OUTR",
      activeSignal: "outr",
    }),
    setE: assign({
      e: ({ event }) => {
        if (event.type !== "SET_E") return 0
        return event.value & 1
      },
      lastOperation: "SET_E",
      activeSignal: "e",
    }),
    toggleE: assign({
      e: ({ context }) => (context.e === 0 ? 1 : 0),
      lastOperation: "TOGGLE_E",
      activeSignal: "e",
    }),
    setI: assign({
      i: ({ event }) => {
        if (event.type !== "SET_I") return 0
        return event.value & 1
      },
      lastOperation: "SET_I",
      activeSignal: "i",
    }),
    toggleI: assign({
      i: ({ context }) => (context.i === 0 ? 1 : 0),
      lastOperation: "TOGGLE_I",
      activeSignal: "i",
    }),
    clearSignal: assign({
      activeSignal: null,
    }),
  },
  delays: {
    signalDuration: 160,
  },
}).createMachine({
  id: "io",
  initial: "idle",
  context: {
    inpr: 0,
    outr: 0,
    e: 0,
    i: 0,
    lastOperation: "",
    activeSignal: null,
  },
  states: {
    idle: {
      on: {
        LOAD_INPR: {
          target: "signaling",
          actions: "loadINPR",
        },
        LOAD_OUTR: {
          target: "signaling",
          actions: "loadOUTR",
        },
        CLEAR_OUTR: {
          target: "signaling",
          actions: "clearOUTR",
        },
        SET_E: {
          target: "signaling",
          actions: "setE",
        },
        TOGGLE_E: {
          target: "signaling",
          actions: "toggleE",
        },
        SET_I: {
          target: "signaling",
          actions: "setI",
        },
        TOGGLE_I: {
          target: "signaling",
          actions: "toggleI",
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
