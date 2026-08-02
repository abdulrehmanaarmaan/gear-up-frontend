"use client";

import { Slider } from "@/components/ui/slider";
import { useState } from "react";

interface PriceRangeSliderProps {
    onChange: (value: number) => void;
    value?: number;
    className?: string;
}

const PriceRangeSlider = ({
    onChange,
    value,
    className,
}: PriceRangeSliderProps) => {

    const [priceRange, setPriceRange] = useState([
        5,
        Number(value) || 200,
    ]);

    return (
        <div className="space-y-4">

            <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                    Price per day
                </h3>

                <span className="text-xs font-semibold text-primary">
                    ${priceRange[0]} - ${priceRange[1]}
                </span>
            </div>

            <Slider
                min={5}
                max={300}
                step={5}
                value={priceRange}
                className={className}
                onValueChange={(newValue) => {
                    setPriceRange(newValue);

                    onChange(newValue[1]);
                }}
            />

            <div className="flex items-center justify-between gap-2">

                <div className="flex items-center gap-1.5 border border-border/80 rounded-lg px-2.5 py-1 bg-muted/40">
                    <span className="text-xs">$</span>

                    <input
                        type="number"
                        value={priceRange[0]}
                        onChange={(e) => {
                            setPriceRange([
                                Number(e.target.value),
                                priceRange[1],
                            ]);
                        }}
                        className="w-12 text-xs bg-transparent focus:outline-none"
                    />
                </div>

                <span className="text-xs">to</span>

                <div className="flex items-center gap-1.5 border border-border/80 rounded-lg px-2.5 py-1 bg-muted/40">
                    <span className="text-xs">$</span>

                    <input
                        type="number"
                        value={priceRange[1]}
                        onChange={(e) => {
                            const newValue = Number(e.target.value);

                            setPriceRange([
                                priceRange[0],
                                newValue,
                            ]);

                            onChange(newValue);
                        }}
                        className="w-12 text-xs bg-transparent focus:outline-none"
                    />
                </div>

            </div>

        </div>
    );
};

export default PriceRangeSlider;