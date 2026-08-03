import React, { Suspense } from 'react';
import RentalOrderServer from '../components/RentalServer';

const RentalOrders = async () => {
    return (
        <Suspense fallback={<>Loading...</>}>
            <RentalOrderServer />
        </Suspense>
    );
};

export default RentalOrders;