import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
    ArrowLeft,
    ShieldCheck,
    Lock,
    Calendar,
    Clock,
    CheckCircle2,
    Building2,
} from "lucide-react";

// shadcn/ui component imports
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { redirect } from "next/navigation";
import { getOrderDetails } from "../customer.actions";
import PaymentSection from "./PaymentSection";


export default async function OrderPayment({
    params,
}: {
    params: Promise<{ id: string }>;
}) {

    const { id } = await params

    const { data } = await getOrderDetails(id)

    const formattedRentalStart = new Intl.DateTimeFormat("en-US", {
        month: "numeric",
        day: "numeric",
        year: "numeric",
        timeZone: "Asia/Dhaka",
    }).format(new Date(data?.rentalStartDate));

    const formattedRentalEnd = new Intl.DateTimeFormat("en-US", {
        month: "numeric",
        day: "numeric",
        year: "numeric",
        timeZone: "Asia/Dhaka",
    }).format(new Date(data?.rentalEndDate));

    if (data?.status === "PAID") {
        redirect(`/dashboard/customer/rental-orders/${id}`);
    }

    return (
        <div className="min-h-screen bg-background pb-16 pt-4 text-foreground">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-6">

                {/* BACK BUTTON & NAVIGATION HEADER */}

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/60 pb-4">
                    <Button
                        asChild
                        variant="ghost"
                        size="sm"
                        className="w-fit text-xs font-semibold gap-1.5 text-muted-foreground hover:text-foreground hover:bg-muted/60 -ml-2"
                    >
                        <Link href={`/dashboard/customer/rental-orders/${id}`}>
                            <ArrowLeft className="w-4 h-4" />
                            Back to Order Details
                        </Link>
                    </Button>

                    <div className="flex items-center gap-2">
                        <Badge
                            variant="outline"
                            className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 text-[11px] font-bold px-2.5 py-0.5 gap-1"
                        >
                            <Lock className="w-3 h-3" />
                            256-Bit SSL Encrypted Checkout
                        </Badge>
                    </div>
                </div>

                {/* PAGE TITLE */}

                <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                        Complete Payment
                    </h1>

                    <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                        Review your rental details and securely complete your payment using Stripe Checkout.
                    </p>
                </div>

                {/* MAIN GRID */}

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">

                    {/* LEFT COLUMN */}

                    <div className="lg:col-span-7 space-y-6">

                        <Card className="border-border/80 bg-card shadow-sm overflow-hidden">

                            <CardHeader className="p-4 sm:p-5 bg-muted/30 border-b border-border/60">

                                <div className="flex items-center justify-between">

                                    <span className="text-xs font-mono font-bold text-muted-foreground uppercase tracking-wider">
                                        Booking Order #{id}
                                    </span>

                                    <Badge
                                        variant="secondary"
                                        className="text-[10px] font-bold uppercase bg-primary/10 text-primary border-none"
                                    >
                                        Awaiting Payment
                                    </Badge>

                                </div>

                            </CardHeader>

                            <CardContent className="p-4 sm:p-5">

                                <div className="flex flex-col sm:flex-row gap-4 items-start">

                                    <div className="relative h-24 w-full sm:w-28 rounded-lg bg-muted border border-border/80 overflow-hidden shrink-0">
                                        {data?.gear?.images[0] &&
                                            <Image
                                                unoptimized
                                                src={data?.gear?.images[0]}
                                                alt={data?.gear?.title}
                                                fill
                                                className="object-cover"
                                            />
                                        }
                                    </div>

                                    <div className="flex-1 space-y-2 min-w-0">

                                        <div>

                                            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                                                {data?.gear?.category?.name}
                                            </span>

                                            <h3 className="text-sm sm:text-base font-bold text-foreground leading-snug line-clamp-2">
                                                {data?.gear?.title}
                                            </h3>

                                        </div>

                                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">

                                            <Building2 className="w-3.5 h-3.5 text-primary shrink-0" />

                                            <span>Provider:</span>

                                            <span className="font-semibold text-foreground">
                                                {data?.provider?.name}
                                            </span>

                                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 fill-emerald-500/20" />

                                        </div>

                                    </div>

                                </div>

                                <Separator className="my-4 bg-border/60" />

                                <div className="grid grid-cols-2 gap-3 p-3 rounded-lg bg-muted/30 border border-border/60 text-xs">

                                    <div className="space-y-1">

                                        <div className="flex items-center gap-1 text-muted-foreground font-medium">

                                            <Calendar className="w-3.5 h-3.5 text-primary" />

                                            <span>Rental Dates</span>

                                        </div>

                                        <p className="font-bold text-foreground">
                                            {data?.createdAt} - {data?.updatedAt}
                                        </p>

                                    </div>

                                    <div className="space-y-1">

                                        <div className="flex items-center gap-1 text-muted-foreground font-medium">

                                            <Clock className="w-3.5 h-3.5 text-primary" />

                                            <span>Total Duration</span>

                                        </div>

                                        <p className="font-bold text-foreground font-mono">
                                            {data?.totalDays} {data?.totalDays > 1 ? "Days" : "Day"}
                                        </p>

                                    </div>

                                </div>

                            </CardContent>

                        </Card>

                    </div>

                    {/* RIGHT COLUMN */}

                    <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-6">

                        <PaymentSection
                            data={data}
                            formattedRentalStart={formattedRentalStart}
                            formattedRentalEnd={formattedRentalEnd}
                        />

                        <div className="p-4 rounded-xl bg-muted/30 border border-border/60 flex items-start gap-3">

                            <ShieldCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />

                            <div className="text-xs space-y-0.5">

                                <h4 className="font-bold text-foreground">
                                    Flexible Cancellation
                                </h4>

                                <p className="text-muted-foreground">
                                    Free cancellation up to 48 hours before the rental start date for a 100% refund.
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </div>
    );
}