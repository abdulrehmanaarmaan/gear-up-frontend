"use client"

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check, PackageCheck, Truck } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { IRentalOrder } from '../../customer/customer.interfaces';
import { useUpdateOrderStatus } from '../hooks/useUpdateOrderStatus';

const OrderCard = ({ order }: { order: IRentalOrder }) => {

    const { handleOrderStatus } = useUpdateOrderStatus()

    return (
        <div key={order?.id} className="p-4 space-y-3">
            <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-primary">#{order?.id?.slice(0, 8)}</span>
                <Badge
                    variant="secondary"
                    className={`text-[10px] font-bold uppercase border-none px-2 py-0.5 ${order?.status === "PICKED_UP"
                        ? "bg-amber-500/10 text-amber-600"
                        : order?.status === "RETURNED"
                            ? "bg-emerald-500/10 text-emerald-600"
                            : "bg-purple-500/10 text-purple-600"
                        }`}
                >
                    {order?.status}
                </Badge>
            </div>
            <div className="flex gap-3 items-center">
                <div className="relative h-12 w-14 rounded bg-muted border border-border/80 overflow-hidden shrink-0">
                    {order?.gear?.images[0] &&
                        < Image unoptimized
                            src={order?.gear?.images[0]}
                            alt={order?.gear?.title} fill className="object-cover" />
                    }
                </div>
                <div className="min-w-0 flex-1">
                    <h3 className="text-xs font-bold text-foreground line-clamp-1">{order?.gear?.title}</h3>
                    <p className="text-[11px] text-muted-foreground">{order?.totalDays} days • Net Payout: <strong
                        className="text-emerald-600">${order?.totalAmount}</strong></p>
                </div>
            </div>
            <div className="flex flex-col gap-1 text-xs text-muted-foreground pt-1">
                <div className="flex justify-between items-center">
                    <span>Customer: <strong className="text-foreground">{order?.customer?.name}</strong></span>
                    <a href={`tel:${order?.customer?.phone}`} className="text-primary font-mono text-[11px]">{order?.customer?.
                        phone}</a>
                </div>
                {order.notes && (
                    <p className="text-[11px] bg-muted/40 p-2 rounded border border-border/60 italic text-foreground mt-1">
                        "{order?.notes}"
                    </p>
                )}
            </div>
            <div className="pt-2 flex justify-end">
                {order?.status === "PLACED" && (
                    <Button onClick={() => handleOrderStatus(order?.id, "CONFIRMED")} size="sm" className="cursor-pointer w-full bg-purple-600 text-white font-bold text-xs">
                        <Check className="w-3.5 h-3.5 mr-1" /> Confirm Booking Order
                    </Button>
                )}
                {order?.status === "PAID" && (
                    <Button onClick={() => handleOrderStatus(order?.id, "PICKED_UP")} size="sm" className="cursor-pointer w-full bg-blue-600 text-white font-bold text-xs">
                        <Truck className="w-3.5 h-3.5 mr-1" /> Mark Picked Up
                    </Button>
                )}
                {order?.status === "PICKED_UP" && (
                    <Button onClick={() => handleOrderStatus(order?.id, "RETURNED")} size="sm" className="cursor-pointer w-full bg-emerald-600 text-white font-bold text-xs">
                        <PackageCheck className="w-3.5 h-3.5 mr-1" /> Mark Returned
                    </Button>
                )}
            </div>
        </div>
    );
};

export default OrderCard;