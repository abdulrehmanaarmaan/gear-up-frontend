import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
    ShoppingBag,
    CheckCircle2,
    Calendar,
    ChevronLeft,
    ChevronRight,
    MapPin,
    MessageSquare,
    ShieldCheck,
    Package,
    Info,
    Eye
} from "lucide-react";

// shadcn/ui component imports
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import ReviewModal from "@/app/(dashboard)/dashboard/customer/components/ReviewModal";
import OrderFilters from "../components/OrderFilters";
import { getMyOrders } from "../customer.actions";
import OrderActions from "../components/OrderActions";
import { IRentalOrder } from "../customer.interfaces";
import { ReviewModalProvider } from "../context/ReviewModalContext";
import { rentalStatusConfig, RentalStatusKey } from "../customer.constants";

export default async function CustomerRentalOrdersPage() {

    const { data } = await getMyOrders()

    return (
        <ReviewModalProvider>
            <div className="space-y-8 pb-12">

                {/* PAGE HEADER */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2">
                            <Badge variant="outline" className="border-primary/40 text-primary font-semibold text-xs">
                                Customer Portal
                            </Badge>
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground mt-1">
                            My Rental Bookings
                        </h1>
                        <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                            Track active rentals, check pickup instructions, manage trip gear, and access rental receipts.
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button asChild size="sm" className="gap-2 font-bold text-xs">
                            <Link href="/gears">
                                <ShoppingBag className="w-3.5 h-3.5" /> Rent More Gear
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* RENTAL OVERVIEW SUMMARY CARDS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

                    <Card className="border-border/80 bg-card shadow-sm border-l-4 border-l-amber-500">
                        <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between space-y-0">
                            <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                Currently Rented
                            </CardTitle>
                            <Package className="w-4 h-4 text-amber-500" />
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                            <div className="text-2xl font-bold text-foreground">1 Active Item</div>
                            <p className="text-[11px] text-amber-600 dark:text-amber-400 font-medium mt-1">
                                Due back tomorrow (Jul 30)
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="border-border/80 bg-card shadow-sm border-l-4 border-l-blue-500">
                        <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between space-y-0">
                            <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                Upcoming Trips
                            </CardTitle>
                            <Calendar className="w-4 h-4 text-blue-500" />
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                            <div className="text-2xl font-bold text-foreground">2 Confirmed</div>
                            <p className="text-[11px] text-muted-foreground mt-1">
                                Next pickup on Aug 1, 2026
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="border-border/80 bg-card shadow-sm border-l-4 border-l-emerald-500">
                        <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between space-y-0">
                            <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                Completed Rentals
                            </CardTitle>
                            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                            <div className="text-2xl font-bold text-foreground">12 Items</div>
                            <p className="text-[11px] text-muted-foreground mt-1">
                                100% on-time returns
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="border-border/80 bg-card shadow-sm border-l-4 border-l-purple-500">
                        <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between space-y-0">
                            <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                Damage Protection
                            </CardTitle>
                            <ShieldCheck className="w-4 h-4 text-purple-500" />
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                            <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">Active</div>
                            <p className="text-[11px] text-muted-foreground mt-1">
                                Covered up to $2,500 per order
                            </p>
                        </CardContent>
                    </Card>

                </div>

                {/* ACTIVE RENTAL NOTICE CALLOUT */}
                <Card className="border-amber-500/30 bg-amber-500/5 shadow-sm">
                    <CardContent className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex items-start gap-3">
                            <div className="p-2 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5 sm:mt-0">
                                <Info className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-foreground">Active Rental Return Reminder</h4>
                                <p className="text-xs text-muted-foreground mt-0.5">
                                    Your <strong className="text-foreground">Perception Pescador Pro Kayak</strong> is scheduled for return to <strong>Summit Outfitters Co.</strong> by July 30 at 5:00 PM.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 w-full sm:w-auto shrink-0 justify-end">
                            <Button size="sm" variant="outline" className="text-xs border-amber-500/40 text-amber-700 dark:text-amber-300 hover:bg-amber-500/10 h-8">
                                Extend Rental
                            </Button>
                            <Button size="sm" className="text-xs bg-amber-600 hover:bg-amber-700 text-white font-bold h-8">
                                Return Directions
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* FILTER & SEARCH TOOLBAR */}
                <OrderFilters />

                {/* ORDERS TABLE CONTAINER */}
                <Card className="border-border/80 bg-card shadow-sm overflow-hidden">

                    {/* DESKTOP TABLE VIEW */}
                    <div className="hidden md:block overflow-x-auto">
                        <Table>
                            <TableHeader className="bg-muted/40">
                                <TableRow className="border-border/60">
                                    <TableHead className="w-[110px] text-xs font-bold uppercase text-muted-foreground">Order ID</TableHead>
                                    <TableHead className="w-[260px] text-xs font-bold uppercase text-muted-foreground">Gear Requested</TableHead>
                                    <TableHead className="text-xs font-bold uppercase text-muted-foreground">Provider / Pickup</TableHead>
                                    <TableHead className="text-xs font-bold uppercase text-muted-foreground">Rental Duration</TableHead>
                                    <TableHead className="text-xs font-bold uppercase text-muted-foreground">Total Paid</TableHead>
                                    <TableHead className="text-xs font-bold uppercase text-muted-foreground">Status</TableHead>
                                    <TableHead className="text-right text-xs font-bold uppercase text-muted-foreground">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {data?.map((order: IRentalOrder) => {
                                    const status = rentalStatusConfig[order?.status as RentalStatusKey];
                                    return (
                                        <TableRow key={order?.id} className="border-border/60 hover:bg-muted/20 transition-colors">

                                            {/* Order ID & Date */}
                                            <TableCell className="py-3">
                                                <div className="flex flex-col">
                                                    { /* Order ID Link */}
                                                    <Link
                                                        href={`/dashboard/customer/rental-orders/${order?.id}`}
                                                        className="font-mono text-xs font-bold text-primary hover:underline"
                                                    >
                                                        #{order?.id?.slice(0, 8)}
                                                    </Link>

                                                    {/* Gear Title Link */}
                                                    <Link
                                                        href={`/dashboard/customer/rental-orders/${order?.id}`}
                                                        className="text-xs font-bold text-foreground line-clamp-1 hover:text-primary transition-colors"
                                                    >
                                                        {order?.gear?.title}
                                                    </Link>
                                                    <span className="text-[10px] text-muted-foreground">
                                                        {new Date(order?.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                                                    </span>
                                                </div>
                                            </TableCell>

                                            {/* Gear Item Details */}
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <div className="relative h-10 w-12 rounded bg-muted border border-border/80 overflow-hidden shrink-0">
                                                        {order?.gear?.images[0] &&
                                                            <Image unoptimized src={order?.gear?.images[0]} alt={order?.gear?.title} fill className="object-cover" />
                                                        }
                                                    </div>
                                                    <div className="flex flex-col min-w-0">
                                                        <Link href={`/gears/${order?.gear?.slug}`} className="text-xs font-bold text-foreground hover:text-primary transition-colors line-clamp-1">
                                                            {order?.gear?.title}
                                                        </Link>
                                                        <span className="text-[10px] text-muted-foreground">{order?.gear?.category?.name} • Qty: {order?.quantity}</span>
                                                    </div>
                                                </div>
                                            </TableCell>

                                            {/* Provider Info */}
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Avatar className="h-7 w-7 border border-primary/20">
                                                        <AvatarImage src={order?.provider?.image} alt={order.provider.name} />
                                                        <AvatarFallback>{order?.provider?.name[0]}</AvatarFallback>
                                                    </Avatar>
                                                    <div className="flex flex-col min-w-0 text-xs">
                                                        <span className="font-semibold text-foreground truncate">{order?.provider?.name}</span>
                                                        <span className="text-[10px] text-muted-foreground truncate">{order?.pickupAddress?.split(',')[0]}</span>
                                                    </div>
                                                </div>
                                            </TableCell>

                                            {/* Rental Dates */}
                                            <TableCell>
                                                <div className="flex flex-col text-xs">
                                                    <span className="font-medium text-foreground">
                                                        {new Date(order?.rentalStartDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })} - {new Date(order?.rentalEndDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                                                    </span>
                                                    <span className="text-[11px] text-muted-foreground font-mono">{order?.totalDays} Days Total</span>
                                                </div>
                                            </TableCell>

                                            {/* Pricing Total */}
                                            <TableCell>
                                                <div className="flex flex-col text-xs">
                                                    <span className="font-bold text-foreground font-mono">
                                                        ${order?.totalAmount}
                                                    </span>
                                                    <span className="text-[10px] text-muted-foreground">Visa •••• {order?.payment?.amount}</span>
                                                </div>
                                            </TableCell>

                                            {/* Status Badge */}
                                            <TableCell>
                                                <Badge
                                                    variant="secondary"
                                                    className={`text-[10px] font-bold uppercase px-2 py-0.5 border-none ${status?.className}`}
                                                >
                                                    {status?.label}
                                                </Badge>
                                            </TableCell>

                                            {/* Actions Dropdown / Primary CTA */}

                                            <OrderActions order={order} />


                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </div>

                    {/* MOBILE CARD VIEW FALLBACK */}
                    <div className="block md:hidden divide-y divide-border/60">
                        {data?.map((order: IRentalOrder) => {
                            const status = rentalStatusConfig[order?.status as RentalStatusKey];

                            return (
                                <div key={order?.id} className="p-4 space-y-3">
                                    <div className="flex items-center justify-between">
                                        <Link
                                            href={`/dashboard/customer/rental-orders/${order?.id}`}
                                            className="font-mono text-xs font-bold text-foreground hover:text-primary hover:underline transition-colors"
                                        >
                                            #{order?.id?.slice(0, 8)}
                                        </Link>
                                        <Badge
                                            variant="secondary"
                                            className={`text-[10px] font-bold uppercase border-none px-2 py-0.5 ${status?.className}`}
                                        >
                                            {status?.label}
                                        </Badge>
                                    </div>

                                    <div className="flex gap-3 items-center">
                                        <div className="relative h-12 w-14 rounded bg-muted border border-border/80 overflow-hidden shrink-0">
                                            {order?.gear?.images[0] &&
                                                <Image unoptimized src={order?.gear?.images[0]} alt={order?.gear?.title} fill className="object-cover" />
                                            }
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <h3 className="text-xs font-bold text-foreground line-clamp-1">{order?.gear?.title}</h3>
                                            <p className="text-[11px] text-muted-foreground">{order?.totalDays} Days • Total: <strong className="text-foreground">${order?.totalAmount}</strong></p>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-1 text-xs text-muted-foreground bg-muted/30 p-2.5 rounded-lg border border-border/60">
                                        <div className="flex justify-between items-center">
                                            <span className="text-[11px]">Provider: <strong className="text-foreground">{order?.provider?.name}</strong></span>
                                            <a href={`tel:${order?.provider?.phone}`} className="text-primary font-mono text-[11px]">{order?.provider?.phone}</a>
                                        </div>
                                        <div className="text-[10px] text-muted-foreground flex items-center gap-1 mt-0.5">
                                            <MapPin className="w-3 h-3 text-muted-foreground shrink-0" />
                                            <span className="truncate">{order.pickupAddress}</span>
                                        </div>
                                    </div>

                                    <div className="pt-1 flex items-center justify-between gap-2">
                                        {
                                            order?.status === "CONFIRMED" ?
                                                <Button asChild>
                                                    <Link href={`/dashboard/customer/rental-orders/${order.id}/payment`}>
                                                        Pay Now
                                                    </Link>
                                                </Button> :
                                                <Button asChild size="sm" variant="default" className="w-1/2 text-xs h-8 font-bold">
                                                    <Link href={`/dashboard/customer/rental-orders/${order?.id}`}>
                                                        <Eye className="w-3.5 h-3.5 mr-1" /> View Details
                                                    </Link>
                                                </Button>
                                        }
                                        <Button size="sm" variant="outline" className="w-1/2 text-xs h-8">
                                            <MessageSquare className="w-3.5 h-3.5 mr-1" /> Contact
                                        </Button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    {/* PAGINATION FOOTER */}
                    <div className="p-4 border-t border-border/60 bg-muted/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
                        <span>Showing <span className="font-semibold text-foreground">1-4</span> of <span className="font-semibold text-foreground">16</span> rental orders</span>
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

                <ReviewModal />

            </div>
        </ReviewModalProvider>
    );
}