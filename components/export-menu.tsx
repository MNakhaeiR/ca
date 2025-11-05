"use client"

import type React from "react"

import { Download, Share2, FileJson, ImageIcon, FileImage } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { exportSVG, exportSVGToPNG, exportState, generateShareURL } from "@/lib/export"

interface ExportMenuProps {
  svgRef?: React.RefObject<SVGSVGElement | null>
  state?: Record<string, unknown> | unknown
  moduleName?: string
  fullState?: Record<string, unknown> // Full XState snapshot for comprehensive export
}

export function ExportMenu({ svgRef, state, moduleName = "module", fullState }: ExportMenuProps) {
  const { toast } = useToast()

  const handleExportSVG = async () => {
    if (!svgRef?.current) {
      toast({
        title: "Export failed",
        description: "No diagram available to export",
        variant: "destructive",
      })
      return
    }

    try {
      exportSVG(svgRef.current, `${moduleName}-diagram.svg`)
      toast({
        title: "SVG exported",
        description: "Diagram saved successfully",
      })
    } catch {
      toast({
        title: "Export failed",
        description: "Could not export SVG",
        variant: "destructive",
      })
    }
  }

  const handleExportPNG = async () => {
    if (!svgRef?.current) {
      toast({
        title: "Export failed",
        description: "No diagram available to export",
        variant: "destructive",
      })
      return
    }

    try {
      await exportSVGToPNG(svgRef.current, `${moduleName}-diagram.png`, 2)
      toast({
        title: "PNG exported",
        description: "Diagram saved successfully",
      })
    } catch {
      toast({
        title: "Export failed",
        description: "Could not export PNG",
        variant: "destructive",
      })
    }
  }

  const handleExportState = () => {
    if (!state && !fullState) {
      toast({
        title: "Export failed",
        description: "No state available to export",
        variant: "destructive",
      })
      return
    }

    try {
      // Create comprehensive state export
      const stateToExport = fullState || state
      const enrichedState: Record<string, unknown> = {
        module: moduleName,
        timestamp: new Date().toISOString(),
        ...(typeof stateToExport === 'object' && stateToExport !== null ? stateToExport : { value: stateToExport })
      }
      
      exportState(enrichedState, `${moduleName}-state.json`)
      toast({
        title: "State exported",
        description: "Complete state saved successfully",
      })
    } catch {
      toast({
        title: "Export failed",
        description: "Could not export state",
        variant: "destructive",
      })
    }
  }

  const handleShare = async () => {
    if (!state && !fullState) {
      toast({
        title: "Share failed",
        description: "No state available to share",
        variant: "destructive",
      })
      return
    }

    try {
      // Use fullState if available for complete sharing
      const stateToShare = fullState || state
      const enrichedState: Record<string, unknown> = {
        module: moduleName,
        timestamp: new Date().toISOString(),
        ...(typeof stateToShare === 'object' && stateToShare !== null ? stateToShare : { value: stateToShare })
      }
      
      const url = generateShareURL(enrichedState)
      
      // Check if URL is too long (most browsers support ~2000 chars, be conservative)
      if (url.length > 2000) {
        toast({
          title: "URL too long",
          description: "State is too complex to share via URL. Try exporting as JSON instead.",
          variant: "destructive",
        })
        return
      }
      
      await navigator.clipboard.writeText(url)
      toast({
        title: "Link copied",
        description: "Share URL copied to clipboard",
      })
    } catch {
      toast({
        title: "Share failed",
        description: "Could not generate share link",
        variant: "destructive",
      })
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel>Export Options</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {!!svgRef && (
          <>
            <DropdownMenuItem onClick={handleExportSVG}>
              <FileImage className="mr-2 h-4 w-4" />
              Export as SVG
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleExportPNG}>
              <ImageIcon className="mr-2 h-4 w-4" />
              Export as PNG
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}
        {!!state && (
          <>
            <DropdownMenuItem onClick={handleExportState}>
              <FileJson className="mr-2 h-4 w-4" />
              Export State
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleShare}>
              <Share2 className="mr-2 h-4 w-4" />
              Copy Share Link
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
