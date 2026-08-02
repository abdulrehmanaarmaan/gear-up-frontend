"use client"

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { TableCell, TableRow } from '@/components/ui/table';
import { Check, Mail, MessageSquare, MoreVertical, PackageCheck, Phone, Truck } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { IRentalOrder } from '../../customer/customer.interfaces';
import { useUpdateOrderStatus } from '../hooks/useUpdateOrderStatus';

const OrderRow = ({ order }: { order: IRentalOrder }) => {

    const { handleOrderStatus } = useUpdateOrderStatus()

    return (
        <TableRow key={order?.id} className="border-border/60 hover:bg-muted/20 transition-colors">
            {/* Order ID & Date Created */}
            <TableCell className="py-3">
                <div className="flex flex-col">
                    <span className="font-mono text-xs font-bold text-foreground">#{order?.id?.slice(0, 8)}</span>
                    <span className="text-[10px] text-muted-foreground">
                        {new Date(order?.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </span>
                </div>
            </TableCell>
            {/* Gear Item Details */}
            <TableCell>
                <div className="flex items-center gap-3">
                    <div className="relative h-10 w-12 rounded bg-muted border border-border/80 overflow-hidden shrink-0">
                        {order?.gear?.images[0] && <Image
                            unoptimized src={order?.gear?.images[0]}
                            alt={order?.gear?.title} fill
                            className="object-cover" />
                        }
                    </div>
                    <div className="flex flex-col min-w-0">
                        <Link href={`/gear/${order?.gear?.slug}`} target="_blank" className="text-xs font-bold text-foreground hover:text-primary transition-colors line-clamp-1">
                            {order?.gear?.title}
                        </Link>
                        <span className="text-[11px] text-muted-foreground">Qty: {order?.quantity} unit(s)</span>
                    </div>
                </div>
            </TableCell>
            {/* Customer Contact Info */}
            <TableCell>
                <div className="flex items-center gap-2">
                    <Avatar className="h-7 w-7 border border-primary/20">
                        <AvatarImage src={order?.customer?.image} alt={order?.customer?.name} />
                        <AvatarFallback>{order?.customer?.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col min-w-0 text-xs">
                        <span className="font-semibold text-foreground truncate">{order?.customer?.name}</span>
                        <div className="flex items-center gap-2 text-muted-foreground text-[10px]">
                            <a href={`tel:${order?.customer?.phone}`} className="hover:text-primary transition-colors flex items-center gap-0.5">
                                <Phone className="w-2.5 h-2.5" /> {order?.customer?.phone}
                            </a>
                        </div>
                    </div>
                </div>
            </TableCell>
            {/* Rental Dates & Days */}
            <TableCell>
                <div className="flex flex-col text-xs">
                    <span className="font-medium text-foreground">
                        {new Date(order?.rentalStartDate).toLocaleDateString("en-US", {
                            month: "short", day:
                                "numeric"
                        })} - {new Date(order?.rentalEndDate).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric"
                        })}
                    </span>
                    <span className="text-[11px] text-muted-foreground font-mono">{order?.totalDays} Days (${order?.pricePerDay}/d)</span>
                </div>
            </TableCell>
            {/* Provider Payout */}
            <TableCell>
                <div className="flex flex-col text-xs">
                    <span className="font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                        ${order?.totalAmount}
                    </span>
                    <span className="text-[10px] text-muted-foreground">Net after 15% fee</span>
                </div>
            </TableCell>
            {/* Status Badge */}
            <TableCell>
                <Badge
                    variant="secondary"
                    className={`text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 border-none ${order?.status
                        === "ACTIVE"
                        ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                        : order?.status === "RETURNED"
                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                            : order?.status === "CONFIRMED"
                                ? "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                                : order?.status === "PLACED"
                                    ? "bg-purple-500/10 text-purple-600 dark:text-purple-400"
                                    : "bg-rose-500/10 text-rose-600 dark:text-rose-400"
                        }`}
                >
                    {order?.status === "PLACED" ? "NEEDS CONFIRMATION" : order?.status}
                </Badge>
            </TableCell>
            {/* Primary Action Button Contextually Driven */}
            <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                    {/* Action for PLACED -> Confirm Booking */}
                    {order?.status === "PLACED" && (
                        <Button onClick={() => handleOrderStatus(order?.id, "CONFIRMED")} size="sm" className="cursor-pointer h-8 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs gap-1">
                            <Check className="w-3.5 h-3.5" /> Confirm Order
                        </Button>
                    )}
                    {/* Action for APPROVED -> Handover to Customer */}
                    {order?.status === "PAID" && (
                        <Button onClick={() => handleOrderStatus(order?.id, "PICKED_UP")} size="sm" className="cursor-pointer h-8 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs gap-1">
                            <Truck className="w-3.5 h-3.5" /> Mark Picked Up
                        </Button>
                    )}
                    {/* Action for ACTIVE -> Confirm Return */}
                    {order?.status === "PICKED_UP" && (
                        <Button onClick={() => handleOrderStatus(order?.id, "RETURNED")} size="sm" className="cursor-pointer h-8 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs gap-1">
                            <PackageCheck className="w-3.5 h-3.5" /> Mark Returned
                        </Button>
                    )}
                    {/* Options Dropdown */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                                <MoreVertical className="w-4 h-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuLabel className="text-xs">Order Management</DropdownMenuLabel>
                            <DropdownMenuItem className="cursor-pointer text-xs">
                                <Mail className="w-3.5 h-3.5 mr-2" /> Message Customer
                            </DropdownMenuItem>
                            {order?.notes && (
                                <DropdownMenuItem className="cursor-pointer text-xs italic text-muted-foreground">
                                    <MessageSquare className="w-3.5 h-3.5 mr-2" /> View Notes
                                </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                            {order?.status === "PLACED" && (
                                <DropdownMenuItem className="cursor-pointer text-xs text-rose-600 font-semibold">
                                    Decline Order
                                </DropdownMenuItem>
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </TableCell>
        </TableRow>
    )
}

export default OrderRow;