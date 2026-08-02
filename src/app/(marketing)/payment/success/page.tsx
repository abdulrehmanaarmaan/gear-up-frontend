import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
    CheckCircle2,
    Calendar,
    MapPin,
    ShieldCheck,
    Download,
    ArrowRight,
    MessageSquare,
    Phone,
    HelpCircle,
} from "lucide-react";

// shadcn/ui component imports
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getOrderDetails } from "@/app/(dashboard)/dashboard/customer/customer.actions";

// Mock successful checkout transaction data
const MOCK_SUCCESSFUL_ORDER = {
    id: "ord-8091a2b",
    transactionId: "txn_3Mv89xL2eZvKYlo21aBc89D",
    createdAt: "2026-07-29T20:15:00.000Z",
    gear: {
        title: "MSR Hubba Hubba NX 2-Person Backpacking Tent",
        slug: "msr-hubba-hubba-nx-2p",
        category: "Camping & Hiking",
        image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&q=80&w=300"
    },
    provider: {
        name: "Summit Outfitters Co.",
        rating: 4.9,
        reviewsCount: 128,
        phone: "+1 (555) 234-5678",
        email: "support@summitoutfitters.com",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100",
        pickupAddress: "1240 Boulder Ave, Denver, CO 80202",
        pickupHours: "Mon - Sat: 8:00 AM - 6:00 PM"
    },
    rentalStartDate: "2026-08-01T00:00:00.000Z",
    rentalEndDate: "2026-08-06T00:00:00.000Z",
    totalDays: 5,
    pricePerDay: 28.00,
    subtotal: 140.00,
    serviceFee: 21.00,
    damageProtectionFee: 12.00,
    totalPaid: 173.00,
    securityDepositHold: 150.00,
    paymentMethod: {
        brand: "Visa",
        last4: "4242"
    }
};

export default async function PaymentSuccessPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {

    const { orderId } = await searchParams

    const { data } = await getOrderDetails(orderId as string)

    return (
        <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
            <div className="max-w-3xl w-full space-y-8">

                {/* SUCCESS HEADER BADGE */}
                <div className="text-center space-y-3">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 ring-8 ring-emerald-500/5 animate-pulse">
                        <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <Badge variant="outline" className="border-emerald-500/40 text-emerald-600 dark:text-emerald-400 bg-emerald-500/5 font-semibold text-xs px-3 py-1">
                        Payment Confirmed • Order #{orderId}
                    </Badge>
                    <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
                        You're All Set for Your Adventure!
                    </h1>
                    <p className="text-xs sm:text-sm text-muted-foreground max-w-lg mx-auto">
                        We've sent a detailed booking receipt and pickup instructions to your email. The provider has been notified to prepare your gear.
                    </p>
                </div>

                {/* MAIN ORDER SUMMARY CARD */}
                <Card className="border-border/80 bg-card shadow-lg overflow-hidden">
                    <CardHeader className="bg-muted/40 border-b border-border/60 p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <CardTitle className="text-base font-bold text-foreground">Rental Booking Details</CardTitle>
                            <p className="text-xs text-muted-foreground mt-0.5">Transaction ID: <span className="font-mono text-foreground">{data?.payment?.transactionId}</span></p>
                        </div>
                        <Button variant="outline" size="sm" className="gap-2 text-xs h-8 border-border/80 shrink-0">
                            <Download className="w-3.5 h-3.5" /> Download Tax Invoice
                        </Button>
                    </CardHeader>

                    <CardContent className="p-4 sm:p-6 space-y-6">

                        {/* GEAR ITEM OVERVIEW */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-muted/20 p-4 rounded-xl border border-border/60">
                            <div className="relative h-20 w-24 rounded-lg bg-muted border border-border/80 overflow-hidden shrink-0">
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
                            <div className="flex-1 min-w-0">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-primary">{data?.gear?.category?.name}</span>
                                <h2 className="text-base font-bold text-foreground line-clamp-1">{data?.gear?.title}</h2>
                                <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                                    <span className="flex items-center gap-1">
                                        <Calendar className="w-3.5 h-3.5 text-primary" />
                                        {new Date(data?.rentalStartDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })} - {new Date(data?.rentalEndDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                                    </span>
                                    <span>•</span>
                                    <span className="font-mono font-semibold text-foreground">{data?.totalDays} Rental Days</span>
                                </div>
                            </div>
                        </div>

                        {/* PICKUP & PROVIDER CONTACT GRID */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            {/* Pickup Address Card */}
                            <div className="p-4 rounded-xl border border-border/80 bg-card space-y-2">
                                <div className="flex items-center gap-2 text-xs font-bold text-foreground uppercase tracking-wider">
                                    <MapPin className="w-4 h-4 text-primary" /> Gear Pickup Location
                                </div>
                                <p className="text-xs font-semibold text-foreground">{data?.provider?.address || "Not Provided"}</p>
                            </div>

                            {/* Provider Contact Card */}
                            <div className="p-4 rounded-xl border border-border/80 bg-card space-y-2">
                                <div className="flex items-center gap-2 text-xs font-bold text-foreground uppercase tracking-wider">
                                    <ShieldCheck className="w-4 h-4 text-emerald-500" /> Verified Provider
                                </div>
                                <div className="flex items-center gap-3 pt-0.5">
                                    <Avatar className="h-9 w-9 border border-primary/20">
                                        <AvatarImage src={data?.provider?.image} />
                                        <AvatarFallback>{data?.provider?.name[0]}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col min-w-0">
                                        <span className="text-xs font-bold text-foreground truncate">{data?.provider?.name}</span>
                                        <a href={`tel:${data?.provider?.phone}`} className="text-[11px] text-primary hover:underline flex items-center gap-1">
                                            <Phone className="w-3 h-3" /> {data?.provider?.phone}
                                        </a>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <Separator className="bg-border/60" />

                        {/* FINANCIAL BREAKDOWN */}
                        <div className="space-y-3">
                            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Payment Summary</h3>
                            <div className="space-y-1.5 text-xs">
                                <div className="flex justify-between text-muted-foreground">
                                    <span>Rental Fee ({data?.totalDays} days × ${data?.pricePerDay})</span>
                                    <span className="font-mono text-foreground">${data?.subtotal}</span>
                                </div>
                                <div className="flex justify-between text-muted-foreground">
                                    <span>GearUp Service & Processing Fee</span>
                                    <span className="font-mono text-foreground">${data?.serviceFee}</span>
                                </div>
                                <Separator className="bg-border/60 my-2" />
                                <div className="flex justify-between text-sm font-bold text-foreground">
                                    <span>Total Charged to Stripe (•••• {data?.payment?.method})</span>
                                    <span className="font-mono text-emerald-600 dark:text-emerald-400">${data?.payment?.amount}</span>
                                </div>
                            </div>
                        </div>

                    </CardContent>

                    {/* CARD FOOTER ACTIONS */}
                    <CardFooter className="bg-muted/30 border-t border-border/60 p-4 sm:p-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                        <Button variant="ghost" asChild className="text-xs text-muted-foreground hover:text-foreground">
                            <Link href="/dashboard/customer/my-payments">
                                View Billing Log
                            </Link>
                        </Button>
                        <div className="flex flex-col sm:flex-row items-center gap-2">
                            <Button variant="outline" asChild className="w-full sm:w-auto text-xs h-9 border-border/80">
                                <Link href="/dashboard/customer/rental-orders">
                                    <MessageSquare className="w-3.5 h-3.5 mr-1.5" /> Message Provider
                                </Link>
                            </Button>
                            <Button asChild className="w-full sm:w-auto text-xs h-9 font-bold bg-primary text-primary-foreground">
                                <Link href="/dashboard/customer/rental-orders">
                                    Go to My Bookings <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                                </Link>
                            </Button>
                        </div>
                    </CardFooter>
                </Card>

                {/* SUPPORT HELP LINK */}
                <div className="text-center text-xs text-muted-foreground flex items-center justify-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5" /> Need to modify or cancel your rental? <Link href="/support" className="text-primary hover:underline font-semibold">Contact GearUp Support</Link>
                </div>

            </div>
        </div>
    );
}