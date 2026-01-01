"use client";

import { useState, useRef, MouseEvent } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ZoomIn, ZoomOut, X, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface ImageZoomModalProps {
    src: string;
    alt: string;
    className?: string;
}

export function ImageZoomModal({ src, alt, className = "" }: ImageZoomModalProps) {
    const [open, setOpen] = useState(false);
    const [zoom, setZoom] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    const isSvg = src.toLowerCase().endsWith('.svg');

    const handleZoomIn = () => {
        setZoom((prev) => Math.min(prev + 0.25, 3));
    };

    const handleZoomOut = () => {
        setZoom((prev) => {
            const newZoom = Math.max(prev - 0.25, 0.5);
            if (newZoom === 1) {
                setPosition({ x: 0, y: 0 });
            }
            return newZoom;
        });
    };

    const resetZoom = () => {
        setZoom(1);
        setPosition({ x: 0, y: 0 });
    };

    const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
        if (zoom > 1) {
            setIsDragging(true);
            setDragStart({
                x: e.clientX - position.x,
                y: e.clientY - position.y,
            });
        }
    };

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (isDragging && zoom > 1) {
            setPosition({
                x: e.clientX - dragStart.x,
                y: e.clientY - dragStart.y,
            });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleOpenChange = (newOpen: boolean) => {
        setOpen(newOpen);
        if (!newOpen) {
            // Reset state when closing
            setZoom(1);
            setPosition({ x: 0, y: 0 });
            setIsDragging(false);
        }
    };

    return (
        <>
            {/* Thumbnail - Clickable */}
            <div
                className="relative group cursor-zoom-in bg-white rounded-lg p-4"
                onClick={() => setOpen(true)}
            >
                <img
                    src={src}
                    alt={alt}
                    className={`w-full h-auto object-contain transition-opacity ${className}`}
                    style={{
                        maxHeight: '400px',
                    }}
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center rounded-lg">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-primary text-primary-foreground rounded-full p-3">
                        <ZoomIn className="w-6 h-6" />
                    </div>
                </div>
            </div>

            {/* Fullscreen Modal */}
            <Dialog open={open} onOpenChange={handleOpenChange} modal>
                <DialogContent
                    className="max-w-none! w-screen! h-screen! p-0! border-0! rounded-none! bg-black! translate-x-[-50%]! translate-y-[-50%]! top-[50%]! left-[50%]! gap-0!"
                    onOpenAutoFocus={(e) => e.preventDefault()}
                    onEscapeKeyDown={() => handleOpenChange(false)}
                    showCloseButton={false}
                >
                    <VisuallyHidden>
                        <DialogTitle>{alt}</DialogTitle>
                        <DialogDescription>Zoomable image viewer</DialogDescription>
                    </VisuallyHidden>
                    <div className="relative w-full h-full" onClick={(e) => e.stopPropagation()}>
                        {/* Control Buttons */}
                        <div className="absolute top-4 right-4 z-50 flex gap-2 bg-black/80 backdrop-blur-sm p-2 rounded-lg border border-white/20 shadow-lg">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={handleZoomOut}
                                disabled={zoom <= 0.5}
                                className="h-8 w-8 text-white hover:bg-white/20"
                                title="Zoom Out"
                            >
                                <ZoomOut className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={resetZoom}
                                className="h-8 w-8 text-xs text-white hover:bg-white/20 min-w-12"
                                title="Reset Zoom"
                            >
                                {Math.round(zoom * 100)}%
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={handleZoomIn}
                                disabled={zoom >= 3}
                                className="h-8 w-8 text-white hover:bg-white/20"
                                title="Zoom In"
                            >
                                <ZoomIn className="h-4 w-4" />
                            </Button>
                            <div className="w-px bg-white/20 mx-1" />
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleOpenChange(false)}
                                className="h-8 w-8 text-white hover:bg-white/20"
                                title="Close"
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>

                        {/* Zoom/Drag Hint */}
                        {zoom > 1 && (
                            <div className="absolute top-4 left-4 z-50 bg-black/80 backdrop-blur-sm px-3 py-2 rounded-lg border border-white/20 text-white text-xs">
                                🖱️ Drag to pan
                            </div>
                        )}

                        {/* Zoomable Image Container */}
                        <div
                            ref={containerRef}
                            className="w-full h-full flex items-center justify-center p-4 overflow-auto"
                            onMouseDown={handleMouseDown}
                            onMouseMove={handleMouseMove}
                            onMouseUp={handleMouseUp}
                            onMouseLeave={handleMouseUp}
                            style={{
                                cursor: zoom > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default',
                            }}
                        >
                            <div
                                className="transition-transform duration-200 select-none bg-white rounded-lg p-8"
                                style={{
                                    transform: `scale(${zoom}) translate(${position.x / zoom}px, ${position.y / zoom}px)`,
                                    transformOrigin: 'center center',
                                }}
                            >
                                <img
                                    src={src}
                                    alt={alt}
                                    className="pointer-events-none"
                                    style={isSvg ? {
                                        width: '800px',
                                        height: '600px',
                                        display: 'block',
                                    } : {
                                        width: 'auto',
                                        height: 'auto',
                                        maxHeight: '80vh',
                                        maxWidth: '85vw',
                                        display: 'block',
                                    }}
                                    draggable="false"
                                    onError={(e) => {
                                        console.error('Image failed to load:', src);
                                        console.error('Error event:', e);
                                    }}
                                    onLoad={() => {
                                        console.log('Image loaded successfully:', src);
                                    }}
                                />
                            </div>
                        </div>

                        {/* Caption */}
                        <div className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm border-t border-white/20 p-4 text-center text-sm text-white">
                            {alt}
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
