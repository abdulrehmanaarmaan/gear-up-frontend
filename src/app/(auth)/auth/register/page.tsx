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
    User,
    Store,
    Loader2,
    ArrowRight,
    UploadCloud
} from "lucide-react";

// shadcn/ui components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// Zod Schema matching Prisma User Model
const registerSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    phone: z.string().min(8, "Phone number is required"),
    role: z.enum(["CUSTOMER", "PROVIDER"], {
        required_error: "Please select a account role",
    }),
    address: z.string().optional(),
    city: z.string().optional(),
    country: z.string().optional(),
    image: z.string().url("Must be a valid image URL").optional().or(z.literal("")),
});

export default function Register() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const defaultRole = searchParams.get("role") === "provider" ? "PROVIDER" : "CUSTOMER";

    const [showPassword, setShowPassword] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);

    const form = useForm({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            phone: "",
            role: defaultRole,
            address: "",
            city: "",
            country: "",
            image: "",
        },
    });

    async function onSubmit(values) {
        setIsLoading(true);
        try {
            // POST to backend api (e.g. POST /api/auth/register)
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });

            if (!res.ok) throw new Error("Registration failed");

            // Redirect on success
            router.push("/auth/login?registered=true");
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-background flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background ambient glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full overflow-hidden pointer-events-none opacity-20">
                <div className="absolute top-10 left-10 w-96 h-96 bg-primary/40 blur-3xl rounded-full" />
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-500/30 blur-3xl rounded-full" />
            </div>

            <div className="sm:mx-auto sm:w-full sm:max-w-xl relative z-10 space-y-4 text-center">
                <Link href="/" className="inline-flex items-center gap-2 group">
                    <div className="p-2.5 rounded-xl bg-slate-900 text-primary border border-slate-800 shadow-md transition-transform group-hover:scale-105">
                        <Compass className="w-6 h-6 text-emerald-400" />
                    </div>
                    <span className="text-2xl font-extrabold tracking-tight text-foreground">
                        Gear<span className="text-primary">Up</span>
                    </span>
                </Link>
                <h1 className="text-3xl font-extrabold tracking-tight">Create your account</h1>
                <p className="text-sm text-muted-foreground">
                    Join thousands of outdoor enthusiasts renting & listing gear nationwide.
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl relative z-10 px-4 sm:px-0">
                <Card className="border-border/80 shadow-xl bg-card">
                    <CardHeader className="space-y-1 pb-6">
                        <CardTitle className="text-xl">Account Information</CardTitle>
                        <CardDescription>
                            Select how you plan to use GearUp and enter your details.
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                                {/* ROLE SELECTION */}
                                <FormField
                                    control={form.control}
                                    name="role"
                                    render={({ field }) => (
                                        <FormItem className="space-y-3">
                                            <FormLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                                I want to:
                                            </FormLabel>
                                            <FormControl>
                                                <RadioGroup
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value}
                                                    className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                                                >
                                                    {/* Customer Option */}
                                                    <div>
                                                        <RadioGroupItem
                                                            value="CUSTOMER"
                                                            id="CUSTOMER"
                                                            className="peer sr-only"
                                                        />
                                                        <Label
                                                            htmlFor="CUSTOMER"
                                                            className="flex flex-col items-center justify-between rounded-xl border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-all"
                                                        >
                                                            <User className="mb-2 h-6 w-6 text-primary" />
                                                            <div className="text-center">
                                                                <p className="font-semibold text-sm">Rent Gear</p>
                                                                <p className="text-xs text-muted-foreground font-normal mt-0.5">
                                                                    Browse & book outdoor equipment
                                                                </p>
                                                            </div>
                                                        </Label>
                                                    </div>

                                                    {/* Provider Option */}
                                                    <div>
                                                        <RadioGroupItem
                                                            value="PROVIDER"
                                                            id="PROVIDER"
                                                            className="peer sr-only"
                                                        />
                                                        <Label
                                                            htmlFor="PROVIDER"
                                                            className="flex flex-col items-center justify-between rounded-xl border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-all"
                                                        >
                                                            <Store className="mb-2 h-6 w-6 text-emerald-400" />
                                                            <div className="text-center">
                                                                <p className="font-semibold text-sm">List Gear</p>
                                                                <p className="text-xs text-muted-foreground font-normal mt-0.5">
                                                                    Monetize your inventory as a vendor
                                                                </p>
                                                            </div>
                                                        </Label>
                                                    </div>
                                                </RadioGroup>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* BASIC INFO GRID */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {/* Name */}
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Full Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="John Doe" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Email */}
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email Address</FormLabel>
                                                <FormControl>
                                                    <Input type="email" placeholder="john@example.com" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {/* Password */}
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Password</FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <Input
                                                            type={showPassword ? "text" : "password"}
                                                            placeholder="••••••••"
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

                                    {/* Phone */}
                                    <FormField
                                        control={form.control}
                                        name="phone"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Phone Number</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="+1 (555) 000-0000" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                {/* LOCATION INFO GRID */}
                                <div className="space-y-4 pt-2 border-t border-border/40">
                                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                        Location Details (Optional)
                                    </p>

                                    <FormField
                                        control={form.control}
                                        name="address"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Street Address</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="123 Adventure Way" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="city"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>City</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Denver" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="country"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Country</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="United States" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>

                                {/* Avatar Image URL */}
                                <FormField
                                    control={form.control}
                                    name="image"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Profile Image URL</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <UploadCloud className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                                    <Input className="pl-9" placeholder="https://images.unsplash.com/your-photo.jpg" {...field} />
                                                </div>
                                            </FormControl>
                                            <FormDescription className="text-xs">
                                                Provide a direct link to an avatar image.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <Button type="submit" className="w-full h-11 font-semibold text-base" disabled={isLoading}>
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating Account...
                                        </>
                                    ) : (
                                        <>
                                            Register <ArrowRight className="ml-2 h-4 w-4" />
                                        </>
                                    )}
                                </Button>
                            </form>
                        </Form>
                    </CardContent>

                    <CardFooter className="flex justify-center border-t border-border/40 py-4 bg-muted/20">
                        <p className="text-sm text-muted-foreground">
                            Already have an account?{" "}
                            <Link href="/auth/login" className="font-semibold text-primary hover:underline">
                                Sign In
                            </Link>
                        </p>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}