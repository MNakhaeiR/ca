export interface SampleProgram {
  name: string
  description: string
  code: Record<number, number>
}

export const samplePrograms: SampleProgram[] = [
  {
    name: "Simple Addition",
    description: "Load two numbers and add them",
    code: {
      0: 0x2010, // LDA 010 - Load first number
      1: 0x1011, // ADD 011 - Add second number
      2: 0x3012, // STA 012 - Store result
      3: 0x7001, // HLT - Halt
      16: 0x0005, // Data: 5
      17: 0x0003, // Data: 3
      18: 0x0000, // Result location
    },
  },
  {
    name: "Loop Counter",
    description: "Count down from 5 to 0",
    code: {
      0: 0x2010, // LDA 010 - Load counter
      1: 0x7200, // CMA - Complement AC
      2: 0x7100, // INC - Increment AC
      3: 0x1010, // ADD 010 - Add counter (decrement)
      4: 0x3010, // STA 010 - Store counter
      5: 0x6001, // ISZ 001 - Skip if zero
      6: 0x4001, // BUN 001 - Branch to loop
      7: 0x7001, // HLT - Halt
      16: 0x0005, // Counter: 5
    },
  },
  {
    name: "AND Operation",
    description: "Perform bitwise AND on two numbers",
    code: {
      0: 0x2010, // LDA 010 - Load first number
      1: 0x0011, // AND 011 - AND with second number
      2: 0x3012, // STA 012 - Store result
      3: 0x7001, // HLT - Halt
      16: 0x00ff, // Data: 0xFF
      17: 0x0f0f, // Data: 0x0F0F
      18: 0x0000, // Result location
    },
  },
  {
    name: "Subroutine Call",
    description: "Call a subroutine using BSA",
    code: {
      0: 0x5010, // BSA 010 - Branch to subroutine
      1: 0x7001, // HLT - Halt
      16: 0x0000, // Subroutine return address
      17: 0x2020, // LDA 020 - Load value
      18: 0x7100, // INC - Increment
      19: 0x3020, // STA 020 - Store back
      20: 0x4010, // BUN 010 - Return (indirect)
      32: 0x0042, // Data: 66
    },
  },
]
