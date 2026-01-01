"use client";

import { Fragment, ReactNode } from "react";
import { GlossaryTerm } from "./glossary-term";
import { glossaryData } from "@/lib/glossary-data";

interface GlossaryTextProps {
    children: string;
    className?: string;
}

/**
 * Automatically wraps glossary terms in text with interactive GlossaryTerm component.
 * Usage: <GlossaryText>Your text with Cache and DRAM terms</GlossaryText>
 */
export function GlossaryText({ children, className }: GlossaryTextProps) {
    if (!children || typeof children !== "string") {
        return <>{children}</>;
    }

    // Clean up the text - remove literal \n characters that might be in the string
    const cleanText = children.replace(/\\n/g, ' ').replace(/\s+/g, ' ').trim();

    // Build a map of searchable patterns to glossary keys
    const termPatterns: Array<{ term: keyof typeof glossaryData; pattern: string; displayText: string }> = [];

    Object.entries(glossaryData).forEach(([key, data]) => {
        // Extract English term from the full term string (e.g., "Cache" from "Cache (حافظه نهان)")
        const termMatch = data.term.match(/^([A-Za-z0-9\-\/\s]+)/);
        if (termMatch) {
            termPatterns.push({
                term: key as keyof typeof glossaryData,
                pattern: termMatch[1].trim(),
                displayText: termMatch[1].trim()
            });
        }

        // Also add the full term
        termPatterns.push({
            term: key as keyof typeof glossaryData,
            pattern: data.term,
            displayText: data.term
        });
    });

    // Sort by length (longest first) to match longer terms before shorter ones
    // This prevents "Set" from matching before "Set Associative"
    termPatterns.sort((a, b) => b.pattern.length - a.pattern.length);

    // Build regex pattern that matches any glossary term
    const patterns = termPatterns.map(t => t.pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    const regex = new RegExp(`\\b(${patterns.join('|')})\\b`, 'gi');

    const parts: Array<{ text: string; isTerm: boolean; termKey?: keyof typeof glossaryData; displayText?: string }> = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    // Find all matches
    while ((match = regex.exec(cleanText)) !== null) {
        // Add text before match
        if (match.index > lastIndex) {
            parts.push({
                text: cleanText.substring(lastIndex, match.index),
                isTerm: false
            });
        }

        // Find which term matched
        const matchedText = match[0];
        const termInfo = termPatterns.find(t =>
            t.pattern.toLowerCase() === matchedText.toLowerCase()
        );

        if (termInfo) {
            parts.push({
                text: matchedText,
                isTerm: true,
                termKey: termInfo.term,
                displayText: matchedText
            });
        } else {
            // Fallback if pattern not found
            parts.push({
                text: matchedText,
                isTerm: false
            });
        }

        lastIndex = match.index + matchedText.length;
    }

    // Add remaining text
    if (lastIndex < cleanText.length) {
        parts.push({
            text: cleanText.substring(lastIndex),
            isTerm: false
        });
    }

    // If no terms found, return original text
    if (parts.length === 0) {
        return <span className={className}>{cleanText}</span>;
    }

    return (
        <span className={className}>
            {parts.map((part, index) => {
                if (part.isTerm && part.termKey) {
                    return (
                        <GlossaryTerm key={index} term={part.termKey}>
                            {part.displayText || part.text}
                        </GlossaryTerm>
                    );
                }
                return <Fragment key={index}>{part.text}</Fragment>;
            })}
        </span>
    );
}
