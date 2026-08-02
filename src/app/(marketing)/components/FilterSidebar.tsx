"use client"

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { RotateCcw } from 'lucide-react';
import PriceRangeSlider from './PriceRangeSlider';
import { ICategory } from '../marketing.interfaces';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const FilterSidebar = ({ categories }: { categories: ICategory[] }) => {

    const searchParams = useSearchParams()

    const router = useRouter()

    const pathname = usePathname()

    const handleCategory = (category: string) => {

        const params = new URLSearchParams(searchParams);

        if (searchParams.get("category") === category) {
            params.delete("category");
        } else {
            params.set("category", category);
        }

        router.push(
            `${pathname}?${params.toString()}`,
            {
                scroll: false,
            }
        );
    }

    const handlePrice = (value: number) => {

        const params = new URLSearchParams(searchParams);

        params.set("price", value.toString());

        router.replace(
            `${pathname}?${params.toString()}`,
            {
                scroll: false,
            }
        );

    }

    const handleAvailability = () => {
        const params = new URLSearchParams(searchParams);

        if (searchParams.get("available") === "true") {
            params.delete("available");
        } else {
            params.set("available", "true");
        }

        router.replace(
            `${pathname}?${params.toString()}`,
            {
                scroll: false,
            }
        );
    };

    return (
        <div className="space-y-6">
            {/* Category Filter */}
            <div className="space-y-3">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Category</h3>
                <div className="space-y-2">
                    {categories?.map((cat) => (
                        <div key={cat?.id} className="flex items-center justify-between space-x-2">
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    className='cursor-pointer'
                                    id={cat?.id}
                                    checked={searchParams.get("category") === cat.name}
                                    onCheckedChange={() => handleCategory(cat.name)} />
                                <label
                                    htmlFor={cat?.id}
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                                >
                                    {cat?.name}
                                </label>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="h-[1px] bg-border/60" />
            {/* Price Range Slider */}
            <PriceRangeSlider
                className="cursor-pointer"
                onChange={handlePrice}
                value={Number(searchParams.get("price")) || 0}
            />
            <div className="h-[1px] bg-border/60" />
            {/* Availability Toggle */}
            <div className="flex items-center space-x-2">
                <Checkbox
                    className="cursor-pointer"
                    id="available-only"
                    checked={searchParams.get("available") === "true"}
                    onCheckedChange={handleAvailability}
                />
                <label htmlFor="available-only" className="text-sm font-semibold cursor-pointer">
                    In Stock Only
                </label>
            </div>
            {/* Reset Button */}
            <Button onClick={() => router.replace(pathname)} variant="outline" size="sm" className="cursor-pointer w-full gap-2 text-muted-foreground border-border/80 mt-4">
                <RotateCcw className="w-3.5 h-3.5" /> Reset All Filters
            </Button>
        </div >
    );
};

export default FilterSidebar;