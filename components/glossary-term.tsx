"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { glossaryData } from "@/lib/glossary-data";

interface GlossaryTermProps {
    term: keyof typeof glossaryData;
    children: React.ReactNode;
    showTooltip?: boolean;
}

export function GlossaryTerm({ term, children, showTooltip = true }: GlossaryTermProps) {
    const [open, setOpen] = useState(false);
    const entry = glossaryData[term];

    if (!entry) {
        console.warn(`Glossary entry not found: ${term}`);
        return <>{children}</>;
    }

    const termElement = (
        <span
            className="glossary-term cursor-pointer border-b-[3px] border-solid border-blue-600 dark:border-blue-400 hover:border-blue-800 dark:hover:border-blue-200 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-all px-1 py-0.5 rounded-sm font-medium"
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setOpen(true);
            }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setOpen(true);
                }
            }}
        >
            {children}
        </span>
    );

    if (!showTooltip) {
        return (
            <>
                {termElement}
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent className="max-w-2xl" dir="rtl">
                        <DialogHeader>
                            <DialogTitle className="text-2xl">{entry.term}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                            <div>
                                <h4 className="font-bold text-lg mb-2">تعریف</h4>
                                <p className="text-muted-foreground">{entry.definition}</p>
                            </div>
                            {entry.example && (
                                <div>
                                    <h4 className="font-bold text-lg mb-2">مثال</h4>
                                    <p className="text-muted-foreground">{entry.example}</p>
                                </div>
                            )}
                            {entry.benefit && (
                                <div>
                                    <h4 className="font-bold text-lg mb-2">فایده / کاربرد</h4>
                                    <p className="text-muted-foreground">{entry.benefit}</p>
                                </div>
                            )}
                            {entry.technical && (
                                <div>
                                    <h4 className="font-bold text-lg mb-2">نکته فنی</h4>
                                    <p className="text-muted-foreground text-sm">{entry.technical}</p>
                                </div>
                            )}
                        </div>
                    </DialogContent>
                </Dialog>
            </>
        );
    }

    return (
        <>
            <HoverCard openDelay={200}>
                <HoverCardTrigger asChild>{termElement}</HoverCardTrigger>
                <HoverCardContent className="w-80" dir="rtl">
                    <div className="space-y-2">
                        <h4 className="font-bold">{entry.term}</h4>
                        <p className="text-sm text-muted-foreground">{entry.brief}</p>
                        <p className="text-xs text-primary/70">برای اطلاعات بیشتر کلیک کنید</p>
                    </div>
                </HoverCardContent>
            </HoverCard>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-w-2xl" dir="rtl">
                    <DialogHeader>
                        <DialogTitle className="text-2xl">{entry.term}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div>
                            <h4 className="font-bold text-lg mb-2">تعریف</h4>
                            <p className="text-muted-foreground">{entry.definition}</p>
                        </div>
                        {entry.example && (
                            <div>
                                <h4 className="font-bold text-lg mb-2">مثال</h4>
                                <p className="text-muted-foreground">{entry.example}</p>
                            </div>
                        )}
                        {entry.benefit && (
                            <div>
                                <h4 className="font-bold text-lg mb-2">فایده / کاربرد</h4>
                                <p className="text-muted-foreground">{entry.benefit}</p>
                            </div>
                        )}
                        {entry.technical && (
                            <div>
                                <h4 className="font-bold text-lg mb-2">نکته فنی</h4>
                                <p className="text-muted-foreground text-sm">{entry.technical}</p>
                            </div>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
