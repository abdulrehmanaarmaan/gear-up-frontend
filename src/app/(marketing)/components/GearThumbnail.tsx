import { IGearResponse } from '@/app/(dashboard)/dashboard/provider/provider.types';
import { ImageOff } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

const GearThumbnail = ({ gear, className }: { gear: IGearResponse, className?: string }) => {

    if (!gear.images?.[0]) {
        return (
            <div className={`flex flex-col items-center justify-center gap-1.5 bg-muted ${className ?? ""}`}>
                <ImageOff className="w-6 h-6 text-muted-foreground/60" />
                <span className="text-xs text-muted-foreground">No image available</span>
            </div>
        )
    }

    return (
        <Image
            unoptimized
            src={gear?.images[0]}
            alt={gear?.title}
            fill
            className={className}
        />
    );
};

export default GearThumbnail;