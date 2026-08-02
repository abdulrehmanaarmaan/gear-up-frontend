"use client"

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, ArrowLeft, Search, Compass } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NotFound() {

    const router = useRouter()

    return (
        <div className="relative min-h-[85vh] w-full flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-hidden bg-background text-foreground animate-in fade-in-50 duration-300">

            {/* AMBIENT BACKGROUND GLOW ACCENTS */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-primary/10 rounded-full blur-3xl pointer-events-none -z-10" />
            <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-rose-500/5 rounded-full blur-2xl pointer-events-none -z-10" />

            <div className="w-full max-w-xl mx-auto space-y-6">

                {/* MAIN 404 CARD */}
                <Card className="border-border/80 bg-card/80 backdrop-blur-xl shadow-xl overflow-hidden relative">

                    {/* Top Decorative Border Accent */}
                    <div className="h-1.5 w-full bg-gradient-to-r from-primary/40 via-primary to-primary/40" />

                    <CardContent className="p-6 sm:p-10 text-center space-y-6">

                        {/* BADGE / ICON */}
                        <div className="inline-flex items-center justify-center p-3.5 rounded-2xl bg-primary/10 text-primary ring-8 ring-primary/5">
                            <Compass className="w-8 h-8 animate-spin-slow" />
                        </div>

                        {/* ERROR CODE & HEADING */}
                        <div className="space-y-2">
                            <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground font-bold">
                                Error 404
                            </span>
                            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
                                Page Not Found
                            </h1>
                            <p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto leading-relaxed">
                                The page or resource you are looking for doesn't exist, has been removed, or is temporarily unavailable.
                            </p>
                        </div>

                        {/* ACTION BUTTONS */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                            <Button
                                asChild
                                variant="default"
                                size="lg"
                                className="w-full sm:w-auto h-10 px-5 text-xs font-semibold rounded-xl gap-2 shadow-sm"
                            >
                                <Link href="/">
                                    <Home className="w-4 h-4" />
                                    Return Home
                                </Link>
                            </Button>

                            <Button
                                onClick={() => router.back()}
                                variant="outline"
                                size="lg"
                                className="cursor-pointer w-full sm:w-auto h-10 px-5 text-xs font-semibold rounded-xl border-border/80 hover:bg-muted/50 gap-2"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Go Back
                            </Button>
                        </div>

                        {/* QUICK HELPFUL LINKS */}
                        <div className="pt-6 border-t border-border/60 space-y-3">
                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                Or try searching our platform:
                            </p>
                            <div className="flex flex-wrap justify-center gap-2 text-xs">
                                <Link
                                    href="/gears"
                                    className="px-3 py-1.5 rounded-lg bg-muted/40 hover:bg-muted text-foreground transition-colors border border-border/60 flex items-center gap-1.5"
                                >
                                    <Search className="w-3 h-3 text-muted-foreground" />
                                    Browse All Gear
                                </Link>
                                <Link
                                    href="/contact"
                                    className="px-3 py-1.5 rounded-lg bg-muted/40 hover:bg-muted text-foreground transition-colors border border-border/60"
                                >
                                    Support & Help
                                </Link>
                            </div>
                        </div>

                    </CardContent>
                </Card>

            </div>
        </div >
    );
}