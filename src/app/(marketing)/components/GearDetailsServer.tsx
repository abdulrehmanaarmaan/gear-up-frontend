import * as React from "react";
import Link from "next/link";
import {
    Star,
    ShieldCheck,
    CheckCircle2,
    ChevronRight,
    Truck,
    MessageSquare,
    User,
    Award
} from "lucide-react";

// shadcn/ui component imports
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getGearDetails } from "@/app/public.actions";
import Gallery from "./ImageThumbnails";
import QuickActions from "./QuickActions";
import { IReview } from "../marketing.interfaces";
import CreateRentalForm from "./CreateRentalForm";

export default async function GearDetailsServer({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params

    const { data } = await getGearDetails(id)

    return (
        <div className="min-h-screen bg-background text-foreground pb-24">

            {/* BREADCRUMB HEADER */}
            <div className="border-b border-border/60 bg-card/50 py-3">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="flex items-center space-x-2 text-xs text-muted-foreground">
                        <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
                        <ChevronRight className="w-3.5 h-3.5" />
                        <Link href="/gear" className="hover:text-foreground transition-colors">Gear Marketplace</Link>
                        <ChevronRight className="w-3.5 h-3.5" />
                        <Link href={`/gear?category=${data?.category?.slug}`} className="hover:text-foreground transition-colors">
                            {data?.category?.name}
                        </Link>
                        <ChevronRight className="w-3.5 h-3.5" />
                        <span className="text-foreground font-medium truncate max-w-50 sm:max-w-none">{data?.title}</span>
                    </nav>
                </div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-6">

                {/* TITLE & QUICK ACTIONS */}
                <QuickActions data={data} />

                {/* MAIN LAYOUT: MEDIA + RENTAL CARD */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

                    {/* LEFT COLUMN: IMAGES & DETAILS (7 COLS) */}
                    <div className="lg:col-span-7 space-y-10">

                        {/* Gallery Component */}
                        <Gallery data={data} />

                        {/* HOST / PROVIDER INFO BANNER */}
                        <Card className="border-border/80 bg-card shadow-sm">
                            <CardContent className="p-6 flex items-center justify-between gap-4">
                                <div className="flex items-center gap-4">
                                    <Avatar className="h-14 w-14 border-2 border-primary/20">
                                        <AvatarImage src={data?.provider?.image} alt={data?.provider?.name} />
                                        <AvatarFallback><User /></AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-bold text-base text-foreground">{data?.provider?.name}</h3>
                                            {data?.provider?.isVerified && (
                                                <Badge variant="secondary" className="bg-primary/10 text-primary border-none text-[10px] gap-1 px-2">
                                                    <CheckCircle2 className="w-3 h-3" /> Verified Provider
                                                </Badge>
                                            )}
                                        </div>
                                        <p className="text-xs text-muted-foreground mt-0.5">
                                            Member since {data?.provider?.createdAt} • {data?.provider?.name} rentals
                                        </p>
                                        <div className="flex items-center gap-2 mt-1.5 text-xs">
                                            <span className="flex items-center gap-1 font-semibold text-amber-500">
                                                <Star className="w-3.5 h-3.5 fill-current" />
                                                {
                                                    data?.reviews?.length > 0
                                                        ? (
                                                            data?.reviews?.reduce(
                                                                (sum: number, review: IReview) => sum + review.rating,
                                                                0
                                                            ) / data.reviews.length
                                                        ).toFixed(1)
                                                        : 0.0
                                                }
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <Button variant="outline" size="sm" className="hidden sm:flex gap-2 border-border/80">
                                    <MessageSquare className="w-4 h-4" /> Contact
                                </Button>
                            </CardContent>
                        </Card>

                        {/* TABBED DETAILS & SPECIFICATIONS */}
                        <Tabs defaultValue="overview" className="w-full">
                            <TabsList className="grid w-full grid-cols-3 bg-muted/60 p-1 rounded-xl">
                                <TabsTrigger value="overview" className="rounded-lg font-semibold text-xs sm:text-sm">Overview</TabsTrigger>
                                <TabsTrigger value="specs" className="rounded-lg font-semibold text-xs sm:text-sm">Specifications</TabsTrigger>
                                <TabsTrigger value="reviews" className="rounded-lg font-semibold text-xs sm:text-sm">Reviews ({data?.reviews?.length})</TabsTrigger>
                            </TabsList>

                            {/* OVERVIEW CONTENT */}
                            <TabsContent value="overview" className="mt-6 space-y-6">
                                <div className="space-y-3">
                                    <h3 className="text-lg font-bold text-foreground">Equipment Description</h3>
                                    <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">
                                        {data?.description}
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-border/60">
                                    <div className="flex items-start gap-3 p-3.5 rounded-xl bg-muted/30 border border-border/40">
                                        <Truck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                        <div>
                                            <h4 className="text-xs font-bold text-foreground">Flexible Pickup</h4>
                                            <p className="text-xs text-muted-foreground mt-0.5">Direct handoff at {data?.location}</p>
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>

                            {/* SPECIFICATIONS CONTENT */}
                            <TabsContent value="specs" className="mt-6">
                                <Card className="border-border/80">
                                    <CardHeader className="p-4 pb-2">
                                        <CardTitle className="text-base font-bold">Technical Specifications</CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-4 pt-0">
                                        <dl className="divide-y divide-border/60 text-xs sm:text-sm">
                                            {Object.entries(data?.specifications ?? {}).map(([key, value]) => (
                                                <div key={key} className="py-2.5 grid grid-cols-3 gap-4">
                                                    <dt className="font-semibold text-muted-foreground">{key}</dt>
                                                    <dd className="col-span-2 text-foreground font-medium">
                                                        {String(value)}
                                                    </dd>
                                                </div>
                                            ))}
                                        </dl>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            {/* REVIEWS CONTENT */}
                            <TabsContent value="reviews" className="mt-6 space-y-6">
                                <div className="space-y-4">
                                    {data?.reviews.map((rev: IReview) => (
                                        <Card key={rev?.id} className="border-border/80 bg-card">
                                            <CardContent className="p-4 space-y-3">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-3">
                                                        <Avatar className="h-9 w-9">
                                                            <AvatarImage src={rev?.customer?.image} />
                                                            <AvatarFallback>{rev.customer?.name[0]}</AvatarFallback>
                                                        </Avatar>
                                                        <div>
                                                            {/* <p className="text-sm font-bold text-foreground">{rev.user}</p> */}
                                                            <p className="text-[11px] text-muted-foreground">{new Date(rev?.createdAt as string).toLocaleDateString()}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-0.5 text-amber-500 text-xs font-semibold">
                                                        {[...Array(rev.rating)].map((_, i) => (
                                                            <Star key={i} className="w-3.5 h-3.5 fill-current" />
                                                        ))}
                                                    </div>
                                                </div>
                                                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                                                    "{rev?.review}"
                                                </p>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </TabsContent>
                        </Tabs>

                    </div>

                    {/* RIGHT COLUMN: RENTAL CALCULATION WIDGET (5 COLS) */}
                    <div className="lg:col-span-5">
                        <div className="sticky top-24 space-y-4">

                            <Card className="border-border/80 shadow-lg bg-card overflow-hidden">
                                <CardHeader className="bg-muted/40 p-6 pb-4 border-b border-border/60">
                                    <div className="flex items-baseline justify-between">
                                        <div>
                                            <span className="text-3xl font-extrabold text-foreground">${data?.pricePerDay}</span>
                                            <span className="text-muted-foreground text-xs"> / day</span>
                                        </div>
                                        <Badge variant="outline" className="border-emerald-500/40 text-emerald-600 bg-emerald-500/10 font-medium text-xs">
                                            In Stock ({data?.availableQuantity})
                                        </Badge>
                                    </div>
                                </CardHeader>

                                <CardContent className="p-6 space-y-4">

                                    {/* Rental Form */}
                                    <CreateRentalForm data={data} />

                                </CardContent>

                                <CardFooter className="bg-muted/20 p-4 border-t border-border/60 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                                    <ShieldCheck className="w-4 h-4 text-emerald-500" /> 100% Security Deposit Protected
                                </CardFooter>
                            </Card>

                            {/* Safety/Trust Card */}
                            <Card className="border-border/60 bg-muted/20 p-4">
                                <div className="flex items-start gap-3">
                                    <Award className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                    <div className="text-xs space-y-1">
                                        <p className="font-semibold text-foreground">Verified Quality Standard</p>
                                        <p className="text-muted-foreground">Every listed item undergoes condition verification before handoff.</p>
                                    </div>
                                </div>
                            </Card>

                        </div>
                    </div>

                </div>

            </div>
        </div >
    );
}