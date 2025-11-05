// Helper function to inline computed styles for export
function inlineStyles(element: SVGElement): void {
  const children = element.querySelectorAll("*")
  const allElements = [element, ...Array.from(children)]

  allElements.forEach((el) => {
    if (el instanceof SVGElement) {
      const computedStyle = window.getComputedStyle(el)
      
      // For rect elements, check classes and set appropriate styles
      if (el.tagName.toLowerCase() === "rect") {
        // Default: white fill with gray border
        let fill = "#ffffff"
        let stroke = "#cbd5e1"
        const strokeWidth = "2"
        
        if (el.classList.contains("fill-card")) {
          fill = "#ffffff"
        } else if (el.classList.contains("fill-primary")) {
          fill = "#3b82f6"
        } else if (el.classList.contains("fill-muted")) {
          fill = "#f1f5f9"
        } else if (el.classList.contains("fill-foreground")) {
          fill = "#0f172a"
        } else if (el.classList.contains("fill-background")) {
          fill = "#ffffff"
        }
        
        if (el.classList.contains("stroke-border")) {
          stroke = "#cbd5e1"
        } else if (el.classList.contains("stroke-primary")) {
          stroke = "#3b82f6"
        } else if (el.classList.contains("stroke-foreground")) {
          stroke = "#0f172a"
        } else if (el.classList.contains("stroke-muted-foreground")) {
          stroke = "#94a3b8"
        }
        
        el.setAttribute("fill", fill)
        el.setAttribute("stroke", stroke)
        el.setAttribute("stroke-width", strokeWidth)
      }
      
      // For text elements
      else if (el instanceof SVGTextElement) {
        let fill = "#0f172a"
        
        if (el.classList.contains("fill-muted-foreground")) {
          fill = "#64748b"
        } else if (el.classList.contains("fill-primary")) {
          fill = "#3b82f6"
        } else if (el.classList.contains("fill-foreground")) {
          fill = "#0f172a"
        }
        
        el.setAttribute("fill", fill)
        
        // Preserve font properties
        const fontSize = computedStyle.getPropertyValue("font-size")
        const fontFamily = computedStyle.getPropertyValue("font-family")
        const fontWeight = computedStyle.getPropertyValue("font-weight")
        
        if (fontSize) el.setAttribute("font-size", fontSize)
        if (fontFamily) el.setAttribute("font-family", fontFamily)
        if (fontWeight && fontWeight !== "400") el.setAttribute("font-weight", fontWeight)
      }
      
      // For path and line elements
      else if (el.tagName.toLowerCase() === "path" || el.tagName.toLowerCase() === "line") {
        let stroke = "#94a3b8"
        let fill = "none"
        
        if (el.classList.contains("stroke-primary")) {
          stroke = "#3b82f6"
        } else if (el.classList.contains("stroke-foreground")) {
          stroke = "#0f172a"
        } else if (el.classList.contains("stroke-muted-foreground")) {
          stroke = "#94a3b8"
        }
        
        if (el.classList.contains("fill-primary")) {
          fill = "#3b82f6"
        } else if (el.classList.contains("fill-foreground")) {
          fill = "#0f172a"
        }
        
        el.setAttribute("stroke", stroke)
        el.setAttribute("fill", fill)
        
        const strokeWidth = computedStyle.getPropertyValue("stroke-width")
        if (strokeWidth) el.setAttribute("stroke-width", strokeWidth)
      }
      
      // For polygon elements (arrows)
      else if (el.tagName.toLowerCase() === "polygon") {
        let fill = "#94a3b8"
        
        if (el.classList.contains("fill-primary")) {
          fill = "#3b82f6"
        } else if (el.classList.contains("fill-foreground")) {
          fill = "#0f172a"
        } else if (el.classList.contains("fill-muted-foreground")) {
          fill = "#94a3b8"
        }
        
        el.setAttribute("fill", fill)
        el.setAttribute("stroke", "none")
      }
    }
  })
}

export async function exportSVGToPNG(svgElement: SVGSVGElement, filename = "diagram.png", scale = 8): Promise<void> {
  try {
    // Clone the SVG to avoid modifying the original
    const clonedSvg = svgElement.cloneNode(true) as SVGSVGElement

    // Get dimensions - use clientWidth/clientHeight for actual rendered size
    const width = svgElement.clientWidth || svgElement.getBBox().width || 800
    const height = svgElement.clientHeight || svgElement.getBBox().height || 600

    // Set explicit dimensions on the clone
    clonedSvg.setAttribute("width", String(width))
    clonedSvg.setAttribute("height", String(height))
    
    // Inline styles for export
    inlineStyles(clonedSvg)

    // Serialize SVG to string
    const svgData = new XMLSerializer().serializeToString(clonedSvg)
    const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" })
    const url = URL.createObjectURL(svgBlob)

    // Create image and canvas with higher resolution

    const img = new Image()
    img.crossOrigin = "anonymous"

    await new Promise<void>((resolve, reject) => {
      img.onload = () => {
        try {
          const canvas = document.createElement("canvas")
          canvas.width = width * scale
          canvas.height = height * scale

          const ctx = canvas.getContext("2d", { alpha: false })
          if (!ctx) {
            reject(new Error("Could not get canvas context"))
            return
          }

          // Enable image smoothing for better quality
          ctx.imageSmoothingEnabled = true
          ctx.imageSmoothingQuality = "high"

          // Fill with white background
          ctx.fillStyle = "#ffffff"
          ctx.fillRect(0, 0, canvas.width, canvas.height)

          // Draw image with high quality
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

          // Convert to blob and download with maximum quality
          canvas.toBlob((blob) => {
            if (blob) {
              const pngUrl = URL.createObjectURL(blob)
              const link = document.createElement("a")
              link.download = filename
              link.href = pngUrl
              link.click()
              URL.revokeObjectURL(pngUrl)
              resolve()
            } else {
              reject(new Error("Could not create PNG blob"))
            }
          }, "image/png", 1.0) // Maximum quality (1.0)
        } catch (error) {
          reject(error)
        }
      }

      img.onerror = () => reject(new Error("Could not load SVG image"))
      img.src = url
    })

    URL.revokeObjectURL(url)
  } catch (error) {
    console.error("Error exporting PNG:", error)
    throw error
  }
}

export function exportSVG(svgElement: SVGSVGElement, filename = "diagram.svg"): void {
  try {
    // Clone and inline styles
    const clonedSvg = svgElement.cloneNode(true) as SVGSVGElement
    
    // Inline styles for export
    inlineStyles(clonedSvg)
    
    const svgData = new XMLSerializer().serializeToString(clonedSvg)

    // Create blob and download
    const blob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.download = filename
    link.href = url
    link.click()
    URL.revokeObjectURL(url)
  } catch (error) {
    console.error("Error exporting SVG:", error)
    throw error
  }
}

export function exportState(state: Record<string, unknown>, filename = "state.json"): void {
  try {
    // Create comprehensive export with metadata
    const exportData = {
      version: "1.0",
      exportedAt: new Date().toISOString(),
      application: "Mano Computer Studio",
      data: {
        context: state,
        // Extract status, value, and tags if they exist
        status: (state as Record<string, unknown>).status,
        value: (state as Record<string, unknown>).value,
        tags: (state as Record<string, unknown>).tags,
        // Include any nested objects
        ...Object.entries(state).reduce((acc, [key, value]) => {
          if (typeof value === 'object' && value !== null) {
            acc[key] = value
          }
          return acc
        }, {} as Record<string, unknown>)
      }
    }
    
    const json = JSON.stringify(exportData, null, 2)
    const blob = new Blob([json], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.download = filename
    link.href = url
    link.click()
    URL.revokeObjectURL(url)
  } catch (error) {
    console.error("Error exporting state:", error)
    throw error
  }
}

export function generateShareURL(state: Record<string, unknown>): string {
  try {
    // Stringify and compress using base64
    const jsonStr = JSON.stringify(state)
    
    // Use btoa for base64 encoding
    // For better compression, we could use a library like pako, but keeping it simple
    const compressed = btoa(encodeURIComponent(jsonStr))
    
    const url = new URL(window.location.href)
    // Remove any existing state parameter
    url.searchParams.delete("state")
    url.searchParams.set("state", compressed)
    return url.toString()
  } catch (error) {
    console.error("Error generating share URL:", error)
    throw error
  }
}

export function loadStateFromURL(): Record<string, unknown> | null {
  try {
    const url = new URL(window.location.href)
    const stateParam = url.searchParams.get("state")
    if (stateParam) {
      const decoded = decodeURIComponent(atob(stateParam))
      return JSON.parse(decoded)
    }
    return null
  } catch (error) {
    console.error("Error loading state from URL:", error)
    return null
  }
}
