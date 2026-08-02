"use client"

import { CreditCard, Lock, ShieldCheck } from 'lucide-react';
import { IRentalOrder } from '../customer.interfaces';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { checkoutRentalOrder } from '../customer.actions';
import { toast } from 'sonner';

const PaymentSection = ({ data, formattedRentalStart, formattedRentalEnd }: { data: IRentalOrder, formattedRentalStart: string, formattedRentalEnd: string }) => {

    const [isLoading, setIsLoading] = useState(false);

    const handlePayment = async () => {
        try {
            setIsLoading(true);

            const result = await checkoutRentalOrder(data?.id);

            if (!result?.success) {
                toast.error(result?.message)
                return;
            }

            window.location.assign(result.data.checkoutUrl);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Card className="border-border/70 shadow-sm">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                    <CreditCard className="w-5 h-5 text-primary" />
                    Payment Summary
                </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">

                {/* Order Summary */}

                <div className="space-y-3 text-sm">

                    <div className="flex justify-between">
                        <span className="text-muted-foreground">
                            Gear
                        </span>

                        <span className="font-medium text-right">
                            {data?.gear?.title}
                        </span>
                    </div>

                    <div className="flex justify-between">
                        <span className="text-muted-foreground">
                            Rental Duration
                        </span>

                        <span className="font-medium">
                            {data?.totalDays} {data?.totalDays > 1 ? "Days" : "Day"}
                        </span>
                    </div>

                    <div className="flex justify-between">
                        <span className="text-muted-foreground">
                            Pickup Date
                        </span>

                        <span>
                            {
                                formattedRentalStart
                            }
                        </span>
                    </div>

                    <div className="flex justify-between">
                        <span className="text-muted-foreground">
                            Return Date
                        </span>

                        <span>
                            {formattedRentalEnd}
                        </span>
                    </div>

                </div>

                <Separator />

                {/* Total */}

                <div className="flex items-center justify-between">

                    <span className="text-base font-semibold">
                        Total
                    </span>

                    <span className="text-2xl font-bold text-primary">
                        ${data?.totalAmount}
                    </span>

                </div>

                {/* Security Notice */}

                <div className="rounded-xl border bg-muted/40 p-4 space-y-3">

                    <div className="flex items-center gap-2 font-semibold">

                        <ShieldCheck className="w-4 h-4 text-emerald-500" />

                        Secure Checkout

                    </div>

                    <p className="text-xs text-muted-foreground leading-relaxed">
                        Payments are securely processed by Stripe.
                        You'll be redirected to Stripe's secure
                        checkout page to complete your payment.
                        We never store your card information.
                    </p>

                    <div className="flex flex-wrap gap-2 text-[11px] text-muted-foreground">

                        <span className="rounded-full border px-2 py-1">
                            Visa
                        </span>

                        <span className="rounded-full border px-2 py-1">
                            Mastercard
                        </span>

                        <span className="rounded-full border px-2 py-1">
                            Apple Pay
                        </span>

                        <span className="rounded-full border px-2 py-1">
                            Google Pay
                        </span>

                        <span className="rounded-full border px-2 py-1">
                            Link
                        </span>

                    </div>

                </div>

                {/* Pay Button */}

                <Button
                    disabled={isLoading}
                    className="cursor-pointer w-full h-11 font-semibold"
                    onClick={handlePayment}
                >
                    <Lock className="mr-2 h-4 w-4" />
                    {isLoading
                        ? "Redirecting..."
                        : "Pay Securely"}
                </Button>

            </CardContent>
        </Card>
    );
};

export default PaymentSection;