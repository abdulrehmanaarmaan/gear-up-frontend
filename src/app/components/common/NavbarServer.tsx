import { Navbar } from './Navbar';
import { getMyAccount } from '@/app/(auth)/auth.actions';

const NavbarServer = async () => {
    const myAccount = await getMyAccount()
    return <Navbar myAccount={myAccount?.data} />;
};

export default NavbarServer;