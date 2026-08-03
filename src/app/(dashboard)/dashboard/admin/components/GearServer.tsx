import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
    Package,
    MoreVertical,
    CheckCircle2,
    XCircle,
    AlertTriangle,
    Eye,
    Trash2,
    Plus,
    Download,
    ChevronLeft,
    ChevronRight,
    MapPin,
    ExternalLink,
} from "lucide-react";

// shadcn/ui component imports
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import GearToolbar from "../components/GearToolbar";
import { getGears } from "../admin.actions";
import { IGearResponse } from "../../provider/provider.types";

export default async function GearItemServer() {

    const gears = await getGears()
    const { data } = await gears

    return (
        <div className="space-y-8 pb-12">

            {/* PAGE HEADER */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2">
                        <Badge variant="outline" className="border-primary/40 text-primary font-semibold text-xs">
                            Admin Moderation
                        </Badge>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground mt-1">
                        Gear Inventory Moderation
                    </h1>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                        Review submitted gear listings, verify safety compliance, approve host submissions, and manage inventory.
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="gap-2 border-border/80 text-xs">
                        <Download className="w-3.5 h-3.5" /> Export Catalog
                    </Button>
                    <Button size="sm" className="gap-2 text-xs font-semibold shadow-sm">
                        <Plus className="w-3.5 h-3.5" /> Add Platform Gear
                    </Button>
                </div>
            </div>

            {/* STATS OVERVIEW */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

                <Card className="border-border/80 bg-card shadow-sm">
                    <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between space-y-0">
                        <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                            Total Listed Gear
                        </CardTitle>
                        <Package className="w-4 h-4 text-primary" />
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                        <div className="text-2xl font-bold text-foreground">2,840</div>
                        <p className="text-[11px] text-emerald-500 font-medium mt-1">
                            +18% listings this quarter
                        </p>
                    </CardContent>
                </Card>

                <Card className="border-border/80 bg-card shadow-sm">
                    <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between space-y-0">
                        <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                            Pending Moderation
                        </CardTitle>
                        <AlertTriangle className="w-4 h-4 text-amber-500" />
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                        <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">12</div>
                        <p className="text-[11px] text-muted-foreground mt-1">
                            Requires approval within 24h
                        </p>
                    </CardContent>
                </Card>

                <Card className="border-border/80 bg-card shadow-sm">
                    <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between space-y-0">
                        <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                            Approved & Live
                        </CardTitle>
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                        <div className="text-2xl font-bold text-foreground">2,710</div>
                        <p className="text-[11px] text-emerald-500 font-medium mt-1">
                            95.4% approval rate
                        </p>
                    </CardContent>
                </Card>

                <Card className="border-border/80 bg-card shadow-sm">
                    <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between space-y-0">
                        <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                            Rejected / Flagged
                        </CardTitle>
                        <XCircle className="w-4 h-4 text-rose-500" />
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                        <div className="text-2xl font-bold text-rose-600 dark:text-rose-400">118</div>
                        <p className="text-[11px] text-muted-foreground mt-1">
                            4.1% failed safety checks
                        </p>
                    </CardContent>
                </Card>

            </div>

            {/* TOOLBAR: SEARCH & FILTERS */}
            <GearToolbar />


            {/* GEAR ITEMS TABLE CONTAINER */}
            <Card className="border-border/80 bg-card shadow-sm overflow-hidden">

                {/* DESKTOP TABLE VIEW */}
                <div className="hidden md:block overflow-x-auto">
                    <Table>
                        <TableHeader className="bg-muted/40">
                            <TableRow className="border-border/60">
                                <TableHead className="w-[320px] text-xs font-bold uppercase text-muted-foreground">Gear Details</TableHead>
                                <TableHead className="text-xs font-bold uppercase text-muted-foreground">Provider / Host</TableHead>
                                <TableHead className="text-xs font-bold uppercase text-muted-foreground">Rate / Day</TableHead>
                                <TableHead className="text-xs font-bold uppercase text-muted-foreground">Stock Availability</TableHead>
                                <TableHead className="text-xs font-bold uppercase text-muted-foreground">Status</TableHead>
                                <TableHead className="text-xs font-bold uppercase text-muted-foreground">Location</TableHead>
                                <TableHead className="text-right text-xs font-bold uppercase text-muted-foreground">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data?.map((item: IGearResponse) => (
                                <TableRow key={item?.id} className="border-border/60 hover:bg-muted/20 transition-colors">

                                    {/* Gear Item Info */}
                                    <TableCell className="py-3">
                                        <div className="flex items-center gap-3">
                                            <div className="relative h-12 w-16 rounded-lg overflow-hidden bg-muted border border-border/80 shrink-0">
                                                {item?.images?.[0] && <Image unoptimized src={item?.images?.[0]} alt={item?.title} fill className="object-cover" />}
                                            </div>
                                            <div className="flex flex-col min-w-0">
                                                <span className="text-sm font-bold text-foreground line-clamp-1">{item?.title}</span>
                                                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                                                    <span className="font-semibold text-primary">{item?.category.name}</span>
                                                    <span>•</span>
                                                    <span>{item?.brand}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </TableCell>

                                    {/* Provider Info */}
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Avatar className="h-7 w-7 border border-primary/20">
                                                <AvatarImage src={item?.provider?.image} alt={item?.provider?.name} />
                                                <AvatarFallback>{item?.provider?.name[0]}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex flex-col min-w-0 text-xs">
                                                <span className="font-semibold text-foreground truncate">{item?.provider?.name}</span>
                                                <span className="text-muted-foreground text-[11px] truncate">{item?.provider?.email}</span>
                                            </div>
                                        </div>
                                    </TableCell>

                                    {/* Daily Rate */}
                                    <TableCell className="text-xs font-extrabold text-foreground">
                                        ${item?.pricePerDay}
                                    </TableCell>

                                    {/* Stock Availability */}
                                    <TableCell>
                                        <div className="text-xs">
                                            <span className="font-bold text-foreground">{item?.availableQuantity}</span>
                                            <span className="text-muted-foreground"> / {item?.quantity} available</span>
                                        </div>
                                    </TableCell>

                                    {/* Status Badge */}
                                    <TableCell>
                                        <Badge
                                            variant="secondary"
                                            className={`text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 border-none ${item?.status === "APPROVED"
                                                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                                                : item?.status === "PENDING"
                                                    ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                                                    : "bg-rose-500/10 text-rose-600 dark:text-rose-400"
                                                }`}
                                        >
                                            {item?.status}
                                        </Badge>
                                    </TableCell>

                                    {/* Location */}
                                    <TableCell className="text-xs text-muted-foreground font-medium">
                                        <span className="flex items-center gap-1">
                                            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" /> {item?.location}
                                        </span>
                                    </TableCell>

                                    {/* Moderation Dropdown Menu */}
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                                                    <MoreVertical className="w-4 h-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-48">
                                                <DropdownMenuLabel className="text-xs">Moderation Actions</DropdownMenuLabel>
                                                <DropdownMenuItem asChild className="cursor-pointer text-xs">
                                                    <Link href={`/gear/${item?.slug}`} target="_blank" className="flex items-center gap-2">
                                                        <Eye className="w-3.5 h-3.5 text-muted-foreground" /> View Public Listing
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                {item?.status !== "APPROVED" && (
                                                    <DropdownMenuItem className="cursor-pointer text-xs text-emerald-600 dark:text-emerald-400 font-semibold gap-2">
                                                        <CheckCircle2 className="w-3.5 h-3.5" /> Approve Listing
                                                    </DropdownMenuItem>
                                                )}
                                                {item?.status !== "REJECTED" && (
                                                    <DropdownMenuItem className="cursor-pointer text-xs text-rose-600 dark:text-rose-400 font-semibold gap-2">
                                                        <XCircle className="w-3.5 h-3.5" /> Reject Listing
                                                    </DropdownMenuItem>
                                                )}
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem className="cursor-pointer text-xs text-rose-600 dark:text-rose-400 gap-2">
                                                    <Trash2 className="w-3.5 h-3.5" /> Delete Item
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                {/* MOBILE CARD VIEW FALLBACK */}
                <div className="block md:hidden divide-y divide-border/60">
                    {data?.map((item: IGearResponse) => (
                        <div key={item?.id} className="p-4 space-y-3">
                            <div className="flex gap-3">
                                <div className="relative h-16 w-20 rounded-lg overflow-hidden bg-muted border border-border/80 shrink-0">
                                    {item?.images?.[0] && <Image unoptimized src={item?.images?.[0]} alt={item?.title} fill className="object-cover" />}
                                </div>
                                <div className="flex-1 min-w-0 space-y-1">
                                    <div className="flex items-center justify-between">
                                        <Badge variant="outline" className="text-[10px] text-primary border-primary/40">
                                            {item?.category?.name}
                                        </Badge>
                                        <Badge
                                            variant="secondary"
                                            className={`text-[10px] font-bold uppercase border-none px-2 py-0.5 ${item?.status === "APPROVED"
                                                ? "bg-emerald-500/10 text-emerald-600"
                                                : item?.status === "PENDING"
                                                    ? "bg-amber-500/10 text-amber-600"
                                                    : "bg-rose-500/10 text-rose-600"
                                                }`}
                                        >
                                            {item?.status}
                                        </Badge>
                                    </div>
                                    <h3 className="text-sm font-bold text-foreground line-clamp-1">{item?.title}</h3>
                                    <p className="text-xs text-muted-foreground">${item?.pricePerDay} / day • {item?.location}</p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-2 border-t border-border/40 text-xs">
                                <div className="flex items-center gap-2">
                                    <Avatar className="h-6 w-6">
                                        <AvatarImage src={item?.provider?.image} />
                                        <AvatarFallback>{item?.provider?.name[0]}</AvatarFallback>
                                    </Avatar>
                                    <span className="text-muted-foreground">{item?.provider?.name}</span>
                                </div>
                                <Link href={`/gear/${item.slug}`} className="text-primary font-semibold flex items-center gap-1">
                                    View <ExternalLink className="w-3 h-3" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* PAGINATION FOOTER */}
                <div className="p-4 border-t border-border/60 bg-muted/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
                    <span>Showing <span className="font-semibold text-foreground">1-4</span> of <span className="font-semibold text-foreground">2,840</span> gear listings</span>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="h-8 gap-1" disabled>
                            <ChevronLeft className="w-3.5 h-3.5" /> Previous
                        </Button>
                        <Button variant="outline" size="sm" className="h-8 bg-primary/10 text-primary border-primary/30 font-semibold">
                            1
                        </Button>
                        <Button variant="outline" size="sm" className="h-8">
                            2
                        </Button>
                        <Button variant="outline" size="sm" className="h-8">
                            3
                        </Button>
                        <Button variant="outline" size="sm" className="h-8 gap-1">
                            Next <ChevronRight className="w-3.5 h-3.5" />
                        </Button>
                    </div>
                </div>

            </Card>

        </div>
    );
}