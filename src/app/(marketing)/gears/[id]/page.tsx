import React, { Suspense } from 'react';
import GearDetailsServer from '../../components/GearDetailsServer';

const GearDetails = async ({ params }: { params: Promise<{ id: string }> }) => {
    return (
        <Suspense fallback={<>Loading...</>}>
            <GearDetailsServer params={params} />
        </Suspense>
    );
};

export default GearDetails;