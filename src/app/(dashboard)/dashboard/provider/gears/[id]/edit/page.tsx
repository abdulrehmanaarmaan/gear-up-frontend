import React from "react";
import EditGearForm from "../../../components/EditGearForm";
import { getGearCategories, getGearDetails } from "@/app/public.actions";

// Types derived from your backend interface
export type GearCondition = "NEW" | "LIKE_NEW" | "EXCELLENT" | "GOOD" | "FAIR";

export interface IUpdateGear {
    categoryId?: string;
    title?: string;
    slug?: string;
    description?: string;
    brand?: string;
    model?: string;
    condition?: GearCondition;
    pricePerDay?: number;
    quantity?: number;
    images?: string[];
    specifications?: Record<string, string>;
    location?: string;
    isAvailable?: boolean;
}

export default async function EditGearPage({ params }: { params: Promise<{ id: string }> }) {

    const { id } = await params

    const gearDetails = await getGearDetails(id)

    const categories = await getGearCategories()

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl space-y-8">

            {/* 1. TOP NAVIGATION & HEADER */}
            <EditGearForm id={id} gearDetails={gearDetails?.data} categories={categories?.data} />

        </div>
    );
}