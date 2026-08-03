import React, { Suspense } from 'react';
import MyGears from '../components/GearsServer';

const Gears = async () => {
    return (
        <Suspense fallback={<>Loading...</>}>
            <MyGears />
        </Suspense >
    );
};

export default Gears;