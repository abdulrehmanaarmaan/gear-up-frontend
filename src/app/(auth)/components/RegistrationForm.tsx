"use client"

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ArrowRight, Eye, EyeOff, Loader2, ShieldCheck, Store, User } from 'lucide-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { registerSchema } from '../auth.schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { register } from '../auth.actions';
import { toast } from 'sonner';
import Image from 'next/image';
import { RegisterFormValues } from '../auth.types';

const RegistrationForm = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [isUploadingImage, setIsUploadingImage] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [fileInputKey, setFileInputKey] = useState(0);

    const form = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            phone: "",
            role: "CUSTOMER",
            address: "",
            city: "",
            country: "",
            image: "",
        }
    });

    const { reset, formState: { isSubmitting } } = form

    const uploadImage = async (file: File) => {
        try {
            setIsUploadingImage(true);

            if (!file.type.startsWith("image/")) {
                toast.error("Please select an image.");
                return;
            }

            const MAX_SIZE = 5 * 1024 * 1024;

            if (file.size > MAX_SIZE) {
                toast.error("Image must be under 5MB");
                return;
            }

            const formData = new FormData();

            formData.append("file", file);

            formData.append(
                "upload_preset",
                process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
            );

            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
                {
                    method: "POST",
                    body: formData,
                }
            );

            if (!response.ok) {
                throw new Error("Image upload failed");
            }


            const result = await response.json();

            return result.secure_url;
        } finally {
            setIsUploadingImage(false);
        }
    };

    const onSubmit = async (values: RegisterFormValues) => {

        const result = await register(values);

        if (result?.success) {

            reset();

            setPreviewImage("");

            setFileInputKey((prev) => prev + 1);
        } else {
            toast.error(result?.message);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* ROLE SELECTION (CUSTOMER, PROVIDER, ADMIN) */}
                <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                        <FormItem className="space-y-3">
                            <FormLabel className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80">
                                Select Role
                            </FormLabel>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    value={field.value}
                                    className="grid grid-cols-1 sm:grid-cols-3 gap-3"
                                >
                                    {/* Customer Option */}
                                    <div className="relative">
                                        <RadioGroupItem
                                            value="CUSTOMER"
                                            id="CUSTOMER"
                                            className="peer sr-only"
                                        />
                                        <Label
                                            htmlFor="CUSTOMER"
                                            className="flex flex-col items-center justify-center rounded-xl border-2 border-border/60 bg-card/50 p-4 hover:bg-accent/50 hover:border-border text-card-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 peer-data-[state=checked]:shadow-sm cursor-pointer transition-all duration-200 h-full group"
                                        >
                                            <div className="p-2.5 rounded-full bg-primary/10 text-primary mb-2.5 group-hover:scale-110 transition-transform duration-200">
                                                <User className="h-5 w-5 text-primary" />
                                            </div>
                                            <div className="text-center">
                                                <p className="font-semibold text-sm tracking-tight">Customer</p>
                                                <p className="text-[11px] text-muted-foreground font-normal mt-0.5 leading-snug">
                                                    Rent equipment
                                                </p>
                                            </div>
                                        </Label>
                                    </div>

                                    {/* Provider Option */}
                                    <div className="relative">
                                        <RadioGroupItem
                                            value="PROVIDER"
                                            id="PROVIDER"
                                            className="peer sr-only"
                                        />
                                        <Label
                                            htmlFor="PROVIDER"
                                            className="flex flex-col items-center justify-center rounded-xl border-2 border-border/60 bg-card/50 p-4 hover:bg-accent/50 hover:border-border text-card-foreground peer-data-[state=checked]:border-emerald-500 peer-data-[state=checked]:bg-emerald-500/5 peer-data-[state=checked]:shadow-sm cursor-pointer transition-all duration-200 h-full group"
                                        >
                                            <div className="p-2.5 rounded-full bg-emerald-500/10 text-emerald-500 mb-2.5 group-hover:scale-110 transition-transform duration-200">
                                                <Store className="h-5 w-5 text-emerald-400" />
                                            </div>
                                            <div className="text-center">
                                                <p className="font-semibold text-sm tracking-tight">Provider</p>
                                                <p className="text-[11px] text-muted-foreground font-normal mt-0.5 leading-snug">
                                                    List & rent gear
                                                </p>
                                            </div>
                                        </Label>
                                    </div>

                                    {/* Admin Option */}
                                    <div className="relative">
                                        <RadioGroupItem
                                            value="ADMIN"
                                            id="ADMIN"
                                            className="peer sr-only"
                                        />
                                        <Label
                                            htmlFor="ADMIN"
                                            className="flex flex-col items-center justify-center rounded-xl border-2 border-border/60 bg-card/50 p-4 hover:bg-accent/50 hover:border-border text-card-foreground peer-data-[state=checked]:border-amber-500 peer-data-[state=checked]:bg-amber-500/5 peer-data-[state=checked]:shadow-sm cursor-pointer transition-all duration-200 h-full group"
                                        >
                                            <div className="p-2.5 rounded-full bg-amber-500/10 text-amber-500 mb-2.5 group-hover:scale-110 transition-transform duration-200">
                                                <ShieldCheck className="h-5 w-5 text-amber-400" />
                                            </div>
                                            <div className="text-center">
                                                <p className="font-semibold text-sm tracking-tight">Admin</p>
                                                <p className="text-[11px] text-muted-foreground font-normal mt-0.5 leading-snug">
                                                    Manage platform
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
                                <FormLabel className="text-xs font-semibold text-foreground/90">
                                    Full Name
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="John Doe"
                                        className="h-10 bg-background/50 border-border/60 focus-visible:ring-primary/20 focus-visible:border-primary transition-all"
                                        {...field}
                                    />
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
                                <FormLabel className="text-xs font-semibold text-foreground/90">
                                    Email Address
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        type="email"
                                        placeholder="john@example.com"
                                        className="h-10 bg-background/50 border-border/60 focus-visible:ring-primary/20 focus-visible:border-primary transition-all"
                                        {...field}
                                    />
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
                                <FormLabel className="text-xs font-semibold text-foreground/90">
                                    Password
                                </FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Input
                                            type={showPassword ? "text" : "password"}
                                            placeholder="••••••••"
                                            className="h-10 pr-10 bg-background/50 border-border/60 focus-visible:ring-primary/20 focus-visible:border-primary transition-all"
                                            {...field}
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            className="cursor-pointer absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-muted-foreground/70 hover:text-foreground transition-colors"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-4 w-4" />
                                            ) : (
                                                <Eye className="h-4 w-4" />
                                            )}
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
                                <FormLabel className="text-xs font-semibold text-foreground/90">
                                    Phone Number
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="+1 (555) 000-0000"
                                        className="h-10 bg-background/50 border-border/60 focus-visible:ring-primary/20 focus-visible:border-primary transition-all"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                {/* LOCATION INFO GRID */}
                <div className="space-y-4 pt-3 border-t border-border/40">
                    <div className="flex items-center justify-between">
                        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80">
                            Location Details
                        </p>
                        <span className="text-[10px] uppercase font-medium tracking-wide text-muted-foreground/60 bg-muted/50 px-2 py-0.5 rounded">
                            Optional
                        </span>
                    </div>

                    <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-xs font-semibold text-foreground/90">
                                    Street Address
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="123 Adventure Way"
                                        className="h-10 bg-background/50 border-border/60 focus-visible:ring-primary/20 focus-visible:border-primary transition-all"
                                        {...field}
                                    />
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
                                    <FormLabel className="text-xs font-semibold text-foreground/90">
                                        City
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Denver"
                                            className="h-10 bg-background/50 border-border/60 focus-visible:ring-primary/20 focus-visible:border-primary transition-all"
                                            {...field}
                                        />
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
                                    <FormLabel className="text-xs font-semibold text-foreground/90">
                                        Country
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="United States"
                                            className="h-10 bg-background/50 border-border/60 focus-visible:ring-primary/20 focus-visible:border-primary transition-all"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                {/* Avatar Image Upload */}
                <FormField
                    control={form.control}
                    name="image"
                    render={() => (
                        <FormItem className="space-y-2 pt-1 border-t border-border/40">
                            <FormLabel className="text-xs font-semibold text-foreground/90">
                                Profile Image
                            </FormLabel>
                            <FormControl>
                                <div className="space-y-3">
                                    <Input
                                        disabled={isUploadingImage}
                                        key={fileInputKey}
                                        type="file"
                                        accept="image/*"
                                        className="h-10 text-xs text-muted-foreground file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 bg-background/50 border-border/60 focus-visible:ring-primary/20 transition-all cursor-pointer"
                                        onChange={async (e) => {
                                            const file = e.target.files?.[0];
                                            if (!file) return;
                                            const imageUrl = await uploadImage(file);
                                            if (!imageUrl) return;
                                            form.setValue("image", imageUrl);
                                            setPreviewImage(imageUrl);
                                            form.clearErrors("image");
                                        }}
                                    />

                                    {previewImage && (
                                        <div className="flex items-center gap-4 p-3 rounded-xl border border-border/50 bg-accent/20 backdrop-blur-sm animate-in fade-in-50 duration-200">
                                            <Image
                                                src={previewImage}
                                                alt="Profile preview"
                                                width={96}
                                                height={96}
                                                className="h-16 w-16 rounded-full object-cover border-2 border-primary/30 shadow-sm"
                                            />
                                            <div className="space-y-1">
                                                <p className="text-xs font-medium text-foreground">
                                                    Preview Ready
                                                </p>
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="sm"
                                                    className="cursor-pointer h-8 text-xs font-medium text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive/20 transition-colors"
                                                    onClick={() => {
                                                        setPreviewImage("");
                                                        form.setValue("image", "", {
                                                            shouldValidate: true,
                                                            shouldDirty: true,
                                                        });
                                                        setFileInputKey((prev) => prev + 1);
                                                    }}
                                                >
                                                    Remove Image
                                                </Button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </FormControl>
                            <FormDescription className="text-[11px] text-muted-foreground/80">
                                Upload a profile picture (optional).
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Submit Button */}
                <Button
                    type="submit"
                    className={`w-full h-11 font-semibold text-sm shadow-md transition-all duration-200 ${isSubmitting ? "cursor-not-allowed opacity-80" : "cursor-pointer hover:shadow-lg active:scale-[0.99]"
                        }`}
                    disabled={isSubmitting || isUploadingImage}
                >
                    {isSubmitting || isUploadingImage ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin text-primary-foreground" />
                            {isUploadingImage ? "Uploading Image..." : "Creating Account..."}
                        </>
                    ) : (
                        <>
                            Register <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </>
                    )}
                </Button>
            </form>
        </Form>
    );
};

export default RegistrationForm;