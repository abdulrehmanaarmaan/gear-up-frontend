"use client";

import * as React from "react";
import Link from "next/link";
import {
    Compass,
    Search,
    PlusCircle,
    ShoppingBag,
    LogOut,
    Menu
} from "lucide-react";

// shadcn/ui components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { logout } from "@/app/(auth)/auth.actions";
import { toast } from "sonner";
import { usePathname, useRouter } from "next/navigation";
import { sidebarMenuItems } from "@/app/(dashboard)/config/sidebarMenuItems";
import { IUserAccount } from "@/app/(auth)/auth.types";

export function Navbar({ myAccount }: { myAccount: IUserAccount }) {


    const { name, email, role, image } = myAccount || {}

    const currentRoute = usePathname()

    const router = useRouter()

    const dashboardMenuItems = sidebarMenuItems[role as keyof typeof sidebarMenuItems]

    const handleLogout = async () => {
        const result = await logout()

        if (result?.success) {

            if (currentRoute.startsWith("/dashboard")) {
                router.push("/auth/login?loggedOut=true");
            } else {
                toast.success("Logged out successfully.");
            }
        }
    }

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md transition-all">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">

                {/* Brand Logo */}
                <div className="flex items-center gap-8">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="p-2 rounded-xl bg-slate-900 text-primary border border-slate-800 shadow-sm transition-transform group-hover:scale-105">
                            <Compass className="w-5 h-5 text-emerald-400" />
                        </div>
                        <span className="text-xl font-extrabold tracking-tight text-foreground">
                            Gear<span className="text-primary">Up</span>
                        </span>
                    </Link>

                    {/* Desktop Main Navigation Links */}
                    <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                        <Link
                            href="/gears"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Explore Gear
                        </Link>
                        <Link
                            href="/gears?category=Camping"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Camping
                        </Link>
                        <Link
                            href="/gears?category=Water Sports"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Water Sports
                        </Link>
                    </nav>
                </div>

                {/* Search Bar (Desktop) */}
                <div className="hidden lg:flex flex-1 max-w-sm mx-8">
                    <div className="relative w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            type="text"
                            placeholder="Search gear or equipment..."
                            className="pl-9 h-9 bg-muted/50 border-border/60 text-xs focus-visible:ring-1 focus-visible:ring-primary rounded-full"
                        />
                    </div>
                </div>

                {/* Right Actions / Auth Menu */}
                <div className="flex items-center gap-3">

                    {/* Unauthenticated Actions */}
                    {!myAccount && (
                        <div className="hidden sm:flex items-center gap-2">
                            <Link href="/auth/login">
                                <Button variant="ghost" size="sm" className="cursor-pointer font-semibold">
                                    Sign In
                                </Button>
                            </Link>
                            <Link href="/auth/register">
                                <Button size="sm" className="font-semibold shadow-sm cursor-pointer">
                                    Get Started
                                </Button>
                            </Link>
                        </div>
                    )}

                    {/* Authenticated Actions */}
                    {myAccount && (
                        <div className="flex items-center gap-3">

                            {/* Role-Based Quick Actions */}
                            {role === "PROVIDER" && (
                                <Link href="/dashboard/provider/add-gear" className="hidden sm:block">
                                    <Button size="sm" className="cursor-pointer gap-1.5 font-semibold bg-emerald-600 hover:bg-emerald-500 text-white">
                                        <PlusCircle className="w-4 h-4" /> Add Gear
                                    </Button>
                                </Link>
                            )}

                            {role === "CUSTOMER" && (
                                <Link href="/dashboard/customer" className="hidden sm:block">
                                    <Button variant="outline" size="sm" className="cursor-pointer gap-1.5 font-medium border-border/80">
                                        <ShoppingBag className="w-4 h-4 text-primary" /> My Rentals
                                    </Button>
                                </Link>
                            )}

                            {/* User Dropdown Menu */}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="cursor-pointer relative h-9 w-9 rounded-full p-0 ring-offset-background transition-all hover:ring-2 hover:ring-primary">
                                        <Avatar className="h-9 w-9">
                                            <AvatarImage src={image!} alt={name} />
                                            <AvatarFallback className="bg-primary/10 text-primary font-bold">
                                                {name?.substring(0, 2).toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </DropdownMenuTrigger>

                                <DropdownMenuContent className="w-56" align="end" forceMount>
                                    <DropdownMenuLabel className="font-normal">
                                        <div className="flex flex-col space-y-1">
                                            <p className="text-sm font-semibold leading-none">{name}</p>
                                            <p className="text-xs leading-none text-muted-foreground">{email}</p>
                                            <Badge variant="outline" className="w-fit text-[10px] mt-1.5 border-primary/40 text-primary uppercase">
                                                {role}
                                            </Badge>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />

                                    <DropdownMenuGroup>
                                        {dashboardMenuItems?.map((item) => (
                                            <DropdownMenuItem
                                                key={item.href}
                                                asChild
                                                className="cursor-pointer">
                                                <Link href={item.href}>
                                                    <item.icon className="mr-2 h-4 w-4" />
                                                    {item.label}
                                                </Link>
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuGroup>

                                    <DropdownMenuSeparator />

                                    <DropdownMenuItem onClick={() => handleLogout()} className="text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer">
                                        <LogOut className="mr-2 h-4 w-4" /> Log out
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    )}

                    {/* Mobile Menu Toggle (Sheet) */}
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="md:hidden">
                                <Menu className="w-5 h-5" />
                                <span className="sr-only">Toggle Navigation</span>
                            </Button>
                        </SheetTrigger>

                        <SheetContent side="right" className="w-75 sm:w-87.5 p-6">
                            <SheetHeader className="text-left mb-6">
                                <SheetTitle className="flex items-center gap-2">
                                    <div className="p-1.5 rounded-lg bg-slate-900 text-primary border border-slate-800">
                                        <Compass className="w-5 h-5 text-emerald-400" />
                                    </div>
                                    <span className="font-bold text-lg">GearUp Navigation</span>
                                </SheetTitle>
                            </SheetHeader>

                            <div className="flex flex-col space-y-4">
                                {/* Mobile Search */}
                                <div className="relative w-full">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                    <Input
                                        type="text"
                                        placeholder="Search equipment..."
                                        className="pl-9 h-10 bg-muted/50 border-border/60 text-sm rounded-lg"
                                    />
                                </div>

                                <div className="py-2 border-y border-border/60 flex flex-col space-y-3 font-medium text-sm">
                                    <Link href="/gear" className="hover:text-primary transition-colors">
                                        Browse All Gear
                                    </Link>
                                    <Link href="/gear?category=camping" className="hover:text-primary transition-colors">
                                        Camping & Outdoor
                                    </Link>
                                    <Link href="/gear?category=water" className="hover:text-primary transition-colors">
                                        Water Sports & Kayaks
                                    </Link>
                                    <Link href="/gear?category=cycling" className="hover:text-primary transition-colors">
                                        Bikes & Cycling
                                    </Link>
                                </div>

                                {/* Mobile Auth Actions */}
                                {!myAccount ? (
                                    <div className="flex flex-col gap-2 pt-4">
                                        <Link href="/auth/login" className="w-full">
                                            <Button variant="outline" className="cursor-pointer w-full justify-center">Sign In</Button>
                                        </Link>
                                        <Link href="/auth/register" className="w-full">
                                            <Button className="cursor-pointer w-full justify-center">Get Started</Button>
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="pt-2 flex flex-col gap-2">
                                        <p className="text-xs font-semibold text-muted-foreground uppercase">Logged in as {role}</p>
                                        {role === "CUSTOMER" && (
                                            <Link href="/dashboard/customer">
                                                <Button className="w-full justify-start" variant="secondary">Customer Dashboard</Button>
                                            </Link>
                                        )}
                                        {role === "PROVIDER" && (
                                            <Link href="/dashboard/provider">
                                                <Button className="w-full justify-start" variant="secondary">Provider Dashboard</Button>
                                            </Link>
                                        )}
                                        {role === "ADMIN" && (
                                            <Link href="/dashboard/admin">
                                                <Button className="w-full justify-start" variant="secondary">Admin Console</Button>
                                            </Link>
                                        )}
                                    </div>
                                )}
                            </div>
                        </SheetContent>
                    </Sheet>

                </div>

            </div>
        </header >
    );
}