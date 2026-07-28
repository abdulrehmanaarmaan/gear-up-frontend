"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
    Compass,
    Eye,
    EyeOff,
    Loader2,
    ArrowRight,
    CheckCircle2,
    AlertCircle
} from "lucide-react";

// shadcn/ui components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

const loginSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(1, "Password is required"),
});

export default function LoginPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const registered = searchParams.get("registered");

    const [showPassword, setShowPassword] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState(null);

    const form = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    async function onSubmit(values) {
        setIsLoading(true);
        setErrorMessage(null);

        try {
            // POST to backend API (e.g. POST /api/auth/login)
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Invalid email or password");
            }

            // Dynamic redirect based on authenticating user role from response
            if (data.user?.role === "PROVIDER") {
                router.push("/dashboard/provider");
            } else if (data.user?.role === "ADMIN") {
                router.push("/dashboard/admin");
            } else {
                router.push("/dashboard/customer");
            }
        } catch (err) {
            setErrorMessage(err.message || "Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

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

                        {/* Registration Success Banner */}
                        {registered && (
                            <Alert className="border-emerald-500/50 bg-emerald-500/10 text-emerald-400">
                                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                                <AlertTitle>Registration Successful!</AlertTitle>
                                <AlertDescription className="text-xs">
                                    Your account has been created. Please log in below.
                                </AlertDescription>
                            </Alert>
                        )}

                        {/* Error Banner */}
                        {errorMessage && (
                            <Alert variant="destructive">
                                <AlertCircle className="h-4 w-4" />
                                <AlertTitle>Authentication Error</AlertTitle>
                                <AlertDescription className="text-xs">{errorMessage}</AlertDescription>
                            </Alert>
                        )}

                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

                                {/* Email */}
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email Address</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="email"
                                                    placeholder="john@example.com"
                                                    autoComplete="email"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Password */}
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <div className="flex items-center justify-between">
                                                <FormLabel>Password</FormLabel>
                                                <Link
                                                    href="/auth/forgot-password"
                                                    className="text-xs text-primary hover:underline font-medium"
                                                >
                                                    Forgot password?
                                                </Link>
                                            </div>
                                            <FormControl>
                                                <div className="relative">
                                                    <Input
                                                        type={showPassword ? "text" : "password"}
                                                        placeholder="••••••••"
                                                        autoComplete="current-password"
                                                        {...field}
                                                    />
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="sm"
                                                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-muted-foreground"
                                                        onClick={() => setShowPassword(!showPassword)}
                                                    >
                                                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                                    </Button>
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <Button type="submit" className="w-full h-11 font-semibold text-base mt-2" disabled={isLoading}>
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Signing In...
                                        </>
                                    ) : (
                                        <>
                                            Sign In <ArrowRight className="ml-2 h-4 w-4" />
                                        </>
                                    )}
                                </Button>
                            </form>
                        </Form>
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