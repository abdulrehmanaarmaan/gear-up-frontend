"use client"

import { IGearResponse } from '@/app/(dashboard)/dashboard/provider/provider.types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, MapPin, Share2 } from 'lucide-react';
import React, { useState } from 'react';

const QuickActions = ({ data }: { data: IGearResponse }) => {

    const [isSaved, setIsSaved] = useState(false)

    return (
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
            <div className="space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="outline" className="border-primary/40 text-primary font-semibold">
                        {data?.category?.name}
                    </Badge>
                    <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 font-semibold">
                        Condition: {data?.condition}
                    </Badge>
                    <span className="text-xs text-muted-foreground flex items-center gap-1 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" /> {data?.location}
                    </span>
                </div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground">
                    {data?.title}
                </h1>
                <p className="text-sm text-muted-foreground">
                    Brand: <span className="font-semibold text-foreground">{data?.brand}</span> • Model: <span
                        className="font-semibold text-foreground">{data?.model}</span>
                </p>
            </div>
            <div className="flex items-center gap-2 self-start">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsSaved(!isSaved)}
                    className={`gap-1.5 border-border/80 ${isSaved ? "text-rose-500 border-rose-500/30 bg-rose-500/5" : ""}`}
                >
                    <Heart className={`w-4 h-4 ${isSaved ? "fill-current text-rose-500" : ""}`} />
                    {isSaved ? "Saved" : "Save"}
                </Button>
                <Button variant="outline" size="sm" className="gap-1.5 border-border/80">
                    <Share2 className="w-4 h-4" /> Share
                </Button>
            </div>
        </div>
    );
};

export default QuickActions;