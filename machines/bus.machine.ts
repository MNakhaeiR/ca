import { setup, assign } from "xstate"
import { mask } from "@/lib/utils"

export type BusSource = "none" | "ar" | "pc" | "dr" | "ac" | "ir" | "tr" | "mem" | "inpr" | "outr"

export interface BusContext {
  value: number
  bits: number
  activeSource: BusSource
  conflict: boolean
  lastOperation: string
  activeSignal: string | null
}

export type BusEvent =
  | { type: "DRIVE"; source: BusSource; value: number }
  | { type: "READ"; destination: string }
  | { type: "RELEASE" }
  | { type: "SIGNAL_COMPLETE" }

export const busMachine = setup({
  types: {
    context: {} as BusContext,
    events: {} as BusEvent,
  },
  actions: {
    driveValue: assign(({ context, event }) => {
      if (event.type !== "DRIVE") return {}

      // Check for conflict (multiple drivers)
      const conflict = context.activeSource !== "none" && context.activeSource !== event.source

      return {
        value: mask(event.value, 16),
        activeSource: event.source,
        conflict,
        lastOperation: `DRIVE[${event.source.toUpperCase()}]`,
        activeSignal: "drive",
      }
    }),
    readValue: assign(({ event }) => {
      if (event.type !== "READ") return {}
      return {
        lastOperation: `READ[${event.destination.toUpperCase()}]`,
        activeSignal: "read",
      }
    }),
    release: assign({
      activeSource: "none",
      conflict: false,
      lastOperation: "RELEASE",
      activeSignal: "release",
    }),
    clearSignal: assign({
      activeSignal: null,
    }),
  },
  delays: {
    signalDuration: 160,
  },
}).createMachine({
  id: "bus",
  initial: "idle",
  context: {
    value: 0,
    bits: 16,
    activeSource: "none",
    conflict: false,
    lastOperation: "",
    activeSignal: null,
  },
  states: {
    idle: {
      on: {
        DRIVE: {
          target: "signaling",
          actions: "driveValue",
        },
        READ: {
          target: "signaling",
          actions: "readValue",
        },
        RELEASE: {
          target: "signaling",
          actions: "release",
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
