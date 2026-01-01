# Auto-Glossary System

This system automatically wraps technical terms with interactive glossary definitions.

## Usage

### Option 1: Automatic Wrapping (Recommended)

Wrap any text block with `<GlossaryText>` and all glossary terms will be automatically detected and wrapped:

```tsx
import { GlossaryText } from "@/components/glossary-text";

// Simple usage
<p>
  <GlossaryText>
    Cache is a fast memory between CPU and DRAM. It uses LRU for replacement.
  </GlossaryText>
</p>

// With className
<GlossaryText className="text-lg">
  The Set Associative architecture combines Direct Mapped and Fully Associative approaches.
</GlossaryText>
```

**All these terms will be automatically wrapped:**
- Cache → interactive glossary term
- DRAM → interactive glossary term  
- LRU → interactive glossary term
- Set Associative → interactive glossary term
- Direct Mapped → interactive glossary term
- Fully Associative → interactive glossary term

### Option 2: Manual Wrapping (For Complex Cases)

For more control, use `<GlossaryTerm>` directly:

```tsx
import { GlossaryTerm } from "@/components/glossary-term";

<p>
  The <GlossaryTerm term="cache">Cache</GlossaryTerm> uses 
  <GlossaryTerm term="lru">LRU</GlossaryTerm> algorithm.
</p>
```

## How It Works

1. **Text Scanning**: `<GlossaryText>` scans the text for known glossary terms
2. **Smart Matching**: Matches longer phrases first (e.g., "Cache Hit" before "Cache")
3. **Auto-Wrapping**: Wraps each match with `<GlossaryTerm>`
4. **Interactive**: Each wrapped term has hover tooltip + click modal

## Supported Terms

The system automatically detects **50+ terms** including:

### Common Terms
- Cache, DRAM, Registers, Storage
- Hit, Miss, Hit Rate, Miss Rate
- LRU, FIFO, TLB
- Tag, Set, Way, Set Index, Block Offset

### Architecture
- Direct Mapped, Set Associative, Fully Associative
- Out-of-Order, Hyper-Threading, Pipeline
- P-cores, E-cores

### Locality & Misses
- Temporal Locality, Spatial Locality
- Compulsory Miss, Capacity Miss, Conflict Miss

### Write Policies
- Write Through, Write Back
- Write Allocate, No-Write-Allocate

And many more! See `lib/glossary-data.ts` for the complete list.

## Adding New Terms

### Step 1: Add to glossary data

```typescript
// lib/glossary-data.ts
export const glossaryData = {
  // ... existing terms
  "my-new-term": {
    term: "My New Term",
    brief: "Short definition",
    definition: "Full explanation",
    example: "Example usage",
    benefit: "Why it matters"
  }
}
```

### Step 2: Use it automatically

```tsx
<GlossaryText>
  This text mentions My New Term and it will be wrapped automatically!
</GlossaryText>
```

That's it! No need to manually wrap every occurrence.

## Configuration

Edit `lib/auto-glossary.ts` to:
- Add multi-word phrases
- Exclude common words
- Adjust matching priority

## Examples

### Before (Manual)
```tsx
<p>
  The <GlossaryTerm term="cache">Cache</GlossaryTerm> uses 
  <GlossaryTerm term="set-associative">Set Associative</GlossaryTerm> 
  mapping with <GlossaryTerm term="lru">LRU</GlossaryTerm> replacement.
</p>
```

### After (Automatic)
```tsx
<GlossaryText>
  The Cache uses Set Associative mapping with LRU replacement.
</GlossaryText>
```

Both produce the same interactive result, but the automatic version is much easier to write and maintain!

## Tips

1. **Use GlossaryText for paragraphs**: Wrap entire text blocks
2. **Preserve formatting**: Works with RTL text and Persian content
3. **Case insensitive**: Matches "cache", "Cache", "CACHE"
4. **Smart ordering**: Longer terms matched first to avoid conflicts
5. **No duplicates**: Each term wrapped only once per occurrence

## Performance

- Efficient regex-based matching
- Client-side rendering
- No API calls
- Instant hover/click responses
