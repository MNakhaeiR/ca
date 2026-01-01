"use client";

export function CoreI9BlockDiagram() {
    return (
        <div className="w-full my-6 overflow-x-auto">
            <svg viewBox="0 0 1100 750" className="w-full h-auto max-w-6xl mx-auto border-2 border-border rounded-xl bg-linear-to-br from-card to-muted/30 shadow-2xl p-6" preserveAspectRatio="xMidYMid meet">
                <defs>
                    <marker id="arrowhead-i9" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                        <polygon points="0 0, 10 3, 0 6" className="fill-primary" />
                    </marker>
                    <filter id="shadow-i9">
                        <feDropShadow dx="0" dy="3" stdDeviation="4" floodOpacity="0.2" />
                    </filter>
                    <linearGradient id="grad-frontend" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="hsl(217, 91%, 60%)" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="hsl(217, 91%, 60%)" stopOpacity="0.1" />
                    </linearGradient>
                    <linearGradient id="grad-backend" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="hsl(142, 76%, 36%)" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="hsl(142, 76%, 36%)" stopOpacity="0.1" />
                    </linearGradient>
                </defs>

                {/* Title */}
                <text x="550" y="40" textAnchor="middle" className="fill-foreground font-bold text-2xl">
                    Intel Core i9 Architecture
                </text>

                {/* Front-End */}
                <g filter="url(#shadow-i9)">
                    <rect x="60" y="80" width="280" height="200" fill="url(#grad-frontend)" className="stroke-blue-500" strokeWidth="3" rx="8" />
                    <text x="200" y="110" textAnchor="middle" className="fill-foreground font-bold text-lg">Front-End</text>

                    {/* I-Cache */}
                    <rect x="80" y="130" width="110" height="60" className="fill-blue-400/25 stroke-blue-400" strokeWidth="2" rx="5" />
                    <text x="135" y="153" textAnchor="middle" className="fill-foreground text-sm font-semibold">L1 I-Cache</text>
                    <text x="135" y="171" textAnchor="middle" className="fill-muted-foreground text-xs">32 KB, 8-way</text>

                    {/* Decode */}
                    <rect x="210" y="130" width="110" height="60" className="fill-blue-400/25 stroke-blue-400" strokeWidth="2" rx="5" />
                    <text x="265" y="153" textAnchor="middle" className="fill-foreground text-sm font-semibold">Decoder</text>
                    <text x="265" y="171" textAnchor="middle" className="fill-muted-foreground text-xs">4-wide</text>

                    {/* μOp Cache */}
                    <rect x="80" y="205" width="110" height="60" className="fill-blue-400/25 stroke-blue-400" strokeWidth="2" rx="5" />
                    <text x="135" y="228" textAnchor="middle" className="fill-foreground text-sm font-semibold">μOp Cache</text>
                    <text x="135" y="246" textAnchor="middle" className="fill-muted-foreground text-xs">2K μOps</text>

                    {/* BTB */}
                    <rect x="210" y="205" width="110" height="60" className="fill-blue-400/25 stroke-blue-400" strokeWidth="2" rx="5" />
                    <text x="265" y="228" textAnchor="middle" className="fill-foreground text-sm font-semibold">BTB</text>
                    <text x="265" y="246" textAnchor="middle" className="fill-muted-foreground text-xs">12K entries</text>
                </g>

                {/* Execution Engine */}
                <g filter="url(#shadow-i9)">
                    <rect x="380" y="80" width="660" height="460" fill="url(#grad-backend)" className="stroke-green-500" strokeWidth="3" rx="8" />
                    <text x="710" y="110" textAnchor="middle" className="fill-foreground font-bold text-lg">Execution Engine (Out-of-Order)</text>

                    {/* Scheduler */}
                    <rect x="400" y="130" width="280" height="70" className="fill-green-400/25 stroke-green-400" strokeWidth="2" rx="5" />
                    <text x="540" y="158" textAnchor="middle" className="fill-foreground text-sm font-semibold">Scheduler / Reservation Stations</text>
                    <text x="540" y="180" textAnchor="middle" className="fill-muted-foreground text-xs">97 entries, Unified</text>

                    {/* ROB */}
                    <rect x="710" y="130" width="300" height="70" className="fill-green-400/25 stroke-green-400" strokeWidth="2" rx="5" />
                    <text x="860" y="158" textAnchor="middle" className="fill-foreground text-sm font-semibold">Reorder Buffer (ROB)</text>
                    <text x="860" y="180" textAnchor="middle" className="fill-muted-foreground text-xs">224-512 entries</text>

                    {/* Execution Ports Label */}
                    <text x="710" y="230" textAnchor="middle" className="fill-foreground font-semibold text-base">Execution Ports</text>

                    {/* Port 0 */}
                    <g>
                        <rect x="400" y="250" width="100" height="90" className="fill-amber-400/25 stroke-amber-500" strokeWidth="2" rx="5" />
                        <text x="450" y="273" textAnchor="middle" className="fill-foreground text-sm font-bold">Port 0</text>
                        <text x="450" y="293" textAnchor="middle" className="fill-muted-foreground text-xs">ALU</text>
                        <text x="450" y="308" textAnchor="middle" className="fill-muted-foreground text-xs">FP MUL</text>
                        <text x="450" y="323" textAnchor="middle" className="fill-muted-foreground text-xs">Branch</text>
                    </g>

                    {/* Port 1 */}
                    <g>
                        <rect x="520" y="250" width="100" height="90" className="fill-amber-400/25 stroke-amber-500" strokeWidth="2" rx="5" />
                        <text x="570" y="273" textAnchor="middle" className="fill-foreground text-sm font-bold">Port 1</text>
                        <text x="570" y="293" textAnchor="middle" className="fill-muted-foreground text-xs">ALU</text>
                        <text x="570" y="308" textAnchor="middle" className="fill-muted-foreground text-xs">FP ADD</text>
                        <text x="570" y="323" textAnchor="middle" className="fill-muted-foreground text-xs">Shuffle</text>
                    </g>

                    {/* Port 2-3 (Load) */}
                    <g>
                        <rect x="640" y="250" width="100" height="90" className="fill-purple-400/25 stroke-purple-500" strokeWidth="2" rx="5" />
                        <text x="690" y="273" textAnchor="middle" className="fill-foreground text-sm font-bold">Port 2-3</text>
                        <text x="690" y="293" textAnchor="middle" className="fill-muted-foreground text-xs">Load</text>
                        <text x="690" y="308" textAnchor="middle" className="fill-muted-foreground text-xs">AGU</text>
                    </g>

                    {/* Port 4 (Store Data) */}
                    <g>
                        <rect x="760" y="250" width="100" height="90" className="fill-purple-400/25 stroke-purple-500" strokeWidth="2" rx="5" />
                        <text x="810" y="273" textAnchor="middle" className="fill-foreground text-sm font-bold">Port 4</text>
                        <text x="810" y="293" textAnchor="middle" className="fill-muted-foreground text-xs">Store</text>
                        <text x="810" y="308" textAnchor="middle" className="fill-muted-foreground text-xs">Data</text>
                    </g>

                    {/* Port 5-6 */}
                    <g>
                        <rect x="880" y="250" width="130" height="90" className="fill-cyan-400/25 stroke-cyan-500" strokeWidth="2" rx="5" />
                        <text x="945" y="273" textAnchor="middle" className="fill-foreground text-sm font-bold">Port 5-6</text>
                        <text x="945" y="293" textAnchor="middle" className="fill-muted-foreground text-xs">ALU, Vector</text>
                        <text x="945" y="308" textAnchor="middle" className="fill-muted-foreground text-xs">Branch</text>
                    </g>

                    {/* Memory Subsystem */}
                    <text x="710" y="375" textAnchor="middle" className="fill-foreground font-semibold text-base">Memory Subsystem</text>

                    {/* L1 D-Cache */}
                    <rect x="400" y="390" width="200" height="70" className="fill-teal-400/25 stroke-teal-500" strokeWidth="2" rx="5" />
                    <text x="500" y="418" textAnchor="middle" className="fill-foreground text-sm font-semibold">L1 D-Cache</text>
                    <text x="500" y="438" textAnchor="middle" className="fill-muted-foreground text-xs">48 KB, 12-way</text>
                    <text x="500" y="451" textAnchor="middle" className="fill-muted-foreground text-[10px]">~4-5 cycles</text>

                    {/* Store Buffer */}
                    <rect x="620" y="390" width="200" height="70" className="fill-teal-400/25 stroke-teal-500" strokeWidth="2" rx="5" />
                    <text x="720" y="418" textAnchor="middle" className="fill-foreground text-sm font-semibold">Store Buffer</text>
                    <text x="720" y="438" textAnchor="middle" className="fill-muted-foreground text-xs">56 entries</text>

                    {/* Load Buffer */}
                    <rect x="840" y="390" width="170" height="70" className="fill-teal-400/25 stroke-teal-500" strokeWidth="2" rx="5" />
                    <text x="925" y="418" textAnchor="middle" className="fill-foreground text-sm font-semibold">Load Buffer</text>
                    <text x="925" y="438" textAnchor="middle" className="fill-muted-foreground text-xs">72 entries</text>

                    {/* L2 Cache */}
                    <rect x="400" y="480" width="610" height="50" className="fill-yellow-500/25 stroke-yellow-600" strokeWidth="2" rx="5" />
                    <text x="705" y="508" textAnchor="middle" className="fill-foreground text-sm font-semibold">L2 Cache (Private): 256 KB - 2 MB, 16-way, ~12-14 cycles</text>
                </g>

                {/* L3 Cache */}
                <g filter="url(#shadow-i9)">
                    <rect x="60" y="570" width="980" height="70" className="fill-orange-500/25 stroke-orange-600" strokeWidth="3" rx="8" />
                    <text x="550" y="598" textAnchor="middle" className="fill-foreground text-base font-bold">L3 Cache / LLC (Shared)</text>
                    <text x="550" y="622" textAnchor="middle" className="fill-muted-foreground text-sm">16-36 MB, 11-16-way, Non-inclusive, ~40-50 cycles</text>
                </g>

                {/* Main Memory */}
                <g filter="url(#shadow-i9)">
                    <rect x="60" y="670" width="980" height="60" className="fill-purple-500/25 stroke-purple-600" strokeWidth="3" rx="8" />
                    <text x="550" y="697" textAnchor="middle" className="fill-foreground text-base font-bold">Main Memory (DDR4/DDR5)</text>
                    <text x="550" y="717" textAnchor="middle" className="fill-muted-foreground text-sm">~60-100 ns (~200-300 cycles)</text>
                </g>

                {/* Arrows */}
                <line x1="200" y1="280" x2="380" y2="180" className="stroke-primary" strokeWidth="2.5" markerEnd="url(#arrowhead-i9)" />
                <line x1="710" y1="540" x2="550" y2="570" className="stroke-primary" strokeWidth="2.5" markerEnd="url(#arrowhead-i9)" />
                <line x1="550" y1="640" x2="550" y2="670" className="stroke-primary" strokeWidth="2.5" markerEnd="url(#arrowhead-i9)" />
            </svg>
        </div>
    );
}

export function PipelineDiagram() {
    const stages = [
        { name: "Fetch", color: "hsl(var(--chart-1))", desc: "Instruction Fetch" },
        { name: "Decode", color: "hsl(var(--chart-2))", desc: "Decode to μOps" },
        { name: "Allocate", color: "hsl(var(--chart-3))", desc: "Resource Allocation" },
        { name: "Execute", color: "hsl(var(--chart-4))", desc: "Out-of-Order Execution" },
        { name: "Retire", color: "hsl(var(--chart-5))", desc: "In-Order Retirement" },
    ];

    return (
        <div className="w-full my-6 overflow-x-auto">
            <svg viewBox="0 0 1100 320" className="w-full h-auto max-w-6xl mx-auto border-2 border-border rounded-xl bg-linear-to-br from-card to-muted/30 shadow-2xl p-6" preserveAspectRatio="xMidYMid meet">
                <defs>
                    <marker id="arrow-pipe" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                        <polygon points="0 0, 10 3, 0 6" className="fill-primary" />
                    </marker>
                    <filter id="pipe-shadow">
                        <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.2" />
                    </filter>
                </defs>

                {/* Title */}
                <text x="550" y="40" textAnchor="middle" className="fill-foreground font-bold text-2xl">
                    Intel Core i9 Pipeline Architecture
                </text>

                {/* Pipeline Stages */}
                <g transform="translate(80, 90)">
                    {stages.map((stage, idx) => (
                        <g key={idx} filter="url(#pipe-shadow)">
                            <rect
                                x={idx * 190}
                                y={0}
                                width={170}
                                height={120}
                                rx="8"
                                fill={stage.color}
                                opacity="0.3"
                                stroke={stage.color}
                                strokeWidth="3"
                            />
                            <text
                                x={idx * 190 + 85}
                                y={50}
                                textAnchor="middle"
                                className="fill-foreground text-xl font-bold"
                            >
                                {stage.name}
                            </text>
                            <text
                                x={idx * 190 + 85}
                                y={75}
                                textAnchor="middle"
                                className="fill-muted-foreground text-xs"
                            >
                                {stage.desc}
                            </text>

                            {idx < stages.length - 1 && (
                                <path
                                    d={`M ${idx * 190 + 175} 60 L ${(idx + 1) * 190 - 10} 60`}
                                    className="stroke-primary"
                                    strokeWidth="3"
                                    markerEnd="url(#arrow-pipe)"
                                />
                            )}
                        </g>
                    ))}
                </g>

                {/* Key Features */}
                <g transform="translate(80, 240)">
                    <rect x="0" y="0" width="940" height="60" rx="6" className="fill-muted/20 stroke-muted-foreground/30" strokeWidth="1.5" />

                    <text x="20" y="25" className="fill-foreground text-sm font-semibold">Key Features:</text>
                    <text x="20" y="45" className="fill-muted-foreground text-xs">
                        • 14-19 stages deep • Out-of-Order Execution • Speculative Execution • Branch Prediction • Register Renaming
                    </text>
                </g>
            </svg>
        </div>
    );
}

export function BranchPredictorDiagram() {
    return (
        <div className="w-full my-6 overflow-x-auto">
            <svg viewBox="0 0 1100 650" className="w-full h-auto max-w-6xl mx-auto border-2 border-border rounded-xl bg-linear-to-br from-card to-muted/30 shadow-2xl p-6" preserveAspectRatio="xMidYMid meet">
                <defs>
                    <marker id="arrow-bp" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                        <polygon points="0 0, 10 3, 0 6" className="fill-primary" />
                    </marker>
                    <filter id="bp-shadow">
                        <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.2" />
                    </filter>
                </defs>

                {/* Title */}
                <text x="550" y="40" textAnchor="middle" className="fill-foreground font-bold text-2xl">
                    Advanced Branch Prediction System
                </text>

                {/* Instruction Fetch */}
                <g filter="url(#bp-shadow)">
                    <rect x="450" y="80" width="200" height="70" rx="8" className="fill-blue-500/25 stroke-blue-500" strokeWidth="2.5" />
                    <text x="550" y="110" textAnchor="middle" className="fill-foreground font-bold text-base">Instruction Fetch</text>
                    <text x="550" y="132" textAnchor="middle" className="fill-muted-foreground text-xs">Program Counter</text>
                </g>

                {/* Branch Target Buffer */}
                <g filter="url(#bp-shadow)">
                    <rect x="100" y="200" width="250" height="90" rx="8" className="fill-green-500/25 stroke-green-500" strokeWidth="2.5" />
                    <text x="225" y="230" textAnchor="middle" className="fill-foreground font-bold text-base">Branch Target Buffer (BTB)</text>
                    <text x="225" y="252" textAnchor="middle" className="fill-muted-foreground text-xs">12K entries</text>
                    <text x="225" y="270" textAnchor="middle" className="fill-muted-foreground text-xs">Predicts target address</text>
                </g>

                {/* Pattern History Table */}
                <g filter="url(#bp-shadow)">
                    <rect x="425" y="200" width="250" height="90" rx="8" className="fill-purple-500/25 stroke-purple-500" strokeWidth="2.5" />
                    <text x="550" y="230" textAnchor="middle" className="fill-foreground font-bold text-base">Pattern History Table</text>
                    <text x="550" y="252" textAnchor="middle" className="fill-muted-foreground text-xs">2-bit counters</text>
                    <text x="550" y="270" textAnchor="middle" className="fill-muted-foreground text-xs">Predicts taken/not-taken</text>
                </g>

                {/* Return Stack Buffer */}
                <g filter="url(#bp-shadow)">
                    <rect x="750" y="200" width="250" height="90" rx="8" className="fill-orange-500/25 stroke-orange-500" strokeWidth="2.5" />
                    <text x="875" y="230" textAnchor="middle" className="fill-foreground font-bold text-base">Return Stack Buffer</text>
                    <text x="875" y="252" textAnchor="middle" className="fill-muted-foreground text-xs">16-32 entries</text>
                    <text x="875" y="270" textAnchor="middle" className="fill-muted-foreground text-xs">Call/Return prediction</text>
                </g>

                {/* Predicted Path */}
                <g filter="url(#bp-shadow)">
                    <rect x="350" y="350" width="400" height="80" rx="8" className="fill-teal-500/25 stroke-teal-500" strokeWidth="2.5" />
                    <text x="550" y="380" textAnchor="middle" className="fill-foreground font-bold text-base">Predicted Execution Path</text>
                    <text x="550" y="402" textAnchor="middle" className="fill-muted-foreground text-xs">Speculative execution begins</text>
                </g>

                {/* Verification */}
                <g filter="url(#bp-shadow)">
                    <rect x="200" y="490" width="300" height="80" rx="8" className="fill-green-600/25 stroke-green-600" strokeWidth="2.5" />
                    <text x="350" y="520" textAnchor="middle" className="fill-foreground font-bold text-base">✓ Correct Prediction</text>
                    <text x="350" y="542" textAnchor="middle" className="fill-muted-foreground text-xs">Continue execution</text>
                    <text x="350" y="557" textAnchor="middle" className="fill-green-600 text-xs font-semibold">~95% accuracy</text>
                </g>

                <g filter="url(#bp-shadow)">
                    <rect x="600" y="490" width="300" height="80" rx="8" className="fill-red-500/25 stroke-red-500" strokeWidth="2.5" />
                    <text x="750" y="520" textAnchor="middle" className="fill-foreground font-bold text-base">✗ Misprediction</text>
                    <text x="750" y="542" textAnchor="middle" className="fill-muted-foreground text-xs">Pipeline flush & restart</text>
                    <text x="750" y="557" textAnchor="middle" className="fill-red-500 text-xs font-semibold">15-20 cycle penalty</text>
                </g>

                {/* Arrows */}
                <line x1="550" y1="150" x2="225" y2="200" className="stroke-primary" strokeWidth="2" markerEnd="url(#arrow-bp)" />
                <line x1="550" y1="150" x2="550" y2="200" className="stroke-primary" strokeWidth="2" markerEnd="url(#arrow-bp)" />
                <line x1="550" y1="150" x2="875" y2="200" className="stroke-primary" strokeWidth="2" markerEnd="url(#arrow-bp)" />

                <line x1="225" y1="290" x2="450" y2="350" className="stroke-primary" strokeWidth="2" markerEnd="url(#arrow-bp)" />
                <line x1="550" y1="290" x2="550" y2="350" className="stroke-primary" strokeWidth="2" markerEnd="url(#arrow-bp)" />
                <line x1="875" y1="290" x2="650" y2="350" className="stroke-primary" strokeWidth="2" markerEnd="url(#arrow-bp)" />

                <line x1="480" y1="430" x2="350" y2="490" className="stroke-green-600" strokeWidth="2" markerEnd="url(#arrow-bp)" />
                <line x1="620" y1="430" x2="750" y2="490" className="stroke-red-500" strokeWidth="2" markerEnd="url(#arrow-bp)" />
            </svg>
        </div>
    );
}

export function CacheHierarchyDiagram() {
    return (
        <div className="w-full my-6 overflow-x-auto">
            <svg viewBox="0 0 1200 700" className="w-full h-auto max-w-6xl mx-auto border-2 border-border rounded-xl bg-linear-to-br from-card to-muted/30 shadow-2xl p-6" preserveAspectRatio="xMidYMid meet">
                <defs>
                    <marker id="arrowhead-cache" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                        <polygon points="0 0, 10 3, 0 6" className="fill-primary" />
                    </marker>
                    <filter id="cache-shadow">
                        <feDropShadow dx="0" dy="3" stdDeviation="4" floodOpacity="0.2" />
                    </filter>
                </defs>

                {/* Title */}
                <text x="600" y="40" textAnchor="middle" className="fill-foreground font-bold text-2xl">
                    Memory Hierarchy & Cache System
                </text>

                {/* CPU Core */}
                <g filter="url(#cache-shadow)">
                    <rect x="500" y="80" width="200" height="70" className="fill-red-500/25 stroke-red-500" strokeWidth="3" rx="8" />
                    <text x="600" y="108" textAnchor="middle" className="fill-foreground font-bold text-base">CPU Core</text>
                    <text x="600" y="130" textAnchor="middle" className="fill-muted-foreground text-xs">Execution Units</text>
                </g>

                {/* L1 I-Cache */}
                <g filter="url(#cache-shadow)">
                    <rect x="250" y="200" width="220" height="90" className="fill-blue-500/25 stroke-blue-500" strokeWidth="3" rx="8" />
                    <text x="360" y="230" textAnchor="middle" className="fill-foreground font-bold text-base">L1 Instruction Cache</text>
                    <text x="360" y="252" textAnchor="middle" className="fill-muted-foreground text-sm">32 KB, 8-way</text>
                    <text x="360" y="270" textAnchor="middle" className="fill-muted-foreground text-xs">Latency: ~4-5 cycles</text>
                </g>

                {/* L1 D-Cache */}
                <g filter="url(#cache-shadow)">
                    <rect x="730" y="200" width="220" height="90" className="fill-green-500/25 stroke-green-500" strokeWidth="3" rx="8" />
                    <text x="840" y="230" textAnchor="middle" className="fill-foreground font-bold text-base">L1 Data Cache</text>
                    <text x="840" y="252" textAnchor="middle" className="fill-muted-foreground text-sm">48 KB, 12-way</text>
                    <text x="840" y="270" textAnchor="middle" className="fill-muted-foreground text-xs">Latency: ~4-5 cycles</text>
                </g>

                {/* L2 Cache */}
                <g filter="url(#cache-shadow)">
                    <rect x="400" y="350" width="400" height="90" className="fill-yellow-500/25 stroke-yellow-600" strokeWidth="3" rx="8" />
                    <text x="600" y="380" textAnchor="middle" className="fill-foreground font-bold text-base">L2 Cache (Private per Core)</text>
                    <text x="600" y="402" textAnchor="middle" className="fill-muted-foreground text-sm">256 KB - 2 MB, 16-way</text>
                    <text x="600" y="420" textAnchor="middle" className="fill-muted-foreground text-xs">Latency: ~12-14 cycles, Unified (Instructions + Data)</text>
                </g>

                {/* L3 Cache */}
                <g filter="url(#cache-shadow)">
                    <rect x="250" y="500" width="700" height="90" className="fill-orange-500/25 stroke-orange-600" strokeWidth="3" rx="8" />
                    <text x="600" y="530" textAnchor="middle" className="fill-foreground font-bold text-base">L3 Cache / Last Level Cache (Shared)</text>
                    <text x="600" y="552" textAnchor="middle" className="fill-muted-foreground text-sm">16-36 MB, 11-16-way, Non-inclusive</text>
                    <text x="600" y="570" textAnchor="middle" className="fill-muted-foreground text-xs">Latency: ~40-50 cycles, Shared across all cores</text>
                </g>

                {/* Main Memory */}
                <g filter="url(#cache-shadow)">
                    <rect x="300" y="630" width="600" height="60" className="fill-purple-500/25 stroke-purple-600" strokeWidth="3" rx="8" />
                    <text x="600" y="658" textAnchor="middle" className="fill-foreground font-bold text-base">Main Memory (DDR4/DDR5 DRAM)</text>
                    <text x="600" y="677" textAnchor="middle" className="fill-muted-foreground text-xs">Latency: ~60-100 ns (~200-300 cycles)</text>
                </g>

                {/* Arrows and Labels */}
                <line x1="550" y1="150" x2="360" y2="200" className="stroke-primary" strokeWidth="3" markerEnd="url(#arrowhead-cache)" />
                <line x1="650" y1="150" x2="840" y2="200" className="stroke-primary" strokeWidth="3" markerEnd="url(#arrowhead-cache)" />

                <line x1="360" y1="290" x2="500" y2="350" className="stroke-primary" strokeWidth="3" markerEnd="url(#arrowhead-cache)" />
                <line x1="840" y1="290" x2="700" y2="350" className="stroke-primary" strokeWidth="3" markerEnd="url(#arrowhead-cache)" />

                <line x1="600" y1="440" x2="600" y2="500" className="stroke-primary" strokeWidth="3" markerEnd="url(#arrowhead-cache)" />
                <line x1="600" y1="590" x2="600" y2="630" className="stroke-primary" strokeWidth="3" markerEnd="url(#arrowhead-cache)" />

                {/* Side Labels */}
                <text x="150" y="245" className="fill-muted-foreground text-sm font-semibold italic">Instructions</text>
                <text x="1020" y="245" className="fill-muted-foreground text-sm font-semibold italic">Data</text>
                <text x="150" y="395" className="fill-muted-foreground text-sm font-semibold italic">Unified Cache</text>
                <text x="100" y="545" className="fill-muted-foreground text-sm font-semibold italic">Shared Across Cores</text>
            </svg>
        </div>
    );
}
