import React, { Suspense } from 'react';
import PaymentDetailsServer from '../../components/PaymentDetails';

const PaymentDetails = async ({ params }: { params: { id: string } }) => {
    return (
        <Suspense fallback={<>Loading...</>}>
            <PaymentDetailsServer params={params} />
        </Suspense>
    );
};

export default PaymentDetails;