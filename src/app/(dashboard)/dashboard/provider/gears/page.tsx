import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertCircle, Clock, DollarSign, Download, Filter, Package, Plus, Search } from 'lucide-react';
import React from 'react';
import { getMyGears } from '../provider.actions';
import { IGearResponse } from '../provider.types';
import GearRow from '../components/GearRow';

const MyGears = async () => {

    const myGears = await getMyGears()

    return (
        <div className="container mx-auto px-4 py-8 space-y-8 max-w-7xl">

            {/* 1. HEADER SECTION */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">My Gear Listings</h1>
                    <p className="text-muted-foreground text-sm mt-1">
                        Manage your rental inventory, pricing, availability, and active reservations.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="gap-2 text-xs sm:text-sm">
                        <Download className="w-4 h-4" />
                        Export CSV
                    </Button>
                    <Button className="gap-2 text-xs sm:text-sm font-semibold">
                        <Plus className="w-4 h-4" />
                        Add New Gear
                    </Button>
                </div>
            </div>

            {/* 2. STATS OVERVIEW CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="border-border/60">
                    <CardContent className="p-5 flex items-center justify-between">
                        <div className="space-y-1">
                            <p className="text-xs font-medium text-muted-foreground">Total Listings</p>
                            <p className="text-2xl font-black text-foreground">18</p>
                        </div>
                        <div className="p-3 bg-primary/10 text-primary rounded-xl">
                            <Package className="w-5 h-5" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-border/60">
                    <CardContent className="p-5 flex items-center justify-between">
                        <div className="space-y-1">
                            <p className="text-xs font-medium text-muted-foreground">Currently Rented</p>
                            <p className="text-2xl font-black text-foreground">6</p>
                        </div>
                        <div className="p-3 bg-emerald-500/10 text-emerald-600 rounded-xl">
                            <Clock className="w-5 h-5" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-border/60">
                    <CardContent className="p-5 flex items-center justify-between">
                        <div className="space-y-1">
                            <p className="text-xs font-medium text-muted-foreground">Monthly Revenue</p>
                            <p className="text-2xl font-black text-foreground">$3,240</p>
                        </div>
                        <div className="p-3 bg-blue-500/10 text-blue-600 rounded-xl">
                            <DollarSign className="w-5 h-5" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-border/60">
                    <CardContent className="p-5 flex items-center justify-between">
                        <div className="space-y-1">
                            <p className="text-xs font-medium text-muted-foreground">Pending Requests</p>
                            <p className="text-2xl font-black text-foreground">3</p>
                        </div>
                        <div className="p-3 bg-amber-500/10 text-amber-600 rounded-xl">
                            <AlertCircle className="w-5 h-5" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* 3. FILTER & TOOLBAR */}
            <Card className="border-border/60 p-4">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    {/* Search Input */}
                    <div className="relative w-full md:w-80">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            placeholder="Search gear by name, model, or ID..."
                            className="pl-9 text-xs h-10 border-border/80"
                        />
                    </div>

                    {/* Filter Controls */}
                    <div className="flex flex-wrap items-center justify-between sm:justify-end w-full md:w-auto gap-3">
                        {/* Category Select */}
                        <Select defaultValue="all">
                            <SelectTrigger className="w-[140px] h-10 text-xs">
                                <SelectValue placeholder="Category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Categories</SelectItem>
                                <SelectItem value="cameras">Cameras</SelectItem>
                                <SelectItem value="lenses">Lenses</SelectItem>
                                <SelectItem value="lighting">Lighting</SelectItem>
                                <SelectItem value="audio">Audio</SelectItem>
                            </SelectContent>
                        </Select>

                        {/* Status Select */}
                        <Select defaultValue="all">
                            <SelectTrigger className="w-[130px] h-10 text-xs">
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Status</SelectItem>
                                <SelectItem value="available">Available</SelectItem>
                                <SelectItem value="rented">Rented</SelectItem>
                                <SelectItem value="maintenance">Maintenance</SelectItem>
                            </SelectContent>
                        </Select>

                        <Separator orientation="vertical" className="hidden sm:block h-6" />

                        {/* Action Button */}
                        <Button variant="outline" size="icon" className="h-10 w-10 shrink-0">
                            <Filter className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </Card>

            {/* 4. GEAR INVENTORY TABLE */}
            <Card className="border-border/60 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader className="bg-muted/40">
                            <TableRow>
                                <TableHead className="w-[300px]">Item Details</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Day Rate</TableHead>
                                <TableHead>Stock / Availability</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                myGears?.data?.map((gear: IGearResponse) => (
                                    <GearRow key={gear?.id} gear={gear} />
                                ))
                            }
                        </TableBody>
                    </Table>
                </div>

                {/* Table Footer / Pagination */}
                <div className="p-4 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
                    <p>Showing 1 to 2 of 18 listings</p>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" disabled className="h-8 text-xs">Previous</Button>
                        <Button variant="outline" size="sm" className="h-8 text-xs">Next</Button>
                    </div>
                </div>
            </Card>

        </div>
    );
};

export default MyGears;