"use client"

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Grid, List, Search } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { useGearView } from '../context/GearViewProvider';

const GearToolbar = () => {

    const router = useRouter();
    const searchParams = useSearchParams();

    const searchQuery = searchParams.get("search") || "";

    const { viewMode, setViewMode } = useGearView()

    const debouncedSearch = useDebouncedCallback(
        (value: string) => {
            const params = new URLSearchParams(searchParams.toString());

            if (value) {
                params.set("search", value);
            } else {
                params.delete("search");
            }

            params.set("page", "1");
            router.replace(`/gears?${params.toString()}`);
        },
        500
    );

    return (
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-8">
            {/* Main Search Input */}
            <div className="relative flex-1 max-w-2xl">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                    type="text"
                    placeholder="Search gear title, brand, or model (e.g., Osprey Atmos 65)..."
                    value={searchQuery}
                    onChange={(e) =>
                        debouncedSearch(e.target.value)
                    }
                    className="pl-10 h-11 bg-card border-border/80 focus-visible:ring-1 focus-visible:ring-primary rounded-xl"
                />
            </div>
            <div className="flex items-center justify-between sm:justify-end gap-3">
                {/* Sort Dropdown */}
                <div className="flex items-center gap-2">
                    <Select
                        defaultValue="newest"
                        value={searchParams.get("sort") || "newest"}
                        onValueChange={(value) => {
                            const params = new URLSearchParams(searchParams);
                            params.set("sort", value);
                            router.replace(`/gears?${params.toString()}`);
                        }}>
                        <SelectTrigger className="cursor-pointer w-[170px] h-11 bg-card border-border/80 rounded-xl">
                            <SelectValue placeholder="Sort By" />
                        </SelectTrigger>
                        <SelectContent>
                            {/* <SelectItem value="newest">Newest First</SelectItem> */}
                            <SelectItem value="price-asc">Price: Low to High</SelectItem>
                            <SelectItem value="price-desc">Price: High to Low</SelectItem>
                            {/* <SelectItem value="rating">Top Rated</SelectItem> */}
                        </SelectContent>
                    </Select>
                </div>
                Grid / List View Switcher
                <div className="hidden sm:flex items-center border border-border/80 rounded-xl p-1 bg-card">
                    <Button
                        variant={viewMode === "grid" ? "secondary" : "ghost"}
                        size="icon"
                        className="cursor-pointer h-9 w-9 rounded-lg"
                        onClick={() => setViewMode("grid")}>
                        <Grid className="w-4 h-4" />
                    </Button>
                    <Button
                        variant={viewMode === "list" ? "secondary" : "ghost"}
                        size="icon"
                        className="cursor-pointer h-9 w-9 rounded-lg"
                        onClick={() => setViewMode("list")}>
                        <List className="w-4 h-4" />
                    </Button>
                </div>
            </div >
        </div >
    );
};

export default GearToolbar;