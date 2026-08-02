import * as React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export function FooterSkeleton() {
    return (
        <footer className="w-full border-t border-border/60 bg-card/50 text-foreground transition-all">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">

                {/* MAIN GRID SECTION */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">

                    {/* COLUMN 1: BRANDING & BRIEF (4 COLS) */}
                    <div className="lg:col-span-4 space-y-4">
                        {/* Logo & Brand Name Skeleton */}
                        <div className="flex items-center gap-2.5">
                            <Skeleton className="h-9 w-9 rounded-xl bg-primary/10" />
                            <Skeleton className="h-6 w-32 rounded-md" />
                        </div>

                        {/* Description Text Skeleton */}
                        <div className="space-y-2 pt-1 max-w-sm">
                            <Skeleton className="h-3.5 w-full rounded" />
                            <Skeleton className="h-3.5 w-5/6 rounded" />
                            <Skeleton className="h-3.5 w-2/3 rounded" />
                        </div>

                        {/* Trust Badge / Guarantee Pill Skeleton */}
                        <div className="pt-2">
                            <Skeleton className="h-8 w-48 rounded-full" />
                        </div>
                    </div>

                    {/* COLUMN 2, 3, 4: NAVIGATION LINKS (6 COLS) */}
                    <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8">

                        {/* Nav Group 1 */}
                        <div className="space-y-3">
                            <Skeleton className="h-4 w-20 rounded-md" />
                            <div className="space-y-2.5 pt-1">
                                <Skeleton className="h-3 w-16 rounded" />
                                <Skeleton className="h-3 w-24 rounded" />
                                <Skeleton className="h-3 w-20 rounded" />
                                <Skeleton className="h-3 w-14 rounded" />
                            </div>
                        </div>

                        {/* Nav Group 2 */}
                        <div className="space-y-3">
                            <Skeleton className="h-4 w-24 rounded-md" />
                            <div className="space-y-2.5 pt-1">
                                <Skeleton className="h-3 w-20 rounded" />
                                <Skeleton className="h-3 w-16 rounded" />
                                <Skeleton className="h-3 w-28 rounded" />
                                <Skeleton className="h-3 w-18 rounded" />
                            </div>
                        </div>

                        {/* Nav Group 3 */}
                        <div className="space-y-3 col-span-2 sm:col-span-1">
                            <Skeleton className="h-4 w-16 rounded-md" />
                            <div className="space-y-2.5 pt-1">
                                <Skeleton className="h-3 w-20 rounded" />
                                <Skeleton className="h-3 w-24 rounded" />
                                <Skeleton className="h-3 w-16 rounded" />
                            </div>
                        </div>

                    </div>

                    {/* COLUMN 5: NEWSLETTER SUBSCRIPTION (3 COLS) */}
                    <div className="lg:col-span-3 space-y-3">
                        <Skeleton className="h-4 w-36 rounded-md" />
                        <Skeleton className="h-3.5 w-full rounded" />

                        {/* Newsletter Input + Button Skeleton */}
                        <div className="space-y-2 pt-1">
                            <Skeleton className="h-10 w-full rounded-lg" />
                            <Skeleton className="h-9 w-full rounded-lg" />
                        </div>
                    </div>

                </div>

                <Separator className="my-8 lg:my-10 bg-border/60" />

                {/* BOTTOM LEGAL & SOCIAL BAR */}
                <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4">

                    {/* Copyright & Language Selector Skeleton */}
                    <div className="flex flex-col sm:flex-row items-center gap-3">
                        <Skeleton className="h-3.5 w-48 rounded" />
                        <span className="hidden sm:inline text-border">•</span>
                        <Skeleton className="h-3.5 w-32 rounded" />
                    </div>

                    {/* Social Icons Skeleton */}
                    <div className="flex items-center gap-2">
                        <Skeleton className="h-8 w-8 rounded-lg" />
                        <Skeleton className="h-8 w-8 rounded-lg" />
                        <Skeleton className="h-8 w-8 rounded-lg" />
                        <Skeleton className="h-8 w-8 rounded-lg" />
                    </div>

                </div>

            </div>
        </footer>
    );
}

export default FooterSkeleton;