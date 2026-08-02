"use client"

import { IGearResponse } from '@/app/(dashboard)/dashboard/provider/provider.types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { zodResolver } from '@hookform/resolvers/zod';
import { Info } from 'lucide-react';
import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { CreateRentalFormValues, createRentalSchema } from '../marketing.schemas';
import { createRentalOrder } from '@/app/(dashboard)/dashboard/customer/customer.actions';
import { toast } from 'sonner';

const CreateRentalForm = ({ data }: { data: IGearResponse }) => {

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting }
    } = useForm({
        resolver: zodResolver(createRentalSchema),
        defaultValues: {
            gearId: data?.id,
            quantity: 1,
            rentalStartDate: "2026-08-01",
            rentalEndDate: "2026-08-04",
            pickupAddress: "",
            notes: "",
        },
    })

    const rentalStartDate = watch("rentalStartDate")
    const rentalEndDate = watch("rentalEndDate")
    const quantity = watch("quantity") as number

    const rentalDays = useMemo(() => {
        if (!rentalStartDate || !rentalEndDate) return 0
        const start = new Date(rentalStartDate).getTime()
        const end = new Date(rentalEndDate).getTime()
        const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24))
        return days > 0 ? days : 0
    }, [rentalStartDate, rentalEndDate])

    const subtotal = data?.pricePerDay * rentalDays * quantity;
    const serviceFee = subtotal * 0.10;
    const grandTotal = subtotal + serviceFee;

    const onSubmit = async (values: CreateRentalFormValues) => {

        const { rentalStartDate, rentalEndDate } = values

        const result = await createRentalOrder({
            ...values,
            rentalStartDate: new Date(rentalStartDate).toISOString(),
            rentalEndDate: new Date(rentalEndDate).toISOString(),
        })

        if (result?.success) {
            toast.success(result?.message)
        } else {
            toast.error(result?.message)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Dates Section */}
            <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                    <Label htmlFor="start-date" className="text-xs font-semibold text-muted-foreground">
                        Start Date
                    </Label>
                    <Input
                        id="start-date"
                        type="date"
                        {...register("rentalStartDate")}
                        className="text-xs h-10 border-border/80"
                    />
                    {errors.rentalStartDate && <p className="text-xs text-destructive">{errors.rentalStartDate.message}</p>}
                </div>
                <div className="space-y-1.5">
                    <Label htmlFor="end-date" className="text-xs font-semibold text-muted-foreground">
                        End Date
                    </Label>
                    <Input
                        id="end-date"
                        type="date"
                        {...register("rentalEndDate")}
                        className="text-xs h-10 border-border/80"
                    />
                    {errors.rentalEndDate && <p className="text-xs text-destructive">{errors.rentalEndDate.message}</p>}
                </div>
            </div>
            {/* Quantity Selector */}
            <div className="space-y-1.5">
                <Label htmlFor="quantity" className="text-xs font-semibold text-muted-foreground">
                    Quantity
                </Label>
                <Input
                    id="quantity"
                    type="number"
                    min={1}
                    max={data?.availableQuantity}
                    {...register("quantity",
                        { valueAsNumber: true }
                    )}
                    className="text-xs h-10 border-border/80"
                />
                {errors.quantity && <p className="text-xs text-destructive">{errors.quantity.message}</p>}
            </div>
            {/* Pickup Location / Address */}
            <div className="space-y-1.5">
                <Label htmlFor="pickupAddress" className="text-xs font-semibold text-muted-foreground">
                    Pickup Location / Address
                </Label>
                <Input
                    id="pickupAddress"
                    type="text"
                    placeholder="Enter pickup address or hub location"
                    {...register("pickupAddress")}
                    className="text-xs h-10 border-border/80"
                />
                {errors.pickupAddress && <p className="text-xs text-destructive">{errors.pickupAddress.message}</p>}
            </div>
            {/* Notes / Special Instructions */}
            <div className="space-y-1.5">
                <Label htmlFor="notes" className="text-xs font-semibold text-muted-foreground">
                    Special Instructions (Optional)
                </Label>
                <Input
                    id="notes"
                    type="text"
                    placeholder="Any details for the host..."
                    {...register("notes")}
                    className="text-xs h-10 border-border/80"
                />
                {errors.notes && <p className="text-xs text-destructive">{errors.notes.message}</p>}
            </div>
            {/* Dynamic Price Breakdown */}
            <div className="space-y-2.5 pt-2 text-xs sm:text-sm">
                <div className="flex justify-between text-muted-foreground">
                    <span>${data?.pricePerDay} × {rentalDays} days ({quantity}x)</span>
                    <span className="font-semibold text-foreground">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                    <span className="flex items-center gap-1">
                        Service Fee <Info className="w-3.5 h-3.5 text-slate-400" />
                    </span>
                    <span className="font-semibold text-foreground">${serviceFee.toFixed(2)}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between text-base font-extrabold text-foreground">
                    <span>Total</span>
                    <span>${grandTotal.toFixed(2)}</span>
                </div>
            </div>
            {/* Submit Action Button */}
            <Button
                type="submit"
                disabled={rentalDays <= 0 || isSubmitting}
                className="cursor-pointer w-full h-12 text-base font-bold shadow-md gap-2 mt-4"
                size="lg"
            >
                {isSubmitting ? "Requesting..." : "Reserve & Request Rental"}
            </Button>
        </form>
    );
};

export default CreateRentalForm;