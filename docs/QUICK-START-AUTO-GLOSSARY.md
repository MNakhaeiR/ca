# Quick Start: Auto-Glossary

## ✨ The Magic Component

Use `<GlossaryText>` to automatically wrap ALL glossary terms in your text!

## Before & After

### ❌ OLD WAY (Manual - Tedious)
```tsx
<p>
  The <GlossaryTerm term="cache">Cache</GlossaryTerm> uses 
  <GlossaryTerm term="lru">LRU</GlossaryTerm> replacement policy. 
  When a <GlossaryTerm term="miss">Cache Miss</GlossaryTerm> occurs, 
  data is fetched from <GlossaryTerm term="dram">DRAM</GlossaryTerm>.
</p>
```

### ✅ NEW WAY (Automatic - Simple!)
```tsx
<GlossaryText>
  The Cache uses LRU replacement policy. When a Cache Miss occurs, 
  data is fetched from DRAM.
</GlossaryText>
```

**Result**: All terms (Cache, LRU, Cache Miss, DRAM) automatically become interactive with hover tooltips and click modals!

## Real Example

### Writing New Content

```tsx
<p>
  <GlossaryText>
    Set Associative Cache combines flexibility with simplicity. 
    Each Set contains multiple Ways, typically 4 or 8. When a 
    Cache Hit occurs, the Tag is matched and data is retrieved. 
    On a Cache Miss, the LRU algorithm selects which block to replace.
  </GlossaryText>
</p>
```

**All these become interactive automatically:**
- Set Associative → clickable
- Cache → clickable
- Set → clickable
- Ways → clickable
- Cache Hit → clickable
- Tag → clickable
- Cache Miss → clickable
- LRU → clickable

## Persian + English Mix

```tsx
<GlossaryText>
  حافظه نهان Cache یک لایه سریع بین پردازنده و DRAM است که 
  از الگوریتم LRU برای جایگزینی استفاده می‌کند.
</GlossaryText>
```

Works perfectly with mixed RTL/LTR text!

## Usage in Your Articles

### 1. Import the component
```tsx
import { GlossaryText } from "@/components/glossary-text";
```

### 2. Wrap text blocks
```tsx
<p>
  <GlossaryText>
    Your paragraph with technical terms...
  </GlossaryText>
</p>
```

### 3. Done! 🎉

No need to manually wrap each term anymore. Just write naturally and let the component handle it!

## When to Use What

| Situation | Use |
|-----------|-----|
| Writing new paragraphs | `<GlossaryText>` |
| Simple text with many terms | `<GlossaryText>` |
| Need custom display text | `<GlossaryTerm>` manual |
| Complex JSX structure | `<GlossaryTerm>` manual |

## Adding More Terms

Just add to `lib/glossary-data.ts`:

```typescript
export const glossaryData = {
  // ... existing
  "prefetcher": {
    term: "Prefetcher (پیش‌بارگذار)",
    brief: "Loads data before it's requested",
    definition: "Full explanation...",
    example: "Example...",
    benefit: "Why it matters..."
  }
}
```

Now **anywhere** you write "Prefetcher" in `<GlossaryText>`, it becomes interactive! 🚀

## Try It Now!

Replace any paragraph in your article:

```tsx
// Before
<p>
  متن شما با اصطلاحات فنی...
</p>

// After  
<p>
  <GlossaryText>
    متن شما با اصطلاحات فنی...
  </GlossaryText>
</p>
```

That's it! All technical terms will be automatically wrapped and interactive.
