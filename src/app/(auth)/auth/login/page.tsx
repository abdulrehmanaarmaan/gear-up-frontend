import * as React from "react";
import Link from "next/link";
import {
    Compass,
} from "lucide-react";

// shadcn/ui components
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import LoginForm from "../../components/LoginForm";

export default function Login() {

    return (
        <div className="min-h-screen bg-background flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background ambient glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full overflow-hidden pointer-events-none opacity-20">
                <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary/40 blur-3xl rounded-full" />
            </div>

            <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 space-y-4 text-center">
                <Link href="/" className="inline-flex items-center gap-2 group">
                    <div className="p-2.5 rounded-xl bg-slate-900 text-primary border border-slate-800 shadow-md transition-transform group-hover:scale-105">
                        <Compass className="w-6 h-6 text-emerald-400" />
                    </div>
                    <span className="text-2xl font-extrabold tracking-tight text-foreground">
                        Gear<span className="text-primary">Up</span>
                    </span>
                </Link>
                <h1 className="text-3xl font-extrabold tracking-tight">Welcome back</h1>
                <p className="text-sm text-muted-foreground">
                    Sign in to your account to manage rentals or gear inventory.
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4 sm:px-0">
                <Card className="border-border/80 shadow-xl bg-card">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-xl">Sign In</CardTitle>
                        <CardDescription>
                            Enter your email and password to access your dashboard.
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4">

                        {/* Login Form */}
                        <React.Suspense fallback={<>Loading...</>}>
                            <LoginForm />
                        </React.Suspense>
                    </CardContent>

                    <CardFooter className="flex justify-center border-t border-border/40 py-4 bg-muted/20">
                        <p className="text-sm text-muted-foreground">
                            Don't have an account?{" "}
                            <Link href="/auth/register" className="font-semibold text-primary hover:underline">
                                Create one now
                            </Link>
                        </p>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}