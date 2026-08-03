import React, { Suspense } from 'react';
import OrderPayment from '../../../components/OrderDetailsServer';

const Payment = async ({ params }: { params: Promise<{ id: string }> }) => {
    return (
        <Suspense fallback={<>Loading...</>}>
            <OrderPayment params={params} />
        </Suspense >
    );
};

export default Payment;