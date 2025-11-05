export async function exportSVGToPNG(svgElement: SVGSVGElement, filename = "diagram.png", scale = 2): Promise<void> {
  try {
    // Clone the SVG to avoid modifying the original
    const clonedSvg = svgElement.cloneNode(true) as SVGSVGElement

    // Get dimensions
    const bbox = svgElement.getBBox()
    const width = bbox.width || 800
    const height = bbox.height || 600

    // Set explicit dimensions on the clone
    clonedSvg.setAttribute("width", String(width))
    clonedSvg.setAttribute("height", String(height))

    // Serialize SVG to string
    const svgData = new XMLSerializer().serializeToString(clonedSvg)
    const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" })
    const url = URL.createObjectURL(svgBlob)

    // Create image and canvas
    const img = new Image()
    img.crossOrigin = "anonymous"

    await new Promise<void>((resolve, reject) => {
      img.onload = () => {
        try {
          const canvas = document.createElement("canvas")
          canvas.width = width * scale
          canvas.height = height * scale

          const ctx = canvas.getContext("2d")
          if (!ctx) {
            reject(new Error("Could not get canvas context"))
            return
          }

          // Fill with white background
          ctx.fillStyle = "#ffffff"
          ctx.fillRect(0, 0, canvas.width, canvas.height)

          // Draw image
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

          // Convert to blob and download
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
          }, "image/png")
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
    // Clone and serialize
    const clonedSvg = svgElement.cloneNode(true) as SVGSVGElement
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
    const json = JSON.stringify(state, null, 2)
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
    const compressed = btoa(JSON.stringify(state))
    const url = new URL(window.location.href)
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
      return JSON.parse(atob(stateParam))
    }
    return null
  } catch (error) {
    console.error("Error loading state from URL:", error)
    return null
  }
}
