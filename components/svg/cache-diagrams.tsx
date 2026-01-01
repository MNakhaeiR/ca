"use client";

export function CacheDiagram({ numWays = 4, numSets = 8 }: { numWays?: number; numSets?: number }) {
    const cellWidth = 70;
    const cellHeight = 50;
    const margin = 80;
    const headerHeight = 40;
    const comparatorWidth = 100;
    const spacing = 15;

    const cacheWidth = numWays * cellWidth * 3; // V + Tag + Data per way
    const width = margin * 2 + cacheWidth + spacing + comparatorWidth;
    const displayRows = numSets > 4 ? 5 : numSets;
    const height = margin + headerHeight + 120 + displayRows * cellHeight + 40;

    return (
        <div className="w-full my-6 overflow-x-auto">
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto max-w-6xl mx-auto border-2 border-border rounded-xl bg-linear-to-br from-card to-muted/30 shadow-2xl p-6" preserveAspectRatio="xMidYMid meet">
                <defs>
                    <linearGradient id="headerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
                    </linearGradient>
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Title with modern styling */}
                <text x={width / 2} y={35} textAnchor="middle" className="fill-foreground font-bold text-xl" filter="url(#glow)">
                    {numWays}-Way Set Associative Cache Architecture
                </text>

                {/* Address Structure Section */}
                <g transform={`translate(${margin}, 60)`}>
                    <text x={0} y={0} className="fill-primary font-bold text-sm">Memory Address Structure:</text>

                    {/* Tag field */}
                    <rect x={0} y={15} width={120} height={35} rx="4" className="fill-blue-500/20 stroke-blue-500" strokeWidth="2" />
                    <text x={60} y={33} textAnchor="middle" className="fill-foreground font-semibold text-xs">Tag</text>
                    <text x={60} y={46} textAnchor="middle" className="fill-muted-foreground text-[10px]">Identifies Block</text>

                    {/* Set Index field */}
                    <rect x={125} y={15} width={120} height={35} rx="4" className="fill-green-500/20 stroke-green-500" strokeWidth="2" />
                    <text x={185} y={33} textAnchor="middle" className="fill-foreground font-semibold text-xs">Set Index</text>
                    <text x={185} y={46} textAnchor="middle" className="fill-muted-foreground text-[10px]">Selects Set</text>

                    {/* Offset field */}
                    <rect x={250} y={15} width={120} height={35} rx="4" className="fill-orange-500/20 stroke-orange-500" strokeWidth="2" />
                    <text x={310} y={33} textAnchor="middle" className="fill-foreground font-semibold text-xs">Offset</text>
                    <text x={310} y={46} textAnchor="middle" className="fill-muted-foreground text-[10px]">Byte in Block</text>
                </g>

                {/* Cache Structure */}
                <g transform={`translate(${margin}, 170)`}>
                    {/* Column Headers */}
                    <g>
                        {Array.from({ length: numWays }, (_, wayIdx) => (
                            <g key={wayIdx} transform={`translate(${wayIdx * cellWidth * 3}, 0)`}>
                                <rect x={0} y={0} width={cellWidth * 3} height={headerHeight} rx="6"
                                    className="fill-primary/20 stroke-primary" strokeWidth="2" />
                                <text x={cellWidth * 1.5} y={27} textAnchor="middle"
                                    className="fill-foreground font-bold text-sm">Way {wayIdx}</text>
                            </g>
                        ))}
                    </g>

                    {/* Set Labels and Cache Cells */}
                    {[0, 1, 2, numSets > 4 ? numSets - 1 : 3].map((setIdx, displayIdx) => {
                        const yPos = headerHeight + 10 + (setIdx === numSets - 1 && numSets > 4 ? 4 : displayIdx) * cellHeight;

                        return (
                            <g key={setIdx}>
                                {/* Set Label */}
                                <text x={-50} y={yPos + cellHeight / 2 + 5} textAnchor="middle"
                                    className="fill-muted-foreground font-semibold text-xs">
                                    Set {setIdx}
                                </text>

                                {/* Cache Blocks for this set */}
                                {Array.from({ length: numWays }, (_, wayIdx) => {
                                    const xBase = wayIdx * cellWidth * 3;

                                    return (
                                        <g key={wayIdx}>
                                            {/* Valid Bit */}
                                            <rect x={xBase} y={yPos} width={cellWidth} height={cellHeight} rx="3"
                                                className="fill-amber-500/15 stroke-amber-600/60" strokeWidth="1.5" />
                                            <text x={xBase + cellWidth / 2} y={yPos + cellHeight / 2 + 4} textAnchor="middle"
                                                className="fill-foreground font-semibold text-xs">V</text>

                                            {/* Tag */}
                                            <rect x={xBase + cellWidth} y={yPos} width={cellWidth} height={cellHeight} rx="3"
                                                className="fill-blue-500/15 stroke-blue-600/60" strokeWidth="1.5" />
                                            <text x={xBase + cellWidth * 1.5} y={yPos + cellHeight / 2 + 4} textAnchor="middle"
                                                className="fill-foreground font-semibold text-xs">Tag</text>

                                            {/* Data */}
                                            <rect x={xBase + cellWidth * 2} y={yPos} width={cellWidth} height={cellHeight} rx="3"
                                                className="fill-green-500/15 stroke-green-600/60" strokeWidth="1.5" />
                                            <text x={xBase + cellWidth * 2.5} y={yPos + cellHeight / 2 + 4} textAnchor="middle"
                                                className="fill-foreground font-semibold text-xs">Data</text>
                                        </g>
                                    );
                                })}
                            </g>
                        );
                    })}

                    {/* Ellipsis for skipped sets */}
                    {numSets > 4 && (
                        <text x={cacheWidth / 2} y={headerHeight + 10 + cellHeight * 3.5 + 5} textAnchor="middle"
                            className="fill-muted-foreground text-2xl font-bold">⋮</text>
                    )}
                </g>

                {/* Comparators Section */}
                <g transform={`translate(${margin + cacheWidth + spacing}, 170)`}>
                    <rect x={0} y={0} width={comparatorWidth} height={headerHeight} rx="6"
                        className="fill-purple-500/20 stroke-purple-500" strokeWidth="2" />
                    <text x={comparatorWidth / 2} y={27} textAnchor="middle"
                        className="fill-foreground font-bold text-sm">Comparators</text>

                    {Array.from({ length: Math.min(3, numWays) }, (_, i) => (
                        <g key={i}>
                            <circle cx={comparatorWidth / 2} cy={headerHeight + 10 + i * cellHeight + cellHeight / 2} r={18}
                                className="fill-purple-500/20 stroke-purple-600" strokeWidth="2" />
                            <text x={comparatorWidth / 2} y={headerHeight + 10 + i * cellHeight + cellHeight / 2 + 5}
                                textAnchor="middle" className="fill-foreground font-bold text-sm">=?</text>
                        </g>
                    ))}

                    {numWays > 3 && (
                        <text x={comparatorWidth / 2} y={headerHeight + 10 + cellHeight * 3 + 25} textAnchor="middle"
                            className="fill-muted-foreground text-2xl font-bold">⋮</text>
                    )}
                </g>
            </svg>
        </div>
    );
}

export function CacheMappingDiagram() {
    return (
        <div className="w-full my-6 overflow-x-auto">
            <svg viewBox="0 0 1000 550" className="w-full h-auto max-w-6xl mx-auto border-2 border-border rounded-xl bg-linear-to-br from-card to-muted/30 shadow-2xl p-6" preserveAspectRatio="xMidYMid meet">
                <defs>
                    <marker id="arrow-mapping" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                        <polygon points="0 0, 10 3, 0 6" fill="hsl(var(--primary))" />
                    </marker>
                    <linearGradient id="blockGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
                    </linearGradient>
                </defs>

                {/* Title */}
                <text x={500} y={30} textAnchor="middle" className="fill-foreground font-bold text-xl">
                    Memory Block to Cache Set Mapping
                </text>

                {/* Memory Blocks Section */}
                <g transform="translate(70, 70)">
                    <text x={60} y={-15} textAnchor="middle" className="fill-primary font-bold text-sm">Main Memory</text>

                    {Array.from({ length: 16 }, (_, i) => {
                        const colors = [
                            { fill: 'hsl(217, 91%, 60%)', fillOpacity: '0.15', stroke: 'hsl(217, 91%, 60%)' },
                            { fill: 'hsl(142, 76%, 36%)', fillOpacity: '0.15', stroke: 'hsl(142, 76%, 36%)' },
                            { fill: 'hsl(24, 95%, 53%)', fillOpacity: '0.15', stroke: 'hsl(24, 95%, 53%)' },
                            { fill: 'hsl(280, 100%, 70%)', fillOpacity: '0.15', stroke: 'hsl(280, 100%, 70%)' }
                        ];
                        const color = colors[i % 4];

                        return (
                            <g key={i}>
                                <rect x={0} y={i * 28} width={120} height={26} rx="4"
                                    fill={color.fill} fillOpacity={color.fillOpacity} stroke={color.stroke} strokeWidth="2" />
                                <text x={60} y={i * 28 + 17} textAnchor="middle"
                                    className="fill-foreground font-semibold text-xs">Block {i}</text>
                            </g>
                        );
                    })}
                </g>

                {/* Mapping Arrows */}
                <g>
                    {/* Block 0, 4, 8, 12 -> Set 0 */}
                    {[0, 4, 8, 12].map((block, idx) => (
                        <path key={block}
                            d={`M 190 ${84 + block * 28} Q 400 ${84 + block * 28} 500 ${110 + 15}`}
                            fill="none" stroke="hsl(var(--chart-1))" strokeWidth="2.5"
                            markerEnd="url(#arrow-mapping)" opacity="0.6" />
                    ))}

                    {/* Block 1, 5, 9, 13 -> Set 1 */}
                    {[1, 5, 9, 13].map((block, idx) => (
                        <path key={block}
                            d={`M 190 ${84 + block * 28} Q 400 ${84 + block * 28} 500 ${110 + 60 + 15}`}
                            fill="none" stroke="hsl(var(--chart-2))" strokeWidth="2.5"
                            markerEnd="url(#arrow-mapping)" opacity="0.6" />
                    ))}
                </g>

                {/* Cache Sets Section */}
                <g transform="translate(500, 70)">
                    <text x={200} y={-15} textAnchor="middle" className="fill-primary font-bold text-sm">
                        4-Way Set Associative Cache
                    </text>

                    {Array.from({ length: 4 }, (_, setIdx) => (
                        <g key={setIdx}>
                            {/* Set Label */}
                            <text x={-40} y={setIdx * 60 + 25} className="fill-muted-foreground font-semibold text-xs">
                                Set {setIdx}
                            </text>

                            {/* Ways */}
                            <rect x={0} y={setIdx * 60} width={400} height={50} rx="6"
                                className="fill-muted/30 stroke-muted-foreground/30" strokeWidth="1" strokeDasharray="4,4" />

                            {Array.from({ length: 4 }, (_, wayIdx) => (
                                <rect key={wayIdx}
                                    x={wayIdx * 95 + wayIdx * 5} y={setIdx * 60 + 5} width={95} height={40} rx="4"
                                    className="fill-primary/20 stroke-primary" strokeWidth="1.5" />
                            ))}

                            <text x={410} y={setIdx * 60 + 30} className="fill-muted-foreground text-xs italic">
                                (4 ways)
                            </text>
                        </g>
                    ))}
                </g>

                {/* Formula */}
                <g transform="translate(70, 510)">
                    <rect x={0} y={-25} width={860} height={35} rx="6" className="fill-primary/10 stroke-primary/30" strokeWidth="1.5" />
                    <text x={430} y={-3} textAnchor="middle" className="fill-foreground font-mono text-sm font-semibold">
                        Set Index = (Block Address) mod (Number of Sets)
                    </text>
                </g>
            </svg>
        </div>
    );
}

export function ReplacementPolicyDiagram() {
    const blocks = [
        { tag: "A", time: 4, color: "hsl(var(--chart-1))", age: "Newer" },
        { tag: "B", time: 2, color: "hsl(var(--chart-2))", age: "Older" },
        { tag: "C", time: 7, color: "hsl(var(--chart-3))", age: "Newest" },
        { tag: "D", time: 1, color: "hsl(var(--chart-4))", age: "Oldest (LRU)" },
    ];

    return (
        <div className="w-full my-6 overflow-x-auto">
            <svg viewBox="0 0 700 400" className="w-full h-auto max-w-4xl mx-auto border-2 border-border rounded-xl bg-linear-to-br from-card to-muted/30 shadow-2xl p-6" preserveAspectRatio="xMidYMid meet">
                <defs>
                    <filter id="shadow-lru">
                        <feDropShadow dx="0" dy="3" stdDeviation="4" floodOpacity="0.25" />
                    </filter>
                </defs>

                {/* Title */}
                <text x={350} y={35} textAnchor="middle" className="fill-foreground font-bold text-xl">
                    LRU (Least Recently Used) Replacement Policy
                </text>

                {/* Current Cache State */}
                <text x={350} y={70} textAnchor="middle" className="fill-muted-foreground font-semibold text-sm">
                    Current Cache Set State
                </text>

                <g transform="translate(100, 90)">
                    {blocks.map((block, idx) => (
                        <g key={idx} filter="url(#shadow-lru)">
                            <rect
                                x={idx * 120}
                                y={0}
                                width={110}
                                height={100}
                                rx="8"
                                fill={block.color}
                                opacity="0.3"
                                stroke={block.color}
                                strokeWidth="3"
                            />
                            <text
                                x={idx * 120 + 55}
                                y={40}
                                textAnchor="middle"
                                className="fill-foreground text-3xl font-bold"
                            >
                                {block.tag}
                            </text>
                            <text
                                x={idx * 120 + 55}
                                y={65}
                                textAnchor="middle"
                                className="fill-muted-foreground text-xs font-semibold"
                            >
                                Last Access: T-{block.time}
                            </text>
                            <text
                                x={idx * 120 + 55}
                                y={85}
                                textAnchor="middle"
                                className="fill-muted-foreground text-[10px] italic"
                            >
                                {block.age}
                            </text>
                        </g>
                    ))}
                </g>

                {/* Arrow Down */}
                <g transform="translate(350, 210)">
                    <path d="M 0 0 L 0 25" stroke="hsl(var(--primary))" strokeWidth="3" markerEnd="url(#arrow-down)" />
                    <text x={15} y={15} className="fill-primary font-semibold text-xs">Replace</text>
                </g>

                <defs>
                    <marker id="arrow-down" markerWidth="10" markerHeight="10" refX="5" refY="8" orient="auto">
                        <polygon points="0 0, 10 0, 5 10" className="fill-primary" />
                    </marker>
                </defs>

                {/* After Replacement */}
                <text x={350} y={265} textAnchor="middle" className="fill-muted-foreground font-semibold text-sm">
                    After Replacement (New Block X)
                </text>

                <g transform="translate(100, 280)">
                    {blocks.map((block, idx) => {
                        const isReplaced = block.tag === "D";
                        return (
                            <g key={idx}>
                                <rect
                                    x={idx * 120}
                                    y={0}
                                    width={110}
                                    height={80}
                                    rx="8"
                                    fill={isReplaced ? "hsl(var(--destructive))" : block.color}
                                    opacity={isReplaced ? "0.2" : "0.3"}
                                    stroke={isReplaced ? "hsl(var(--destructive))" : block.color}
                                    strokeWidth={isReplaced ? "3" : "2"}
                                    strokeDasharray={isReplaced ? "5,5" : "0"}
                                />
                                <text
                                    x={idx * 120 + 55}
                                    y={35}
                                    textAnchor="middle"
                                    className={`text-2xl font-bold ${isReplaced ? 'fill-destructive' : 'fill-foreground'}`}
                                >
                                    {isReplaced ? "X" : block.tag}
                                </text>
                                <text
                                    x={idx * 120 + 55}
                                    y={60}
                                    textAnchor="middle"
                                    className="fill-muted-foreground text-[10px] font-semibold"
                                >
                                    {isReplaced ? "New Block" : block.age}
                                </text>
                            </g>
                        );
                    })}
                </g>
            </svg>
        </div>
    );
}
