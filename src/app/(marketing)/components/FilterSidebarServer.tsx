import { getGearCategories } from '@/app/public.actions';
import React from 'react';
import FilterSidebar from './FilterSidebar';

const FilterSidebarServer = async () => {

    const categories = await getGearCategories()
    return <FilterSidebar categories={categories?.data} />;
};

export default FilterSidebarServer;