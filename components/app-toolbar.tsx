"use client"

import * as React from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { usePathname } from "next/navigation"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
  Moon,
  Sun,
  Info,
  Settings,
  Menu,
  Home,
  Cpu,
  Binary,
  ChevronDown,
  Keyboard,
  BookOpen,
  CircuitBoard,
} from "lucide-react"
import { KeyboardShortcutsDialog } from "@/components/keyboard-shortcuts-dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"

export function AppToolbar() {
  const { theme, setTheme } = useTheme()
  const [aboutOpen, setAboutOpen] = React.useState(false)
  const [shortcutsOpen, setShortcutsOpen] = React.useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const pathname = usePathname()

  React.useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "?" && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault()
        setShortcutsOpen(true)
      }
    }
    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [])

  const registerModules = [
    { href: "/modules/ar", label: "Address Register", abbr: "AR", bits: 12 },
    { href: "/modules/pc", label: "Program Counter", abbr: "PC", bits: 12 },
    { href: "/modules/dr", label: "Data Register", abbr: "DR", bits: 16 },
    { href: "/modules/ac", label: "Accumulator", abbr: "AC", bits: 16 },
    { href: "/modules/ir", label: "Instruction Register", abbr: "IR", bits: 16 },
    { href: "/modules/tr", label: "Temporary Register", abbr: "TR", bits: 16 },
  ]

  const systemModules = [
    { href: "/modules/memory", label: "Main Memory", abbr: "MEM", bits: 16 },
    { href: "/modules/bus", label: "Common Bus", abbr: "BUS", bits: 16 },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <CircuitBoard className="h-5 w-5 text-primary" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-base leading-none hidden lg:block">Mano Computer Studio</span>
              <span className="font-bold text-base leading-none lg:hidden">Mano CS</span>
              <span className="text-xs text-muted-foreground hidden sm:block">Morris Mano Architecture</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/">
                <Home className="h-4 w-4 mr-2" />
                Home
              </Link>
            </Button>

            <Button variant="ghost" size="sm" asChild>
              <Link href="/integrated/basic-computer">
                <Cpu className="h-4 w-4 mr-2" />
                Basic Computer
              </Link>
            </Button>

            {/* Modules Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Binary className="h-4 w-4 mr-2" />
                  Modules
                  <ChevronDown className="h-3 w-3 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64">
                <DropdownMenuLabel className="flex items-center gap-2">
                  <Binary className="h-4 w-4" />
                  Registers
                </DropdownMenuLabel>
                {registerModules.map((module) => (
                  <DropdownMenuItem key={module.href} asChild>
                    <Link href={module.href} className="cursor-pointer flex items-center justify-between">
                      <span>{module.abbr} - {module.label}</span>
                      <Badge variant="outline" className="text-xs ml-2">{module.bits}</Badge>
                    </Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuLabel className="flex items-center gap-2">
                  <CircuitBoard className="h-4 w-4" />
                  System
                </DropdownMenuLabel>
                {systemModules.map((module) => (
                  <DropdownMenuItem key={module.href} asChild>
                    <Link href={module.href} className="cursor-pointer flex items-center justify-between">
                      <span>{module.abbr} - {module.label}</span>
                      <Badge variant="outline" className="text-xs ml-2">{module.bits}</Badge>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Resources Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Help
                  <ChevronDown className="h-3 w-3 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem onClick={() => setAboutOpen(true)}>
                  <Info className="h-4 w-4 mr-2" />
                  About
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setShortcutsOpen(true)}>
                  <Keyboard className="h-4 w-4 mr-2" />
                  Keyboard Shortcuts
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/settings">
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="h-9 w-9"
              aria-label="Toggle theme"
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
            </Button>

            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" className="h-9 w-9" aria-label="Open menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[340px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2">
                    <CircuitBoard className="h-5 w-5 text-primary" />
                    Navigation
                  </SheetTitle>
                </SheetHeader>
                <ScrollArea className="h-[calc(100vh-8rem)] mt-6 pr-4">
                  <div className="flex flex-col space-y-6">
                    {/* Main Links */}
                    <div className="space-y-2">
                      <h3 className="text-sm font-semibold text-muted-foreground px-2 mb-3">Main</h3>
                      <SheetClose asChild>
                        <Button
                          variant={pathname === "/" ? "secondary" : "ghost"}
                          className="w-full justify-start h-11"
                          asChild
                        >
                          <Link href="/">
                            <Home className="mr-3 h-4 w-4" />
                            <span className="flex-1 text-left">Home</span>
                          </Link>
                        </Button>
                      </SheetClose>
                      <SheetClose asChild>
                        <Button
                          variant={pathname === "/integrated/basic-computer" ? "secondary" : "ghost"}
                          className="w-full justify-start h-11"
                          asChild
                        >
                          <Link href="/integrated/basic-computer">
                            <Cpu className="mr-3 h-4 w-4" />
                            <span className="flex-1 text-left">Basic Computer</span>
                          </Link>
                        </Button>
                      </SheetClose>
                    </div>

                    <Separator />

                    {/* Modules */}
                    <div className="space-y-2">
                      <h3 className="text-sm font-semibold text-muted-foreground px-2 mb-3 flex items-center gap-2">
                        <Binary className="h-4 w-4" />
                        Registers
                      </h3>
                      {registerModules.map((module) => (
                        <SheetClose asChild key={module.href}>
                          <Button
                            variant={pathname === module.href ? "secondary" : "ghost"}
                            className="w-full justify-start h-11"
                            asChild
                          >
                            <Link href={module.href}>
                              <Binary className="mr-3 h-4 w-4" />
                              <span className="flex-1 text-left">{module.label}</span>
                              <Badge variant="outline" className="text-xs">
                                {module.bits}
                              </Badge>
                            </Link>
                          </Button>
                        </SheetClose>
                      ))}
                    </div>

                    <Separator />

                    {/* System Modules */}
                    <div className="space-y-2">
                      <h3 className="text-sm font-semibold text-muted-foreground px-2 mb-3 flex items-center gap-2">
                        <CircuitBoard className="h-4 w-4" />
                        System
                      </h3>
                      {systemModules.map((module) => (
                        <SheetClose asChild key={module.href}>
                          <Button
                            variant={pathname === module.href ? "secondary" : "ghost"}
                            className="w-full justify-start h-11"
                            asChild
                          >
                            <Link href={module.href}>
                              <CircuitBoard className="mr-3 h-4 w-4" />
                              <span className="flex-1 text-left">{module.label}</span>
                              <Badge variant="outline" className="text-xs">
                                {module.bits}
                              </Badge>
                            </Link>
                          </Button>
                        </SheetClose>
                      ))}
                    </div>

                    <Separator />

                    {/* Resources */}
                    <div className="space-y-2">
                      <h3 className="text-sm font-semibold text-muted-foreground px-2 mb-3">Resources</h3>
                      <Button
                        variant="ghost"
                        className="w-full justify-start h-11"
                        onClick={() => {
                          setMobileMenuOpen(false)
                          setShortcutsOpen(true)
                        }}
                      >
                        <Keyboard className="mr-3 h-4 w-4" />
                        Keyboard Shortcuts
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start h-11"
                        onClick={() => {
                          setMobileMenuOpen(false)
                          setAboutOpen(true)
                        }}
                      >
                        <Info className="mr-3 h-4 w-4" />
                        About
                      </Button>
                      <SheetClose asChild>
                        <Button variant="ghost" className="w-full justify-start h-11" asChild>
                          <Link href="/settings">
                            <Settings className="mr-3 h-4 w-4" />
                            Settings
                          </Link>
                        </Button>
                      </SheetClose>
                    </div>
                  </div>
                </ScrollArea>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Dialogs */}
      <Dialog open={aboutOpen} onOpenChange={setAboutOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CircuitBoard className="h-5 w-5 text-primary" />
              About Mano Computer Studio
            </DialogTitle>
            <DialogDescription>
              An interactive educational simulator for Morris Mano&apos;s Basic Computer architecture.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="text-sm font-semibold">Purpose</h4>
              <p className="text-sm text-muted-foreground">
                This tool helps students understand computer architecture by visualizing and simulating the operation of
                a basic computer system, including registers, memory, ALU, and control unit.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-semibold">Technology</h4>
              <p className="text-sm text-muted-foreground">
                Built with Next.js 15, TypeScript, shadcn/ui, XState, and Framer Motion for modern, responsive, and
                accessible educational experience.
              </p>
            </div>
            <Separator />
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Version 1.0.0</span>
              <span>MIT License</span>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <KeyboardShortcutsDialog open={shortcutsOpen} onOpenChange={setShortcutsOpen} />
    </header>
  )
}
