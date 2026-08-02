"use client"
import { IUserAccount } from '@/app/(auth)/auth.types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import { sidebarMenuItems } from '../config/sidebarMenuItems';

interface IMyAccount {
    success: boolean
    statusCode: number
    message: string
    data?: {
        id: string
        name: string
        email: string
        phone: string | null
        image: string | null
        role: string
        status: string
        isVerified: boolean
        address: string | null
        city: string | null
        country: string | null
        createdAt: string
        updatedAt: string
    }
}

const SidebarContent = ({ myAccount }: { myAccount: IMyAccount }) => {

    const { role } = myAccount?.data || {}

    const dashboardMenuItems = sidebarMenuItems[role as keyof typeof sidebarMenuItems]


    const pathname = usePathname();
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    return (
        <div className="flex flex-col h-full bg-card border-r border-border/80">
            {/* Navigation Links */}
            <div className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
                <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                    Manage Account
                </p>
                {dashboardMenuItems?.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setIsMobileOpen(false)}
                            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${isActive
                                ? "bg-primary text-primary-foreground shadow-sm"
                                : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                                }`}
                        >
                            <Icon className={`w-4 h-4 ${isActive ? "text-primary-foreground" :
                                "text-muted-foreground"}`} />
                            {item.label}
                        </Link>
                    );
                })}
            </div>
            {/* Footer Quick Return / Public Site Link */}
            <div className="p-4 border-t border-border/60 bg-muted/20">
                <Link href="/gear">
                    <Button variant="outline" size="sm" className="w-full justify-between text-xs border-border/80 text-muted-foreground hover:text-foreground">
                        Browse Marketplace <ExternalLink className="w-3.5 h-3.5" />
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default SidebarContent;