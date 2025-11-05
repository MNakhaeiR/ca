import Link from "next/link"
import { AppToolbar } from "@/components/app-toolbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Cpu, MemoryStick, Binary, Calculator, Timer, Workflow } from "lucide-react"

const modules = [
  {
    id: "ar",
    name: "Address Register",
    abbr: "AR",
    description: "12-bit register for memory addressing",
    bits: 12,
    icon: Binary,
    category: "register",
  },
  {
    id: "pc",
    name: "Program Counter",
    abbr: "PC",
    description: "12-bit counter with next-PC MUX",
    bits: 12,
    icon: Calculator,
    category: "register",
  },
  {
    id: "dr",
    name: "Data Register",
    abbr: "DR",
    description: "16-bit register for data operations",
    bits: 16,
    icon: Binary,
    category: "register",
  },
  {
    id: "ac",
    name: "Accumulator",
    abbr: "AC",
    description: "16-bit register with ALU operations",
    bits: 16,
    icon: Calculator,
    category: "register",
  },
  {
    id: "ir",
    name: "Instruction Register",
    abbr: "IR",
    description: "16-bit register for instruction decode",
    bits: 16,
    icon: Cpu,
    category: "register",
  },
  {
    id: "tr",
    name: "Temporary Register",
    abbr: "TR",
    description: "16-bit temporary storage",
    bits: 16,
    icon: Binary,
    category: "register",
  },
  {
    id: "io",
    name: "I/O and Flags",
    abbr: "I/O",
    description: "INPR, OUTR, E, and I registers",
    bits: 8,
    icon: Workflow,
    category: "io",
  },
  {
    id: "sc",
    name: "Sequence Counter",
    abbr: "SC",
    description: "4-bit timing state counter",
    bits: 4,
    icon: Timer,
    category: "control",
  },
  {
    id: "memory",
    name: "Main Memory",
    abbr: "MEM",
    description: "4K x 16-bit memory array",
    bits: 16,
    icon: MemoryStick,
    category: "memory",
  },
  {
    id: "bus",
    name: "Common Bus",
    abbr: "BUS",
    description: "16-bit tri-state data bus",
    bits: 16,
    icon: Binary,
    category: "bus",
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <AppToolbar />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Hero Section */}
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">Mano Computer Studio</h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Interactive simulator for Morris Mano&apos;s Basic Computer architecture. Explore individual modules or
              see the complete system in action.
            </p>
          </div>

          {/* Quick Start */}
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cpu className="h-5 w-5" />
                Integrated Basic Computer
              </CardTitle>
              <CardDescription>Experience the complete system with all components wired together</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild size="lg">
                <Link href="/integrated/basic-computer">
                  Launch Basic Computer
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Modules Grid */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Individual Modules</h2>
              <Badge variant="secondary">{modules.length} modules</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {modules.map((module) => {
                const Icon = module.icon
                return (
                  <Link key={module.id} href={`/modules/${module.id}`}>
                    <Card className="h-full transition-all hover:shadow-md hover:border-primary/50">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2">
                            <Icon className="h-5 w-5 text-primary" />
                            <CardTitle className="text-lg">{module.abbr}</CardTitle>
                          </div>
                          <Badge variant="outline">{module.bits}-bit</Badge>
                        </div>
                        <CardDescription className="font-medium">{module.name}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">{module.description}</p>
                      </CardContent>
                    </Card>
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Step-by-Step Execution</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Watch micro-operations unfold with animated signal paths and timing diagrams
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Keyboard Shortcuts</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Efficient control with comprehensive keyboard navigation and shortcuts
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Export & Share</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Save diagrams as SVG/PNG and share state via URL parameters
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <footer className="border-t py-6 mt-auto">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          Built with Next.js, TypeScript, and shadcn/ui • Based on Morris Mano&apos;s Computer System Architecture
        </div>
      </footer>
    </div>
  )
}
