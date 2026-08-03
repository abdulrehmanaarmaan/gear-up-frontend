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

export default async function RentalOrderServer() {

    const rentalOrders = await getRentalOrders()
    const { data } = await rentalOrders

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