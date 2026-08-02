"use client"

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RotateCcw, Search } from 'lucide-react';
import React, { useState } from 'react';

const GearToolbar = () => {

    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [categoryFilter, setCategoryFilter] = useState("ALL");

    return (
        <Card className="border-border/80 bg-card shadow-sm">
            <CardContent className="p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                        type="text"
                        placeholder="Search gear title, brand, model, or provider..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9 h-10 text-xs bg-background border-border/80 rounded-lg focus-visible:ring-1 focus-visible:ring-primary"
                    />
                </div>
                <div className="flex flex-wrap items-center gap-3">
                    {/* Status Filter */}
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-[140px] h-10 text-xs bg-background border-border/80 rounded-lg">
                            <SelectValue placeholder="Approval Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="ALL">All Statuses</SelectItem>
                            <SelectItem value="APPROVED">Approved</SelectItem>
                            <SelectItem value="PENDING">Pending</SelectItem>
                            <SelectItem value="REJECTED">Rejected</SelectItem>
                        </SelectContent>
                    </Select>
                    {/* Category Filter */}
                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                        <SelectTrigger className="w-[160px] h-10 text-xs bg-background border-border/80 rounded-lg">
                            <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="ALL">All Categories</SelectItem>
                            <SelectItem value="camping">Camping & Hiking</SelectItem>
                            <SelectItem value="water">Water Sports</SelectItem>
                            <SelectItem value="cycling">Cycling & MTB</SelectItem>
                            <SelectItem value="climbing">Climbing Equipment</SelectItem>
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

export default GearToolbar;