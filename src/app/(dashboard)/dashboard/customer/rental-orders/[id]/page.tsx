import React, { Suspense } from 'react';
import RentalOrderDetailsServer from '../../components/RentalOrderServer';

const RentalOrderDetails = async ({ params }: { params: Promise<{ id: string }> }) => {
    return (
        <Suspense>
            <RentalOrderDetailsServer params={params} />
        </Suspense>
    );
};

export default RentalOrderDetails; 