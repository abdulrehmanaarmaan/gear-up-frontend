import * as React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export function NavbarSkeleton() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/95 backdrop-blur-md transition-all">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

                {/* LEFT SECTION: BRAND LOGO & DESKTOP NAV LINKS */}
                <div className="flex items-center gap-6 lg:gap-8">
                    {/* Brand Logo Skeleton */}
                    <div className="flex items-center gap-2.5">
                        <Skeleton className="h-9 w-9 rounded-xl bg-primary/10" />
                        <Skeleton className="h-6 w-28 rounded-md hidden sm:block" />
                    </div>

                    {/* Desktop Navigation Links Skeleton */}
                    <nav className="hidden md:flex items-center gap-1.5 lg:gap-2">
                        <Skeleton className="h-8 w-20 rounded-lg" />
                        <Skeleton className="h-8 w-24 rounded-lg" />
                        <Skeleton className="h-8 w-20 rounded-lg" />
                        <Skeleton className="h-8 w-16 rounded-lg" />
                    </nav>
                </div>

                {/* CENTER SECTION: GLOBAL SEARCH BAR SKELETON (DESKTOP) */}
                <div className="hidden lg:flex items-center flex-1 max-w-xs mx-6">
                    <Skeleton className="h-9 w-full rounded-xl" />
                </div>

                {/* RIGHT SECTION: ACTIONS, NOTIFICATIONS & USER PROFILE */}
                <div className="flex items-center gap-2 sm:gap-3">

                    {/* Mobile Search Icon Button Skeleton */}
                    <Skeleton className="h-9 w-9 rounded-lg lg:hidden" />

                    {/* Theme Toggle Button Skeleton */}
                    <Skeleton className="h-9 w-9 rounded-lg" />

                    {/* Notifications Icon Button Skeleton */}
                    <Skeleton className="h-9 w-9 rounded-lg hidden sm:block" />

                    {/* Divider */}
                    <div className="h-5 w-px bg-border/60 hidden sm:block mx-0.5" />

                    {/* User Avatar / Profile Dropdown Skeleton */}
                    <div className="flex items-center gap-2.5 pl-1">
                        <Skeleton className="h-9 w-9 rounded-full ring-2 ring-border/50" />
                        <div className="hidden xl:flex flex-col space-y-1">
                            <Skeleton className="h-3.5 w-24 rounded" />
                            <Skeleton className="h-2.5 w-16 rounded" />
                        </div>
                    </div>

                    {/* Mobile Menu Hamburger Button Skeleton */}
                    <Skeleton className="h-9 w-9 rounded-lg md:hidden ml-1" />

                </div>

            </div>
        </header>
    );
}

export default NavbarSkeleton;