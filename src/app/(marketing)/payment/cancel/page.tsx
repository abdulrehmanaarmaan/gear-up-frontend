import * as React from "react";
import Link from "next/link";
import {
    XCircle,
    RotateCcw,
    ArrowLeft,
    HelpCircle,
    ShieldAlert,
    CreditCard,
    Clock,
} from "lucide-react";

// shadcn/ui component imports
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function PaymentCancel() {
    return (
        <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
            <div className="max-w-xl w-full space-y-8">

                {/* CANCELLED HEADER BADGE */}
                <div className="text-center space-y-3">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 ring-8 ring-rose-500/5">
                        <XCircle className="w-10 h-10" />
                    </div>
                    <Badge variant="outline" className="border-rose-500/40 text-rose-600 dark:text-rose-400 bg-rose-500/5 font-semibold text-xs px-3 py-1">
                        Checkout Unsuccessful or Cancelled
                    </Badge>
                    <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
                        Payment Was Not Processed
                    </h1>
                    <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto">
                        You canceled the checkout process, or your payment method was declined. No charges have been made to your account.
                    </p>
                </div>

                {/* CANCEL DETAILS CARD */}
                <Card className="border-border/80 bg-card shadow-lg overflow-hidden">
                    <CardHeader className="bg-muted/40 border-b border-border/60 p-4 sm:p-6">
                        <CardTitle className="text-base font-bold text-foreground">What happens now?</CardTitle>
                    </CardHeader>

                    <CardContent className="p-4 sm:p-6 space-y-4">

                        {/* Status Item 1: No Charges */}
                        <div className="flex items-start gap-3">
                            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5">
                                <ShieldAlert className="w-4 h-4" />
                            </div>
                            <div className="text-xs">
                                <strong className="font-bold text-foreground block">Your card was not charged</strong>
                                <p className="text-muted-foreground mt-0.5">Any temporary authorization hold placed during checkout will automatically expire within a few hours.</p>
                            </div>
                        </div>

                        <Separator className="bg-border/60" />

                        {/* Status Item 2: Saved Cart */}
                        <div className="flex items-start gap-3">
                            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5">
                                <Clock className="w-4 h-4" />
                            </div>
                            <div className="text-xs">
                                <strong className="font-bold text-foreground block">Your gear dates are held temporarily</strong>
                                <p className="text-muted-foreground mt-0.5">The selected rental dates remain saved in your cart for the next 30 minutes before being released to other adventurers.</p>
                            </div>
                        </div>

                        <Separator className="bg-border/60" />

                        {/* Status Item 3: Alternative Payments */}
                        <div className="flex items-start gap-3">
                            <div className="p-2 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5">
                                <CreditCard className="w-4 h-4" />
                            </div>
                            <div className="text-xs">
                                <strong className="font-bold text-foreground block">Try another payment method</strong>
                                <p className="text-muted-foreground mt-0.5">You can complete your reservation using Visa, Mastercard, American Express, or Apple Pay.</p>
                            </div>
                        </div>

                    </CardContent>

                    {/* CARD FOOTER ACTIONS */}
                    <CardFooter className="bg-muted/30 border-t border-border/60 p-4 sm:p-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                        <Button variant="outline" asChild className="w-full sm:w-auto text-xs h-9 border-border/80">
                            <Link href="/gears">
                                <ArrowLeft className="w-3.5 h-3.5 mr-1.5" /> Continue Browsing
                            </Link>
                        </Button>
                        <Button asChild className="w-full sm:w-auto text-xs h-9 font-bold bg-primary text-primary-foreground">
                            <Link href="/cart">
                                <RotateCcw className="w-3.5 h-3.5 mr-1.5" /> Retry Checkout Now
                            </Link>
                        </Button>
                    </CardFooter>
                </Card>

                {/* SUPPORT HELP LINK */}
                <div className="text-center text-xs text-muted-foreground flex items-center justify-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5" /> Encountering payment errors? <Link href="/support" className="text-primary hover:underline font-semibold">Contact GearUp Customer Support</Link>
                </div>

            </div>
        </div>
    );
}