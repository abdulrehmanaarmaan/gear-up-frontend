import * as React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export function UserToolbarSkeleton() {
    return (
        <Card className="border-border/80 bg-card shadow-sm animate-in fade-in-50 duration-300">
            <CardContent className="p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">

                {/* Search Input Skeleton */}
                <div className="relative flex-1">
                    <Skeleton className="h-10 w-full rounded-lg" />
                </div>

                {/* Filters & Action Buttons Skeleton Group */}
                <div className="flex flex-wrap items-center gap-3">

                    {/* Role Filter Select Skeleton (130px width) */}
                    <Skeleton className="h-10 w-full sm:w-[130px] rounded-lg shrink-0" />

                    {/* Status Filter Select Skeleton (140px width) */}
                    <Skeleton className="h-10 w-full sm:w-[140px] rounded-lg shrink-0" />

                    {/* Reset Button Skeleton (Square 40x40 icon button) */}
                    <Skeleton className="h-10 w-10 rounded-lg shrink-0" />

                </div>

            </CardContent>
        </Card>
    );
}

export default UserToolbarSkeleton;