"use client"
import Link from "next/link";
import {
    Compass,
    CreditCard,
    ArrowRight,
    Lock
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export function Footer() {
    return (
        <footer className="bg-slate-950 text-slate-200 border-t border-slate-800/80 pt-16 pb-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">

                {/* Top Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/60">

                    {/* Brand Info */}
                    <div className="lg:col-span-2 space-y-4">
                        <Link href="/" className="inline-flex items-center gap-2">
                            <div className="p-2 rounded-xl bg-slate-900 text-emerald-400 border border-slate-800">
                                <Compass className="w-5 h-5" />
                            </div>
                            <span className="text-2xl font-extrabold tracking-tight text-white">
                                Gear<span className="text-primary">Up</span>
                            </span>
                        </Link>

                        <p className="text-slate-400 text-sm max-w-sm font-normal leading-relaxed">
                            The premier peer-to-peer sports and outdoor equipment rental network. Rent high-end gear on demand or monetize your unused inventory seamlessly.
                        </p>

                        {/* Payment & Security Trust Badges */}
                        <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-slate-400">
                            <span className="flex items-center gap-1 bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800">
                                <Lock className="w-3 h-3 text-emerald-400" /> Secure Checkout
                            </span>
                            <span className="flex items-center gap-1 bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800">
                                <CreditCard className="w-3 h-3 text-emerald-400" /> Stripe & SSLCommerz
                            </span>
                        </div>
                    </div>

                    {/* Quick Links - Explore */}
                    <div className="space-y-3">
                        <p className="text-sm font-semibold text-white uppercase tracking-wider">Explore Platform</p>
                        <ul className="space-y-2.5 text-sm text-slate-400 font-medium">
                            <li>
                                <Link href="/gear" className="hover:text-emerald-400 transition-colors">
                                    All Equipment
                                </Link>
                            </li>
                            <li>
                                <Link href="/gear?category=camping" className="hover:text-emerald-400 transition-colors">
                                    Camping & Backpacking
                                </Link>
                            </li>
                            <li>
                                <Link href="/gear?category=water" className="hover:text-emerald-400 transition-colors">
                                    Kayaks & Water Sports
                                </Link>
                            </li>
                            <li>
                                <Link href="/gear?category=cycling" className="hover:text-emerald-400 transition-colors">
                                    Mountain Bikes
                                </Link>
                            </li>
                            <li>
                                <Link href="/gear?category=winter" className="hover:text-emerald-400 transition-colors">
                                    Skiing & Snowboard
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Quick Links - Community & Roles */}
                    <div className="space-y-3">
                        <p className="text-sm font-semibold text-white uppercase tracking-wider">Get Involved</p>
                        <ul className="space-y-2.5 text-sm text-slate-400 font-medium">
                            <li>
                                <Link href="/auth/register?role=provider" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                                    Become a Provider
                                    <Badge variant="outline" className="border-emerald-500/40 text-emerald-400 text-[10px] px-1.5 py-0">
                                        Earn
                                    </Badge>
                                </Link>
                            </li>
                            <li>
                                <Link href="/auth/login" className="hover:text-emerald-400 transition-colors">
                                    Renter Login
                                </Link>
                            </li>
                            <li>
                                <Link href="/dashboard/customer" className="hover:text-emerald-400 transition-colors">
                                    Order Tracking
                                </Link>
                            </li>
                            <li>
                                <Link href="/help/trust-safety" className="hover:text-emerald-400 transition-colors">
                                    Trust & Insurance
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter / Updates */}
                    <div className="space-y-3">
                        <p className="text-sm font-semibold text-white uppercase tracking-wider">Stay Outdoors</p>
                        <p className="text-xs text-slate-400">
                            Get notified when top-tier outdoor equipment becomes available near you.
                        </p>
                        <form className="space-y-2"
                            onSubmit={(e) => e.preventDefault()}>
                            <div className="relative">
                                <Input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="bg-slate-900 border-slate-800 text-slate-100 placeholder:text-slate-500 text-xs h-10 pr-10 focus-visible:ring-1 focus-visible:ring-emerald-400"
                                />
                                <Button
                                    type="submit"
                                    size="icon"
                                    className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 bg-emerald-500 hover:bg-emerald-400 text-slate-950 shrink-0"
                                >
                                    <ArrowRight className="w-4 h-4" />
                                </Button>
                            </div>
                        </form>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-medium">
                    <p>© {new Date().getFullYear()} GearUp Rental Inc. All rights reserved.</p>

                    <div className="flex items-center gap-6">
                        <Link href="/privacy" className="hover:text-slate-400 transition-colors">
                            Privacy Policy
                        </Link>
                        <Link href="/terms" className="hover:text-slate-400 transition-colors">
                            Terms of Service
                        </Link>
                        <Link href="/support" className="hover:text-slate-400 transition-colors">
                            Support
                        </Link>
                    </div>

                    {/* Social Icons */}
                    <div className="flex items-center gap-4 text-slate-400">
                        <a href="#" className="hover:text-white transition-colors" aria-label="Github">
                            {/* <GitH className="w-4 h-4" /> */}
                        </a>
                        <a href="#" className="hover:text-white transition-colors" aria-label="Twitter">
                            {/* <Twitter className="w-4 h-4" /> */}
                        </a>
                        <a href="#" className="hover:text-white transition-colors" aria-label="Instagram">
                            {/* <Instagram className="w-4 h-4" /> */}
                        </a>
                    </div>
                </div>

            </div>
        </footer>
    );
}