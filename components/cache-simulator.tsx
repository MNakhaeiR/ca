"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CacheSet {
    ways: Array<{
        valid: boolean;
        tag: string;
        data: string;
        lastUsed: number;
    }>;
}

interface CacheSimulatorProps {
    numSets: number;
    numWays: number;
    blockSize: number;
}

export default function CacheSimulator({ numSets, numWays, blockSize }: CacheSimulatorProps) {
    const [cache, setCache] = useState<CacheSet[]>(
        Array.from({ length: numSets }, () => ({
            ways: Array.from({ length: numWays }, () => ({
                valid: false,
                tag: "",
                data: "",
                lastUsed: 0,
            })),
        }))
    );

    const [address, setAddress] = useState("");
    const [accessCount, setAccessCount] = useState(0);
    const [hits, setHits] = useState(0);
    const [misses, setMisses] = useState(0);
    const [lastAccess, setLastAccess] = useState<{
        address: string;
        setIndex: number;
        tag: string;
        offset: number;
        result: "hit" | "miss";
        replacedWay?: number;
    } | null>(null);

    // Auto-play functionality
    const [isAutoPlaying, setIsAutoPlaying] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [currentAddressIndex, setCurrentAddressIndex] = useState(0);

    // Sample addresses for auto-play demonstration
    const sampleAddresses = [
        "0x1A4", "0x2B8", "0x1A4", "0x3C0", "0x2B8",
        "0x4D4", "0x1A4", "0x5E8", "0x2B8", "0x3C0",
        "0x6FC", "0x1A4", "0x7A0", "0x2B8", "0x8B4"
    ];

    // Auto-play effect
    useEffect(() => {
        if (isAutoPlaying && !isPaused && currentAddressIndex < sampleAddresses.length) {
            const timer = setTimeout(() => {
                setAddress(sampleAddresses[currentAddressIndex]);
                // Trigger access after a short delay to show the address
                setTimeout(() => {
                    accessCacheWithAddress(sampleAddresses[currentAddressIndex]);
                    setCurrentAddressIndex(currentAddressIndex + 1);
                }, 300);
            }, 1200);

            return () => clearTimeout(timer);
        } else if (currentAddressIndex >= sampleAddresses.length) {
            setIsAutoPlaying(false);
            setIsPaused(false);
        }
    }, [isAutoPlaying, isPaused, currentAddressIndex]);

    const parseAddress = (addr: string) => {
        const addressBits = parseInt(addr, 16);
        const offsetBits = Math.log2(blockSize);
        const indexBits = Math.log2(numSets);

        const offset = addressBits & ((1 << offsetBits) - 1);
        const setIndex = (addressBits >> offsetBits) & ((1 << indexBits) - 1);
        const tag = (addressBits >> (offsetBits + indexBits)).toString(16).toUpperCase();

        return { setIndex, tag, offset };
    };

    const accessCacheWithAddress = (addr: string) => {
        if (!addr) return;

        try {
            const { setIndex, tag, offset } = parseAddress(addr);
            const set = cache[setIndex];

            // Check for hit
            const hitWayIndex = set.ways.findIndex(
                (way) => way.valid && way.tag === tag
            );

            const newAccessCount = accessCount + 1;

            if (hitWayIndex !== -1) {
                // Cache hit
                const newCache = [...cache];
                newCache[setIndex].ways[hitWayIndex].lastUsed = newAccessCount;
                setCache(newCache);
                setHits(hits + 1);
                setLastAccess({
                    address: addr,
                    setIndex,
                    tag,
                    offset,
                    result: "hit",
                });
            } else {
                // Cache miss - find LRU way
                const lruWayIndex = set.ways.reduce(
                    (minIdx, way, idx, arr) =>
                        way.lastUsed < arr[minIdx].lastUsed ? idx : minIdx,
                    0
                );

                const newCache = [...cache];
                newCache[setIndex].ways[lruWayIndex] = {
                    valid: true,
                    tag,
                    data: `Data@${addr}`,
                    lastUsed: newAccessCount,
                };
                setCache(newCache);
                setMisses(misses + 1);
                setLastAccess({
                    address: addr,
                    setIndex,
                    tag,
                    offset,
                    result: "miss",
                    replacedWay: lruWayIndex,
                });
            }

            setAccessCount(newAccessCount);
        } catch (error) {
            console.error("Invalid address format");
        }
    };

    const accessCache = () => {
        accessCacheWithAddress(address);
    };

    const startAutoPlay = () => {
        if (isPaused) {
            // Resume from pause
            setIsPaused(false);
        } else {
            // Start new sequence
            resetCache();
            setCurrentAddressIndex(0);
            setIsAutoPlaying(true);
        }
    };

    const pauseAutoPlay = () => {
        setIsPaused(true);
    };

    const stopAutoPlay = () => {
        setIsAutoPlaying(false);
        setIsPaused(false);
        setCurrentAddressIndex(0);
    };

    const resetCache = () => {
        setCache(
            Array.from({ length: numSets }, () => ({
                ways: Array.from({ length: numWays }, () => ({
                    valid: false,
                    tag: "",
                    data: "",
                    lastUsed: 0,
                })),
            }))
        );
        setAccessCount(0);
        setHits(0);
        setMisses(0);
        setLastAccess(null);
        setIsAutoPlaying(false);
        setIsPaused(false);
        setCurrentAddressIndex(0);
    };

    const hitRate = accessCount > 0 ? ((hits / accessCount) * 100).toFixed(2) : "0.00";

    return (
        <div className="space-y-6 my-8">
            <Card>
                <CardHeader>
                    <CardTitle>شبیه‌ساز تعاملی Cache</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* Configuration Display */}
                    <div className="grid grid-cols-3 gap-4 p-4 bg-secondary rounded-lg">
                        <div className="text-center">
                            <div className="text-sm text-muted-foreground">تعداد Set ها</div>
                            <div className="text-2xl font-bold">{numSets}</div>
                        </div>
                        <div className="text-center">
                            <div className="text-sm text-muted-foreground">تعداد Way ها</div>
                            <div className="text-2xl font-bold">{numWays}</div>
                        </div>
                        <div className="text-center">
                            <div className="text-sm text-muted-foreground">اندازه Block</div>
                            <div className="text-2xl font-bold">{blockSize} بایت</div>
                        </div>
                    </div>

                    {/* Address Input */}
                    <div className="space-y-2">
                        <div className="flex gap-2">
                            <Input
                                placeholder="آدرس (مثال: 0x1A4)"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                onKeyPress={(e) => e.key === "Enter" && accessCache()}
                                className="font-mono"
                                disabled={isAutoPlaying && !isPaused}
                            />
                            <Button onClick={accessCache} disabled={isAutoPlaying && !isPaused}>
                                دسترسی
                            </Button>
                            <Button variant="outline" onClick={resetCache}>
                                Reset
                            </Button>
                        </div>
                        <div className="flex gap-2">
                            {!isAutoPlaying || currentAddressIndex >= sampleAddresses.length ? (
                                <Button
                                    onClick={startAutoPlay}
                                    className="flex-1 bg-green-600 hover:bg-green-700"
                                >
                                    ▶ اجرای خودکار ({sampleAddresses.length} آدرس)
                                </Button>
                            ) : (
                                <>
                                    {isPaused ? (
                                        <Button
                                            onClick={startAutoPlay}
                                            className="flex-1 bg-blue-600 hover:bg-blue-700"
                                        >
                                            ▶ ادامه ({currentAddressIndex}/{sampleAddresses.length})
                                        </Button>
                                    ) : (
                                        <Button
                                            onClick={pauseAutoPlay}
                                            className="flex-1 bg-yellow-600 hover:bg-yellow-700"
                                        >
                                            ⏸ مکث ({currentAddressIndex}/{sampleAddresses.length})
                                        </Button>
                                    )}
                                    <Button
                                        onClick={stopAutoPlay}
                                        variant="destructive"
                                        className="flex-1"
                                    >
                                        ⏹ توقف کامل
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Statistics */}
                    <div className="grid grid-cols-4 gap-4 p-4 bg-muted rounded-lg">
                        <div className="text-center">
                            <div className="text-sm text-muted-foreground">Hit</div>
                            <div className="text-xl font-bold text-green-600">{hits}</div>
                        </div>
                        <div className="text-center">
                            <div className="text-sm text-muted-foreground">Miss</div>
                            <div className="text-xl font-bold text-red-600">{misses}</div>
                        </div>
                        <div className="text-center">
                            <div className="text-sm text-muted-foreground">کل دسترسی</div>
                            <div className="text-xl font-bold">{accessCount}</div>
                        </div>
                        <div className="text-center">
                            <div className="text-sm text-muted-foreground">Hit Rate</div>
                            <div className="text-xl font-bold">{hitRate}%</div>
                        </div>
                    </div>

                    {/* Last Access Info */}
                    {lastAccess && (
                        <div
                            className={`p-4 rounded-lg ${lastAccess.result === "hit"
                                ? "bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800"
                                : "bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800"
                                }`}
                        >
                            <div className="font-bold mb-2">
                                {lastAccess.result === "hit" ? "✓ Cache Hit" : "✗ Cache Miss"}
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-sm font-mono">
                                <div>آدرس: {lastAccess.address}</div>
                                <div>Set Index: {lastAccess.setIndex}</div>
                                <div>Tag: {lastAccess.tag}</div>
                                <div>Offset: {lastAccess.offset}</div>
                                {lastAccess.replacedWay !== undefined && (
                                    <div className="col-span-2">
                                        جایگزین شده در Way {lastAccess.replacedWay} (LRU)
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Cache Visualization */}
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-sm">
                            <thead>
                                <tr className="bg-secondary">
                                    <th className="border p-2">Set</th>
                                    {Array.from({ length: numWays }, (_, i) => (
                                        <th key={i} className="border p-2" colSpan={3}>
                                            Way {i}
                                        </th>
                                    ))}
                                </tr>
                                <tr className="bg-secondary/50">
                                    <th className="border p-2"></th>
                                    {Array.from({ length: numWays }, (_, i) => (
                                        <React.Fragment key={i}>
                                            <th className="border p-1">V</th>
                                            <th className="border p-1">Tag</th>
                                            <th className="border p-1">Data</th>
                                        </React.Fragment>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {cache.map((set, setIdx) => (
                                    <tr
                                        key={setIdx}
                                        className={
                                            lastAccess?.setIndex === setIdx
                                                ? "bg-blue-50 dark:bg-blue-950"
                                                : ""
                                        }
                                    >
                                        <td className="border p-2 text-center font-bold">{setIdx}</td>
                                        {set.ways.map((way, wayIdx) => (
                                            <React.Fragment key={wayIdx}>
                                                <td
                                                    className={`border p-1 text-center ${way.valid ? "bg-green-100 dark:bg-green-900" : ""
                                                        }`}
                                                >
                                                    {way.valid ? "1" : "0"}
                                                </td>
                                                <td className="border p-1 text-center font-mono">
                                                    {way.tag || "-"}
                                                </td>
                                                <td className="border p-1 text-center font-mono text-xs">
                                                    {way.data || "-"}
                                                </td>
                                            </React.Fragment>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
