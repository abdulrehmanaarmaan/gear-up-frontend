import GearListings from "./GearListings";
import { getGears } from "@/app/public.actions";

interface Props {
    filters: {
        search?: string;
        category?: string;
        brand?: string;
        price?: string;
        available?: string;
    };
}

export default async function GearResults({ filters }: Props) {
    const gears = await getGears(filters);

    return <GearListings gears={gears?.data} />;
}