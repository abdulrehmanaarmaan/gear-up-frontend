"use client"

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { TableCell } from '@/components/ui/table';
import { Eye, FileText, MapPin, MessageSquare, MoreVertical, Star } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { IRentalOrder } from '../customer.interfaces';
import { useReviewModal } from '../context/ReviewModalContext';

const OrderActions = ({ order }: { order: IRentalOrder }) => {

    const { openReviewModal } = useReviewModal()

    return (
        <TableCell className="text-right">
            <div className="flex items-center justify-end gap-2">
                {order?.status === "PICKED_UP" && (
                    <Button size="sm" variant="outline" className="h-8 text-xs font-bold text-amber-600 border-amber-500/30 hover:bg-amber-500/10">
                        Return Info
                    </Button>
                )}
                {order?.status === "RETURNED" &&
                    <Button
                        size="sm"
                        variant="outline"
                        className="cursor-pointer h-8 text-xs font-medium gap-1"
                        onClick={() => openReviewModal(order)}
                    >
                        <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" /> Review
                    </Button>
                }
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="cursor-pointer h-8 w-8 text-muted-foreground hover:text-foreground">
                            <MoreVertical className="w-4 h-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuLabel className="text-xs">Booking Options</DropdownMenuLabel>
                        <DropdownMenuItem asChild className="cursor-pointer text-xs font-semibold text-primary focus:text-primary">
                            {
                                order?.status === "CONFIRMED" ?
                                    <Link href={`/dashboard/customer/rental-orders/${order?.id}/payment`}>
                                        Pay Now
                                    </Link>
                                    :
                                    <Link href={`/dashboard/customer/rental-orders/${order?.id}`}>
                                        <Eye className="w-3.5 h-3.5 mr-2 text-primary" /> View Order Details
                                    </Link>
                            }
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer text-xs">
                            <FileText className="w-3.5 h-3.5 mr-2" /> Download Receipt
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer text-xs">
                            <MessageSquare className="w-3.5 h-3.5 mr-2" /> Message Provider
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer text-xs">
                            <MapPin className="w-3.5 h-3.5 mr-2" /> Get Pickup Location
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {order?.status === "CONFIRMED" && (
                            <DropdownMenuItem className="cursor-pointer text-xs text-rose-600 font-semibold">
                                Cancel Reservation
                            </DropdownMenuItem>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </TableCell>
    );
};

export default OrderActions;