import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format a number as hexadecimal with specified width
 */
export function toHex(value: number, width = 4): string {
  return value.toString(16).toUpperCase().padStart(width, "0")
}

/**
 * Format a number as binary with specified width
 */
export function toBinary(value: number, width = 16): string {
  return value.toString(2).padStart(width, "0")
}

/**
 * Parse hex, binary, or decimal string to number
 */
export function parseValue(input: string): number {
  const trimmed = input.trim()

  if (trimmed.startsWith("0x") || trimmed.startsWith("0X")) {
    return Number.parseInt(trimmed.slice(2), 16)
  }

  if (trimmed.startsWith("0b") || trimmed.startsWith("0B")) {
    return Number.parseInt(trimmed.slice(2), 2)
  }

  return Number.parseInt(trimmed, 10)
}

/**
 * Mask value to specified bit width
 */
export function mask(value: number, bits: number): number {
  return value & ((1 << bits) - 1)
}

/**
 * Check if value is negative (MSB set)
 */
export function isNegative(value: number, bits: number): boolean {
  return (value & (1 << (bits - 1))) !== 0
}

/**
 * Compute flags for a value
 */
export function computeFlags(value: number, bits: number) {
  return {
    Z: value === 0,
    N: isNegative(value, bits),
  }
}
