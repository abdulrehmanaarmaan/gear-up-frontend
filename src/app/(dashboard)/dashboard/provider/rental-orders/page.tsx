import React, { Suspense } from 'react';
import ProviderOrdersServer from '../components/RentalOrdersServer';

const RentalOrders = async () => {
    return (
        <Suspense fallback={<>Loading...</>}>
            <ProviderOrdersServer />
        </Suspense>
    );
};

export default RentalOrders;