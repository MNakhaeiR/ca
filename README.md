# Mano Computer Studio

A production-quality educational web application for teaching and simulating Morris Mano's Basic Computer architecture. Built with Next.js, TypeScript, shadcn/ui, and XState.

## Features

### Individual Module Simulators
- **Address Register (AR)** - 12-bit address register with load, clear, and increment operations
- **Program Counter (PC)** - 12-bit program counter with next-PC multiplexer for branch control
- **Data Register (DR)** - 16-bit data register for memory operations
- **Accumulator (AC)** - 16-bit accumulator with ALU operations (AND, ADD, complement, shift) and flag computation
- **Instruction Register (IR)** - 16-bit instruction register with opcode, indirect bit, and address field visualization
- **Temporary Register (TR)** - 16-bit temporary storage register
- **I/O Registers** - 8-bit INPR and OUTR with interrupt enable (I) and carry flag (E)
- **Sequence Counter (SC)** - 3-4 bit timing counter for micro-operations
- **Memory (MEM)** - 4K x 16-bit main memory with editable table view and bulk loading
- **Common Bus** - 16-bit tri-state bus with conflict detection

### Integrated Basic Computer
- Complete CPU simulation with all components wired together
- Fetch-decode-execute cycle with T-state visualization
- Memory-reference instructions: AND, ADD, LDA, STA, BUN, BSA, ISZ (with indirect addressing)
- Register-reference instructions: CLA, CLE, CMA, CME, CIR, CIL, INC, SPA, SNA, SZA, SZE, HLT
- I/O instructions: INP, OUT, SKI, SKO, ION, IOF
- Sample programs with step-by-step execution
- Auto-run mode with adjustable speed
- Micro-operations timeline view

### User Experience
- **Minimal, neutral design** - Clean interface with subtle accent colors, no flashy effects
- **Light and dark themes** - Seamless theme switching with system preference support
- **Keyboard shortcuts** - Efficient navigation and control (press ? for help)
- **Responsive SVG diagrams** - Animated signal paths and component interactions
- **Export functionality** - Save diagrams as SVG/PNG and share state via URL
- **Accessibility** - ARIA labels, keyboard navigation, reduced motion support, high contrast

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **UI Components**: shadcn/ui with Radix primitives
- **Styling**: Tailwind CSS v4
- **State Management**: XState v5
- **Animation**: Framer Motion
- **Testing**: Vitest
- **Typography**: Inter (UI), JetBrains Mono (code/numbers)

## Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn/pnpm

### Installation

1. Clone the repository
\`\`\`bash
git clone <repository-url>
cd mano-computer-studio
\`\`\`

2. Install dependencies
\`\`\`bash
npm install
\`\`\`

3. Run the development server
\`\`\`bash
npm run dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

\`\`\`bash
npm run build
npm start
\`\`\`

### Running Tests

\`\`\`bash
npm test
\`\`\`

## Project Structure

\`\`\`
mano-computer-studio/
├── app/                          # Next.js app router pages
│   ├── modules/                  # Individual module pages
│   │   ├── ar/                   # Address Register
│   │   ├── pc/                   # Program Counter
│   │   ├── dr/                   # Data Register
│   │   ├── ac/                   # Accumulator
│   │   ├── ir/                   # Instruction Register
│   │   ├── tr/                   # Temporary Register
│   │   ├── io/                   # I/O Registers (INPR, OUTR, E, I)
│   │   ├── sc/                   # Sequence Counter
│   │   ├── memory/               # Main Memory
│   │   └── bus/                  # Common Bus
│   ├── integrated/
│   │   └── basic-computer/       # Integrated Basic Computer
│   ├── settings/                 # Settings page
│   ├── layout.tsx                # Root layout with theme provider
│   ├── page.tsx                  # Home page with module grid
│   └── globals.css               # Global styles and design tokens
├── components/
│   ├── ui/                       # shadcn/ui components
│   ├── svg/                      # SVG diagram primitives
│   │   ├── diagram.tsx           # SVG container with defs
│   │   ├── block.tsx             # Register/component blocks
│   │   ├── arrow.tsx             # Signal arrows
│   │   ├── bus.tsx               # Bus lines
│   │   ├── port.tsx              # Connection ports
│   │   ├── label.tsx             # Text labels
│   │   └── bit-field.tsx         # Bit field visualization
│   ├── app-toolbar.tsx           # Top menubar
│   ├── control-panel.tsx         # Reusable control panel
│   ├── status-bar.tsx            # Register status display
│   ├── hex-input.tsx             # Hex/decimal input field
│   ├── keyboard-shortcuts-dialog.tsx  # Keyboard help
│   ├── export-menu.tsx           # Export dropdown
│   ├── theme-provider.tsx        # Theme context
│   └── reduced-motion-provider.tsx    # Motion preference
├── machines/                     # XState state machines
│   ├── ar.machine.ts             # Address Register logic
│   ├── pc.machine.ts             # Program Counter logic
│   ├── dr.machine.ts             # Data Register logic
│   ├── ac.machine.ts             # Accumulator logic
│   ├── ir.machine.ts             # Instruction Register logic
│   ├── tr.machine.ts             # Temporary Register logic
│   ├── io.machine.ts             # I/O registers logic
│   ├── sc.machine.ts             # Sequence Counter logic
│   ├── memory.machine.ts         # Memory logic
│   ├── bus.machine.ts            # Bus logic
│   └── basic-computer.machine.ts # Integrated CPU logic
├── lib/
│   ├── utils.ts                  # Utility functions
│   ├── arithmetic.ts             # ALU operations and flags
│   ├── sample-programs.ts        # Example programs
│   └── export.ts                 # Export/share utilities
├── tests/                        # Unit tests
│   ├── ar.machine.test.ts
│   ├── ac.machine.test.ts
│   └── memory.machine.test.ts
└── package.json
\`\`\`

## Keyboard Shortcuts

### Global
- `?` - Show keyboard shortcuts dialog
- `Esc` - Close dialogs

### Register Controls
- `L` - Load value
- `C` - Clear register
- `I` - Increment
- `D` - Decrement
- `[` / `]` - Shift left/right (where applicable)

### Simulation (Integrated Computer)
- `Space` / `Enter` - Step execution
- `A` - Toggle auto-run
- `R` - Reset
- `H` - Halt/Resume

## Design Philosophy

### Visual Design
- **Minimal and neutral** - Focus on content, not decoration
- **High contrast** - Ensures readability in all lighting conditions
- **Subtle motion** - Purposeful animations that enhance understanding
- **Consistent spacing** - Tailwind spacing scale for visual rhythm
- **Semantic tokens** - CSS variables for maintainable theming

### Code Quality
- **Type safety** - Strict TypeScript with no implicit any
- **State machines** - Predictable, testable logic with XState
- **Component composition** - Reusable primitives for consistency
- **Accessibility first** - ARIA labels, keyboard navigation, screen reader support
- **Performance** - Optimized SVG rendering, efficient state updates

## Educational Use

This simulator is designed for:
- Computer architecture courses
- Self-study of basic computer organization
- Understanding instruction execution cycles
- Visualizing data flow and control signals
- Experimenting with assembly-level programming

## License

MIT License - see LICENSE file for details

## Acknowledgments

Based on Morris Mano's "Computer System Architecture" textbook, which introduced generations of students to fundamental computer organization concepts.
