"use client"

import { ICategory } from '@/app/(marketing)/marketing.interfaces';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

import { CheckCircle2, DollarSign, HelpCircle, Layers, MapPin, PackageCheck, Plus, ShieldAlert, Sparkles, Trash2, Upload, X } from 'lucide-react';
import Image from 'next/image';
import React, { useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { GearFormValues, gearSchema } from '../provider.schemas';
import { addGear } from '../provider.actions';
import { toast } from 'sonner';
import { } from '../provider.types';
import { Badge } from '@/components/ui/badge';
import { zodResolver } from '@hookform/resolvers/zod';

const AddGearForm = ({ categories }: { categories: ICategory[] }) => {

    const { handleSubmit, register, setValue, reset, control, watch, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(gearSchema),
        defaultValues: {
            title: "",
            categoryId: "",
            brand: "",
            description: "",
            location: "",
            quantity: 1,
            pricePerDay: 1,
            images: [],
            specifications: {},
        },
    })

    const pricePerDay = watch("pricePerDay") as number ?? 0
    const platformFee = pricePerDay * 0.15
    const providerEarnings = pricePerDay - platformFee

    const [specifications, setSpecifications] = useState([{ key: "", value: "" }])

    const handleSpecChange = (index: number, field: "key" | "value", value: string) => {
        setSpecifications(prev =>
            prev.map((spec, i) => (i === index ? { ...spec, [field]: value } : spec))
        )
    }

    const addSpecRow = () => {
        setSpecifications(prev => [...prev, { key: "", value: "" }])
    }

    const removeSpecRow = (index: number) => {
        setSpecifications(prev => prev.filter((_, i) => i !== index))
    }

    const [isUploading, setIsUploading] = useState(false);

    const images = watch("images") ?? [];

    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            handleUploadImages(file)
        }
        // reset so selecting the same file again still fires onChange
        e.target.value = ""
    }

    const handleUploadImages = async (file: File) => {

        if (!file.type.startsWith("image/")) {
            toast.error("Please select an image.");
            return;
        }

        const MAX_SIZE = 5 * 1024 * 1024;

        if (file.size > MAX_SIZE) {
            toast.error("Image must be under 5MB");
            return;
        }

        if (images.length >= 6) {
            toast.error("You can upload up to 6 images.")
            return
        }

        setIsUploading(true)

        try {

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

            const data = await response.json();

            const updated = [...images, data?.secure_url]

            if (images.includes(data?.secure_url)) {
                return;
            }

            setValue("images", updated, {
                shouldValidate: true,
                shouldDirty: true
            })
        }

        catch {
            toast.error("Image upload failed. Please try again.")
        }

        finally {
            setIsUploading(false)
        }
    }

    const handleRemoveImage = (index: number) => {
        const updated = images.filter((_, i) => i !== index)

        setValue("images", updated, {
            shouldValidate: true,
            shouldDirty: true
        })
    }

    const onSubmit = async (values: GearFormValues) => {
        console.log("onSubmit values:", values);
        const specificationObject = Object.fromEntries(
            specifications
                .filter(spec => spec.key.trim())
                .map(spec => [spec.key, spec.value])
        )

        const result = await addGear({ ...values, specifications: specificationObject })

        if (result?.success) {
            toast.success(result.message)
            reset()
            setValue("images", [])
            setSpecifications([{ key: "", value: "" }])
        } else {
            toast.error(result?.message)
        }
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* LEFT & CENTER COLUMNS: PRIMARY DETAILS (2 COLUMNS) */}
            <div className="lg:col-span-2 space-y-6">
                {/* BASIC INFORMATION CARD */}
                <Card className="border-border/80 bg-card shadow-sm">
                    <CardHeader className="p-5 pb-3 border-b border-border/60">
                        <div className="flex items-center gap-2 text-primary">
                            <PackageCheck className="w-4 h-4" />
                            <CardTitle className="text-base font-bold text-foreground">Basic Information</CardTitle>
                        </div>
                        <CardDescription className="text-xs">
                            Provide an accurate title, category, and descriptive summary of your
                            equipment.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-5 space-y-4">
                        {/* Title */}
                        <div className="space-y-1.5">
                            <Label htmlFor="title" className="text-xs font-bold text-foreground">
                                Gear Title <span className="text-rose-500">*</span>
                            </Label>
                            <Input
                                id="title"
                                placeholder="e.g. MSR Hubba Hubba NX 2-Person Lightweight Backpacking Tent"
                                {...register("title")}
                                className="h-10 text-xs bg-background border-border/80 focus-visible:ring-1 focus-visible:ring-primary"
                            />
                            {errors.title && (
                                <p className="text-xs text-destructive">
                                    {errors.title.message}
                                </p>
                            )}
                        </div>

                        {/* Category & Brand Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <Label htmlFor="category" className="text-xs font-bold text-foreground">
                                    Category <span className="text-rose-500">*</span>
                                </Label>
                                <Controller
                                    control={control}
                                    name="categoryId"
                                    render={({ field }) => (
                                        <Select
                                            value={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <SelectTrigger className="cursor-pointer h-10 text-xs bg-background border-border/80">
                                                <SelectValue placeholder="Select Category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {categories?.map((cat) => (
                                                    <SelectItem key={cat?.id} value={cat?.id}
                                                        className="cursor-pointer text-xs">
                                                        {cat?.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    )}
                                />

                                {errors.categoryId && (
                                    <p>{errors.categoryId.message}</p>
                                )}
                            </div>
                            <div className="space-y-1.5">
                                <Label htmlFor="brand" className="text-xs font-bold text-foreground">
                                    Brand / Manufacturer <span className="text-rose-500">*</span>
                                </Label>
                                <Input
                                    id="brand"
                                    placeholder="e.g. Mountain Hardwear, Trek, GoPro"
                                    {...register("brand")}
                                    className="h-10 text-xs bg-background border-border/80 focus-visible:ring-1 focus-visible:ring-primary"
                                />
                                {errors.brand && (
                                    <p className="text-xs text-destructive">
                                        {errors.brand.message}
                                    </p>
                                )}
                            </div>
                        </div>
                        {/* Description */}
                        <div className="space-y-1.5">
                            <Label htmlFor="description" className="text-xs font-bold text-foreground">
                                Detailed Description <span className="text-rose-500">*</span>
                            </Label>
                            <Textarea
                                id="description"
                                rows={4}
                                placeholder="Describe gear features, condition, included accessories, and recommended use cases..."
                                {...register("description")}
                                className="text-xs bg-background border-border/80 focus-visible:ring-1 focus-visible:ring-primary leading-relaxed resize-y"
                            />
                            {errors.description && (
                                <p className="text-xs text-destructive">
                                    {errors.description.message}
                                </p>
                            )}
                        </div>
                        {/* Pickup Address */}
                        <div className="space-y-1.5">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="pickupAddress" className="text-xs font-bold text-foreground flex items-center gap-1">
                                    <MapPin className="w-3.5 h-3.5 text-muted-foreground" /> Pickup
                                    Location Address <span className="text-rose-500">*</span>
                                </Label>
                                <span className="text-[11px] text-muted-foreground">Visible to customers
                                    upon booking confirmation</span>
                            </div>
                            <Input
                                id="pickupAddress"
                                placeholder="e.g. 1240 Boulder Ave, Denver, CO 80202"
                                {...register("location")}
                                className="h-10 text-xs bg-background border-border/80 focus-visible:ring-1 focus-visible:ring-primary"
                            />
                            {errors.location && (
                                <p className="text-xs text-destructive">
                                    {errors.location.message}
                                </p>
                            )}
                        </div>
                    </CardContent>
                </Card>
                {/* IMAGE UPLOADS CARD */}
                <Card className="border-border/80 bg-card shadow-sm">
                    <CardHeader className="p-5 pb-3 border-b border-border/60">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-primary">
                                <Upload className="w-4 h-4" />
                                <CardTitle className="text-base font-bold text-foreground">Gear Photo
                                    Gallery</CardTitle>
                            </div>
                            <span className="text-xs text-muted-foreground font-mono">{images.length} / 6
                                Photos</span>
                        </div>
                        <CardDescription className="text-xs">
                            Upload clear high-resolution photos of your actual equipment. First photo
                            will be the main listing cover.
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="p-5 space-y-4">
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            disabled={isUploading}
                            onChange={handleFileChange}
                            className="hidden"
                        />

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">

                            {images.map((imgUrl, idx) => (
                                <div key={idx} className="relative group aspect-video rounded-lg border border-border/80 bg-muted overflow-hidden">
                                    <Image unoptimized src={imgUrl} alt={`Gear Preview ${idx + 1}`} fill className="object-cover" />
                                    {idx === 0 && (
                                        <Badge className="absolute top-1.5 left-1.5 bg-primary text-primary-foreground text-[9px] font-bold px-1.5 py-0"> Cover Image </Badge>)}
                                    <button type="button" onClick={() => handleRemoveImage(idx)} className="cursor-pointer absolute top-1.5 right-1.5 bg-background/80 hover:bg-rose-600 hover:text-white text-muted-foreground p-1 rounded-full transition-colors backdrop-blur-sm" > <X className="w-3.5 h-3.5" /> </button>
                                </div>))}

                            {errors.images && (
                                <p className="text-xs text-destructive">{errors.images.message}</p>
                            )}

                            {images.length < 6 && (
                                <button
                                    type="button"
                                    disabled={isUploading}
                                    onClick={() => fileInputRef.current?.click()}
                                    className="border-2 border-dashed border-border/80 hover:border-primary/50 bg-muted/20 rounded-lg aspect-video flex flex-col items-center justify-center p-3 text-center transition-colors cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    <Upload className="w-5 h-5 text-muted-foreground mb-1" />
                                    <span className="text-[11px] font-medium text-muted-foreground">
                                        {isUploading ? "Uploading..." : "Add Photo"}
                                    </span>
                                    <span className="text-[9px] text-slate-400">Up to 6 images</span>
                                </button>
                            )}
                        </div>
                    </CardContent>
                </Card>
                {/* DYNAMIC SPECIFICATIONS & FEATURES */}
                <Card className="border-border/80 bg-card shadow-sm">
                    <CardHeader className="p-5 pb-3 border-b border-border/60">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-primary">
                                <Layers className="w-4 h-4" />
                                <CardTitle className="text-base font-bold text-foreground">Specifications & Attributes</CardTitle>
                            </div>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={addSpecRow}
                                className="cursor-pointer h-7 text-xs gap-1 border-border/80"
                            >
                                <Plus className="w-3 h-3" /> Add Attribute
                            </Button>
                        </div>
                        ...
                    </CardHeader>
                    <CardContent className="p-5 space-y-3">
                        {specifications.map((spec, index) => (
                            <div key={index} className="flex items-center gap-3">
                                <Input
                                    placeholder="Spec Name (e.g. Weight)"
                                    value={spec.key}
                                    onChange={(e) => handleSpecChange(index, "key", e.target.value)}
                                    className="h-9 text-xs bg-background border-border/80 flex-1"
                                />
                                <Input
                                    placeholder="Spec Value (e.g. 3.8 lbs)"
                                    value={spec.value}
                                    onChange={(e) => handleSpecChange(index, "value", e.target.value)}
                                    className="h-9 text-xs bg-background border-border/80 flex-1"
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => removeSpecRow(index)}
                                    className="cursor-pointer h-9 w-9 text-muted-foreground hover:text-rose-600 shrink-0"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
            {/* RIGHT COLUMN: PRICING, AVAILABILITY & PUBLISH ACTION (1 COLUMN) */}
            <div className="space-y-6">
                {/* PRICING & REVENUE CARD */}
                <Card className="border-border/80 bg-card shadow-sm">
                    <CardHeader className="p-5 pb-3 border-b border-border/60">
                        <div className="flex items-center gap-2 text-primary">
                            <DollarSign className="w-4 h-4" />
                            <CardTitle className="text-base font-bold text-foreground">Pricing & Revenue</CardTitle>
                        </div>
                        <CardDescription className="text-xs">
                            Set your daily rental rate and preview your net payout calculation.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-5 space-y-4">
                        {/* Price Per Day */}
                        <div className="space-y-1.5">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="pricePerDay" className="text-xs font-bold text-foreground">
                                    Daily Rate ($ USD) <span className="text-rose-500">*</span>
                                </Label>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <HelpCircle className="w-3.5 h-3.5 text-muted-foreground cursor-pointer" />
                                        </TooltipTrigger>
                                        <TooltipContent className="text-xs max-w-xs">
                                            Market average for similar gear is $25.00 - $45.00 / day.
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground">$</span>
                                <Input
                                    id="pricePerDay"
                                    type="number"
                                    step="0.01"
                                    min="1"
                                    {...register("pricePerDay", {
                                        valueAsNumber: true
                                    })}
                                    className="pl-7 h-10 text-xs font-mono font-bold bg-background border-border/80 focus-visible:ring-1 focus-visible:ring-primary"
                                />
                                {errors.pricePerDay && (
                                    <p className="text-xs text-destructive">{errors.pricePerDay.message}</p>
                                )}
                            </div>
                        </div>
                        {/* Financial Revenue Breakdown Box */}
                        <div className="p-3.5 rounded-lg bg-muted/40 border border-border/80 space-y-2 text-xs">
                            <div className="flex justify-between items-center text-muted-foreground">
                                <span>Customer Daily Price:</span>
                                <span className="font-mono text-foreground font-semibold">${pricePerDay.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center text-muted-foreground">
                                <span className="flex items-center gap-1">GearUp Platform Fee (15%):</span>
                                <span className="font-mono text-rose-500 font-medium">-${platformFee.toFixed(2)}</span>
                            </div>
                            <Separator className="bg-border/60" />
                            <div className="flex justify-between items-center text-xs font-bold pt-0.5">
                                <span className="text-emerald-600 dark:text-emerald-400">Your Net Earnings / Day:</span>
                                <span className="font-mono text-emerald-600 dark:text-emerald-400 text-sm">${providerEarnings.toFixed(2)}</span>
                            </div>
                        </div>
                        {/* Quantity / Inventory Stock */}
                        <div className="space-y-1.5 pt-1">
                            <Label htmlFor="inventory" className="text-xs font-bold text-foreground">
                                Available Quantity in Stock <span className="text-rose-500">*</span>
                            </Label>
                            <Input
                                id="inventory"
                                type="number"
                                min="1"
                                {...register("quantity", {
                                    valueAsNumber: true
                                })}
                                className="h-10 text-xs font-mono bg-background border-border/80 focus-visible:ring-1 focus-visible:ring-primary"
                            />
                            {errors.quantity && (
                                <p className="text-xs text-destructive">{errors.quantity.message}</p>
                            )}
                        </div>
                    </CardContent>
                </Card>
                {/* RENTAL SETTINGS & TOGGLES */}
                <Card className="border-border/80 bg-card shadow-sm">
                    <CardHeader className="p-5 pb-3 border-b border-border/60">
                        <div className="flex items-center gap-2 text-primary">
                            <Sparkles className="w-4 h-4" />
                            <CardTitle className="text-base font-bold text-foreground">Rental
                                Preferences</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="p-5 space-y-4">
                        {/* Instant Booking Toggle */}
                        <div className="flex items-center justify-between gap-2">
                            <div className="space-y-0.5">
                                <Label className="text-xs font-bold text-foreground">Instant Booking</Label>
                                <p className="text-[11px] text-muted-foreground">
                                    Automatically confirm orders without manual provider approval.
                                </p>
                            </div>
                        </div>
                        <Separator className="bg-border/60" />
                        {/* Security Deposit Note */}
                        <div className="flex gap-2.5 items-start p-3 rounded-lg bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-500/20 text-[11px]">
                            <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
                            <p className="leading-normal">
                                All listings are covered by GearUp Rental Guarantee up to $2,000 against
                                damage or unreturned items.
                            </p>
                        </div>
                    </CardContent>
                </Card>
                {/* PUBLISH SUBMIT BUTTONS */}
                <Card className="border-border/80 bg-card shadow-sm">
                    <CardContent className="p-5 space-y-3">
                        <Button
                            type="submit"
                            disabled={isSubmitting || isUploading}
                            className="cursor-pointer w-full h-11 bg-primary text-primary-foreground font-bold text-xs gap-2 shadow-sm hover:opacity-90 transition-opacity"
                        >
                            {isSubmitting ? (
                                <>Publishing Listing...</>
                            ) : (
                                <>
                                    <CheckCircle2 className="w-4 h-4" /> Publish Rental Listing
                                </>
                            )}
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </form>
    );
};

export default AddGearForm;