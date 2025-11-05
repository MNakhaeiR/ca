import { setup, assign } from "xstate"
import { mask } from "@/lib/utils"

export interface MemoryContext {
  memory: number[]
  size: number
  wordSize: number
  lastAddress: number
  lastValue: number
  lastOperation: string
  activeSignal: string | null
}

export type MemoryEvent =
  | { type: "READ"; address: number }
  | { type: "WRITE"; address: number; value: number }
  | { type: "BULK_LOAD"; data: Record<number, number> | number[] }
  | { type: "CLEAR_ALL" }
  | { type: "SIGNAL_COMPLETE" }

export const memoryMachine = setup({
  types: {
    context: {} as MemoryContext,
    events: {} as MemoryEvent,
  },
  actions: {
    readMemory: assign(({ context, event }) => {
      if (event.type !== "READ") return {}
      const address = mask(event.address, 12)
      return {
        lastAddress: address,
        lastValue: context.memory[address] || 0,
        lastOperation: `READ[${address.toString(16).toUpperCase()}]`,
        activeSignal: "read",
      }
    }),
    writeMemory: assign(({ context, event }) => {
      if (event.type !== "WRITE") return {}
      const address = mask(event.address, 12)
      const value = mask(event.value, 16)
      const newMemory = [...context.memory]
      newMemory[address] = value
      return {
        memory: newMemory,
        lastAddress: address,
        lastValue: value,
        lastOperation: `WRITE[${address.toString(16).toUpperCase()}]`,
        activeSignal: "write",
      }
    }),
    bulkLoad: assign(({ context, event }) => {
      if (event.type !== "BULK_LOAD") return {}
      const newMemory = [...context.memory]

      if (Array.isArray(event.data)) {
        event.data.forEach((value, index) => {
          if (index < context.size) {
            newMemory[index] = mask(value, 16)
          }
        })
      } else {
        Object.entries(event.data).forEach(([addr, value]) => {
          const address = Number.parseInt(addr, 10)
          if (address < context.size) {
            newMemory[address] = mask(value, 16)
          }
        })
      }

      return {
        memory: newMemory,
        lastOperation: "BULK_LOAD",
        activeSignal: "write",
      }
    }),
    clearAll: assign(({ context }) => ({
      memory: new Array(context.size).fill(0),
      lastAddress: 0,
      lastValue: 0,
      lastOperation: "CLEAR_ALL",
      activeSignal: "clear",
    })),
    clearSignal: assign({
      activeSignal: null,
    }),
  },
  delays: {
    signalDuration: 160,
  },
}).createMachine({
  id: "memory",
  initial: "idle",
  context: {
    memory: new Array(4096).fill(0), // 4K x 16
    size: 4096,
    wordSize: 16,
    lastAddress: 0,
    lastValue: 0,
    lastOperation: "",
    activeSignal: null,
  },
  states: {
    idle: {
      on: {
        READ: {
          target: "signaling",
          actions: "readMemory",
        },
        WRITE: {
          target: "signaling",
          actions: "writeMemory",
        },
        BULK_LOAD: {
          target: "signaling",
          actions: "bulkLoad",
        },
        CLEAR_ALL: {
          target: "signaling",
          actions: "clearAll",
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
