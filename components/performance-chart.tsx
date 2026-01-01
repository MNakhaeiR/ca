"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Slider } from "./ui/slider";

interface PerformanceMetric {
    label: string;
    value: number;
    color: string;
}

export function CachePerformanceChart() {
    const [hitRate, setHitRate] = useState(95);

    const missRate = 100 - hitRate;
    const avgAccessTime = (hitRate / 100) * 5 + (missRate / 100) * 200; // L1: 5 cycles, Memory: 200 cycles
    const improvement = ((200 - avgAccessTime) / 200) * 100;

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="text-lg">تأثیر Cache Hit Rate بر عملکرد</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Cache Hit Rate</span>
                        <span className="text-sm text-muted-foreground">{hitRate}%</span>
                    </div>
                    <Slider
                        value={[hitRate]}
                        onValueChange={(value) => setHitRate(value[0])}
                        min={0}
                        max={100}
                        step={5}
                        className="mb-4"
                    />
                </div>

                <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <span className="text-sm font-medium">Cache Hits</span>
                        <div className="flex items-center gap-2">
                            <div className="h-8 bg-green-500/20 rounded" style={{ width: `${hitRate * 2}px` }} />
                            <span className="text-sm font-bold text-green-600 dark:text-green-400">{hitRate}%</span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                        <span className="text-sm font-medium">Cache Misses</span>
                        <div className="flex items-center gap-2">
                            <div className="h-8 bg-red-500/20 rounded" style={{ width: `${missRate * 2}px` }} />
                            <span className="text-sm font-bold text-red-600 dark:text-red-400">{missRate}%</span>
                        </div>
                    </div>

                    <div className="pt-4 border-t">
                        <div className="grid grid-cols-2 gap-4 text-center">
                            <div className="p-3 rounded-lg bg-blue-500/10">
                                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                    {avgAccessTime.toFixed(1)}
                                </div>
                                <div className="text-xs text-muted-foreground mt-1">میانگین زمان دسترسی (سیکل)</div>
                            </div>
                            <div className="p-3 rounded-lg bg-purple-500/10">
                                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                                    {improvement.toFixed(1)}%
                                </div>
                                <div className="text-xs text-muted-foreground mt-1">بهبود عملکرد</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="text-xs text-muted-foreground p-3 bg-muted/30 rounded">
                    <p className="mb-1"><strong>فرمول:</strong> Average Access Time = Hit Rate × Hit Time + Miss Rate × Miss Penalty</p>
                    <p>Hit Time = 5 cycles (L1 Cache) | Miss Penalty = 200 cycles (Main Memory)</p>
                </div>
            </CardContent>
        </Card>
    );
}

export function CoreComparisonChart() {
    const [selectedGen, setSelectedGen] = useState("raptor-lake");

    const generations = {
        "skylake": { name: "Skylake (2015)", cores: 10, threads: 20, frequency: 4.5, ipc: 100, score: 100 },
        "coffee-lake": { name: "Coffee Lake (2018)", cores: 8, threads: 16, frequency: 5.0, ipc: 105, score: 115 },
        "comet-lake": { name: "Comet Lake (2020)", cores: 10, threads: 20, frequency: 5.3, ipc: 105, score: 125 },
        "rocket-lake": { name: "Rocket Lake (2021)", cores: 8, threads: 16, frequency: 5.3, ipc: 119, score: 135 },
        "alder-lake": { name: "Alder Lake (2021)", cores: 16, threads: 24, frequency: 5.2, ipc: 128, score: 165 },
        "raptor-lake": { name: "Raptor Lake (2022)", cores: 24, threads: 32, frequency: 5.8, ipc: 135, score: 195 }
    };

    const current = generations[selectedGen as keyof typeof generations];
    const base = generations["skylake"];

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="text-lg">مقایسه نسل‌های Core i9</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex flex-wrap gap-2">
                    {Object.entries(generations).map(([key, gen]) => (
                        <button
                            key={key}
                            onClick={() => setSelectedGen(key)}
                            className={`px-3 py-1.5 text-xs rounded-lg border transition-colors ${selectedGen === key
                                ? "bg-primary text-primary-foreground border-primary"
                                : "bg-muted hover:bg-muted/80 border-border"
                                }`}
                        >
                            {gen.name.split(" ")[0]}
                        </button>
                    ))}
                </div>

                <div className="space-y-4">
                    <div>
                        <div className="flex justify-between mb-2 text-sm">
                            <span>تعداد هسته‌ها</span>
                            <span className="font-bold">{current.cores} cores</span>
                        </div>
                        <div className="h-6 bg-muted rounded-full overflow-hidden">
                            <div
                                className="h-full bg-linear-to-r from-blue-500 to-blue-600 transition-all duration-500"
                                style={{ width: `${(current.cores / 24) * 100}%` }}
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-between mb-2 text-sm">
                            <span>فرکانس بوست</span>
                            <span className="font-bold">{current.frequency} GHz</span>
                        </div>
                        <div className="h-6 bg-muted rounded-full overflow-hidden">
                            <div
                                className="h-full bg-linear-to-r from-green-500 to-green-600 transition-all duration-500"
                                style={{ width: `${(current.frequency / 6) * 100}%` }}
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-between mb-2 text-sm">
                            <span>IPC (نسبت به Skylake)</span>
                            <span className="font-bold">+{current.ipc - base.ipc}%</span>
                        </div>
                        <div className="h-6 bg-muted rounded-full overflow-hidden">
                            <div
                                className="h-full bg-linear-to-r from-purple-500 to-purple-600 transition-all duration-500"
                                style={{ width: `${(current.ipc / 140) * 100}%` }}
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-between mb-2 text-sm">
                            <span>عملکرد نسبی</span>
                            <span className="font-bold">+{current.score - base.score}%</span>
                        </div>
                        <div className="h-6 bg-muted rounded-full overflow-hidden">
                            <div
                                className="h-full bg-linear-to-r from-orange-500 to-orange-600 transition-all duration-500"
                                style={{ width: `${(current.score / 200) * 100}%` }}
                            />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-4 border-t">
                    <div className="text-center p-3 rounded-lg bg-primary/10">
                        <div className="text-xl font-bold text-primary">{current.threads}</div>
                        <div className="text-xs text-muted-foreground">Threads</div>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-primary/10">
                        <div className="text-xl font-bold text-primary">{current.score}</div>
                        <div className="text-xs text-muted-foreground">Performance Score</div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export function CacheLatencyChart() {
    const caches = [
        { name: "L1 Cache", size: "32-48 KB", latency: 4, color: "bg-blue-500" },
        { name: "L2 Cache", size: "256 KB-2 MB", latency: 12, color: "bg-green-500" },
        { name: "L3 Cache", size: "16-36 MB", latency: 42, color: "bg-yellow-500" },
        { name: "RAM", size: "8-64 GB", latency: 200, color: "bg-red-500" },
    ];

    const maxLatency = 200;

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="text-lg">مقایسه تأخیر دسترسی به حافظه</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {caches.map((cache, idx) => (
                        <div key={idx}>
                            <div className="flex justify-between mb-2 text-sm">
                                <div>
                                    <span className="font-semibold">{cache.name}</span>
                                    <span className="text-muted-foreground mr-2">({cache.size})</span>
                                </div>
                                <span className="font-bold">{cache.latency} cycles</span>
                            </div>
                            <div className="h-8 bg-muted rounded-lg overflow-hidden relative">
                                <div
                                    className={`h-full ${cache.color} transition-all duration-700 flex items-center px-3`}
                                    style={{ width: `${(cache.latency / maxLatency) * 100}%` }}
                                >
                                    <span className="text-xs font-semibold text-white">
                                        {cache.latency}x
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-6 p-4 bg-muted/30 rounded-lg">
                    <p className="text-xs text-muted-foreground">
                        <strong>نکته:</strong> هرچه به سطوح پایین‌تر حافظه می‌رویم، تأخیر به صورت نمایی افزایش می‌یابد.
                        L1 Cache تقریباً ۵۰ برابر سریعتر از RAM است.
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}

export function AssociativityComparisonChart() {
    const [cacheSize, setCacheSize] = useState(32); // KB
    const [blockSize, setBlockSize] = useState(64); // bytes
    const [selectedConfig, setSelectedConfig] = useState<number | null>(null);

    const totalBlocks = (cacheSize * 1024) / blockSize;
    const totalBytes = cacheSize * 1024;

    // Calculate dynamic hit rates based on cache size and associativity
    const calculateHitRate = (ways: number) => {
        const sizeFactor = ((cacheSize - 8) / 56) * 20;
        const associativityBonus = ways === 1 ? 0 : ways === 2 ? 12 : ways === 4 ? 22 : ways === 8 ? 28 : 35;
        const blockFactor = ((128 - blockSize) / 96) * 8;
        return Math.min(Math.round(55 + associativityBonus + sizeFactor + blockFactor), 98);
    };

    const calculateComplexity = (ways: number, sets: number) => {
        if (ways === 1) return 1;
        if (ways === totalBlocks) return 10;
        const waysFactor = ways * 1.2;
        const setsPenalty = Math.max(0, (256 - sets) / 50);
        return Math.min(Math.round(waysFactor + setsPenalty), 10);
    };

    // Calculate average access time (cycles)
    const calculateAccessTime = (hitRate: number) => {
        const hitTime = 4; // L1 cache hit
        const missTime = 200; // Memory access
        return ((hitRate / 100) * hitTime + ((100 - hitRate) / 100) * missTime).toFixed(1);
    };

    const configs = [
        {
            type: "Direct Mapped",
            shortName: "1-Way",
            ways: 1,
            sets: Math.floor(totalBlocks),
            hitRate: calculateHitRate(1),
            complexity: calculateComplexity(1, Math.floor(totalBlocks)),
            color: "from-red-500 to-red-600",
            icon: "📍"
        },
        {
            type: "2-Way Set Associative",
            shortName: "2-Way",
            ways: 2,
            sets: Math.floor(totalBlocks / 2),
            hitRate: calculateHitRate(2),
            complexity: calculateComplexity(2, Math.floor(totalBlocks / 2)),
            color: "from-orange-500 to-orange-600",
            icon: "🔶"
        },
        {
            type: "4-Way Set Associative",
            shortName: "4-Way",
            ways: 4,
            sets: Math.floor(totalBlocks / 4),
            hitRate: calculateHitRate(4),
            complexity: calculateComplexity(4, Math.floor(totalBlocks / 4)),
            color: "from-yellow-500 to-yellow-600",
            icon: "⬛"
        },
        {
            type: "8-Way Set Associative",
            shortName: "8-Way",
            ways: 8,
            sets: Math.floor(totalBlocks / 8),
            hitRate: calculateHitRate(8),
            complexity: calculateComplexity(8, Math.floor(totalBlocks / 8)),
            color: "from-green-500 to-green-600",
            icon: "🟩"
        },
        {
            type: "Fully Associative",
            shortName: "Full",
            ways: Math.floor(totalBlocks),
            sets: 1,
            hitRate: calculateHitRate(Math.floor(totalBlocks)),
            complexity: 10,
            color: "from-blue-500 to-blue-600",
            icon: "🌐"
        },
    ];

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="text-lg">شبیه‌ساز تعاملی Cache Associativity</CardTitle>
                <p className="text-sm text-muted-foreground mt-2">
                    با تغییر پارامترها تأثیر Associativity بر عملکرد و پیچیدگی را مشاهده کنید
                </p>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Cache Configuration Panel */}
                <div className="p-4 rounded-lg bg-muted/30 border-2 border-primary/20">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold flex items-center gap-2">
                                <span className="text-lg">💾</span>
                                اندازه Cache
                            </label>
                            <Slider
                                value={[cacheSize]}
                                onValueChange={(value) => setCacheSize(value[0])}
                                min={8}
                                max={64}
                                step={8}
                                className="my-4"
                            />
                            <div className="text-center">
                                <div className="text-2xl font-bold text-primary">{cacheSize} KB</div>
                                <div className="text-xs text-muted-foreground">{totalBytes.toLocaleString()} bytes</div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold flex items-center gap-2">
                                <span className="text-lg">📦</span>
                                اندازه Block
                            </label>
                            <Slider
                                value={[blockSize]}
                                onValueChange={(value) => setBlockSize(value[0])}
                                min={32}
                                max={128}
                                step={32}
                                className="my-4"
                            />
                            <div className="text-center">
                                <div className="text-2xl font-bold text-primary">{blockSize} B</div>
                                <div className="text-xs text-muted-foreground">{blockSize * 8} bits</div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold flex items-center gap-2">
                                <span className="text-lg">🔢</span>
                                تعداد کل Blocks
                            </label>
                            <div className="flex items-center justify-center h-10">
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-primary">{Math.floor(totalBlocks)}</div>
                                    <div className="text-xs text-muted-foreground">blocks</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Comparison Cards */}
                <div className="grid grid-cols-1 gap-3">
                    {configs.map((config, idx) => {
                        const isSelected = selectedConfig === idx;
                        const accessTime = calculateAccessTime(config.hitRate);

                        return (
                            <div
                                key={`${config.type}-${cacheSize}-${blockSize}`}
                                className={`p-4 border-2 rounded-xl transition-all duration-300 cursor-pointer ${isSelected
                                        ? 'border-primary bg-primary/5 shadow-lg scale-[1.02]'
                                        : 'border-border hover:border-primary/50 hover:bg-muted/30'
                                    }`}
                                onClick={() => setSelectedConfig(isSelected ? null : idx)}
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                        <span className="text-2xl">{config.icon}</span>
                                        <div>
                                            <h3 className="font-bold text-base">{config.type}</h3>
                                            <div className="flex gap-4 text-xs text-muted-foreground mt-1">
                                                <span className="font-mono bg-muted px-2 py-0.5 rounded">
                                                    {config.ways} Ways
                                                </span>
                                                <span className="font-mono bg-muted px-2 py-0.5 rounded">
                                                    {config.sets} Sets
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-xs text-muted-foreground">زمان دسترسی</div>
                                        <div className="text-xl font-bold text-primary">{accessTime}</div>
                                        <div className="text-xs text-muted-foreground">cycles</div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    {/* Hit Rate */}
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-xs">
                                            <span className="font-medium">Hit Rate</span>
                                            <span className="font-bold text-green-600 dark:text-green-400">
                                                {config.hitRate}%
                                            </span>
                                        </div>
                                        <div className="h-4 bg-muted rounded-full overflow-hidden">
                                            <div
                                                className={`h-full bg-linear-to-r ${config.color} transition-all duration-500`}
                                                style={{ width: `${config.hitRate}%` }}
                                            />
                                        </div>
                                        <div className="h-1 bg-linear-to-r from-red-500 via-yellow-500 to-green-500 rounded-full opacity-30" />
                                    </div>

                                    {/* Complexity */}
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-xs">
                                            <span className="font-medium">پیچیدگی سخت‌افزار</span>
                                            <span className="font-bold text-orange-600 dark:text-orange-400">
                                                {config.complexity}/10
                                            </span>
                                        </div>
                                        <div className="h-4 bg-muted rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-linear-to-r from-green-500 to-red-500 transition-all duration-500"
                                                style={{ width: `${(config.complexity / 10) * 100}%` }}
                                            />
                                        </div>
                                        <div className="h-1 bg-linear-to-r from-green-500 to-red-500 rounded-full opacity-30" />
                                    </div>
                                </div>

                                {/* Expanded Details */}
                                {isSelected && (
                                    <div className="mt-4 pt-4 border-t grid grid-cols-3 gap-3 text-center">
                                        <div className="p-3 rounded-lg bg-blue-500/10">
                                            <div className="text-xs text-muted-foreground mb-1">Offset Bits</div>
                                            <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                                                {Math.log2(blockSize)}
                                            </div>
                                        </div>
                                        <div className="p-3 rounded-lg bg-purple-500/10">
                                            <div className="text-xs text-muted-foreground mb-1">Index Bits</div>
                                            <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
                                                {Math.log2(config.sets) || 0}
                                            </div>
                                        </div>
                                        <div className="p-3 rounded-lg bg-green-500/10">
                                            <div className="text-xs text-muted-foreground mb-1">Comparators</div>
                                            <div className="text-lg font-bold text-green-600 dark:text-green-400">
                                                {config.ways}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Educational Info */}
                <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg space-y-2">
                    <h4 className="font-bold text-sm flex items-center gap-2">
                        <span>💡</span>
                        نکات کلیدی
                    </h4>
                    <ul className="text-xs text-muted-foreground space-y-1 mr-6">
                        <li>• <strong>Direct Mapped</strong>: ساده‌ترین و سریع‌ترین اما کمترین Hit Rate</li>
                        <li>• <strong>N-Way</strong>: تعادل بین عملکرد و پیچیدگی - انتخاب محبوب CPUها</li>
                        <li>• <strong>Fully Associative</strong>: بهترین Hit Rate اما پیچیده‌ترین و گران‌ترین</li>
                        <li>• Cache بزرگتر = Hit Rate بهتر | Block کوچکتر = انعطاف‌پذیری بیشتر</li>
                    </ul>
                </div>
            </CardContent>
        </Card>
    );
}
