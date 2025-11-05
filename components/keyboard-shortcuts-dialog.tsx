"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

interface ShortcutGroup {
  title: string
  shortcuts: Array<{
    keys: string[]
    description: string
  }>
}

interface KeyboardShortcutsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  shortcuts?: ShortcutGroup[]
}

const defaultShortcuts: ShortcutGroup[] = [
  {
    title: "General",
    shortcuts: [
      { keys: ["?"], description: "Show keyboard shortcuts" },
      { keys: ["Esc"], description: "Close dialogs" },
    ],
  },
  {
    title: "Register Controls",
    shortcuts: [
      { keys: ["L"], description: "Load value" },
      { keys: ["C"], description: "Clear register" },
      { keys: ["I"], description: "Increment" },
      { keys: ["D"], description: "Decrement" },
    ],
  },
  {
    title: "Simulation",
    shortcuts: [
      { keys: ["Space"], description: "Step execution" },
      { keys: ["A"], description: "Toggle auto-run" },
      { keys: ["R"], description: "Reset" },
      { keys: ["H"], description: "Halt/Resume" },
    ],
  },
]

export function KeyboardShortcutsDialog({
  open,
  onOpenChange,
  shortcuts = defaultShortcuts,
}: KeyboardShortcutsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Keyboard Shortcuts</DialogTitle>
          <DialogDescription>Quick reference for keyboard shortcuts available in this module</DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh]">
          <div className="space-y-6">
            {shortcuts.map((group, groupIndex) => (
              <div key={groupIndex}>
                <h3 className="mb-3 text-sm font-semibold text-foreground">{group.title}</h3>
                <div className="space-y-2">
                  {group.shortcuts.map((shortcut, shortcutIndex) => (
                    <div key={shortcutIndex} className="flex items-center justify-between gap-4">
                      <span className="text-sm text-muted-foreground">{shortcut.description}</span>
                      <div className="flex gap-1">
                        {shortcut.keys.map((key, keyIndex) => (
                          <kbd
                            key={keyIndex}
                            className="inline-flex h-6 min-w-[24px] items-center justify-center rounded border border-border bg-muted px-2 font-mono text-xs font-medium text-foreground"
                          >
                            {key}
                          </kbd>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                {groupIndex < shortcuts.length - 1 && <Separator className="mt-4" />}
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
