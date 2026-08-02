import { Button } from '@/components/ui/button';
import { Ban, ChevronLeft, ChevronRight, Download, Plus, ShieldCheck, UserCheck, UsersIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import UserCard from './UserCard';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import UserToolbarServer from './UserToolbarServer';
import UserToolbarSkeleton from './UserToolbarSkeleton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getUserAccounts } from '../admin.actions';
import { IUserAccount } from '@/app/(auth)/auth.types';
import UserRow from './UserRow';
import { Badge } from '@/components/ui/badge';

const UserContent = async ({ searchParams }: {
    searchParams: Promise<{
        page?: number
        limit?: number
        search?: string
    }>
}) => {

    const params = await searchParams;

    const page = Number(params.page) || 1;
    const limit = Number(params.limit) || 10;
    const search = params.search ?? "";

    const { meta, data } = await getUserAccounts(page as number, limit as number, search as string)
    const start = (meta?.page - 1) * meta?.limit + 1;
    const end = Math.min(meta?.page * meta?.limit, meta?.total);

    return (
        <div className="space-y-8 pb-12">
            {/* PAGE HEADER */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2">
                        <Badge variant="outline" className="border-primary/40 text-primary font-semibold text-xs">
                            Admin Portal
                        </Badge>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground mt-1">
                        User Management
                    </h1>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                        Monitor registered platform accounts, adjust roles, verify identities, and manage suspensions.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="gap-2 border-border/80 text-xs">
                        <Download className="w-3.5 h-3.5" /> Export CSV
                    </Button>
                    <Button size="sm" className="gap-2 text-xs font-semibold shadow-sm">
                        <Plus className="w-3.5 h-3.5" /> Add New User
                    </Button>
                </div>
            </div>
            {/* SUMMARY STATS CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="border-border/80 bg-card shadow-sm">
                    <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between space-y-0">
                        <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                            Total Users
                        </CardTitle>
                        <UsersIcon className="w-4 h-4 text-primary" />
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                        <div className="text-2xl font-bold text-foreground">1,482</div>
                        <p className="text-[11px] text-emerald-500 font-medium mt-1">
                            +12% from last month
                        </p>
                    </CardContent>
                </Card>
                <Card className="border-border/80 bg-card shadow-sm">
                    <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between space-y-0">
                        <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                            Active Hosts
                        </CardTitle>
                        <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                        <div className="text-2xl font-bold text-foreground">318</div>
                        <p className="text-[11px] text-muted-foreground mt-1">
                            64% with active listings
                        </p>
                    </CardContent>
                </Card>
                <Card className="border-border/80 bg-card shadow-sm">
                    <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between space-y-0">
                        <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                            Verified Accounts
                        </CardTitle>
                        <UserCheck className="w-4 h-4 text-blue-500" />
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                        <div className="text-2xl font-bold text-foreground">1,120</div>
                        <p className="text-[11px] text-emerald-500 font-medium mt-1">
                            75.5% verification rate
                        </p>
                    </CardContent>
                </Card>
                <Card className="border-border/80 bg-card shadow-sm">
                    <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between space-y-0">
                        <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                            Suspended Accounts
                        </CardTitle>
                        <Ban className="w-4 h-4 text-rose-500" />
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                        <div className="text-2xl font-bold text-rose-600 dark:text-rose-400">14</div>
                        <p className="text-[11px] text-muted-foreground mt-1">
                            0.9% of total user base
                        </p>
                    </CardContent>
                </Card>
            </div>
            {/* FILTER & SEARCH TOOLBAR */}
            <React.Suspense fallback={<UserToolbarSkeleton />}>
                <UserToolbarServer />
            </React.Suspense>
            {/* USERS TABLE CONTAINER */}
            <Card className="border-border/80 bg-card shadow-sm overflow-hidden">
                {/* DESKTOP TABLE VIEW */}
                <div className="hidden md:block overflow-x-auto">
                    <Table>
                        <TableHeader className="bg-muted/40">
                            <TableRow className="border-border/60">
                                <TableHead className="w-[280px] text-xs font-bold uppercase text-muted-foreground">User</TableHead>
                                <TableHead className="text-xs font-bold uppercase text-muted-foreground">Role</TableHead>
                                <TableHead className="text-xs font-bold uppercase text-muted-foreground">Status</TableHead>
                                <TableHead className="text-xs font-bold uppercase text-muted-foreground">Verification</TableHead>
                                <TableHead className="text-xs font-bold uppercase text-muted-foreground">Activity</TableHead>
                                <TableHead className="text-xs font-bold uppercase text-muted-foreground">Joined</TableHead>
                                <TableHead className="text-right text-xs font-bold uppercase text-muted-foreground">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data?.map((usr: IUserAccount) => (
                                <UserRow key={usr?.id} usr={usr} />
                            ))}
                        </TableBody>
                    </Table>
                </div>
                {/* MOBILE CARD VIEW FALLBACK */}
                <div className="block md:hidden divide-y divide-border/60">
                    {data?.map((usr: IUserAccount) => (
                        <UserCard key={usr?.id} usr={usr} />
                    ))}
                </div>
                {/* TABLE FOOTER / PAGINATION */}
                <div className="p-4 border-t border-border/60 bg-muted/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xstext-muted-foreground">
                    <span>Showing
                        <span className="font-semibold text-foreground">
                            {" "}
                            {start}-{end}
                        </span>
                        <span className="font-semibold text-foreground">
                            {meta.total} accounts
                        </span>
                    </span>
                    <div className="flex items-center gap-2">
                        <Button
                            asChild
                            variant="outline"
                            size="sm"
                            disabled={meta?.page === 1}
                        >
                            <Link
                                href={`?page=${meta?.page - 1}&limit=${meta?.limit}${search ? `&search=${search}` : ""
                                    }`}
                            >
                                <ChevronLeft className="w-3.5 h-3.5" />
                                Previous
                            </Link>
                        </Button>
                        {Array.from(
                            { length: meta?.totalPages },
                            (_, i) => i + 1
                        ).map(pageNumber => (
                            <Link
                                key={pageNumber}
                                href={`?page=${pageNumber}&limit=${meta?.limit}${search ? `&search=${search}` : ""}`}
                            >
                                <Button
                                    variant={pageNumber === meta?.page ? "default" : "outline"}
                                    size="sm"
                                    className="cursor-pointer h-8"
                                >
                                    {pageNumber}
                                </Button>
                            </Link>
                        ))}
                        <Button
                            asChild
                            variant="outline"
                            size="sm"
                            disabled={meta?.page === meta?.totalPages}
                        >
                            <Link
                                href={`?page=${meta?.page + 1}&limit=${meta?.limit}${search ? `&search=${search}` : ""
                                    }`}
                            >
                                Next
                                <ChevronRight className="w-3.5 h-3.5" />
                            </Link>
                        </Button>
                    </div >
                </div>
            </Card>
        </div>
    );
};

export default UserContent;