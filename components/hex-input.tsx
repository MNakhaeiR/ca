"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { parseValue, toHex, mask } from "@/lib/utils"
import { cn } from "@/lib/utils"

interface HexInputProps {
  label: string
  value: number
  bits: number
  onChange: (value: number) => void
  onSubmit?: () => void
  className?: string
  disabled?: boolean
}

export function HexInput({ label, value, bits, onChange, onSubmit, className, disabled = false }: HexInputProps) {
  const [inputValue, setInputValue] = React.useState(toHex(value, Math.ceil(bits / 4)))
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    setInputValue(toHex(value, Math.ceil(bits / 4)))
  }, [value, bits])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setInputValue(newValue)
    setError(null)

    try {
      const parsed = parseValue(newValue)
      const masked = mask(parsed, bits)
      onChange(masked)
    } catch {
      setError("Invalid input")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onSubmit) {
      onSubmit()
    }
  }

  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={`input-${label}`}>{label}</Label>
      <div className="flex gap-2">
        <Input
          id={`input-${label}`}
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          className={cn("font-mono", error && "border-destructive")}
          placeholder="0x0000"
        />
        {onSubmit && (
          <Button onClick={onSubmit} disabled={disabled || !!error}>
            Load
          </Button>
        )}
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
      <p className="text-xs text-muted-foreground">
        Formats: 0x{toHex(value, Math.ceil(bits / 4))} • 0b{value.toString(2).padStart(bits, "0")} • {value}
      </p>
    </div>
  )
}
