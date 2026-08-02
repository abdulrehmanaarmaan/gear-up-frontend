"use client"

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, CheckCircle2, Eye, Layers, MapPin, Plus, Save, Sparkles, Tag, Trash2, Upload, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Controller, useForm } from 'react-hook-form';
import { IGearResponse } from '../provider.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { UpdateGearFormValues, updateGearSchema } from '../provider.schemas';
import { ICategory } from '@/app/(marketing)/marketing.interfaces';
import { useRef, useState } from 'react';
import { toast } from 'sonner';
import slugify from "slugify"
import { editMyGear } from '../provider.actions';


const EditGearForm = ({ id, gearDetails, categories }: { id: string, gearDetails: IGearResponse, categories: ICategory[] }) => {

    const {
        handleSubmit,
        register,
        control,
        watch,
        setValue,
        formState: { errors, isSubmitting }
    } = useForm({
        resolver: zodResolver(updateGearSchema),
        defaultValues: {
            title: gearDetails?.title,
            slug: gearDetails?.slug,
            categoryId: gearDetails?.categoryId,
            brand: gearDetails?.brand,
            model: gearDetails?.model,
            description: gearDetails?.description,
            location: gearDetails?.location,
            condition: gearDetails?.condition,
            quantity: gearDetails?.quantity,
            pricePerDay: gearDetails?.pricePerDay,
            images: gearDetails?.images ?? [],
            specifications: gearDetails?.specifications,
            isAvailable: gearDetails?.isAvailable,
        },
    })

    const images = watch("images") ?? []
    const [isUploading, setIsUploading] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleRemoveImage = (index: number) => {
        setValue("images", images.filter((_, i) => i !== index), { shouldValidate: true, shouldDirty: true })
    }

    const [specifications, setSpecifications] = useState(
        gearDetails?.specifications
            ? Object.entries(gearDetails?.specifications).map(([key, value]) => ({ key, value: String(value ?? "") }))
            : [{ key: "", value: "" }]
    )

    const handleSpecChange = (index: number, field: "key" | "value", value: string) => {
        setSpecifications(prev => prev.map((spec, i) => (i === index ? { ...spec, [field]: value } : spec)))
    }

    const addSpecRow = () => setSpecifications(prev => [...prev, { key: "", value: "" }])
    const removeSpecRow = (index: number) => setSpecifications(prev => prev.filter((_, i) => i !== index))

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

    const handleSlugAutoGenerate = () => {
        const title = watch("title")
        if (!title) return
        setValue("slug", slugify(title, { lower: true, strict: true }), { shouldValidate: true, shouldDirty: true })
    }

    const gearConditions = ["New (Unopened)", "Excellent", "Good", "Fair"]

    const onSubmit = async (values: UpdateGearFormValues) => {

        const result = await editMyGear(id, values)

        if (result?.success) {
            toast.success(result?.message)
        }
        else {
            toast.error(result?.message)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" asChild className="h-8 w-8 -ml-2">
                            <Link href="/dashboard/provider/my-gears">
                                <ArrowLeft className="w-4 h-4" />
                            </Link>
                        </Button>
                        <Badge variant="outline" className="text-xs font-mono">ID: {id}</Badge>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                        Edit Gear Listing
                    </h1>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                        Update information, manage inventory, pricing, and availability status.
                    </p>
                </div>
                <div className="flex items-center gap-3 self-end sm:self-auto">
                    <Button variant="outline" type="button" asChild className="gap-2 text-xs sm:text-sm h-10">
                        <Link href={`/gears/${id}`} target="_blank">
                            <Eye className="w-4 h-4" />
                            Preview Listing
                        </Link>
                    </Button>
                    <Button disabled={isUploading || isSubmitting} type="submit" className="cursor-pointer gap-2 text-xs sm:text-sm font-semibold h-10 shadow-sm">
                        <Save className="w-4 h-4" />
                        {isSubmitting ? "Saving..." : "Save Changes"}
                    </Button>
                </div>
            </div>
            {/* 2. MAIN FORM GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* LEFT COLUMN: Main Details (2 Cols Wide on Desktop) */}
                <div className="lg:col-span-2 space-y-6">
                    {/* CARD 1: Basic Information */}
                    <Card className="border-border/60 shadow-sm">
                        <CardHeader className="border-b border-border/40 bg-muted/20 pb-4">
                            <CardTitle className="text-base font-bold flex items-center gap-2">
                                <Tag className="w-4 h-4 text-primary" />
                                Basic Information
                            </CardTitle>
                            <CardDescription className="text-xs">
                                General title, categorization, brand, and slug URL details.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-6 space-y-4">
                            {/* Title */}
                            <div className="space-y-1.5">
                                <Label htmlFor="title" className="text-xs font-semibold">
                                    Listing Title <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="title"
                                    {...register("title")}
                                    placeholder="e.g. Sony FX3 Cinema Line Camera"
                                    className="text-xs sm:text-sm h-10 border-border/80"
                                    required
                                />
                                {errors.title && <p className="text-xs text-destructive">{errors.title.message}</p>}
                            </div>
                            {/* Slug with Generator */}
                            <div className="space-y-1.5">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="slug" className="text-xs font-semibold">
                                        URL Slug
                                    </Label>
                                    <button
                                        type="button"
                                        onClick={() => handleSlugAutoGenerate()}
                                        className="cursor-pointer text-[11px] text-primary hover:underline flex items-center gap-1 font-medium"
                                    >
                                        <Sparkles className="w-3 h-3" /> Auto-generate
                                    </button>
                                </div>
                                <Input
                                    id="slug"
                                    {...register("slug")}
                                    placeholder="sony-fx3-cinema-line-camera"
                                    className="text-xs font-mono h-10 border-border/80"
                                />
                                {errors.slug && <p className="text-xs text-destructive">{errors.slug.message}</p>}
                            </div>
                            {/* Category, Brand & Model Row */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                                {/* Category */}
                                <div className="space-y-1.5">
                                    <Label className="text-xs font-semibold">Category <span className="text-destructive">*</span></Label>
                                    <Controller
                                        control={control}
                                        name="categoryId"
                                        render={({ field }) => (
                                            <Select value={field.value} onValueChange={field.onChange}>
                                                <SelectTrigger className="cursor-pointer h-10 text-xs border-border/80">
                                                    <SelectValue placeholder="Select Category" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {categories?.map((cat) => (
                                                        <SelectItem className="cursor-pointer" key={cat?.id} value={cat?.id}>{cat?.name}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        )}
                                    />
                                </div>
                                {/* Brand */}
                                <div className="space-y-1.5">
                                    <Label htmlFor="brand" className="text-xs font-semibold">Brand</Label>
                                    <Input
                                        id="brand"
                                        {...register("brand")}
                                        placeholder="e.g. Sony"
                                        className="text-xs h-10 border-border/80"
                                    />
                                    {errors.brand && <p className="text-xs text-destructive">{errors.brand.message}</p>}
                                </div>
                                {/* Model */}
                                <div className="space-y-1.5">
                                    <Label htmlFor="model" className="text-xs font-semibold">Model</Label>
                                    <Input
                                        id="model"
                                        {...register("model")}
                                        placeholder="e.g. FX3"
                                        className="text-xs h-10 border-border/80"
                                    />
                                    {errors.model && <p className="text-xs text-destructive">{errors.model.message}</p>}
                                </div>
                            </div>
                            {/* Description */}
                            <div className="space-y-1.5 pt-2">
                                <Label htmlFor="description" className="text-xs font-semibold">
                                    Description
                                </Label>
                                <Textarea
                                    id="description"
                                    {...register("description")}
                                    rows={5}
                                    placeholder="Provide a detailed description of the gear, included accessories, and key features..."
                                    className="text-xs sm:text-sm border-border/80 resize-y"
                                />
                                {errors.description && <p className="text-xs text-destructive">{errors.description.message}</p>}
                            </div>
                        </CardContent>
                    </Card>
                    {/* CARD 2: Image Gallery Upload */}
                    <Card className="border-border/60 shadow-sm">
                        <CardHeader className="border-b border-border/40 bg-muted/20 pb-4">
                            <CardTitle className="text-base font-bold flex items-center gap-2">
                                <Upload className="w-4 h-4 text-primary" />
                                Gear Photos
                            </CardTitle>
                            <CardDescription className="text-xs">
                                Manage image URLs or upload clear photos of your item from multiple angles.
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="p-5 space-y-4">
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                disabled={isUploading || isSubmitting}
                                onChange={handleFileChange}
                                className="hidden"
                            />
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                                {images.map((imgUrl, idx) => (
                                    <div key={idx} className="relative group aspect-video rounded-lg border border-border/80 bg-muted overflow-hidden">
                                        <Image unoptimized src={imgUrl} alt={`Gear Preview ${idx + 1}`} fill className="object-cover" />
                                        {idx === 0 && (
                                            <Badge className="absolute top-1.5 left-1.5 bg-primary text-primary-foreground text-[9px] font-bold px-1.5 py-0"> Cover Image </Badge>)}
                                        <button type="button" onClick={() => handleRemoveImage(idx)} className="cursor-pointer absolute top-1.5 right-1.5 bg-background/80 hover:bg-rose-600 hover:text-white text-muted-foreground p-1 rounded-full transition-colors backdrop-blur-sm" > <X className="w-3.5 h-3.5" /> </button>                                    </div>))}
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
                    {/* CARD 3: Technical Specifications */}
                    <Card className="border-border/60 bg-card shadow-sm">
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
                        </CardHeader>
                        <CardContent className="p-6 space-y-4">
                            {/* Dynamic Spec List */}
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
                </div >
                {/* RIGHT COLUMN: Settings, Pricing & Inventory (1 Col Wide on Desktop) */}
                < div className="space-y-6" >
                    {/* CARD 4: Status & Availability */}
                    < Card className="border-border/60 shadow-sm" >
                        <CardHeader className="border-b border-border/40 bg-muted/20 pb-4">
                            <CardTitle className="text-base font-bold flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-primary" />
                                Status & Availability
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-5">
                            {/* Active Availability Switch */}
                            <div className="flex items-center justify-between space-x-2">
                                <div className="space-y-0.5">
                                    <Label className="text-xs font-semibold">Active Listing</Label>
                                    <p className="text-[11px] text-muted-foreground">
                                        Visible on public search results
                                    </p>
                                </div>
                                <Controller
                                    control={control}
                                    name="isAvailable"
                                    render={({ field }) => (
                                        <Switch className="cursor-pointer" checked={field.value ?? true} onCheckedChange={field.onChange} />
                                    )}
                                />
                            </div>
                            <Separator />
                            {/* Condition Selector */}
                            <div className="space-y-1.5">
                                <Label className="text-xs font-semibold">Item Condition <span className="text-destructive">*</span></Label>
                                <Controller
                                    control={control}
                                    name="condition"
                                    render={({ field }) => (
                                        <Select value={field.value} onValueChange={field.onChange} >
                                            <SelectTrigger className="cursor-pointer h-10 text-xs border-border/80">
                                                <SelectValue placeholder="Select Condition" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {gearConditions?.map((condition) => (
                                                    <SelectItem className="cursor-pointer" key={condition} value={condition.toUpperCase()}>{condition}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                            </div>
                        </CardContent>
                    </Card >
                    {/* CARD 5: Pricing & Inventory */}
                    < Card className="border-border/60 shadow-sm" >
                        <CardHeader className="border-b border-border/40 bg-muted/20 pb-4">
                            <CardTitle className="text-base font-bold">Pricing & Stock</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-4">
                            {/* Price Per Day */}
                            <div className="space-y-1.5">
                                <Label htmlFor="pricePerDay" className="text-xs font-semibold">
                                    Rate per Day ($) <span className="text-destructive">*</span>
                                </Label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-xs font-semibold">$</span>
                                    <Input
                                        id="pricePerDay"
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        {...register("pricePerDay", { valueAsNumber: true })}
                                        className="pl-7 text-xs sm:text-sm h-10 border-border/80 font-bold"
                                        required
                                    />
                                    {errors.pricePerDay && <p className="text-xs text-destructive">{errors.pricePerDay.message}</p>}
                                </div>
                            </div>
                            {/* Quantity */}
                            <div className="space-y-1.5">
                                <Label htmlFor="quantity" className="text-xs font-semibold">
                                    Total Quantity / Inventory Stock <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="quantity"
                                    type="number"
                                    min="1"
                                    {...register("quantity", { valueAsNumber: true })}
                                    className="text-xs sm:text-sm h-10 border-border/80"
                                    required
                                />
                                {errors.quantity && <p className="text-xs text-destructive">{errors.quantity.message}</p>}
                            </div>
                        </CardContent>
                    </Card >
                    {/* CARD 6: Location */}
                    < Card className="border-border/60 shadow-sm" >
                        <CardHeader className="border-b border-border/40 bg-muted/20 pb-4">
                            <CardTitle className="text-base font-bold flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-primary" />
                                Pickup Location
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-4">
                            <div className="space-y-1.5">
                                <Label htmlFor="location" className="text-xs font-semibold">
                                    Address / Pickup Hub
                                </Label>
                                <Input
                                    id="location"
                                    {...register("location")}
                                    placeholder="e.g. Downtown Studio, Building 4"
                                    className="text-xs h-10 border-border/80"
                                />
                                {errors.location && <p className="text-xs text-destructive">{errors.location.message}</p>}
                                <p className="text-[11px] text-muted-foreground mt-1">
                                    Exact location details are shared with verified renters upon reservation approval.
                                </p>
                            </div>
                        </CardContent>
                    </Card >
                    {/* BOTTOM SAVE TRIGGER FOR MOBILE */}
                    < div className="cursor-pointer block lg:hidden pt-2" >
                        <Button disabled={isUploading || isSubmitting} type="submit" className="cursor-pointer w-full h-12 text-sm font-bold shadow-md gap-2">
                            <Save className="w-4 h-4" />
                            {isSubmitting ? "Saving..." : "Save Changes"}
                        </Button>
                    </div >
                </div >
            </div >
        </form >
    );
};

export default EditGearForm;