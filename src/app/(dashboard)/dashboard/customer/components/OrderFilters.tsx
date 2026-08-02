"use client"

import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search } from 'lucide-react';
import React, { useState } from 'react';

const OrderFilters = () => {

    const [searchQuery, setSearchQuery] = useState("");
    const [activeTab, setActiveTab] = useState("ALL");

    return (
        <Card className="border-border/80 bg-card shadow-sm">
            <CardContent className="p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
                {/* Status Tabs */}
                <Tabs defaultValue="ALL" onValueChange={setActiveTab} className="w-full md:w-auto">
                    <TabsList className="bg-muted/60 p-1 h-9 border border-border/80">
                        <TabsTrigger value="ALL" className="text-xs font-semibold px-3 py-1">All Orders</TabsTrigger>
                        <TabsTrigger value="ACTIVE" className="text-xs font-semibold px-3 py-1">Currently Rented</TabsTrigger>
                        <TabsTrigger value="APPROVED" className="text-xs font-semibold px-3 py-1">Upcoming</TabsTrigger>
                        <TabsTrigger value="COMPLETED" className="text-xs font-semibold px-3 py-1">Completed</TabsTrigger>
                    </TabsList>
                </Tabs>
                {/* Search Box */}
                <div className="relative w-full md:w-72">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                        type="text"
                        placeholder="Search gear or order ID..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9 h-9 text-xs bg-background border-border/80 focus-visible:ring-1 focus-visible:ring-primary"
                    />
                </div>
            </CardContent>
        </Card>
    );
};

export default OrderFilters;