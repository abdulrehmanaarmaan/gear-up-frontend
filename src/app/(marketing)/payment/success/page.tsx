import React, { Suspense } from 'react';
import PaymentSuccessPage from '../../components/PaymentSuccessServer';

const PaymentSuccess = async ({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) => {
    return (
        <Suspense fallback={<>Loading...</>}>
            <PaymentSuccessPage searchParams={searchParams} />
        </Suspense >
    );
};

export default PaymentSuccess;