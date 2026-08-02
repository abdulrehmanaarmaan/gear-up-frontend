import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
    Search,
    MoreVertical,
    Clock,
    DollarSign,
    Download,
    ChevronLeft,
    ChevronRight,
    MessageSquare,
    Truck,
    Check,
    Phone,
    Mail,
    PackageCheck,
} from "lucide-react";

// shadcn/ui component imports
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getMyRentalOrders } from "../provider.actions";
import { IRentalOrder } from "../../customer/customer.interfaces";
import OrderRow from "../components/OrderRow";
import OrderCard from "../components/OrderCard";

// Mock Data matching Prisma RentalOrder & provider perspective
const MOCK_PROVIDER_ORDERS = [
    {
        id: "ord-8091a2b",
        customerId: "usr-101",
        customer: {
            id: "usr-101",
            name: "Sarah Jenkins",
            email: "sarah.j@example.com",
            phone: "+1 (555) 234-5678",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100"
        },
        gearId: "gear-501",
        gear: {
            id: "gear-501",
            title: "MSR Hubba Hubba NX 2-Person Backpacking Tent",
            slug: "msr-hubba-hubba-nx-2p",
            images: ["https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&q=80&w=200"]
        },
        quantity: 1,
        rentalStartDate: "2026-08-01T00:00:00.000Z",
        rentalEndDate: "2026-08-06T00:00:00.000Z",
        totalDays: 5,
        pricePerDay: 28.00,
        subtotal: 140.00,
        serviceFee: 21.00,
        totalAmount: 161.00,
        providerPayout: 119.00, // Subtotal minus 15% platform commission
        status: "PLACED", // Provider action needed: Confirm Order
        pickupAddress: "1240 Boulder Ave, Denver, CO 80202",
        notes: "Please include the extra rainfly footprint if available.",
        createdAt: "2026-07-29T10:15:00.000Z",
        payment: {
            id: "pay-1",
            status: "COMPLETED",
            paymentMethod: "STRIPE_CARD"
        }
    },
    {
        id: "ord-8092c3d",
        customerId: "usr-103",
        customer: {
            id: "usr-103",
            name: "David K. Miller",
            email: "d.miller@example.com",
            phone: "+1 (555) 876-5432",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100"
        },
        gearId: "gear-502",
        gear: {
            id: "gear-502",
            title: "Trek Fuel EX 8 Gen 6 Mountain Bike",
            slug: "trek-fuel-ex-8-gen-6",
            images: ["https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=200"]
        },
        quantity: 1,
        rentalStartDate: "2026-08-02T00:00:00.000Z",
        rentalEndDate: "2026-08-05T00:00:00.000Z",
        totalDays: 3,
        pricePerDay: 75.00,
        subtotal: 225.00,
        serviceFee: 33.75,
        totalAmount: 258.75,
        providerPayout: 191.25,
        status: "APPROVED", // Ready for customer pickup
        pickupAddress: "1240 Boulder Ave, Denver, CO 80202",
        notes: "Rider height is 6'1\", please adjust seat height.",
        createdAt: "2026-07-28T09:15:00.000Z",
        payment: {
            id: "pay-2",
            status: "COMPLETED",
            paymentMethod: "STRIPE_CARD"
        }
    },
    {
        id: "ord-8093e5f",
        customerId: "usr-105",
        customer: {
            id: "usr-105",
            name: "Elena Rostova",
            email: "elena.r@example.com",
            phone: "+1 (555) 432-1098",
            image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=100"
        },
        gearId: "gear-503",
        gear: {
            id: "gear-503",
            title: "Perception Pescador Pro 12 Angler Kayak",
            slug: "perception-pescador-pro-12",
            images: ["https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=200"]
        },
        quantity: 1,
        rentalStartDate: "2026-07-26T00:00:00.000Z",
        rentalEndDate: "2026-07-30T00:00:00.000Z",
        totalDays: 4,
        pricePerDay: 45.00,
        subtotal: 180.00,
        serviceFee: 27.00,
        totalAmount: 207.00,
        providerPayout: 153.00,
        status: "ACTIVE", // Currently in customer possession
        pickupAddress: "1240 Boulder Ave, Denver, CO 80202",
        notes: null,
        createdAt: "2026-07-22T11:00:00.000Z",
        payment: {
            id: "pay-3",
            status: "COMPLETED",
            paymentMethod: "STRIPE_CARD"
        }
    },
    {
        id: "ord-8094g7h",
        customerId: "usr-202",
        customer: {
            id: "usr-202",
            name: "Alex Rivera",
            email: "alex.rivera@example.com",
            phone: "+1 (555) 987-6543",
            image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100"
        },
        gearId: "gear-504",
        gear: {
            id: "gear-504",
            title: "Black Diamond Vapor Climbing Helmet",
            slug: "black-diamond-vapor-helmet",
            images: ["https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&q=80&w=200"]
        },
        quantity: 2,
        rentalStartDate: "2026-07-15T00:00:00.000Z",
        rentalEndDate: "2026-07-17T00:00:00.000Z",
        totalDays: 2,
        pricePerDay: 12.00,
        subtotal: 48.00,
        serviceFee: 7.20,
        totalAmount: 55.20,
        providerPayout: 40.80,
        status: "COMPLETED", // Gear returned safely, payout processed
        pickupAddress: "1240 Boulder Ave, Denver, CO 80202",
        notes: null,
        createdAt: "2026-07-10T16:20:00.000Z",
        payment: {
            id: "pay-4",
            status: "COMPLETED",
            paymentMethod: "STRIPE_CARD"
        }
    }
];

export default async function ProviderOrdersPage() {

    const { data } = await getMyRentalOrders()

    return (
        <div className="space-y-8 pb-12">

            {/* PAGE HEADER */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2">
                        <Badge variant="outline" className="border-primary/40 text-primary font-semibold text-xs">
                            Fulfillment Portal
                        </Badge>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground mt-1">
                        Incoming Rental Orders
                    </h1>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                        Manage customer bookings, confirm pick-ups, track gear handovers, and monitor pending payouts.
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="gap-2 border-border/80 text-xs">
                        <Download className="w-3.5 h-3.5" /> Export Manifest
                    </Button>
                </div>
            </div>

            {/* METRICS & ACTION OVERVIEW */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

                <Card className="border-border/80 bg-card shadow-sm border-l-4 border-l-purple-500">
                    <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between space-y-0">
                        <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                            Pending Confirmation
                        </CardTitle>
                        <Clock className="w-4 h-4 text-purple-500" />
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                        <div className="text-2xl font-bold text-foreground">1 Order</div>
                        <p className="text-[11px] text-purple-600 dark:text-purple-400 font-medium mt-1">
                            Action needed within 24h
                        </p>
                    </CardContent>
                </Card>

                <Card className="border-border/80 bg-card shadow-sm border-l-4 border-l-blue-500">
                    <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between space-y-0">
                        <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                            Awaiting Handover
                        </CardTitle>
                        <Truck className="w-4 h-4 text-blue-500" />
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                        <div className="text-2xl font-bold text-foreground">1 Order</div>
                        <p className="text-[11px] text-muted-foreground mt-1">
                            Scheduled for customer pickup
                        </p>
                    </CardContent>
                </Card>

                <Card className="border-border/80 bg-card shadow-sm border-l-4 border-l-amber-500">
                    <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between space-y-0">
                        <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                            Currently Rented Out
                        </CardTitle>
                        <PackageCheck className="w-4 h-4 text-amber-500" />
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                        <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">1 Item</div>
                        <p className="text-[11px] text-muted-foreground mt-1">
                            Return expected by July 30
                        </p>
                    </CardContent>
                </Card>

                <Card className="border-border/80 bg-card shadow-sm border-l-4 border-l-emerald-500">
                    <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between space-y-0">
                        <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                            Upcoming Payout
                        </CardTitle>
                        <DollarSign className="w-4 h-4 text-emerald-500" />
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                        <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">$504.05</div>
                        <p className="text-[11px] text-muted-foreground mt-1">
                            Direct deposit on Friday
                        </p>
                    </CardContent>
                </Card>

            </div>

            {/* TABS & SEARCH TOOLBAR */}
            <Card className="border-border/80 bg-card shadow-sm">
                <CardContent className="p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">

                    {/* Status Tabs */}
                    <Tabs defaultValue="ALL"
                        // onValueChange={setActiveTab}
                        className="w-full md:w-auto">
                        <TabsList className="bg-muted/60 p-1 h-9 border border-border/80">
                            <TabsTrigger value="ALL" className="text-xs font-semibold px-3 py-1">All Orders</TabsTrigger>
                            <TabsTrigger value="PLACED" className="text-xs font-semibold px-3 py-1">Action Needed</TabsTrigger>
                            <TabsTrigger value="APPROVED" className="text-xs font-semibold px-3 py-1">Confirmed</TabsTrigger>
                            <TabsTrigger value="ACTIVE" className="text-xs font-semibold px-3 py-1">In Use</TabsTrigger>
                            <TabsTrigger value="COMPLETED" className="text-xs font-semibold px-3 py-1">Completed</TabsTrigger>
                        </TabsList>
                    </Tabs>

                    {/* Search Box */}
                    <div className="relative w-full md:w-72">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            type="text"
                            placeholder="Search by Customer or Order ID..."
                            // value={searchQuery}
                            // onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9 h-9 text-xs bg-background border-border/80 focus-visible:ring-1 focus-visible:ring-primary"
                        />
                    </div>

                </CardContent>
            </Card>

            {/* ORDERS TABLE CONTAINER */}
            <Card className="border-border/80 bg-card shadow-sm overflow-hidden">

                {/* DESKTOP TABLE VIEW */}
                <div className="hidden md:block overflow-x-auto">
                    <Table>
                        <TableHeader className="bg-muted/40">
                            <TableRow className="border-border/60">
                                <TableHead className="w-[110px] text-xs font-bold uppercase text-muted-foreground">Order ID</TableHead>
                                <TableHead className="w-[240px] text-xs font-bold uppercase text-muted-foreground">Gear Item</TableHead>
                                <TableHead className="text-xs font-bold uppercase text-muted-foreground">Customer Contact</TableHead>
                                <TableHead className="text-xs font-bold uppercase text-muted-foreground">Rental Dates</TableHead>
                                <TableHead className="text-xs font-bold uppercase text-muted-foreground">Your Total Amount</TableHead>
                                <TableHead className="text-xs font-bold uppercase text-muted-foreground">Status</TableHead>
                                <TableHead className="text-right text-xs font-bold uppercase text-muted-foreground">Fulfillment Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data?.map((order: IRentalOrder) => (
                                <OrderRow key={order?.id} order={order} />
                            ))}
                        </TableBody>
                    </Table>
                </div>

                {/* MOBILE CARD VIEW FALLBACK */}
                <div className="block md:hidden divide-y divide-border/60">
                    {data?.map((order: IRentalOrder) => (
                        <OrderCard key={order?.id} order={order} />
                    ))}
                </div>

                {/* PAGINATION FOOTER */}
                <div className="p-4 border-t border-border/60 bg-muted/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
                    <span>Showing <span className="font-semibold text-foreground">1-4</span> of <span className="font-semibold text-foreground">42</span> fulfillment orders</span>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="h-8 gap-1" disabled>
                            <ChevronLeft className="w-3.5 h-3.5" /> Previous
                        </Button>
                        <Button variant="outline" size="sm" className="h-8 bg-primary/10 text-primary border-primary/30 font-semibold">
                            1
                        </Button>
                        <Button variant="outline" size="sm" className="h-8">
                            2
                        </Button>
                        <Button variant="outline" size="sm" className="h-8 gap-1">
                            Next <ChevronRight className="w-3.5 h-3.5" />
                        </Button>
                    </div>
                </div>
            </Card >
        </div >
    );
}