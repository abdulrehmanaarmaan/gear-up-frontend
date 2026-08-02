import { ClipboardList, CreditCard, LayoutDashboard } from "lucide-react";

const customerDashboard = "/dashboard/customer"

export const customerSidebarItems = [
    {
        label: "Dashboard",
        href: customerDashboard,
        icon: LayoutDashboard
    },
    {
        label: "Rental Orders",
        href: `${customerDashboard}/rental-orders`,
        icon: ClipboardList
    },
    {
        label: "Payments",
        href: `${customerDashboard}/payments`,
        icon: CreditCard
    }
]