"use client"

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RotateCcw, Search } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const UserToolbar = () => {

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const searchQuery = searchParams.get("search") || "";

    const updateSearchParams = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }

        // whenever filters change,
        // go back to page 1
        params.set("page", "1");

        router.push(`${pathname}?${params.toString()}`);
    };

    return (
        <Card className="border-border/80 bg-card shadow-sm">
            <CardContent className="p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
                {/* Search Bar */}
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                        type="text"
                        placeholder="Search by name, email, or user ID..."
                        value={searchQuery}
                        onChange={(e) =>
                            updateSearchParams("search", e.target.value)
                        }
                        className="pl-9 h-10 text-xs bg-background border-border/80 rounded-lg focus-visible:ring-1 focus-visible:ring-primary"
                    />
                </div>
                <div className="flex flex-wrap items-center gap-3">
                    {/* Role Filter */}
                    <Select
                    // value={roleFilter} onValueChange={setRoleFilter}
                    >
                        <SelectTrigger className="w-[130px] h-10 text-xs bg-background border-border/80 rounded-lg">
                            <SelectValue placeholder="Filter Role" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="ALL">All Roles</SelectItem>
                            <SelectItem value="USER">User</SelectItem>
                            <SelectItem value="HOST">Host</SelectItem>
                            <SelectItem value="ADMIN">Admin</SelectItem>
                        </SelectContent>
                    </Select>
                    {/* Status Filter */}
                    <Select
                    // value={statusFilter} onValueChange={setStatusFilter}
                    >
                        <SelectTrigger className="w-[140px] h-10 text-xs bg-background border-border/80 rounded-lg">
                            <SelectValue placeholder="Filter Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="ALL">All Statuses</SelectItem>
                            <SelectItem value="ACTIVE">Active</SelectItem>
                            <SelectItem value="SUSPENDED">Suspended</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button variant="ghost" size="icon" className="h-10 w-10 text-muted-foreground hover:text-foreground">
                        <RotateCcw className="w-4 h-4" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default UserToolbar;