"use client"

import { IUserAccount } from '@/app/(auth)/auth.types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreVertical } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { useUpdateAccountStatus } from '../hooks/useUpdateAccountStatus';

const UserCard = ({ usr }: { usr: IUserAccount }) => {

    const { handleAccountStatus } = useUpdateAccountStatus()

    return (
        <div key={usr?.id} className="p-4 space-y-3">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border border-primary/20">
                        <AvatarImage src={usr?.image} alt={usr?.name} />
                        <AvatarFallback>{usr?.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                        <h3 className="text-sm font-bold text-foreground">{usr?.name}</h3>
                        <p className="text-xs text-muted-foreground">{usr?.email}</p>
                    </div>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                            <MoreVertical className="w-4 h-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild className="text-xs">
                            <Link href={`/dashboard/admin/users/${usr?.id}`}>View Profile</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleAccountStatus(usr?.id as string, "SUSPENDED")} className="text-xs text-rose-600">
                            Suspend Account
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="flex items-center justify-between pt-1 text-xs">
                <div className="flex items-center gap-2">
                    <Badge
                        variant="outline"
                        className="text-[10px] uppercase font-bold px-2 py-0.5 border-primary/40 text-primary bg-primary/10"
                    >
                        {usr?.role}
                    </Badge>
                    <Badge
                        variant="secondary"
                        className={`text-[10px] font-medium border-none px-2 py-0.5 ${usr?.status === "ACTIVE"
                            ? "bg-emerald-500/10 text-emerald-600"
                            : "bg-rose-500/10 text-rose-600"
                            }`}
                    >
                        {usr?.status}
                    </Badge>
                </div>
                <span className="text-muted-foreground font-mono">{usr?.createdAt}</span>
            </div>
        </div>
    );
};

export default UserCard;