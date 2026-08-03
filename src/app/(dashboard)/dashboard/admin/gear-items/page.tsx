import React, { Suspense } from 'react';
import GearItemServer from '../components/GearServer';

const GearItems = async () => {
    return (
        <Suspense fallback={<>Loading...</>}>
            <GearItemServer />
        </Suspense>
    );
};

export default GearItems;