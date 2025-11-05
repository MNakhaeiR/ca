"use client"

import * as React from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Moon, Sun, Download, Info, Settings } from "lucide-react"
import { KeyboardShortcutsDialog } from "@/components/keyboard-shortcuts-dialog"

export function AppToolbar() {
  const { theme, setTheme } = useTheme()
  const [aboutOpen, setAboutOpen] = React.useState(false)
  const [shortcutsOpen, setShortcutsOpen] = React.useState(false)

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

  return (
    <div className="border-b bg-card">
      <div className="container mx-auto px-4">
        <Menubar className="border-0 bg-transparent">
          <div className="flex items-center gap-2 mr-4">
            <Link href="/" className="font-semibold text-lg hover:text-primary transition-colors">
              Mano Computer Studio
            </Link>
          </div>

          <MenubarMenu>
            <MenubarTrigger>File</MenubarTrigger>
            <MenubarContent>
              <MenubarItem asChild>
                <Link href="/">Home</Link>
              </MenubarItem>
              <MenubarItem asChild>
                <Link href="/integrated/basic-computer">Basic Computer</Link>
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem>
                <Download className="mr-2 h-4 w-4" />
                Export Diagram
                <MenubarShortcut>⌘E</MenubarShortcut>
              </MenubarItem>
              <MenubarItem>
                Save State
                <MenubarShortcut>⌘S</MenubarShortcut>
              </MenubarItem>
              <MenubarItem>
                Load State
                <MenubarShortcut>⌘O</MenubarShortcut>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>

          <MenubarMenu>
            <MenubarTrigger>Modules</MenubarTrigger>
            <MenubarContent>
              <MenubarItem asChild>
                <Link href="/modules/ar">Address Register (AR)</Link>
              </MenubarItem>
              <MenubarItem asChild>
                <Link href="/modules/pc">Program Counter (PC)</Link>
              </MenubarItem>
              <MenubarItem asChild>
                <Link href="/modules/dr">Data Register (DR)</Link>
              </MenubarItem>
              <MenubarItem asChild>
                <Link href="/modules/ac">Accumulator (AC)</Link>
              </MenubarItem>
              <MenubarItem asChild>
                <Link href="/modules/ir">Instruction Register (IR)</Link>
              </MenubarItem>
              <MenubarItem asChild>
                <Link href="/modules/tr">Temporary Register (TR)</Link>
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem asChild>
                <Link href="/modules/memory">Memory (MEM)</Link>
              </MenubarItem>
              <MenubarItem asChild>
                <Link href="/modules/bus">Common Bus</Link>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>

          <MenubarMenu>
            <MenubarTrigger>View</MenubarTrigger>
            <MenubarContent>
              <div className="flex items-center justify-between px-2 py-1.5">
                <Label htmlFor="theme-switch" className="cursor-pointer">
                  Dark Mode
                </Label>
                <Switch
                  id="theme-switch"
                  checked={theme === "dark"}
                  onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
                />
              </div>
              <MenubarSeparator />
              <MenubarItem>Show Binary</MenubarItem>
              <MenubarItem>Show Hex</MenubarItem>
              <MenubarItem>Show Decimal</MenubarItem>
            </MenubarContent>
          </MenubarMenu>

          <MenubarMenu>
            <MenubarTrigger>Help</MenubarTrigger>
            <MenubarContent>
              <MenubarItem onClick={() => setAboutOpen(true)}>
                <Info className="mr-2 h-4 w-4" />
                About
              </MenubarItem>
              <MenubarItem onClick={() => setShortcutsOpen(true)}>
                Keyboard Shortcuts
                <MenubarShortcut>?</MenubarShortcut>
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem asChild>
                <Link href="/settings">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Link>
              </MenubarItem>
              <MenubarItem asChild>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                  Documentation
                </a>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>

          <div className="ml-auto flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
          </div>
        </Menubar>
      </div>

      <Dialog open={aboutOpen} onOpenChange={setAboutOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>About Mano Computer Studio</DialogTitle>
            <DialogDescription>
              An interactive simulator for Morris Mano&apos;s Basic Computer architecture. Built with Next.js,
              TypeScript, and shadcn/ui.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 text-sm">
            <p>
              This educational tool helps students understand computer architecture by visualizing and simulating the
              operation of a basic computer system.
            </p>
            <p className="text-muted-foreground">Version 1.0.0 • MIT License</p>
          </div>
        </DialogContent>
      </Dialog>

      <KeyboardShortcutsDialog open={shortcutsOpen} onOpenChange={setShortcutsOpen} />
    </div>
  )
}
