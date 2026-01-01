import { glossaryData } from "./glossary-data";

/**
 * Configuration for automatic glossary term wrapping
 */
export const autoGlossaryConfig = {
    // Terms to always wrap (case-insensitive)
    alwaysWrap: [
        "Cache",
        "DRAM",
        "LRU",
        "FIFO",
        "TLB",
        "Tag",
        "Set",
        "Way",
        "Hit",
        "Miss",
        "Registers",
        "Storage",
        "Core",
        "Thread",
        "Pipeline",
        "Prefetcher",
        "IPC",
        "TDP",
        "PCIe",
        "SRAM",
        "SIMD",
        "ALU",
        "FPU",
        "MESI",
        "RISC",
        "CISC",
        "ISA",
        "Microcode",
        "ECC",
        "L1",
        "L2",
        "L3",
        "DDR4",
        "DDR5",
    ] as Array<keyof typeof glossaryData>,

    // Common phrases that should be wrapped as single units
    phrases: {
        "Cache Hit": "hit",
        "Cache Miss": "miss",
        "Hit Rate": "hit",
        "Miss Rate": "miss",
        "Direct Mapped": "direct-mapped",
        "Set Associative": "set-associative",
        "Fully Associative": "fully-associative",
        "Set Index": "set-index",
        "Block Offset": "block-offset",
        "Cache Line": "cache-line",
        "Cache Block": "cache-line",
        "Temporal Locality": "temporal-locality",
        "Spatial Locality": "spatial-locality",
        "Compulsory Miss": "compulsory-miss",
        "Cold Miss": "compulsory-miss",
        "Capacity Miss": "capacity-miss",
        "Conflict Miss": "conflict-miss",
        "Write Through": "write-through",
        "Write Back": "write-back",
        "Out-of-Order": "out-of-order",
        "Out-of-Order Execution": "out-of-order",
        "Hyper-Threading": "hyper-threading",
        "Branch Prediction": "branch-prediction",
        "AVX-512": "avx-512",
        "Performance Cores": "p-cores",
        "P-cores": "p-cores",
        "Efficiency Cores": "e-cores",
        "E-cores": "e-cores",
        "Page Table": "page-table",
        "Virtual Memory": "virtual-memory",
        "False Sharing": "false-sharing",
        "Cache Coherence": "cache-coherence",
        "Power Gating": "power-gating",
        "Clock Gating": "clock-gating",
        "Memory Barrier": "memory-barrier",
        "Single-Threaded": "single-threaded",
        "Multi-Threaded": "multi-threaded",
        "Single Threaded": "single-threaded",
        "Multi Threaded": "multi-threaded",
        "Clock Speed": "clock",
        "Turbo Boost": "turbo-boost",
        "L1 Cache": "l1",
        "L2 Cache": "l2",
        "L3 Cache": "l3",
    } as Record<string, keyof typeof glossaryData>,

    // Words to exclude from wrapping (common words that might match)
    excludeWords: [
        "the", "a", "an", "and", "or", "but", "in", "on", "at", "to", "for",
        "of", "with", "from", "as", "is", "was", "are", "were", "be", "been",
    ],
};

/**
 * Get list of all terms that should be auto-wrapped
 */
export function getAutoWrapTerms(): Array<{
    key: keyof typeof glossaryData;
    pattern: string;
    displayText: string;
    priority: number; // Higher = match first
}> {
    const terms: Array<{
        key: keyof typeof glossaryData;
        pattern: string;
        displayText: string;
        priority: number;
    }> = [];

    // Add phrases first (highest priority)
    Object.entries(autoGlossaryConfig.phrases).forEach(([phrase, key]) => {
        terms.push({
            key: key as keyof typeof glossaryData,
            pattern: phrase,
            displayText: phrase,
            priority: phrase.split(" ").length * 100, // Longer phrases = higher priority
        });
    });

    // Add individual terms
    Object.entries(glossaryData).forEach(([key, data]) => {
        // Extract English term
        const match = data.term.match(/^([A-Za-z0-9\-\/\s]+)/);
        if (match) {
            const term = match[1].trim();

            // Skip if it's already in phrases or excluded
            if (
                !Object.keys(autoGlossaryConfig.phrases).some(
                    p => p.toLowerCase() === term.toLowerCase()
                ) &&
                !autoGlossaryConfig.excludeWords.includes(term.toLowerCase())
            ) {
                terms.push({
                    key: key as keyof typeof glossaryData,
                    pattern: term,
                    displayText: term,
                    priority: term.length,
                });
            }
        }
    });

    // Sort by priority (longest/most specific first)
    return terms.sort((a, b) => b.priority - a.priority);
}
