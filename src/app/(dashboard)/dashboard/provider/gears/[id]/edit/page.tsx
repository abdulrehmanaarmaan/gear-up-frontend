import React, { Suspense } from 'react';
import EditGearServer from '../../../components/EditGearServer';

const EditGear = async ({ params }: { params: Promise<{ id: string }> }) => {
    return (
        <Suspense fallback={<>Loading...</>}>
            <EditGearServer params={params} />
        </Suspense>
    );
};

export default EditGear;