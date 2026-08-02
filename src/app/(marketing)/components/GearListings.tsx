"use client"

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardAction, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, MapPin, Star } from 'lucide-react';
import Link from 'next/link';
import { IGearResponse } from '@/app/(dashboard)/dashboard/provider/provider.types';
import GearThumbnail from './GearThumbnail';
import { useGearView } from '../context/GearViewProvider';

const GearListings = ({ gears }: { gears: IGearResponse[] }) => {

    const { viewMode } = useGearView()

    return (
        <main className="lg:col-span-9 space-y-8">
            {/* Active Filter Chips */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="text-muted-foreground font-medium">Active Filters:</span>
                <Badge variant="secondary" className="gap-1 px-2.5 py-1 rounded-md">
                    Category: Camping <Check className="w-3 h-3 cursor-pointer" />
                </Badge>
                <Badge variant="secondary" className="gap-1 px-2.5 py-1 rounded-md">
                    Max $200/day <Check className="w-3 h-3 cursor-pointer" />
                </Badge>
                <Button variant="ghost" size="sm" className="h-6 text-[11px] text-muted-foreground hover:text-foreground">
                    Clear all
                </Button>
            </div>
            {/* GRID VIEW */}
            {viewMode === "grid" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {gears?.map((gear: IGearResponse) => (
                        <Card key={gear?.id} className="overflow-hidden flex flex-col group hover:shadow-xl transition-all duration-300 border-border/80 bg-card">
                            {/* Image Container */}
                            <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
                                <GearThumbnail gear={gear} />
                                {/* Condition Badge */}
                                <Badge className="absolute top-3 left-3 bg-background/90 text-foreground backdrop-blur-sm border-none text-[11px] font-medium">
                                    {gear?.condition}
                                </Badge>
                                {/* Stock Badge */}
                                <div className="absolute top-3 right-3 bg-emerald-500/90 text-white text-[11px] font-semibold px-2 py-0.5 rounded-md backdrop-blur-sm">
                                    {gear?.availableQuantity}
                                </div>
                            </div>
                            {/* Card Body */}
                            <CardHeader className="p-4 pb-2">
                                <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                                    <span className="font-semibold text-primary">{gear?.category?.name}</span>
                                    <span className="flex items-center gap-1 font-medium text-amber-500">
                                        <Star className="w-3.5 h-3.5 fill-current" />
                                        {
                                            gear?.reviews?.length > 0
                                                ? (
                                                    gear.reviews.reduce(
                                                        (sum, review) => sum + Number(review?.rating),
                                                        0
                                                    ) / gear.reviews.length
                                                ).toFixed(1)
                                                : "0.0"
                                        }
                                    </span>
                                </div>
                                <CardTitle className="text-base font-semibold line-clamp-1 group-hover:text-primary transition-colors">
                                    {gear?.title}
                                </CardTitle>
                                <p className="text-xs text-muted-foreground font-medium mt-0.5">
                                    Brand: <span className="text-foreground">{gear?.brand}</span> • Model:
                                    {gear?.model}
                                </p>
                            </CardHeader>
                            <CardContent className="p-4 pt-0 flex-1">
                                <div className="flex items-center gap-1 text-xs text-muted-foreground mt-2">
                                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                    <span className="truncate">{gear?.location}</span>
                                </div>
                            </CardContent>
                            {/* Footer / Rent CTAs */}
                            <CardFooter className="p-4 pt-3 border-t border-border/40 mt-auto flex items-center justify-between bg-muted/20">
                                <div>
                                    <span className="text-lg font-extrabold text-foreground">{gear?.pricePerDay}</span>
                                    <span className="text-xs text-muted-foreground"> / day</span>
                                </div>
                                <Link href={`/gears/${gear?.id}`}>
                                    <Button size="sm" className="cursor-pointer font-semibold px-4 shadow-sm">
                                        Rent Now
                                    </Button>
                                </Link>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}
            {/* LIST VIEW */}
            {viewMode === "list" && (
                <div className="space-y-4">
                    {gears.map((gear: IGearResponse) => (
                        <CardAction key={gear?.id} className="overflow-hidden group hover:shadow-md transition-all duration-200 border-border/80 bg-card">
                            <div className="flex flex-col sm:flex-row">
                                {/* Image */}
                                <div className="relative w-full sm:w-64 aspect-[4/3] sm:aspect-auto shrink-0 bg-muted">
                                    <GearThumbnail gear={gear} />
                                    <Badge className="absolute top-3 left-3 bg-background/90 text-foreground backdrop-blur-sm border-none text-[11px]">
                                        {gear?.condition}
                                    </Badge>
                                </div>
                                {/* Content */}
                                <div className="p-5 flex-1 flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                                            <span className="font-semibold text-primary">{gear?.category?.name}</span>
                                            <span className="flex items-center gap-1 font-medium text-amber-500">
                                                <Star className="w-3.5 h-3.5 fill-current" />
                                                {gear?.reviews?.length > 0
                                                    ? (
                                                        gear?.reviews?.reduce(
                                                            (sum, review) => sum + Number(review?.rating), 0
                                                        ) / gear?.reviews?.length
                                                    ).toFixed(1)
                                                    : 0.0}
                                                ({gear?.reviews?.length} reviews)
                                            </span>
                                        </div>
                                        <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                                            {gear?.title}
                                        </h3>
                                        <p className="text-xs text-muted-foreground font-medium mt-1">
                                            Brand: {gear?.brand} • Available Stock: {gear?.availableQuantity} units
                                        </p>
                                        <p className="text-xs text-muted-foreground line-clamp-2 mt-2 leading-relaxed">
                                            {gear?.description}
                                        </p>
                                    </div>
                                    <div className="flex items-center justify-between pt-4 mt-4 border-t border-border/40">
                                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                            <MapPin className="w-3.5 h-3.5 text-slate-400" />
                                            <span>{gear?.location}</span>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div>
                                                <span className="text-xl font-extrabold text-foreground">{gear?.pricePerDay}</span>
                                                <span className="text-xs text-muted-foreground"> / day</span>
                                            </div>
                                            <Link href={`/gears/${gear?.id}`}>
                                                <Button size="sm" className="font-semibold px-5">
                                                    View Details & Rent
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardAction>
                    ))}
                </div>
            )}
            {/* PAGINATION CONTROLS */}
            <div className="flex items-center justify-between pt-6 border-t border-border/60">
                <p className="text-xs text-muted-foreground">
                    Showing <span className="font-semibold text-foreground">1-9</span> of <span
                        className="font-semibold text-foreground">42</span> listings
                </p>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" disabled>
                        Previous
                    </Button>
                    <Button variant="outline" size="sm" className="bg-primary/10 text-primary border-primary/30">
                        1
                    </Button>
                    <Button variant="outline" size="sm">
                        2
                    </Button>
                    <Button variant="outline" size="sm">
                        3
                    </Button>
                    <Button variant="outline" size="sm">
                        Next
                    </Button>
                </div>
            </div>
        </main>
    );
};

export default GearListings;