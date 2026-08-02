import * as React from "react";
import {
    Filter,
    SlidersHorizontal,
    Sparkles
} from "lucide-react";

// shadcn/ui component imports
import { Badge } from "@/components/ui/badge";
import { GearViewProvider } from "../context/GearViewProvider";
import GearResults from "../components/GearResults";
import FilterSidebarServer from "../components/FilterSidebarServer";
import GearToolbarServer from "../components/GearToolbarServer";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export default async function GearServer({
    searchParams,
}: {
    searchParams: Promise<{
        search?: string;
        category?: string;
        brand?: string;
        price?: string;
        available?: string;
    }>;
}) {

    const {
        search = "",
        category = "",
        brand = "",
        price = "",
        available = "",
    } = await searchParams;

    return (
        <div className="min-h-screen bg-background text-foreground pb-20">

            {/* HEADER / BREADCRUMB BANNER */}
            <div className="bg-slate-900 text-slate-100 py-10 border-b border-slate-800">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl space-y-3">
                        <Badge variant="outline" className="border-primary/50 text-primary-foreground bg-primary/10 px-3 py-1 text-xs rounded-full inline-flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-primary" /> Verified Outdoor Rentals
                        </Badge>
                        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Browse Gear Marketplace</h1>
                        <p className="text-slate-400 text-sm sm:text-base">
                            Explore thousands of top-tier sports equipment, kayaks, tents, and mountain bikes available for daily rental.
                        </p>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8">

                {/* TOP TOOLBAR & SEARCH */}
                <GearViewProvider>
                    <React.Suspense fallback={<>Loading...</>}>
                        <GearToolbarServer />
                    </React.Suspense>

                    {/* MAIN LAYOUT: SIDEBAR + GEAR GRID */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                        {/* DESKTOP FILTER SIDEBAR */}
                        <aside className="hidden lg:block lg:col-span-3 space-y-6 bg-card border border-border/80 rounded-2xl p-6 h-fit sticky top-24 shadow-sm">
                            <div className="flex items-center justify-between pb-4 border-b border-border/60">
                                <h2 className="font-bold text-base flex items-center gap-2">
                                    <Filter className="w-4 h-4 text-primary" /> Filter Gear
                                </h2>
                            </div>

                            {/* Reusable Filter Sidebar Content */}
                            <React.Suspense fallback={<>Loading...</>}>
                                <FilterSidebarServer />
                            </React.Suspense>
                        </aside>

                        {/* Mobile Filter */}
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="outline" className="lg:hidden gap-2 border-border/80">
                                    <SlidersHorizontal className="w-4 h-4" /> Filters
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="w-[300px] sm:w-[360px] overflow-y-auto">
                                <SheetHeader className="text-left mb-6">
                                    <SheetTitle className="flex items-center gap-2 text-lg font-bold">
                                        <Filter className="w-5 h-5 text-primary" /> Filter Equipment
                                    </SheetTitle>
                                    <SheetDescription>
                                        Narrow down gear by category, daily rate, and condition.
                                    </SheetDescription>
                                </SheetHeader>
                                <React.Suspense fallback={<>Loading...</>}>
                                    <FilterSidebarServer />
                                </React.Suspense>
                            </SheetContent>
                        </Sheet>

                        {/* GEAR LISTINGS AREA */}
                        <React.Suspense fallback={<>Loading...</>}>
                            <GearResults filters={{
                                search,
                                category,
                                brand,
                                price,
                                available,
                            }} />
                        </React.Suspense>
                    </div>
                </GearViewProvider>

            </div>
        </div >
    );
}