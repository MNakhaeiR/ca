"use client"

import * as React from "react"

type ReducedMotionContextType = {
  prefersReducedMotion: boolean
}

const ReducedMotionContext = React.createContext<ReducedMotionContextType>({
  prefersReducedMotion: false,
})

export function ReducedMotionProvider({ children }: { children: React.ReactNode }) {
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false)

  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  return <ReducedMotionContext.Provider value={{ prefersReducedMotion }}>{children}</ReducedMotionContext.Provider>
}

export function useReducedMotion() {
  const context = React.useContext(ReducedMotionContext)
  if (context === undefined) {
    throw new Error("useReducedMotion must be used within a ReducedMotionProvider")
  }
  return context
}
