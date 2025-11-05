import { setup, assign } from "xstate"
import { mask } from "@/lib/utils"
import { add, and, complement, increment } from "@/lib/arithmetic"

export interface BasicComputerContext {
  // Registers
  pc: number
  ar: number
  dr: number
  ac: number
  ir: number
  tr: number
  inpr: number
  outr: number
  e: number
  i: number
  sc: number

  // Memory
  memory: number[]

  // Control
  autoRun: boolean
  intervalMs: number
  halted: boolean

  // Flags
  flags: {
    Z: boolean
    N: boolean
  }

  // Decoded instruction
  opcode: number
  indirect: boolean
  address: number

  // Timing
  currentMicroOp: string
  microOpHistory: string[]

  // Bus
  busValue: number
  busSource: string
}

export type BasicComputerEvent =
  | { type: "STEP" }
  | { type: "RESET" }
  | { type: "SET_AUTO_RUN"; enabled: boolean }
  | { type: "SET_SPEED"; ms: number }
  | { type: "LOAD_PROGRAM"; program: Record<number, number> }
  | { type: "HALT" }
  | { type: "RESUME" }

function decodeInstruction(ir: number) {
  return {
    opcode: (ir >> 12) & 0x7,
    indirect: ((ir >> 15) & 1) === 1,
    address: ir & 0xfff,
  }
}

export const basicComputerMachine = setup({
  types: {
    context: {} as BasicComputerContext,
    events: {} as BasicComputerEvent,
  },
  actions: {
    // Fetch cycle
    fetchT0: assign(({ context }) => {
      const microOp = `T0: AR ← PC`
      return {
        ar: context.pc,
        sc: 0,
        currentMicroOp: microOp,
        microOpHistory: [...context.microOpHistory, microOp].slice(-10),
      }
    }),

    fetchT1: assign(({ context }) => {
      const microOp = `T1: IR ← M[AR], PC ← PC + 1`
      const ir = context.memory[context.ar] || 0
      const decoded = decodeInstruction(ir)
      const pcResult = increment(context.pc, 12)

      return {
        ir,
        pc: pcResult.result,
        opcode: decoded.opcode,
        indirect: decoded.indirect,
        address: decoded.address,
        sc: 1,
        currentMicroOp: microOp,
        microOpHistory: [...context.microOpHistory, microOp].slice(-10),
      }
    }),

    fetchT2: assign(({ context }) => {
      let microOp: string
      let ar = context.ar

      if (context.indirect) {
        microOp = `T2: AR ← M[IR.addr] (indirect)`
        ar = context.memory[context.address] || 0
      } else {
        microOp = `T2: AR ← IR.addr (direct)`
        ar = context.address
      }

      return {
        ar: mask(ar, 12),
        sc: 2,
        currentMicroOp: microOp,
        microOpHistory: [...context.microOpHistory, microOp].slice(-10),
      }
    }),

    // Execute operations
    executeAND: assign(({ context }) => {
      const microOp = `T3: DR ← M[AR], AC ← AC ∧ DR`
      const dr = context.memory[context.ar] || 0
      const result = and(context.ac, dr, 16)

      return {
        dr,
        ac: result.result,
        flags: { Z: result.Z, N: result.N },
        sc: 0,
        currentMicroOp: microOp,
        microOpHistory: [...context.microOpHistory, microOp].slice(-10),
      }
    }),

    executeADD: assign(({ context }) => {
      const microOp = `T3: DR ← M[AR], AC ← AC + DR`
      const dr = context.memory[context.ar] || 0
      const result = add(context.ac, dr, 16)

      return {
        dr,
        ac: result.result,
        e: result.overflow ? 1 : 0,
        flags: { Z: result.Z, N: result.N },
        sc: 0,
        currentMicroOp: microOp,
        microOpHistory: [...context.microOpHistory, microOp].slice(-10),
      }
    }),

    executeLDA: assign(({ context }) => {
      const microOp = `T3: DR ← M[AR], AC ← DR`
      const dr = context.memory[context.ar] || 0

      return {
        dr,
        ac: dr,
        flags: { Z: dr === 0, N: (dr & 0x8000) !== 0 },
        sc: 0,
        currentMicroOp: microOp,
        microOpHistory: [...context.microOpHistory, microOp].slice(-10),
      }
    }),

    executeSTA: assign(({ context }) => {
      const microOp = `T3: M[AR] ← AC`
      const newMemory = [...context.memory]
      newMemory[context.ar] = context.ac

      return {
        memory: newMemory,
        sc: 0,
        currentMicroOp: microOp,
        microOpHistory: [...context.microOpHistory, microOp].slice(-10),
      }
    }),

    executeBUN: assign(({ context }) => {
      const microOp = `T3: PC ← AR`
      return {
        pc: context.ar,
        sc: 0,
        currentMicroOp: microOp,
        microOpHistory: [...context.microOpHistory, microOp].slice(-10),
      }
    }),

    executeBSA: assign(({ context }) => {
      const microOp = `T3: M[AR] ← PC, PC ← AR + 1`
      const newMemory = [...context.memory]
      newMemory[context.ar] = context.pc

      return {
        memory: newMemory,
        pc: mask(context.ar + 1, 12),
        sc: 0,
        currentMicroOp: microOp,
        microOpHistory: [...context.microOpHistory, microOp].slice(-10),
      }
    }),

    executeISZ: assign(({ context }) => {
      const microOp = `T3: M[AR] ← M[AR] + 1, if M[AR] = 0 then PC ← PC + 1`
      const newMemory = [...context.memory]
      const value = mask((newMemory[context.ar] || 0) + 1, 16)
      newMemory[context.ar] = value

      return {
        memory: newMemory,
        pc: value === 0 ? mask(context.pc + 1, 12) : context.pc,
        sc: 0,
        currentMicroOp: microOp,
        microOpHistory: [...context.microOpHistory, microOp].slice(-10),
      }
    }),

    // Register-reference operations
    executeCLA: assign(({ context }) => {
      const microOp = `CLA: AC ← 0`
      return {
        ac: 0,
        flags: { Z: true, N: false },
        sc: 0,
        currentMicroOp: microOp,
        microOpHistory: [...context.microOpHistory, microOp].slice(-10),
      }
    }),

    executeCLE: assign(({ context }) => {
      const microOp = `CLE: E ← 0`
      return {
        e: 0,
        sc: 0,
        currentMicroOp: microOp,
        microOpHistory: [...context.microOpHistory, microOp].slice(-10),
      }
    }),

    executeCMA: assign(({ context }) => {
      const microOp = `CMA: AC ← AC'`
      const result = complement(context.ac, 16)
      return {
        ac: result.result,
        flags: { Z: result.Z, N: result.N },
        sc: 0,
        currentMicroOp: microOp,
        microOpHistory: [...context.microOpHistory, microOp].slice(-10),
      }
    }),

    executeINC: assign(({ context }) => {
      const microOp = `INC: AC ← AC + 1`
      const result = increment(context.ac, 16)
      return {
        ac: result.result,
        flags: { Z: result.Z, N: result.N },
        sc: 0,
        currentMicroOp: microOp,
        microOpHistory: [...context.microOpHistory, microOp].slice(-10),
      }
    }),

    executeHLT: assign(({ context }) => {
      const microOp = `HLT: Halt`
      return {
        halted: true,
        sc: 0,
        currentMicroOp: microOp,
        microOpHistory: [...context.microOpHistory, microOp].slice(-10),
      }
    }),

    reset: assign({
      pc: 0,
      ar: 0,
      dr: 0,
      ac: 0,
      ir: 0,
      tr: 0,
      inpr: 0,
      outr: 0,
      e: 0,
      i: 0,
      sc: 0,
      halted: false,
      flags: { Z: true, N: false },
      opcode: 0,
      indirect: false,
      address: 0,
      currentMicroOp: "Reset",
      microOpHistory: ["System Reset"],
      busValue: 0,
      busSource: "",
    }),

    loadProgram: assign(({ context, event }) => {
      if (event.type !== "LOAD_PROGRAM") return {}
      const newMemory = new Array(4096).fill(0)
      Object.entries(event.program).forEach(([addr, value]) => {
        const address = Number.parseInt(addr, 10)
        if (address < 4096) {
          newMemory[address] = mask(value, 16)
        }
      })
      return {
        memory: newMemory,
        pc: 0,
        halted: false,
        currentMicroOp: "Program Loaded",
        microOpHistory: ["Program Loaded"],
      }
    }),

    setAutoRun: assign({
      autoRun: ({ event }) => {
        if (event.type !== "SET_AUTO_RUN") return false
        return event.enabled
      },
    }),

    setSpeed: assign({
      intervalMs: ({ event }) => {
        if (event.type !== "SET_SPEED") return 500
        return event.ms
      },
    }),

    halt: assign({
      halted: true,
      autoRun: false,
    }),

    resume: assign({
      halted: false,
    }),
  },
}).createMachine({
  id: "basicComputer",
  initial: "idle",
  context: {
    pc: 0,
    ar: 0,
    dr: 0,
    ac: 0,
    ir: 0,
    tr: 0,
    inpr: 0,
    outr: 0,
    e: 0,
    i: 0,
    sc: 0,
    memory: new Array(4096).fill(0),
    autoRun: false,
    intervalMs: 500,
    halted: false,
    flags: { Z: true, N: false },
    opcode: 0,
    indirect: false,
    address: 0,
    currentMicroOp: "",
    microOpHistory: [],
    busValue: 0,
    busSource: "",
  },
  states: {
    idle: {
      on: {
        STEP: "fetch.t0",
        RESET: {
          actions: "reset",
        },
        LOAD_PROGRAM: {
          actions: "loadProgram",
        },
        SET_AUTO_RUN: {
          actions: "setAutoRun",
        },
        SET_SPEED: {
          actions: "setSpeed",
        },
        HALT: {
          actions: "halt",
        },
        RESUME: {
          actions: "resume",
        },
      },
    },
    fetch: {
      initial: "t0",
      states: {
        t0: {
          entry: "fetchT0",
          on: {
            STEP: "t1",
            RESET: {
              target: "#basicComputer.idle",
              actions: "reset",
            },
            HALT: {
              target: "#basicComputer.idle",
              actions: "halt",
            },
          },
        },
        t1: {
          entry: "fetchT1",
          on: {
            STEP: "t2",
            RESET: {
              target: "#basicComputer.idle",
              actions: "reset",
            },
            HALT: {
              target: "#basicComputer.idle",
              actions: "halt",
            },
          },
        },
        t2: {
          entry: "fetchT2",
          on: {
            STEP: "#basicComputer.decode",
            RESET: {
              target: "#basicComputer.idle",
              actions: "reset",
            },
            HALT: {
              target: "#basicComputer.idle",
              actions: "halt",
            },
          },
        },
      },
    },
    decode: {
      always: [
        { guard: ({ context }) => context.halted, target: "idle" },
        { guard: ({ context }) => context.opcode === 0, target: "executeAND" },
        { guard: ({ context }) => context.opcode === 1, target: "executeADD" },
        { guard: ({ context }) => context.opcode === 2, target: "executeLDA" },
        { guard: ({ context }) => context.opcode === 3, target: "executeSTA" },
        { guard: ({ context }) => context.opcode === 4, target: "executeBUN" },
        { guard: ({ context }) => context.opcode === 5, target: "executeBSA" },
        { guard: ({ context }) => context.opcode === 6, target: "executeISZ" },
        { guard: ({ context }) => context.opcode === 7 && context.address === 0x800, target: "executeCLA" },
        { guard: ({ context }) => context.opcode === 7 && context.address === 0x400, target: "executeCLE" },
        { guard: ({ context }) => context.opcode === 7 && context.address === 0x200, target: "executeCMA" },
        { guard: ({ context }) => context.opcode === 7 && context.address === 0x100, target: "executeINC" },
        { guard: ({ context }) => context.opcode === 7 && context.address === 0x001, target: "executeHLT" },
        { target: "idle" },
      ],
    },
    executeAND: {
      entry: "executeAND",
      on: {
        STEP: "idle",
        RESET: {
          target: "idle",
          actions: "reset",
        },
        HALT: {
          target: "idle",
          actions: "halt",
        },
      },
    },
    executeADD: {
      entry: "executeADD",
      on: {
        STEP: "idle",
        RESET: {
          target: "idle",
          actions: "reset",
        },
        HALT: {
          target: "idle",
          actions: "halt",
        },
      },
    },
    executeLDA: {
      entry: "executeLDA",
      on: {
        STEP: "idle",
        RESET: {
          target: "idle",
          actions: "reset",
        },
        HALT: {
          target: "idle",
          actions: "halt",
        },
      },
    },
    executeSTA: {
      entry: "executeSTA",
      on: {
        STEP: "idle",
        RESET: {
          target: "idle",
          actions: "reset",
        },
        HALT: {
          target: "idle",
          actions: "halt",
        },
      },
    },
    executeBUN: {
      entry: "executeBUN",
      on: {
        STEP: "idle",
        RESET: {
          target: "idle",
          actions: "reset",
        },
        HALT: {
          target: "idle",
          actions: "halt",
        },
      },
    },
    executeBSA: {
      entry: "executeBSA",
      on: {
        STEP: "idle",
        RESET: {
          target: "idle",
          actions: "reset",
        },
        HALT: {
          target: "idle",
          actions: "halt",
        },
      },
    },
    executeISZ: {
      entry: "executeISZ",
      on: {
        STEP: "idle",
        RESET: {
          target: "idle",
          actions: "reset",
        },
        HALT: {
          target: "idle",
          actions: "halt",
        },
      },
    },
    executeCLA: {
      entry: "executeCLA",
      on: {
        STEP: "idle",
        RESET: {
          target: "idle",
          actions: "reset",
        },
        HALT: {
          target: "idle",
          actions: "halt",
        },
      },
    },
    executeCLE: {
      entry: "executeCLE",
      on: {
        STEP: "idle",
        RESET: {
          target: "idle",
          actions: "reset",
        },
        HALT: {
          target: "idle",
          actions: "halt",
        },
      },
    },
    executeCMA: {
      entry: "executeCMA",
      on: {
        STEP: "idle",
        RESET: {
          target: "idle",
          actions: "reset",
        },
        HALT: {
          target: "idle",
          actions: "halt",
        },
      },
    },
    executeINC: {
      entry: "executeINC",
      on: {
        STEP: "idle",
        RESET: {
          target: "idle",
          actions: "reset",
        },
        HALT: {
          target: "idle",
          actions: "halt",
        },
      },
    },
    executeHLT: {
      entry: "executeHLT",
      on: {
        STEP: "idle",
        RESET: {
          target: "idle",
          actions: "reset",
        },
        HALT: {
          target: "idle",
          actions: "halt",
        },
      },
    },
  },
})
