"use client"

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { TableCell, TableRow } from '@/components/ui/table';
import { Edit3, Eye, MoreVertical, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { IGearResponse } from '../provider.types';
import Swal from 'sweetalert2';
import { removeMyGear } from '../provider.actions';
import { toast } from 'sonner';

const GearRow = ({ gear }: { gear: IGearResponse }) => {

    const removeGear = async (gearId: string) => {

        const result = await Swal.fire({
            title: "Delete this gear?",
            text: "This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it",
            cancelButtonText: "Cancel",
            confirmButtonColor: "#dc2626",
            reverseButtons: true,
            focusCancel: true,
        })

        if (result?.isConfirmed) {
            const result = await removeMyGear(gearId)

            if (result?.success) {
                toast.success(result?.message)
            }
            else {
                toast.error(result?.message)
            }
        }

    };

    return (
        <TableRow key={gear?.id} className="hover:bg-muted/20 transition-colors">
            <TableCell>
                <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-lg border border-border bg-muted overflow-hidden shrink-0">
                        {gear?.images?.[0] &&
                            <Image
                                unoptimized
                                fill
                                sizes="48px"
                                src={gear?.images[0]}
                                alt="Sony FX3 Cinema Camera"
                                className="w-full h-full object-cover"
                            />
                        }
                    </div>
                    <div>
                        <h4 className="font-semibold text-sm text-foreground line-clamp-1">{gear?.title}</h4>
                        <p className="text-xs text-muted-foreground font-mono">ID: GEAR-{gear?.id?.slice(0, 4).toUpperCase()}</p>
                    </div>
                </div>
            </TableCell>
            <TableCell className="text-xs font-medium text-foreground">{gear?.category?.name}</TableCell>
            <TableCell className="text-xs font-bold text-foreground">${gear?.pricePerDay}</TableCell>
            <TableCell>
                <div className="text-xs space-y-0.5">
                    <span className="font-medium text-foreground">{gear?.availableQuantity} / {gear?.quantity}
                        Available</span>
                    <p className="text-[11px] text-muted-foreground">{gear?.status === "APPROVED" && "Ready for pickup"}</p>
                </div>
            </TableCell>
            <TableCell>
                <Badge className="bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 border-emerald-500/20 font-medium text-[11px]">
                    {gear?.status}
                </Badge>
            </TableCell>
            <TableCell className="text-right">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="cursor-pointer h-8 w-8">
                            <MoreVertical className="w-4 h-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40">
                        <Link href={`/dashboard/provider/gears/${gear?.id}/edit`}>
                            <DropdownMenuItem className="text-xs gap-2 cursor-pointer">
                                <Edit3 className="w-3.5 h-3.5 " /> Edit Details
                            </DropdownMenuItem>
                        </Link>
                        <Link href={`/gears/${gear?.id}`}>
                            <DropdownMenuItem className="cursor-pointer text-xs gap-2">
                                <Eye className="w-3.5 h-3.5" /> View Listing
                            </DropdownMenuItem>
                        </Link >
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => removeGear(gear?.id)} className="cursor-pointer text-xs gap-2 text-destructive focus:text-destructive">
                            <Trash2 className="w-3.5 h-3.5" /> Delete Gear
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </TableCell>
        </TableRow >
    );
};

export default GearRow;