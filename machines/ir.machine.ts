import { setup, assign } from "xstate"
import { mask } from "@/lib/utils"

export interface IRContext {
  value: number
  bits: number
  lastOperation: string
  activeSignal: string | null
  // Decoded fields
  opcode: number
  indirect: boolean
  address: number
}

export type IREvent = { type: "LOAD"; value: number } | { type: "CLEAR" } | { type: "SIGNAL_COMPLETE" }

function decodeInstruction(value: number) {
  return {
    opcode: (value >> 12) & 0xf,
    indirect: ((value >> 15) & 1) === 1,
    address: value & 0xfff,
  }
}

export const irMachine = setup({
  types: {
    context: {} as IRContext,
    events: {} as IREvent,
  },
  actions: {
    loadValue: assign(({ event }) => {
      if (event.type !== "LOAD") return {}
      const value = mask(event.value, 16)
      const decoded = decodeInstruction(value)
      return {
        value,
        opcode: decoded.opcode,
        indirect: decoded.indirect,
        address: decoded.address,
        lastOperation: "LOAD",
        activeSignal: "load",
      }
    }),
    clearValue: assign({
      value: 0,
      opcode: 0,
      indirect: false,
      address: 0,
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
  id: "ir",
  initial: "idle",
  context: {
    value: 0,
    bits: 16,
    lastOperation: "",
    activeSignal: null,
    opcode: 0,
    indirect: false,
    address: 0,
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
