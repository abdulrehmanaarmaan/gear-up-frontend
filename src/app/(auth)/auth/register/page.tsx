import * as React from "react";
import Link from "next/link";
import {
    Compass
} from "lucide-react";

// shadcn/ui components
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import RegistrationForm from "../../components/RegistrationForm";

export default function Register() {

    return (
        <div className="min-h-screen bg-background flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background ambient glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full overflow-hidden pointer-events-none opacity-20">
                <div className="absolute top-10 left-10 w-96 h-96 bg-primary/40 blur-3xl rounded-full" />
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-500/30 blur-3xl rounded-full" />
            </div>

            <div className="sm:mx-auto sm:w-full sm:max-w-2xl relative z-10 space-y-4 text-center">
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

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl relative z-10 px-4 sm:px-0">
                <Card className="border-border/80 shadow-xl bg-card">
                    <CardHeader className="space-y-1 pb-6">
                        <CardTitle className="text-xl">Account Information</CardTitle>
                        <CardDescription>
                            Select your primary role on GearUp and enter your details below.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>

                        {/* Registration Form */}
                        <RegistrationForm />

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