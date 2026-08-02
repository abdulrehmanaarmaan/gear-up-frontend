"use client"

import { IUserAccount } from '@/app/(auth)/auth.types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { TableCell, TableRow } from '@/components/ui/table';
import { AlertCircle, Ban, CheckCircle2, MoreVertical } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { useUpdateAccountStatus } from '../hooks/useUpdateAccountStatus';

const UserRow = ({ usr }: { usr: IUserAccount }) => {

    const { handleAccountStatus } = useUpdateAccountStatus()

    return (
        <TableRow key={usr?.id} className="border-border/60 hover:bg-muted/20 transition-colors">
            {/* User Profile Cell */}
            <TableCell className="py-3">
                <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9 border border-primary/20">
                        <AvatarImage src={usr?.image} alt={usr?.name} />
                        <AvatarFallback>{usr?.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col min-w-0">
                        <span className="text-sm font-bold text-foreground truncate">{usr?.name}</span>
                        <span className="text-xs text-muted-foreground truncate">{usr?.email}</span>
                    </div>
                </div>
            </TableCell>
            {/* Role Cell */}
            <TableCell>
                <Badge
                    variant="outline"
                    className={`text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 ${usr.role === "ADMIN"
                        ? "border-purple-500/40 text-purple-600 bg-purple-500/10"
                        : usr?.role === "HOST"
                            ? "border-primary/40 text-primary bg-primary/10"
                            : "border-slate-500/40 text-slate-600 bg-slate-500/10"
                        }`}
                >
                    {usr?.role}
                </Badge>
            </TableCell>
            {/* Status Cell */}
            <TableCell>
                <Badge
                    variant="secondary"
                    className={`text-[11px] font-medium border-none px-2 py-0.5 ${usr?.status === "ACTIVE"
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                        : "bg-rose-500/10 text-rose-600 dark:text-rose-400"
                        }`}
                >
                    {usr?.status === "ACTIVE" ? "Active" : "Suspended"}
                </Badge>
            </TableCell>
            {/* Verification Cell */}
            <TableCell>
                {usr?.isVerified ? (
                    <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                    </span>
                ) : (
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <AlertCircle className="w-3.5 h-3.5" /> Unverified
                    </span>
                )}
            </TableCell>
            {/* Activity Stats Cell */}
            <TableCell className="text-xs text-muted-foreground">
                <p className="font-medium text-foreground">{usr?.role === "CUSTOMER" ? usr?.customerOrders?.length :
                    usr?.providerOrders?.length} Rentals</p>
                {usr?.role === "HOST" && (
                    <p className="text-[11px] text-muted-foreground">{usr?.gearItems?.length} Listings</p>
                )}
            </TableCell>
            {/* Joined Date Cell */}
            <TableCell className="text-xs text-muted-foreground font-mono">
                {usr?.createdAt}
            </TableCell>
            {/* Action Menu Cell */}
            <TableCell className="text-right">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="cursor-pointer h-8 w-8 text-muted-foreground hover:text-foreground">
                            <MoreVertical className="w-4 h-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuLabel className="text-xs">User Actions</DropdownMenuLabel>
                        <DropdownMenuItem asChild className="cursor-pointer text-xs">
                            <Link href={`/dashboard/admin/users/${usr?.id}`}>View Profile & History</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer text-xs">
                            Contact User
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {usr?.status === "ACTIVE" ? (
                            <DropdownMenuItem onClick={() => handleAccountStatus(usr?.id as string, "SUSPENDED")} className="cursor-pointer text-xs text-rose-600 dark:text-rose-400 font-semibold">
                                <Ban className="w-3.5 h-3.5 mr-2" /> Suspend Account
                            </DropdownMenuItem>
                        ) : (
                            <DropdownMenuItem onClick={() => handleAccountStatus(usr?.id as string, "ACTIVE")} className="cursor-pointer text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                                <CheckCircle2 className="w-3.5 h-3.5 mr-2" /> Restore Account
                            </DropdownMenuItem>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
            </TableCell>
        </TableRow>
    );
};

export default UserRow;