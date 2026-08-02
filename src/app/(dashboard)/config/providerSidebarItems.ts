import { ClipboardList, LayoutDashboard, Package, PlusCircle } from "lucide-react";

const providerDashboard = "/dashboard/provider"

export const providerSidebarItems = [
    {
        label: "Dashboard",
        href: providerDashboard,
        icon: LayoutDashboard
    },
    {
        label: "Add Gear",
        href: `${providerDashboard}/add-gear`,
        icon: PlusCircle
    },
    {
        label: "Gear Inventory",
        href: `${providerDashboard}/gears`,
        icon: Package
    },
    {
        label: "Rental Orders",
        href: `${providerDashboard}/rental-orders`,
        icon: ClipboardList
    }
]