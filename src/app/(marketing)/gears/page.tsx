import * as React from "react";
import GearServer from "../components/GearServer";

export default async function Gears({
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

    return (
        <React.Suspense fallback={<>Loading...</>}>
            <GearServer searchParams={searchParams} />
        </React.Suspense>
    );
}