import * as React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export function SidebarSkeleton() {
    return (
        <aside className="w-64 h-screen sticky top-0 flex flex-col border-r border-border/60 bg-card/50 backdrop-blur-md transition-all shrink-0">

            {/* 1. SIDEBAR BRAND / LOGO HEADER */}
            <div className="h-16 flex items-center px-5 border-b border-border/60 justify-between">
                <div className="flex items-center gap-3">
                    <Skeleton className="h-9 w-9 rounded-xl bg-primary/10 shrink-0" />
                    <div className="space-y-1">
                        <Skeleton className="h-4 w-24 rounded-md" />
                        <Skeleton className="h-2.5 w-16 rounded" />
                    </div>
                </div>
            </div>

            {/* 2. NAVIGATION SKELETON LIST */}
            <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">

                {/* GROUP 1: MAIN NAVIGATION */}
                <div className="space-y-2">
                    <div className="px-3">
                        <Skeleton className="h-3 w-16 rounded uppercase tracking-wider" />
                    </div>
                    <div className="space-y-1 pt-1">
                        <Skeleton className="h-9 w-full rounded-lg" />
                        <Skeleton className="h-9 w-full rounded-lg" />
                        <Skeleton className="h-9 w-full rounded-lg" />
                        <Skeleton className="h-9 w-full rounded-lg" />
                    </div>
                </div>

                <Separator className="bg-border/60 mx-2" />

                {/* GROUP 2: MANAGEMENT / SETTINGS */}
                <div className="space-y-2">
                    <div className="px-3">
                        <Skeleton className="h-3 w-20 rounded uppercase tracking-wider" />
                    </div>
                    <div className="space-y-1 pt-1">
                        <Skeleton className="h-9 w-full rounded-lg" />
                        <Skeleton className="h-9 w-full rounded-lg" />
                        <Skeleton className="h-9 w-full rounded-lg" />
                    </div>
                </div>

                <Separator className="bg-border/60 mx-2" />

                {/* GROUP 3: PROMO / STATUS WIDGET SKELETON */}
                <div className="p-3.5 rounded-xl border border-border/60 bg-muted/20 space-y-2">
                    <Skeleton className="h-4 w-28 rounded-md" />
                    <Skeleton className="h-3 w-full rounded" />
                    <Skeleton className="h-3 w-3/4 rounded" />
                    <Skeleton className="h-7 w-full rounded-lg pt-1" />
                </div>

            </div>

            {/* 3. USER ACCOUNT FOOTER SKELETON */}
            <div className="p-3 border-t border-border/60 bg-muted/10">
                <div className="flex items-center gap-3 p-2 rounded-xl bg-muted/30 border border-border/40">
                    <Skeleton className="h-9 w-9 rounded-full shrink-0" />
                    <div className="flex-1 min-w-0 space-y-1">
                        <Skeleton className="h-3.5 w-24 rounded" />
                        <Skeleton className="h-2.5 w-32 rounded" />
                    </div>
                    <Skeleton className="h-7 w-7 rounded-lg shrink-0" />
                </div>
            </div>

        </aside>
    );
}

export default SidebarSkeleton;