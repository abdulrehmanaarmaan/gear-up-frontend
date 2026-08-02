import * as React from "react";
import UserContent from "../components/UserContent";

export default function Users({
    searchParams,
}: {
    searchParams: Promise<{
        page?: number;
        limit?: number;
        search?: string;
    }>;
}) {

    return (
        <React.Suspense fallback={<>Loading...</>}>
            <UserContent searchParams={searchParams} />
        </React.Suspense>
    );

}