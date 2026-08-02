import Link from "next/link";
import {
    ChevronLeft,
    Calendar,
    MapPin,
    MessageSquare,
    ShieldCheck,
    Package,
    Clock,
    CheckCircle2,
    AlertCircle,
    Phone,
    Download,
    Share2,
    ExternalLink,
    Info,
    CreditCard,
    User,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getOrderDetails } from "../../customer.actions";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function RentalOrderDetails({ params }: { params: Promise<{ id: string }> }) {

    const { id } = await params

    const { data: orderDetails } = await getOrderDetails(id)

    if (orderDetails?.payment?.status !== "COMPLETED") {
        return notFound();
    }

    return (
        <div className="min-h-screen bg-background text-foreground pb-16">
            {/* Top Header / Breadcrumb Bar */}
            <div className="border-b bg-card/50 backdrop-blur-md sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <Button variant="ghost" size="icon" asChild className="h-9 w-9">
                            <Link href="/dashboard/customer/my-rental-orders">
                                <ChevronLeft className="w-5 h-5" />
                            </Link>
                        </Button>
                        <div>
                            <div className="flex items-center gap-2">
                                <h1 className="text-lg font-bold font-mono tracking-tight">
                                    #{orderDetails?.id}
                                </h1>
                                <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 font-semibold text-xs">
                                    {orderDetails?.status}
                                </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Placed on {new Date(orderDetails?.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                    </div>

                    {/* Quick Utility Actions */}
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="text-xs">
                            <Download className="w-3.5 h-3.5 mr-1.5" /> Invoice
                        </Button>
                        <Button variant="outline" size="sm" className="text-xs">
                            <Share2 className="w-3.5 h-3.5 mr-1.5" /> Share
                        </Button>
                        <Button size="sm" className="text-xs font-semibold">
                            <MessageSquare className="w-3.5 h-3.5 mr-1.5" /> Message Provider
                        </Button>
                    </div>
                </div>
            </div>

            {/* Main Grid Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Column - 2 Cols Wide on Large Screens */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Gear Highlight Header Card */}
                        <Card className="overflow-hidden border-border/60">
                            <div className="p-6 sm:p-8 flex flex-col sm:flex-row gap-6">
                                <div className="relative w-full sm:w-48 h-48 rounded-lg overflow-hidden border border-border/40 shrink-0 bg-muted">
                                    {orderDetails?.gear?.image?.[0] &&
                                        <Image
                                            src={orderDetails?.gear?.image?.[0]}
                                            alt={orderDetails?.gear?.title || "Gear image"}
                                            fill
                                            sizes="(max-width: 640px) 100vw, 192px"
                                            className="object-cover"
                                            unoptimized
                                        />
                                    }
                                    <Badge className="absolute top-2 left-2 bg-background/80 backdrop-blur-md text-foreground text-[10px]">
                                        {orderDetails?.gear?.category?.name}
                                    </Badge>
                                </div>

                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <h2 className="text-xl font-bold tracking-tight text-foreground mb-2">
                                            {orderDetails?.gear?.title}
                                        </h2>
                                        <p className="text-xs font-mono text-muted-foreground mb-4">
                                            Serial Number: {orderDetails?.gear?.id}
                                        </p>

                                        {/* Booking Dates Grid */}


                                        <div className="grid grid-cols-2 gap-4 p-3 rounded-lg bg-muted/40 border border-border/40 text-xs">
                                            {
                                                orderDetails?.status === "PICKED_UP" &&
                                                <div>
                                                    <span className="text-muted-foreground block text-[10px] uppercase tracking-wider font-semibold">
                                                        Pick-Up Date
                                                    </span>
                                                    <span className="font-semibold text-foreground flex items-center gap-1.5 mt-0.5">
                                                        <Calendar className="w-3.5 h-3.5 text-primary" />
                                                        {orderDetails?.rentalStartDate}
                                                    </span>
                                                    <span className="text-[10px] text-muted-foreground ml-5">
                                                        At {orderDetails?.rentalEndDate}
                                                    </span>
                                                </div>
                                            }

                                            {
                                                orderDetails?.status === "RETURNED" &&
                                                <div>
                                                    <span className="text-muted-foreground block text-[10px] uppercase tracking-wider font-semibold">
                                                        Return Date
                                                    </span>
                                                    <span className="font-semibold text-foreground flex items-center gap-1.5 mt-0.5">
                                                        <Calendar className="w-3.5 h-3.5 text-primary" />
                                                        {orderDetails?.createdAt}
                                                    </span>
                                                    <span className="text-[10px] text-muted-foreground ml-5">
                                                        By {orderDetails?.updatedAt}
                                                    </span>
                                                </div>
                                            }
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between pt-4 mt-4 border-t text-xs">
                                        <span className="text-muted-foreground">Total Duration:</span>
                                        <span className="font-semibold text-foreground">
                                            {orderDetails?.totalDays} Days
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* Included Kit Items */}
                        <Card className="border-border/60">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-base font-semibold flex items-center gap-2">
                                    <Package className="w-4 h-4 text-primary" /> Included Accessories & Items
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                                    <div
                                        className="flex items-center gap-2 p-2.5 rounded-md bg-muted/30 border border-border/20"
                                    >
                                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                                        <span className="text-foreground font-medium">{orderDetails?.gear?.title}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Order Status & Progress Timeline */}
                        <Card className="border-border/60">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-base font-semibold flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-primary" /> Rental Progress
                                </CardTitle>
                            </CardHeader>

                            <CardContent className="space-y-3 text-xs">
                                <div className="flex justify-between text-muted-foreground">
                                    <span>{orderDetails?.status}</span>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Handover & Pickup Address Card */}
                        <Card className="border-border/60">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-base font-semibold flex items-center gap-2">
                                    <MapPin className="w-4 h-4 text-primary" /> Pickup Location & Verification
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="p-4 rounded-lg border bg-muted/20 space-y-2">
                                    <p className="text-xs font-semibold text-foreground">
                                        {orderDetails?.provider?.name}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        {orderDetails?.provider?.address}
                                    </p>
                                    <div className="pt-2 flex items-center gap-3">
                                        <Button variant="outline" size="sm" className="text-xs h-7">
                                            <ExternalLink className="w-3 h-3 mr-1" /> Open in Maps
                                        </Button>
                                        <Button variant="ghost" size="sm" className="text-xs h-7 text-muted-foreground">
                                            <Phone className="w-3 h-3 mr-1" /> Call Provider
                                        </Button>
                                    </div>
                                </div>

                                <div className="p-3 rounded-lg border border-amber-500/20 bg-amber-500/5 flex items-start gap-3">
                                    <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                                    <p className="text-xs text-amber-700 dark:text-amber-300">
                                        <strong>Handover Notice:</strong> Please present a valid government-issued photo ID upon pickup. A physical condition checklist must be signed with the provider prior to taking possession of the equipment.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                    </div>

                    {/* Right Column - Payment & Provider Details */}
                    <div className="space-y-6">

                        {/* Provider Profile Card */}
                        <Card className="border-border/60">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">
                                    Gear Provider
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <Avatar className="w-11 h-11 border">
                                        <AvatarImage src={orderDetails?.provider?.image} />
                                        <AvatarFallback>
                                            {orderDetails?.provider?.name
                                                ?.split(" ")
                                                .map((n: string) => n[0])
                                                .join("")
                                                .slice(0, 2)}

                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div className="flex items-center gap-1.5">
                                            <h3 className="text-sm font-bold text-foreground">
                                                {orderDetails?.provider?.name}
                                            </h3>
                                            <ShieldCheck className="w-4 h-4 text-primary" />
                                        </div>
                                    </div>
                                </div>

                                <Separator />

                                <div className="grid grid-cols-2 gap-2">
                                    <Button variant="outline" size="sm" className="w-full text-xs">
                                        <MessageSquare className="w-3.5 h-3.5 mr-1.5" /> Message
                                    </Button>
                                    <Button variant="outline" size="sm" className="w-full text-xs">
                                        <User className="w-3.5 h-3.5 mr-1.5" /> Profile
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Pricing Summary */}
                        <Card className="border-border/60">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-base font-semibold flex items-center gap-2">
                                    <CreditCard className="w-4 h-4 text-primary" /> Payment Summary
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3 text-xs">
                                <div className="flex justify-between text-muted-foreground">
                                    <span>{orderDetails?.totalDays} {orderDetails?.totalDays > 1 ? "Days" : "Day"}</span>
                                </div>
                                <Separator />
                                <div className="flex justify-between text-sm font-bold text-foreground pt-1">
                                    <span>Total Paid</span>
                                    <span className="text-primary">${orderDetails?.payment?.amount}</span>
                                </div>
                                <div className="p-2.5 rounded bg-muted/40 text-[11px] text-muted-foreground flex items-center justify-between border">
                                    <span>Paid via {orderDetails?.payment?.method}</span>
                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Rental Policy & Help Quick Card */}
                        <Card className="border-border/60">
                            <CardContent className="pt-6 space-y-3 text-xs">
                                <div className="flex items-center gap-2 text-muted-foreground font-semibold">
                                    <Info className="w-4 h-4 text-primary" /> Need Help or Cancellation?
                                </div>
                                <p className="text-muted-foreground text-[11px] leading-relaxed">
                                    Free cancellation is available up to 24 hours prior to pickup time. Review our rental terms or contact support for assistance.
                                </p>
                                <div className="flex flex-col gap-2 pt-1">
                                    <Button variant="ghost" size="sm" className="justify-between text-xs h-8 text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/20">
                                        Request Booking Cancellation <span>→</span>
                                    </Button>
                                    <Button variant="ghost" size="sm" className="justify-between text-xs h-8 text-muted-foreground">
                                        Rental Policy & Safety FAQs <span>→</span>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                    </div>

                </div>
            </main>
        </div>
    );
}