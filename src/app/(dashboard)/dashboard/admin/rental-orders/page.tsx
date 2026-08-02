import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
    MoreVertical,
    CheckCircle2,
    XCircle,
    Clock,
    CreditCard,
    DollarSign,
    Download,
    ChevronLeft,
    ChevronRight,
    MapPin,
    MessageSquare,
    Receipt,
    Truck
} from "lucide-react";

// shadcn/ui component imports
import { Button } from "@/components/ui/button";
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
import OrderToolbar from "../components/OrderToolbar";
import { getRentalOrders } from "../admin.actions";
import { IRentalOrder } from "../../customer/customer.interfaces";

// Mock Data strictly typed to your Prisma RentalOrder model & relations
const MOCK_RENTAL_ORDERS = [
    {
        id: "ord-8091a2b",
        customerId: "usr-101",
        providerId: "usr-202",
        customer: {
            id: "usr-101",
            name: "Sarah Jenkins",
            email: "sarah.j@example.com",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100"
        },
        provider: {
            id: "usr-202",
            name: "Alex Rivera",
            email: "alex.rivera@example.com",
            image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100"
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
        status: "ACTIVE", // RentalStatus enum: PLACED, APPROVED, ACTIVE, RETURNED, COMPLETED, CANCELLED
        pickupAddress: "1240 Boulder Ave, Denver, CO 80202",
        notes: "Please include the extra rainfly footprint if available.",
        createdAt: "2026-07-25T14:32:00.000Z",
        payment: {
            id: "pay-1",
            status: "COMPLETED",
            paymentMethod: "STRIPE_CARD"
        },
        reviews: []
    },
    {
        id: "ord-8092c3d",
        customerId: "usr-103",
        providerId: "usr-204",
        customer: {
            id: "usr-103",
            name: "David K. Miller",
            email: "d.miller@example.com",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100"
        },
        provider: {
            id: "usr-204",
            name: "Marcus Chen",
            email: "marcus.chen@example.com",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100"
        },
        gearId: "gear-502",
        gear: {
            id: "gear-502",
            title: "Trek Fuel EX 8 Gen 6 Mountain Bike",
            slug: "trek-fuel-ex-8-gen-6",
            images: ["https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=200"]
        },
        quantity: 2,
        rentalStartDate: "2026-08-10T00:00:00.000Z",
        rentalEndDate: "2026-08-13T00:00:00.000Z",
        totalDays: 3,
        pricePerDay: 75.00,
        subtotal: 450.00,
        serviceFee: 67.50,
        totalAmount: 517.50,
        status: "APPROVED",
        pickupAddress: "88 Main St, Moab, UT 84532",
        notes: null,
        createdAt: "2026-07-28T09:15:00.000Z",
        payment: {
            id: "pay-2",
            status: "COMPLETED",
            paymentMethod: "STRIPE_CARD"
        },
        reviews: []
    },
    {
        id: "ord-8093e5f",
        customerId: "usr-202",
        providerId: "usr-101",
        customer: {
            id: "usr-202",
            name: "Alex Rivera",
            email: "alex.rivera@example.com",
            image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100"
        },
        provider: {
            id: "usr-101",
            name: "Sarah Jenkins",
            email: "sarah.j@example.com",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100"
        },
        gearId: "gear-503",
        gear: {
            id: "gear-503",
            title: "Perception Pescador Pro 12 Angler Kayak",
            slug: "perception-pescador-pro-12",
            images: ["https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=200"]
        },
        quantity: 1,
        rentalStartDate: "2026-07-01T00:00:00.000Z",
        rentalEndDate: "2026-07-03T00:00:00.000Z",
        totalDays: 2,
        pricePerDay: 45.00,
        subtotal: 90.00,
        serviceFee: 13.50,
        totalAmount: 103.50,
        status: "COMPLETED",
        pickupAddress: "45 waterfront Dr, Seattle, WA 98101",
        notes: "Pickup requested at sunrise.",
        createdAt: "2026-06-25T11:00:00.000Z",
        payment: {
            id: "pay-3",
            status: "COMPLETED",
            paymentMethod: "STRIPE_CARD"
        },
        reviews: [{ id: "rev-1", rating: 5, comment: "Gear was in top condition!" }]
    },
    {
        id: "ord-8094g7h",
        customerId: "usr-105",
        providerId: "usr-204",
        customer: {
            id: "usr-105",
            name: "Elena Rostova",
            email: "elena.r@example.com",
            image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=100"
        },
        provider: {
            id: "usr-204",
            name: "Marcus Chen",
            email: "marcus.chen@example.com",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100"
        },
        gearId: "gear-504",
        gear: {
            id: "gear-504",
            title: "Black Diamond Vapor Climbing Helmet",
            slug: "black-diamond-vapor-helmet",
            images: ["https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&q=80&w=200"]
        },
        quantity: 1,
        rentalStartDate: "2026-07-15T00:00:00.000Z",
        rentalEndDate: "2026-07-17T00:00:00.000Z",
        totalDays: 2,
        pricePerDay: 12.00,
        subtotal: 24.00,
        serviceFee: 3.60,
        totalAmount: 27.60,
        status: "CANCELLED",
        pickupAddress: "12 Canyon Way, Boulder, CO 80301",
        notes: null,
        createdAt: "2026-07-10T16:20:00.000Z",
        payment: {
            id: "pay-4",
            status: "REFUNDED",
            paymentMethod: "STRIPE_CARD"
        },
        reviews: []
    }
];

export default async function AdminRentalOrdersPage() {

    const { data } = await getRentalOrders()

    return (
        <div className="space-y-8 pb-12">

            {/* PAGE HEADER */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2">
                        <Badge variant="outline" className="border-primary/40 text-primary font-semibold text-xs">
                            Operations & Auditing
                        </Badge>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground mt-1">
                        Rental Orders Management
                    </h1>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                        Audit customer and provider order transactions, manage service fees, track status, and monitor pickup logistics.
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="gap-2 border-border/80 text-xs">
                        <Download className="w-3.5 h-3.5" /> Export Orders Data
                    </Button>
                </div>
            </div>

            {/* METRICS & FINANCIAL OVERVIEW */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

                <Card className="border-border/80 bg-card shadow-sm">
                    <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between space-y-0">
                        <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                            Total Order Volume
                        </CardTitle>
                        <DollarSign className="w-4 h-4 text-emerald-500" />
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                        <div className="text-2xl font-bold text-foreground">$142,810.00</div>
                        <p className="text-[11px] text-emerald-500 font-medium mt-1">
                            +$18,400.00 this month
                        </p>
                    </CardContent>
                </Card>

                <Card className="border-border/80 bg-card shadow-sm">
                    <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between space-y-0">
                        <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                            Service Fee Collected
                        </CardTitle>
                        <CreditCard className="w-4 h-4 text-primary" />
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                        <div className="text-2xl font-bold text-foreground">$21,421.50</div>
                        <p className="text-[11px] text-muted-foreground mt-1">
                            15% platform fee total
                        </p>
                    </CardContent>
                </Card>

                <Card className="border-border/80 bg-card shadow-sm">
                    <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between space-y-0">
                        <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                            Active Rentals
                        </CardTitle>
                        <Clock className="w-4 h-4 text-amber-500" />
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                        <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">94</div>
                        <p className="text-[11px] text-muted-foreground mt-1">
                            Currently in customer possession
                        </p>
                    </CardContent>
                </Card>

                <Card className="border-border/80 bg-card shadow-sm">
                    <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between space-y-0">
                        <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                            Completed Orders
                        </CardTitle>
                        <CheckCircle2 className="w-4 h-4 text-blue-500" />
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                        <div className="text-2xl font-bold text-foreground">3,890</div>
                        <p className="text-[11px] text-emerald-500 font-medium mt-1">
                            98.5% smooth completion rate
                        </p>
                    </CardContent>
                </Card>

            </div>

            {/* FILTER & SEARCH TOOLBAR */}
            <OrderToolbar />

            {/* RENTAL ORDERS TABLE CONTAINER */}
            <Card className="border-border/80 bg-card shadow-sm overflow-hidden">

                {/* DESKTOP TABLE VIEW */}
                <div className="hidden md:block overflow-x-auto">
                    <Table>
                        <TableHeader className="bg-muted/40">
                            <TableRow className="border-border/60">
                                <TableHead className="w-[110px] text-xs font-bold uppercase text-muted-foreground">Order ID</TableHead>
                                <TableHead className="w-[260px] text-xs font-bold uppercase text-muted-foreground">Gear Item</TableHead>
                                <TableHead className="text-xs font-bold uppercase text-muted-foreground">Customer</TableHead>
                                <TableHead className="text-xs font-bold uppercase text-muted-foreground">Provider</TableHead>
                                <TableHead className="text-xs font-bold uppercase text-muted-foreground">Dates & Days</TableHead>
                                <TableHead className="text-xs font-bold uppercase text-muted-foreground">Financial Breakdown</TableHead>
                                <TableHead className="text-xs font-bold uppercase text-muted-foreground">Status</TableHead>
                                <TableHead className="text-right text-xs font-bold uppercase text-muted-foreground">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data?.map((order: IRentalOrder) => (
                                <TableRow key={order?.id} className="border-border/60 hover:bg-muted/20 transition-colors">

                                    {/* Order ID */}
                                    <TableCell className="font-mono text-xs font-bold text-foreground">
                                        #{order?.id?.slice(0, 8)}
                                    </TableCell>

                                    {/* Gear Item Details */}
                                    <TableCell className="py-3">
                                        <div className="flex items-center gap-3">
                                            <div className="relative h-10 w-12 rounded bg-muted border border-border/80 overflow-hidden shrink-0">
                                                {order?.gear?.images[0] && <Image unoptimized src={order?.gear?.images[0]} alt={order?.gear?.title} fill className="object-cover" />}
                                            </div>
                                            <div className="flex flex-col min-w-0">
                                                <Link href={`/gear/${order?.gear?.slug}`} target="_blank" className="text-xs font-bold text-foreground hover:text-primary transition-colors line-clamp-1">
                                                    {order?.gear?.title}
                                                </Link>
                                                <span className="text-[11px] text-muted-foreground">Qty: {order?.quantity} unit(s)</span>
                                            </div>
                                        </div>
                                    </TableCell>

                                    {/* Customer Cell */}
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Avatar className="h-7 w-7 ?border border-primary/20">
                                                <AvatarImage src={order?.customer?.image} alt={order?.customer?.name} />
                                                <AvatarFallback>{order?.customer?.name[0]}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex flex-col min-w-0 text-xs">
                                                <span className="font-semibold text-foreground truncate">{order?.customer?.name}</span>
                                                <span className="text-muted-foreground text-[11px] truncate">{order?.customer?.email}</span>
                                            </div>
                                        </div>
                                    </TableCell>

                                    {/* Provider Cell */}
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Avatar className="h-7 w-7 border border-border">
                                                <AvatarImage src={order?.provider?.image} alt={order?.provider?.name} />
                                                <AvatarFallback>{order?.provider?.name[0]}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex flex-col min-w-0 text-xs">
                                                <span className="font-semibold text-foreground truncate">{order?.provider?.name}</span>
                                                <span className="text-muted-foreground text-[11px] truncate">{order?.provider?.email}</span>
                                            </div>
                                        </div>
                                    </TableCell>

                                    {/* Dates & Duration */}
                                    <TableCell>
                                        <div className="flex flex-col text-xs">
                                            <span className="font-medium text-foreground">
                                                {new Date(order?.rentalStartDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })} - {new Date(order?.rentalEndDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                                            </span>
                                            <span className="text-[11px] text-muted-foreground font-mono">{order?.totalDays} days (${order?.pricePerDay}/d)</span>
                                        </div>
                                    </TableCell>

                                    {/* Financial Breakdown (Subtotal, Service Fee, Total Amount) */}
                                    <TableCell>
                                        <div className="flex flex-col text-xs">
                                            <span className="font-bold text-foreground">${order.totalAmount} Total</span>
                                            <span className="text-[11px] text-emerald-600 dark:text-emerald-400">
                                                Fee: ${order?.serviceFee} (Sub: ${order?.subtotal})
                                            </span>
                                        </div>
                                    </TableCell>

                                    {/* RentalStatus Badge */}
                                    <TableCell>
                                        <Badge
                                            variant="secondary"
                                            className={`text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 border-none ${order?.status === "ACTIVE"
                                                ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                                                : order?.status === "COMPLETED"
                                                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                                                    : order?.status === "APPROVED"
                                                        ? "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                                                        : order?.status === "PLACED"
                                                            ? "bg-purple-500/10 text-purple-600 dark:text-purple-400"
                                                            : "bg-rose-500/10 text-rose-600 dark:text-rose-400"
                                                }`}
                                        >
                                            {order?.status}
                                        </Badge>
                                    </TableCell>

                                    {/* Action Dropdown Menu */}
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                                                    <MoreVertical className="w-4 h-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-52">
                                                <DropdownMenuLabel className="text-xs">Rental Order Options</DropdownMenuLabel>
                                                <DropdownMenuItem asChild className="cursor-pointer text-xs">
                                                    <Link href={`/dashboard/admin/rental-orders/${order?.id}`}>
                                                        <Receipt className="w-3.5 h-3.5 mr-2" /> View Full Receipt
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="cursor-pointer text-xs">
                                                    <Truck className="w-3.5 h-3.5 mr-2" /> Pickup: {order?.pickupAddress.slice(0, 20)}...
                                                </DropdownMenuItem>
                                                {order?.notes && (
                                                    <DropdownMenuItem className="cursor-pointer text-xs italic text-muted-foreground">
                                                        <MessageSquare className="w-3.5 h-3.5 mr-2" /> Has Notes
                                                    </DropdownMenuItem>
                                                )}
                                                <DropdownMenuSeparator />
                                                {order?.status === "ACTIVE" && (
                                                    <DropdownMenuItem className="cursor-pointer text-xs text-emerald-600 font-semibold">
                                                        <CheckCircle2 className="w-3.5 h-3.5 mr-2" /> Mark as Returned
                                                    </DropdownMenuItem>
                                                )}
                                                {order?.payment?.status === "COMPLETED" && (
                                                    <DropdownMenuItem className="cursor-pointer text-xs text-rose-600 font-semibold">
                                                        <XCircle className="w-3.5 h-3.5 mr-2" /> Issue Admin Refund
                                                    </DropdownMenuItem>
                                                )}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                {/* MOBILE CARD VIEW FALLBACK */}
                <div className="block md:hidden divide-y divide-border/60">
                    {data?.map((order: IRentalOrder) => (
                        <div key={order?.id} className="p-4 space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="font-mono text-xs font-bold text-primary">#{order?.id?.slice(0, 8)}</span>
                                <Badge
                                    variant="secondary"
                                    className={`text-[10px] font-bold uppercase border-none px-2 py-0.5 ${order?.status === "ACTIVE"
                                        ? "bg-amber-500/10 text-amber-600"
                                        : order?.status === "COMPLETED"
                                            ? "bg-emerald-500/10 text-emerald-600"
                                            : "bg-rose-500/10 text-rose-600"
                                        }`}
                                >
                                    {order?.status}
                                </Badge>
                            </div>

                            <div className="flex gap-3 items-center">
                                <div className="relative h-12 w-14 rounded bg-muted border border-border/80 overflow-hidden shrink-0">
                                    {order?.gear?.images[0] && < Image unoptimized src={order?.gear?.images[0]} alt={order?.gear?.title} fill className="object-cover" />}
                                </div>
                                <div className="min-w-0 flex-1">
                                    <h3 className="text-xs font-bold text-foreground line-clamp-1">{order?.gear?.title}</h3>
                                    <p className="text-[11px] text-muted-foreground">{order?.totalDays} days • ${order?.totalAmount} Total</p>
                                </div>
                            </div>

                            <div className="flex flex-col gap-1 pt-1 text-xs text-muted-foreground">
                                <div className="flex justify-between items-center">
                                    <span>Customer: <strong className="text-foreground">{order?.customer?.name}</strong></span>
                                    <span>Provider: <strong className="text-foreground">{order?.provider?.name}</strong></span>
                                </div>
                                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                                    <MapPin className="w-3 h-3" /> {order?.pickupAddress}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* PAGINATION FOOTER */}
                <div className="p-4 border-t border-border/60 bg-muted/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
                    <span>Showing <span className="font-semibold text-foreground">1-4</span> of <span className="font-semibold text-foreground">3,890</span> order entries</span>
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

            </Card>

        </div>
    );
}