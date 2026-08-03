import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
    ArrowLeft,
    Download,
    CreditCard,
    CheckCircle2,
    Clock,
    XCircle,
    Calendar,
    Copy,
    Receipt,
    ExternalLink,
    ShieldCheck,
    ShoppingBag,
    HelpCircle
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getPaymentDetails } from "../customer.actions";

// Enums matching Prisma schema
export type PaymentStatus = "COMPLETED" | "PENDING" | "FAILED" | "REFUNDED" | "CANCELLED";
export type PaymentMethod = "CARD" | "BANK_TRANSFER" | "MOBILE_BANKING";

export default async function PaymentDetailsServer({ params }: { params: { id: string } }) {

    const { id } = await params

    const { data } = await getPaymentDetails(id)

    // Helper function for dynamic status badges
    const renderStatusBadge = (status: PaymentStatus) => {
        switch (status) {
            case "COMPLETED":
                return (
                    <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 border-emerald-500/20 font-semibold px-3 py-1 text-xs gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> Payment Successful
                    </Badge>
                );
            case "PENDING":
                return (
                    <Badge className="bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20 border-amber-500/20 font-semibold px-3 py-1 text-xs gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" /> Processing Payment
                    </Badge>
                );
            case "FAILED":
                return (
                    <Badge className="bg-destructive/10 text-destructive hover:bg-destructive/20 border-destructive/20 font-semibold px-3 py-1 text-xs gap-1.5">
                        <XCircle className="w-3.5 h-3.5 text-destructive" /> Payment Failed
                    </Badge>
                );
            default:
                return <Badge variant="outline">{status}</Badge>;
        }
    };

    const handleCopyId = (text: string) => {
        navigator.clipboard.writeText(text);
        // TODO: Trigger a toast notification (e.g. toast.success("Copied to clipboard!"))
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-5xl space-y-8">

            {/* 1. TOP NAVIGATION & HEADER ACTIONS */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" asChild className="h-8 w-8 -ml-2">
                            <Link href="/dashboard/customer/my-payments">
                                <ArrowLeft className="w-4 h-4" />
                            </Link>
                        </Button>
                        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                            Payment Details
                        </span>
                    </div>
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                            Receipt #{data?.id.slice(0, 12)}
                        </h1>
                        {renderStatusBadge(data?.status)}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3 self-start sm:self-auto">
                    <Button variant="outline" className="gap-2 text-xs sm:text-sm h-10 border-border/80">
                        <Download className="w-4 h-4" />
                        Download PDF
                    </Button>
                    <Button variant="secondary" className="gap-2 text-xs sm:text-sm h-10" asChild>
                        <Link href={`/dashboard/customer/rental-orders/${data?.rentalOrderId}`}>
                            <ShoppingBag className="w-4 h-4" />
                            View Rental Order
                        </Link>
                    </Button>
                </div>
            </div>

            {/* 2. MAIN LAYOUT GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* LEFT COLUMN: Main Receipt Summary & Breakdown (2 Cols Wide) */}
                <div className="lg:col-span-2 space-y-6">

                    {/* INVOICE CARD */}
                    <Card className="border-border/60 shadow-sm overflow-hidden">
                        <CardHeader className="bg-muted/30 border-b border-border/40 p-6">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="p-3 bg-primary/10 text-primary rounded-xl">
                                        <Receipt className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground font-medium">Total Amount Paid</p>
                                        <div className="flex items-baseline gap-1.5">
                                            <span className="text-3xl font-black text-foreground">
                                                {data?.currency} {data?.amount}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="text-left sm:text-right text-xs text-muted-foreground space-y-1">
                                    <p>
                                        <span className="font-semibold text-foreground">Date:</span>{" "}
                                        {data?.paidAt ? new Date(data?.paidAt).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric"
                                        }) : "N/A"}
                                    </p>
                                    <p>
                                        <span className="font-semibold text-foreground">Provider:</span>{" "}
                                        {data?.provider}
                                    </p>
                                </div>
                            </div>
                        </CardHeader>

                        <CardContent className="p-6 space-y-6">

                            {/* RENTED ITEM SUMMARY */}
                            <div className="space-y-3">
                                <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                    Order Summary
                                </h3>
                                <div className="flex items-center gap-4 p-3.5 rounded-xl border border-border/60 bg-muted/20">
                                    <div className="relative w-14 h-14 rounded-lg border border-border bg-muted overflow-hidden shrink-0">
                                        {data?.rentalOrder?.gear?.images[0] &&
                                            <Image
                                                src={data?.rentalOrder?.gear?.images[0]}
                                                alt={data?.rentalOrder?.gear?.title}
                                                fill
                                                sizes="56px"
                                                className="object-cover"
                                            />
                                        }
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-semibold text-sm text-foreground truncate">
                                            {data?.rentalOrder?.gear?.title}
                                        </h4>
                                        <p className="text-xs text-muted-foreground mt-0.5">
                                            Category: {data?.rentalOrder?.gear?.category?.name} • Qty: {data?.rentalOrder?.quantity}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            {/* ITEMIZATION COST BREAKDOWN */}
                            <div className="space-y-3">
                                <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                    Payment Breakdown
                                </h3>
                                <div className="space-y-2.5 text-xs sm:text-sm">
                                    <div className="flex justify-between text-muted-foreground">
                                        <span>Rental Subtotal</span>
                                        <span className="font-semibold text-foreground">
                                            {data?.currency} {data?.rentalOrder?.subtotal}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-muted-foreground">
                                        <span>Platform Service Fee</span>
                                        <span className="font-semibold text-foreground">
                                            {data?.currency} {data?.rentalOrder?.serviceFee}
                                        </span>
                                    </div>
                                    <Separator className="my-2" />
                                    <div className="flex justify-between text-base font-extrabold text-foreground pt-1">
                                        <span>Total Amount Charged</span>
                                        <span className="text-primary">{data?.currency} {data?.amount}</span>
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            {/* PAYMENT METHOD & GATEWAY INFO */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                                <div className="p-4 rounded-xl border border-border/60 bg-muted/10 space-y-2">
                                    <div className="flex items-center gap-2 text-xs font-bold text-foreground">
                                        <CreditCard className="w-4 h-4 text-primary" />
                                        Payment Method
                                    </div>
                                    <div className="text-xs text-muted-foreground space-y-1">
                                        <p className="font-semibold text-foreground">
                                            {data?.method === "CARD" ? "Credit / Debit Card" : data?.method}
                                        </p>
                                        <p className="text-[11px]">Processed securely via Stripe Gateway</p>
                                    </div>
                                </div>

                                <div className="p-4 rounded-xl border border-border/60 bg-muted/10 space-y-2">
                                    <div className="flex items-center gap-2 text-xs font-bold text-foreground">
                                        <ShieldCheck className="w-4 h-4 text-emerald-600" />
                                        Security & Protection
                                    </div>
                                    <p className="text-[11px] text-muted-foreground">
                                        Encrypted end-to-end. Funds held in escrow until rental period is completed.
                                    </p>
                                </div>
                            </div>

                        </CardContent>

                        <CardFooter className="bg-muted/20 border-t border-border/40 p-4 text-center justify-center">
                            <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                                This payment is protected under GearRental Customer Assurance.
                            </p>
                        </CardFooter>
                    </Card>

                </div>

                {/* RIGHT COLUMN: Transaction Identifiers & Metadata (1 Col Wide) */}
                <div className="space-y-6">

                    {/* TRANSACTION METADATA CARD */}
                    <Card className="border-border/60 shadow-sm">
                        <CardHeader className="border-b border-border/40 bg-muted/20 pb-4">
                            <CardTitle className="text-base font-bold">Transaction Identifiers</CardTitle>
                            <CardDescription className="text-xs">
                                Reference keys from gateway & database logs.
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="p-6 space-y-4">

                            {/* Payment ID */}
                            <div className="space-y-1">
                                <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                                    Payment ID
                                </span>
                                <div className="flex items-center justify-between gap-2 p-2 rounded-lg border border-border/60 bg-muted/30">
                                    <code className="text-xs font-mono truncate text-foreground">{data?.id}</code>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-6 w-6 shrink-0"
                                    // onClick={() => handleCopyId(payment.id)}
                                    >
                                        <Copy className="w-3 h-3 text-muted-foreground" />
                                    </Button>
                                </div>
                            </div>

                            {/* Transaction ID */}
                            {data?.transactionId && (
                                <div className="space-y-1">
                                    <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                                        Transaction ID
                                    </span>
                                    <div className="flex items-center justify-between gap-2 p-2 rounded-lg border border-border/60 bg-muted/30">
                                        <code className="text-xs font-mono truncate text-foreground">{data?.transactionId}</code>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-6 w-6 shrink-0"
                                        // onClick={() => handleCopyId(payment.transactionId!)}
                                        >
                                            <Copy className="w-3 h-3 text-muted-foreground" />
                                        </Button>
                                    </div>
                                </div>
                            )}

                            {/* Rental Order ID */}
                            <div className="space-y-1">
                                <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                                    Rental Order ID
                                </span>
                                <div className="flex items-center justify-between gap-2 p-2 rounded-lg border border-border/60 bg-muted/30">
                                    <code className="text-xs font-mono truncate text-foreground">{data?.rentalOrderId}</code>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-6 w-6 shrink-0"
                                    // onClick={() => handleCopyId(payment.rentalOrderId)}
                                    >
                                        <Copy className="w-3 h-3 text-muted-foreground" />
                                    </Button>
                                </div>
                            </div>

                            {/* Stripe Customer ID */}
                            {data?.stripeCustomerId && (
                                <div className="space-y-1">
                                    <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                                        Stripe Customer Reference
                                    </span>
                                    <div className="flex items-center justify-between gap-2 p-2 rounded-lg border border-border/60 bg-muted/30">
                                        <code className="text-xs font-mono truncate text-foreground">{data?.stripeCustomerId}</code>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-6 w-6 shrink-0"
                                        // onClick={() => handleCopyId(payment.stripeCustomerId!)}
                                        >
                                            <Copy className="w-3 h-3 text-muted-foreground" />
                                        </Button>
                                    </div>
                                </div>
                            )}

                            <Separator />

                            {/* TIMESTAMPS */}
                            <div className="space-y-2 text-xs">
                                <div className="flex items-center justify-between text-muted-foreground">
                                    <span className="flex items-center gap-1.5">
                                        <Calendar className="w-3.5 h-3.5" /> Created At
                                    </span>
                                    <span className="font-medium text-foreground">
                                        {new Date(data?.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}, {new Date(data?.createdAt).toLocaleDateString()}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between text-muted-foreground">
                                    <span className="flex items-center gap-1.5">
                                        <Clock className="w-3.5 h-3.5" /> Updated At
                                    </span>
                                    <span className="font-medium text-foreground">
                                        {new Date(data?.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}, {new Date(data?.updatedAt).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>

                        </CardContent>
                    </Card>

                    {/* NEED HELP / SUPPORT CARD */}
                    <Card className="border-border/60 shadow-sm bg-muted/10">
                        <CardContent className="p-5 space-y-3">
                            <div className="flex items-center gap-2 text-sm font-bold text-foreground">
                                <HelpCircle className="w-4 h-4 text-primary" />
                                Need Help With This Charge?
                            </div>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                                If you have questions regarding this payment or require a tax invoice refund, please contact customer support.
                            </p>
                            <Button variant="outline" className="w-full text-xs h-9 gap-1.5 border-border/80" asChild>
                                <Link href="/support">
                                    Contact Support <ExternalLink className="w-3 h-3" />
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}