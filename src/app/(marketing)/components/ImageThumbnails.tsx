"use client"

import { IGearResponse } from '@/app/(dashboard)/dashboard/provider/provider.types';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import React, { useState } from 'react';

const Gallery = ({ data }: { data: IGearResponse }) => {

    const [selectedImage, setSelectedImage] = useState(0);

    return (
        <div className="space-y-3">
            {/* Main Image */}
            <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl bg-muted border border-border/80 shadow-sm">
                {
                    data?.images[selectedImage] &&
                    <Image
                        unoptimized
                        src={data?.images[selectedImage]}
                        alt={data?.title}
                        fill
                        priority
                        className="object-cover transition-all duration-300"
                    />
                }
                <Badge className="absolute top-4 left-4 bg-background/90 text-foreground backdrop-blur-md border-none text-xs px-3 py-1">
                    {data?.availableQuantity} units available
                </Badge>
            </div>
            <div className="grid grid-cols-4 gap-3">
                {data?.images.map((img: string, idx: number) => (
                    <button
                        key={idx}
                        onClick={() => setSelectedImage(idx)}
                        className={`relative aspect-[4/3] rounded-xl overflow-hidden bg-muted border-2 transition-all ${selectedImage === idx ? "border-primary ring-2 ring-primary/20" : "border-transparent opacity-70 hover:opacity-100"
                            }`}
                    >
                        <Image unoptimized src={img} alt={`Thumbnail ${idx + 1}`} fill className="object-cover" />
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Gallery;
