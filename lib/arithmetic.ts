/**
 * Arithmetic and logic operations for the Basic Computer
 */

import { mask, computeFlags } from "./utils"

export function add(a: number, b: number, bits = 16) {
  const result = mask(a + b, bits)
  const overflow = a + b !== result
  return {
    result,
    overflow,
    ...computeFlags(result, bits),
  }
}

export function and(a: number, b: number, bits = 16) {
  const result = mask(a & b, bits)
  return {
    result,
    ...computeFlags(result, bits),
  }
}

export function complement(value: number, bits = 16) {
  const result = mask(~value, bits)
  return {
    result,
    ...computeFlags(result, bits),
  }
}

export function shiftLeft(value: number, bits = 16) {
  const msb = (value >> (bits - 1)) & 1
  const result = mask(value << 1, bits)
  return {
    result,
    carry: msb,
    ...computeFlags(result, bits),
  }
}

export function shiftRight(value: number, bits = 16) {
  const lsb = value & 1
  const result = value >> 1
  return {
    result,
    carry: lsb,
    ...computeFlags(result, bits),
  }
}

export function circularShiftLeft(value: number, e: number, bits = 16) {
  const msb = (value >> (bits - 1)) & 1
  const result = mask((value << 1) | e, bits)
  return {
    result,
    e: msb,
    ...computeFlags(result, bits),
  }
}

export function circularShiftRight(value: number, e: number, bits = 16) {
  const lsb = value & 1
  const result = (e << (bits - 1)) | (value >> 1)
  return {
    result,
    e: lsb,
    ...computeFlags(result, bits),
  }
}

export function increment(value: number, bits = 16) {
  const result = mask(value + 1, bits)
  return {
    result,
    ...computeFlags(result, bits),
  }
}
