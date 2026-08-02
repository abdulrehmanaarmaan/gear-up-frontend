"use client"

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight, Eye, EyeOff, Loader2 } from 'lucide-react';
import Link from 'next/link';
import React, { useActionState, useEffect, useState } from 'react';
import { login } from '../auth.actions';
import { toast } from 'sonner';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Label } from '@/components/ui/label';

const LoginForm = () => {

    const [showPassword, setShowPassword] = useState(false);

    const query = useSearchParams()
    const registered = query.get("registered") ?? ""
    const redirectTo = query.get("redirectTo") ?? ""
    const loggedOut = query.get("loggedOut") ?? ""

    const [state, action, pending] = useActionState(login.bind(null, redirectTo), null)

    const pathname = usePathname()
    const router = useRouter()

    useEffect(() => {
        if (loggedOut || registered) {
            const timeout = setTimeout(() => {
                if (loggedOut) {
                    toast.success("You have been logged out successfully.");
                }

                if (registered) {
                    toast.success("Account created successfully. Please sign in.");
                }

                const params = new URLSearchParams(query);

                params.delete("loggedOut");
                params.delete("registered");

                router.replace(
                    params.toString()
                        ? `${pathname}?${params.toString()}`
                        : pathname
                );
            }, 200);

            return () => clearTimeout(timeout);
        }

        if (!state) return;

        if (!state.success) {
            toast.error(state.message);
        }
    }, [loggedOut, registered, state, query, pathname, router]);

    return (
        <form action={action} className="space-y-5">
            {/* Email Address Field */}
            <div className="space-y-2">
                <Label
                    htmlFor="email"
                    className="text-xs font-semibold text-foreground/90"
                >
                    Email Address
                </Label>
                <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    autoComplete="email"
                    required
                    className="h-10 bg-background/50 border-border/60 focus-visible:ring-primary/20 focus-visible:border-primary transition-all duration-200"
                />
                {state?.errors?.email && (
                    <p className="text-sm text-destructive">
                        {state.errors.email[0]}
                    </p>
                )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <Label
                        htmlFor="password"
                        className="text-xs font-semibold text-foreground/90"
                    >
                        Password
                    </Label>
                    <Link
                        href="/auth/forgot-password"
                        className="text-xs text-primary hover:text-primary/80 transition-colors font-medium hover:underline"
                    >
                        Forgot password?
                    </Link>
                </div>

                <div className="relative">
                    <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        autoComplete="current-password"
                        required
                        className="h-10 pr-10 bg-background/50 border-border/60 focus-visible:ring-primary/20 focus-visible:border-primary transition-all duration-200"
                    />
                    {state?.errors?.password && (
                        <p className="text-sm text-destructive">
                            {state.errors.password[0]}
                        </p>
                    )}
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-muted-foreground/70 hover:text-foreground transition-colors cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                        tabIndex={-1}
                    >
                        {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                        ) : (
                            <Eye className="h-4 w-4" />
                        )}
                    </Button>
                </div>
            </div>

            {/* Submit Button */}
            <Button
                type="submit"
                disabled={pending}
                className={`w-full h-11 font-semibold text-sm shadow-md transition-all duration-200 mt-2 group ${pending ? "cursor-not-allowed opacity-80" : "cursor-pointer hover:shadow-lg active:scale-[0.99]"
                    }`}
            >
                {pending ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin text-primary-foreground" />
                        Signing In...
                    </>
                ) : (
                    <>
                        Sign In <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </>
                )}
            </Button>
        </form>
    );
};

export default LoginForm;