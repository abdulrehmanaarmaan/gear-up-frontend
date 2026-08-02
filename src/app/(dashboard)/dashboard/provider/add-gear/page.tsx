import * as React from "react";
import Link from "next/link";
import {
    ArrowLeft,
} from "lucide-react";

// shadcn/ui component imports
import { Badge } from "@/components/ui/badge";
import AddGearForm from "../components/AddGearForm";
import { getGearCategories } from "@/app/public.actions";

export default async function AddGear() {

    const categories = await getGearCategories()

    return (
        <div className="max-w-5xl mx-auto space-y-8 pb-16">

            {/* NAVIGATION & PAGE HEADER */}
            <div className="space-y-2">
                <Link
                    href="/dashboard/provider"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-primary transition-colors"
                >
                    <ArrowLeft className="w-3.5 h-3.5" /> Back to Provider Dashboard
                </Link>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2">
                            <Badge variant="outline" className="border-primary/40 text-primary font-semibold text-xs">
                                Inventory CRUD
                            </Badge>
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground mt-1">
                            List New Rental Gear
                        </h1>
                        <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                            Add new equipment to your shop catalog to start receiving customer rental requests.
                        </p>
                    </div>
                </div>
            </div>

            {/* FORM WRAPPER */}
            <AddGearForm categories={categories?.data} />

        </div>
    );
}