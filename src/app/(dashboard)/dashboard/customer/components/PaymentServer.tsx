import * as React from "react";
import Link from "next/link";
import {
    CreditCard,
    Search,
    MoreVertical,
    DollarSign,
    Download,
    ChevronLeft,
    ChevronRight,
    ShieldCheck,
    Plus,
    Trash2,
    Lock,
    Receipt
} from "lucide-react";

// shadcn/ui component imports
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
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
import { getMyPayments } from "../customer.actions";
import { IPayment } from "../customer.interfaces";

export default async function MyPaymentsServer() {
    // const [searchQuery, setSearchQuery] = React.useState("");
    // const [activeTab, setActiveTab] = React.useState("ALL");

    const { data } = await getMyPayments()

    return (
        <div className="space-y-8 pb-12">

            {/* PAGE HEADER */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2">
                        <Badge variant="outline" className="border-primary/40 text-primary font-semibold text-xs">
                            Billing & Accounting
                        </Badge>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground mt-1">
                        Payment History & Invoices
                    </h1>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                        Review transaction receipts, active security deposit holds, and manage your payment methods.
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="gap-2 text-xs border-border/80">
                        <Download className="w-3.5 h-3.5" /> Export Statement
                    </Button>
                    <Button size="sm" className="gap-2 font-bold text-xs bg-primary text-primary-foreground">
                        <Plus className="w-3.5 h-3.5" /> Add Payment Method
                    </Button>
                </div>
            </div>

            {/* METRICS & SECURITY OVERVIEW */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

                <Card className="border-border/80 bg-card shadow-sm border-l-4 border-l-emerald-500">
                    <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between space-y-0">
                        <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                            Total Spent (2026)
                        </CardTitle>
                        <DollarSign className="w-4 h-4 text-emerald-500" />
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                        <div className="text-2xl font-bold text-foreground">$681.95</div>
                        <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium mt-1">
                            4 total gear rentals
                        </p>
                    </CardContent>
                </Card>

                <Card className="border-border/80 bg-card shadow-sm border-l-4 border-l-amber-500">
                    <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between space-y-0">
                        <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                            Active Deposit Holds
                        </CardTitle>
                        <Lock className="w-4 h-4 text-amber-500" />
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                        <div className="text-2xl font-bold text-foreground">$250.00</div>
                        <p className="text-[11px] text-muted-foreground mt-1">
                            Released upon undamaged gear returns
                        </p>
                    </CardContent>
                </Card>

                <Card className="border-border/80 bg-card shadow-sm border-l-4 border-l-blue-500">
                    <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between space-y-0">
                        <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                            Default Card
                        </CardTitle>
                        <CreditCard className="w-4 h-4 text-blue-500" />
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                        <div className="text-xl font-bold text-foreground font-mono">Visa •••• 4242</div>
                        <p className="text-[11px] text-muted-foreground mt-1">
                            Expires 08/2028
                        </p>
                    </CardContent>
                </Card>

                <Card className="border-border/80 bg-card shadow-sm border-l-4 border-l-purple-500">
                    <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between space-y-0">
                        <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                            Encrypted Checkout
                        </CardTitle>
                        <ShieldCheck className="w-4 h-4 text-purple-500" />
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                        <div className="text-2xl font-bold text-foreground">256-Bit SSL</div>
                        <p className="text-[11px] text-muted-foreground mt-1">
                            Powered by Stripe Payments
                        </p>
                    </CardContent>
                </Card>

            </div>

            {/* SAVED PAYMENT METHODS CARDS */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-base font-bold text-foreground tracking-tight">Saved Payment Methods</h2>
                    <span className="text-xs text-muted-foreground">Manage cards & digital wallets</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {data?.map((payment: IPayment) => (
                        <Card key={payment?.id} className={`border-border/80 bg-card shadow-sm relative overflow-hidden ${payment?.method === "CARD" ? "ring-2 ring-primary/60" : ""}`}>
                            {payment?.method === "CARD" && (
                                <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-bl">
                                    {payment?.method}
                                </div>
                            )}
                            <CardContent className="p-4 flex items-center justify-between gap-4">
                                {/* <div className="flex items-center gap-3"> */}
                                {/* <div className="h-10 w-12 rounded bg-muted border border-border/80 flex items-center justify-center shrink-0"> */}
                                {/* <CreditCard className="w-5 h-5 text-foreground" /> */}
                                {/* </div> */}
                                {/* <div> */}
                                {/* <h3 className="text-xs font-bold text-foreground">{method.brand} ending in {method.last4}</h3> */}
                                {/* <p className="text-[11px] text-muted-foreground">Expires {method.expiry} • {method.holderName}</p> */}
                                {/* </div> */}
                                {/* </div> */}

                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                                            <MoreVertical className="w-4 h-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-44">
                                        {!payment?.method && (
                                            <DropdownMenuItem className="cursor-pointer text-xs">
                                                Set as Default
                                            </DropdownMenuItem>
                                        )}
                                        <DropdownMenuItem className="cursor-pointer text-xs text-rose-600">
                                            <Trash2 className="w-3.5 h-3.5 mr-2" /> Remove Card
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </CardContent>
                        </Card>
                    ))}

                    {/* Add New Quick Card Prompt */}
                    <Card className="border-dashed border-border/80 bg-muted/20 hover:bg-muted/40 transition-colors shadow-sm cursor-pointer flex items-center justify-center p-4 min-h-[74px]">
                        <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-primary transition-colors">
                            <Plus className="w-4 h-4" /> Add New Card or Wallet
                        </div>
                    </Card>
                </div>
            </div>

            {/* PAYMENT HISTORY TRANSACTIONS */}
            <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-base font-bold text-foreground tracking-tight">Transaction Log</h2>
                        <p className="text-xs text-muted-foreground">All processed rental charges, pre-authorizations, and deposit releases.</p>
                    </div>
                </div>

                {/* TABS & SEARCH TOOLBAR */}
                <Card className="border-border/80 bg-card shadow-sm">
                    <CardContent className="p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">

                        {/* Status Tabs */}
                        <Tabs defaultValue="ALL"
                            // onValueChange={setActiveTab}
                            className="w-full md:w-auto">
                            <TabsList className="bg-muted/60 p-1 h-9 border border-border/80">
                                <TabsTrigger value="ALL" className="text-xs font-semibold px-3 py-1">All Transactions</TabsTrigger>
                                <TabsTrigger value="COMPLETED" className="text-xs font-semibold px-3 py-1">Completed</TabsTrigger>
                                <TabsTrigger value="HOLDS" className="text-xs font-semibold px-3 py-1">Security Holds</TabsTrigger>
                                <TabsTrigger value="REFUNDS" className="text-xs font-semibold px-3 py-1">Refunds</TabsTrigger>
                            </TabsList>
                        </Tabs>

                        {/* Search Box */}
                        <div className="relative w-full md:w-72">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                type="text"
                                placeholder="Search transaction or order ID..."
                                // value={searchQuery}
                                // onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-9 h-9 text-xs bg-background border-border/80 focus-visible:ring-1 focus-visible:ring-primary"
                            />
                        </div>

                    </CardContent>
                </Card>

                {/* TRANSACTIONS TABLE */}
                <Card className="border-border/80 bg-card shadow-sm overflow-hidden">

                    {/* DESKTOP TABLE VIEW */}
                    <div className="hidden md:block overflow-x-auto">
                        <Table>
                            <TableHeader className="bg-muted/40">
                                <TableRow className="border-border/60">
                                    <TableHead className="w-[120px] text-xs font-bold uppercase text-muted-foreground">Txn ID / Date</TableHead>
                                    <TableHead className="w-[260px] text-xs font-bold uppercase text-muted-foreground">Rental Gear & Provider</TableHead>
                                    <TableHead className="text-xs font-bold uppercase text-muted-foreground">Payment Method</TableHead>
                                    <TableHead className="text-xs font-bold uppercase text-muted-foreground">Deposit Hold</TableHead>
                                    <TableHead className="text-xs font-bold uppercase text-muted-foreground">Total Charged</TableHead>
                                    <TableHead className="text-xs font-bold uppercase text-muted-foreground">Status</TableHead>
                                    <TableHead className="text-right text-xs font-bold uppercase text-muted-foreground">Receipt</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {data?.map((payment: IPayment) => (
                                    <TableRow key={payment?.id} className="border-border/60 hover:bg-muted/20 transition-colors">

                                        {/* Txn ID & Date */}
                                        <TableCell className="py-3">
                                            <div className="flex flex-col">
                                                <Link
                                                    href={`/dashboard/customer/payments/${payment?.id}`}
                                                    className="font-mono text-xs font-bold text-foreground hover:text-primary hover:underline transition-colors w-fit"
                                                >
                                                    #{payment?.id}
                                                </Link>
                                                <span className="text-[10px] text-muted-foreground">
                                                    {new Date(payment?.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                                                </span>
                                            </div>
                                        </TableCell>

                                        {/* Gear Title & Provider */}
                                        <TableCell>
                                            <div className="flex flex-col min-w-0">
                                                <span className="text-xs font-bold text-foreground line-clamp-1">{payment?.rentalOrder?.gear?.id}</span>
                                                <span className="text-[10px] text-muted-foreground">Provider: {payment?.customer?.id} • Order #{payment?.rentalOrderId.slice(0, 8)}</span>
                                            </div>
                                        </TableCell>

                                        {/* Payment Method */}
                                        <TableCell>
                                            <div className="flex items-center gap-1.5 text-xs">
                                                <CreditCard className="w-3.5 h-3.5 text-muted-foreground" />
                                                <span className="font-mono text-foreground">{payment?.method} •••• {payment?.transactionId}</span>
                                            </div>
                                        </TableCell>

                                        {/* Deposit Hold Info */}
                                        {/* <TableCell> */}
                                        {/* <div className="flex flex-col text-xs"> */}
                                        {/* <span className="font-mono font-medium text-foreground">${payment.depositAmount.toFixed(2)}</span> */}
                                        {/* <span className={`text-[10px] font-semibold ${payment.depositStatus === "HELD" */}
                                        {/* // ? "text-amber-600 dark:text-amber-400" */}
                                        {/* // : payment.depositStatus === "RELEASED" */}
                                        {/* // ? "text-emerald-600 dark:text-emerald-400" */}
                                        {/* // : "text-muted-foreground" */}
                                        {/* // }`}> */}
                                        {/* {payment.depositStatus === "HELD" ? "Active Hold" : payment.depositStatus === "RELEASED" ? "Released" : "Pending Hold"} */}
                                        {/* </span> */}
                                        {/* </div> */}
                                        {/* </TableCell> */}

                                        {/* Total Charged */}
                                        <TableCell>
                                            <span className="font-mono text-xs font-bold text-foreground">
                                                ${payment?.amount}
                                            </span>
                                        </TableCell>

                                        {/* Status Badge */}
                                        <TableCell>
                                            <Badge
                                                variant="secondary"
                                                className={`text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 border-none ${payment?.status === "COMPLETED"
                                                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                                                    : payment?.status === "COMPLETED"
                                                        ? "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                                                        : "bg-rose-500/10 text-rose-600 dark:text-rose-400"
                                                    }`}
                                            >
                                                {payment?.status}
                                            </Badge>
                                        </TableCell>

                                        {/* Receipt / View Details Action */}
                                        <TableCell className="text-right">
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                className="h-8 text-xs gap-1 text-primary hover:text-primary hover:bg-primary/10"
                                                asChild
                                            >
                                                <Link href={`/dashboard/customer/payments/${payment?.id}`}>
                                                    <Receipt className="w-3.5 h-3.5" /> Details
                                                </Link>
                                            </Button>
                                        </TableCell>

                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                    {/* MOBILE CARD VIEW FALLBACK */}
                    <div className="block md:hidden divide-y divide-border/60">
                        {data?.map((payment: IPayment) => (
                            <div key={payment?.id} className="p-4 space-y-3">

                                {/* Top Row Header */}
                                <div className="flex items-center justify-between">
                                    <Link
                                        href={`/dashboard/customer/payments/${payment?.id}`}
                                        className="font-mono text-xs font-bold text-primary hover:underline"
                                    >
                                        #{payment?.id}
                                    </Link>
                                    <Badge
                                        variant="secondary"
                                        className={`text-[10px] font-bold uppercase border-none px-2 py-0.5 ${payment?.status === "COMPLETED"
                                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                                            : "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                                            }`}
                                    >
                                        {payment?.status}
                                    </Badge>

                                    <div>
                                        <h3 className="text-xs font-bold text-foreground line-clamp-1">{payment?.rentalOrder?.gear?.title}</h3>
                                        <p className="text-[11px] text-muted-foreground">{payment?.customer?.name} • Order #{payment?.rentalOrderId.slice(0, 8)}</p>
                                    </div>

                                    <div className="flex items-center justify-between text-xs bg-muted/30 p-2.5 rounded-lg border border-border/60">
                                        <div>
                                            <span className="text-[10px] text-muted-foreground block">Charged Amount</span>
                                            <span className="font-mono font-bold text-foreground">${payment?.amount}</span>
                                        </div>
                                        {/* <div className="text-right"> */}
                                        {/* <span className="text-[10px] text-muted-foreground block">Deposit Hold</span> */}
                                        {/* <span className="font-mono font-semibold text-amber-600 dark:text-amber-400">${payment.depositAmount.toFixed(2)} ({payment.depositStatus})</span> */}
                                        {/* </div> */}
                                    </div>

                                    {/* Bottom Actions Row */}
                                    <div className="pt-1 flex items-center justify-between text-xs text-muted-foreground">
                                        <span className="font-mono text-[11px]">{payment?.method} •••• {payment?.transactionId}</span>
                                        <Button size="sm" variant="outline" className="h-7 text-xs gap-1" asChild>
                                            <Link href={`/dashboard/customer/payments/${payment?.id}`}>
                                                <Receipt className="w-3 h-3" /> View Details
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="font-mono text-xs font-bold text-primary">#{payment?.id}</span>
                                    <Badge
                                        variant="secondary"
                                        className={`text-[10px] font-bold uppercase border-none px-2 py-0.5 ${payment?.status === "COMPLETED"
                                            ? "bg-emerald-500/10 text-emerald-600"
                                            : "bg-blue-500/10 text-blue-600"
                                            }`}
                                    >
                                        {payment?.status}
                                    </Badge>
                                </div>

                                <div>
                                    <h3 className="text-xs font-bold text-foreground line-clamp-1">{payment?.rentalOrder?.gear?.title}</h3>
                                    <p className="text-[11px] text-muted-foreground">{payment?.customer?.name} • Order #{payment?.rentalOrderId.slice(0, 8)}</p>
                                </div>

                                <div className="flex items-center justify-between text-xs bg-muted/30 p-2.5 rounded-lg border border-border/60">
                                    <div>
                                        <span className="text-[10px] text-muted-foreground block">Charged Amount</span>
                                        <span className="font-mono font-bold text-foreground">${payment?.amount}</span>
                                    </div>
                                    {/* <div className="text-right"> */}
                                    {/* <span className="text-[10px] text-muted-foreground block">Deposit Hold</span> */}
                                    {/* <span className="font-mono font-semibold text-amber-600 dark:text-amber-400">${payment.depositAmount.toFixed(2)} ({payment.depositStatus})</span> */}
                                    {/* </div> */}
                                </div>

                                <div className="pt-1 flex items-center justify-between text-xs text-muted-foreground">
                                    <span className="font-mono text-[11px]">{payment?.method} •••• {payment?.transactionId}</span>
                                    <Button size="sm" variant="outline" className="h-7 text-xs gap-1">
                                        <Download className="w-3 h-3" /> PDF Receipt
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* PAGINATION FOOTER */}
                    <div className="p-4 border-t border-border/60 bg-muted/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
                        <span>Showing <span className="font-semibold text-foreground">1-4</span> of <span className="font-semibold text-foreground">12</span> transactions</span>
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
        </div>
    );
}

