import React, { Suspense } from 'react';
import CustomerRentalOrdersPage from '../components/RentalOrders';

const MyRentalOrders = async () => {
    return (
        <Suspense fallback={<>Loading...</>}>
            <CustomerRentalOrdersPage />
        </Suspense>
    );
};

export default MyRentalOrders; 