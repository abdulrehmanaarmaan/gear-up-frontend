import React from 'react';
import SidebarContent from './SidebarContent';
import { getMyAccount } from '@/app/(auth)/auth.actions';

const SidebarServer = async () => {

    const myAccount = await getMyAccount()

    return <SidebarContent myAccount={myAccount} />;
};

export default SidebarServer;