import { Boxes, ClipboardList, LayoutDashboard, Users } from "lucide-react";

const adminDashboard = "/dashboard/admin"

export const adminSidebarItems = [
    {
        label: "Dashboard",
        href: adminDashboard,
        icon: LayoutDashboard
    },
    {
        label: "Gear Management",
        href: `${adminDashboard}/gear-items`,
        icon: Boxes
    },
    {
        label: "Rental Orders",
        href: `${adminDashboard}/rental-orders`,
        icon: ClipboardList
    },
    {
        label: "Users",
        href: `${adminDashboard}/users`,
        icon: Users
    },
]