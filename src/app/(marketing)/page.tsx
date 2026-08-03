import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, BadgeCheck, Calendar, ChevronRight, Search, ShieldCheck, SlidersHorizontal, Sparkles, Star, TrendingUp, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getGearCategories } from "../public.actions";
import { ICategory } from "./marketing.interfaces";

export default async function Home() {
  const { data } = await getGearCategories()
  return (
    < div className="min-h-screen bg-background text-foreground space-y-20 pb-16" >

      {/* 1. HERO SECTION */}
      < section className="relative overflow-hidden bg-slate-900 text-slate-50 pt-16 pb-24 lg:pt-28 lg:pb-32" >
        {/* Background glow effects */}
        < div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full overflow-hidden pointer-events-none opacity-30" >
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/40 blur-3xl rounded-full" />
          <div className="absolute top-1/2 right-0 w-80 h-80 bg-blue-500/30 blur-3xl rounded-full" />
        </div>

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Hero Text */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <Badge variant="outline" className="border-primary/50 text-primary-foreground bg-primary/10 px-3 py-1 text-sm rounded-full inline-flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                Next-Gen Outdoor Gear Rentals
              </Badge>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15]">
                Rent Premium Sports & Outdoor Gear <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-emerald-400 to-teal-300">Instantly.</span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal">
                Skip buying expensive gear for one-off trips. Rent high-end kayaks, camping kits, bikes, and skiing equipment directly from trusted local providers.
              </p>

              {/* Quick Search Widget */}
              <div className="bg-background text-foreground p-3 sm:p-4 rounded-2xl shadow-2xl border border-border/50 max-w-xl mx-auto lg:mx-0 mt-8">
                <form className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="What gear do you need? (e.g. Tent, Kayak)"
                      className="pl-10 h-12 bg-muted/40 border-none focus-visible:ring-1 focus-visible:ring-primary"
                    />
                  </div>
                  <Select>
                    <SelectTrigger className="w-full sm:w-37.5 h-12 bg-muted/40 border-none focus:ring-1 focus:ring-primary">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="camping">Camping</SelectItem>
                      <SelectItem value="water">Water Sports</SelectItem>
                      <SelectItem value="cycling">Cycling</SelectItem>
                      <SelectItem value="winter">Winter Sports</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button size="lg" className="h-12 px-6 font-semibold shrink-0">
                    Search
                  </Button>
                </form>
              </div>

              {/* Trust Micro-Badges */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs sm:text-sm text-slate-400 font-medium">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Verified Equipment
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-emerald-400" />
                  Flexible Daily Rates
                </span>
                <span className="flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-emerald-400" />
                  Easy Pickup & Return
                </span>
              </div>
            </div>

            {/* Hero Image / Visual */}
            <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-md lg:max-w-none aspect-4/5 rounded-3xl overflow-hidden border border-slate-700/50 shadow-2xl">
                <Image
                  unoptimized
                  src="https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&q=80&w=1000"
                  alt="Outdoor camping setup with premium gear"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-transparent to-transparent" />

                {/* Floating Card Overlay */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-800 text-slate-100 flex items-center gap-4">
                  <div className="p-2.5 rounded-lg bg-primary/20 text-primary">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-medium">Popular Right Now</p>
                    <p className="text-sm font-semibold"> Ultralight 2-Person Backpacking Tent</p>
                    <p className="text-xs text-emerald-400 font-medium mt-0.5">$25 / day</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section >

      {/* 2. CATEGORIES SECTION */}
      < section className="container mx-auto px-4 sm:px-6 lg:px-8" >
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">Explore by Activity</p>
            <h2 className="text-3xl font-bold tracking-tight mt-1">Gear Categories</h2>
          </div>
          <Link href="/gear" className="inline-flex items-center text-sm font-semibold text-primary hover:underline group">
            Browse all categories
            <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
          {data?.map((cat: ICategory) => (
            <Link key={cat?.id} href={`/gears?category=${encodeURIComponent(cat?.name)}`}>
              <Card className="h-full hover:border-primary/50 hover:shadow-md transition-all duration-200 cursor-pointer group text-center p-4">
                <CardContent className="p-0 flex flex-col items-center justify-center space-y-3">
                  {/* <span className="text-4xl transition-transform duration-200 group-hover:scale-110">{cat.icon}</span> */}
                  {/* <div> */}
                  <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">{cat?.name}</h3>
                  {/* <p className="text-xs text-muted-foreground mt-1">{cat.count}</p> */}
                  {/* </div> */}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section >

      {/* 3. FEATURED GEAR GRID */}
      < section className="container mx-auto px-4 sm:px-6 lg:px-8" >
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <Badge variant="secondary" className="mb-2">Top Rated</Badge>
            <h2 className="text-3xl font-bold tracking-tight">Featured Gear Near You</h2>
          </div>
          <Link href="/gear">
            <Button variant="outline" className="gap-2">
              <SlidersHorizontal className="w-4 h-4" /> View All Listings
            </Button>
          </Link>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <Card key={item} className="overflow-hidden flex flex-col group hover:shadow-lg transition-all duration-300 border-border/80">
              {/* Card Image */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
                <Image
                  unoptimized
                  src={`https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&q=80&w=600&sig=${item}`}
                  alt="Gear item"
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <Badge className="absolute top-3 left-3 bg-background/90 text-foreground backdrop-blur-sm hover:bg-background">
                  Camping
                </Badge>
                <div className="absolute top-3 right-3 bg-emerald-500/90 text-white text-xs font-semibold px-2 py-1 rounded-md backdrop-blur-sm">
                  Available
                </div>
              </div>

              {/* Card Content */}
              <CardHeader className="p-4 pb-2">
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                  <span className="flex items-center gap-1 font-medium text-amber-500">
                    <Star className="w-3.5 h-3.5 fill-current" /> 4.9 (24)
                  </span>
                  <span>Hosted by Alpine Rentals</span>
                </div>
                <CardTitle className="text-base font-semibold line-clamp-1 group-hover:text-primary transition-colors">
                  Professional Mountain Kayak & Paddle Set
                </CardTitle>
              </CardHeader>

              <CardContent className="p-4 pt-0 flex-1">
                <p className="text-xs text-muted-foreground line-clamp-2">
                  High-performance single person kayak suitable for rivers and open lake paddling. Includes vest & paddle.
                </p>
              </CardContent>

              {/* Card Footer */}
              <CardFooter className="p-4 pt-0 border-t border-border/40 mt-auto flex items-center justify-between">
                <div>
                  <span className="text-lg font-bold text-foreground">$35</span>
                  <span className="text-xs text-muted-foreground"> / day</span>
                </div>
                <Link href={`/gears/${item}`}>
                  <Button size="sm" variant="secondary" className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    Rent Now
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section >

      {/* 4. HOW IT WORKS */}
      < section className="bg-muted/40 py-16 border-y border-border/60" >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold tracking-tight">How GearUp Works</h2>
            <p className="text-muted-foreground mt-2">Rent high-quality gear in 3 simple steps without the burden of ownership.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">

            {/* Step 1 */}
            <div className="bg-background p-6 rounded-2xl border border-border/60 flex flex-col items-center text-center relative shadow-sm">
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-lg mb-4">
                1
              </div>
              <h3 className="text-lg font-semibold mb-2">Search & Select Dates</h3>
              <p className="text-sm text-muted-foreground">
                Find the gear you need, compare specs, and choose your preferred rental start and return dates.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-background p-6 rounded-2xl border border-border/60 flex flex-col items-center text-center relative shadow-sm">
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-lg mb-4">
                2
              </div>
              <h3 className="text-lg font-semibold mb-2">Book & Pay Securely</h3>
              <p className="text-sm text-muted-foreground">
                Confirm your reservation using instant Stripe or SSLCommerz secure checkout. Instant status updates.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-background p-6 rounded-2xl border border-border/60 flex flex-col items-center text-center relative shadow-sm">
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-lg mb-4">
                3
              </div>
              <h3 className="text-lg font-semibold mb-2">Pick Up & Enjoy</h3>
              <p className="text-sm text-muted-foreground">
                Pick up your equipment from the provider, enjoy your adventure, and return it hassle-free.
              </p>
            </div>

          </div>
        </div>
      </section >

      {/* 5. DUAL CTA SECTION (Customer & Provider) */}
      < section className="container mx-auto px-4 sm:px-6 lg:px-8" >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Renters CTA */}
          <div className="relative rounded-3xl bg-slate-900 text-white p-8 sm:p-10 overflow-hidden flex flex-col justify-between min-h-[320px]">
            <div className="relative z-10 max-w-md space-y-4">
              <Badge className="bg-primary text-primary-foreground">For Adventurers</Badge>
              <h3 className="text-2xl sm:text-3xl font-bold">Ready for your next weekend trip?</h3>
              <p className="text-slate-300 text-sm">
                Access thousands of verified gear listings from trusted hosts. Zero storage required.
              </p>
            </div>
            <div className="relative z-10 mt-6">
              <Link href="/gear">
                <Button size="lg" className="font-semibold gap-2">
                  Explore Gear <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
            {/* Ambient Background element */}
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-primary/20 rounded-full blur-2xl" />
          </div>

          {/* Providers CTA */}
          <div className="relative rounded-3xl bg-gradient-to-br from-emerald-950 to-slate-900 text-white p-8 sm:p-10 overflow-hidden flex flex-col justify-between min-h-[320px] border border-emerald-800/30">
            <div className="relative z-10 max-w-md space-y-4">
              <Badge variant="outline" className="border-emerald-400 text-emerald-400">
                For Gear Owners
              </Badge>
              <h3 className="text-2xl sm:text-3xl font-bold">Monetize your idle sports gear.</h3>
              <p className="text-emerald-100/80 text-sm">
                Turn your extra tents, bikes, and water gear into passive income. Manage everything from an easy dashboard.
              </p>
            </div>
            <div className="relative z-10 mt-6">
              <Link href="/auth/register?role=provider">
                <Button size="lg" variant="secondary" className="font-semibold gap-2 bg-emerald-500 text-slate-950 hover:bg-emerald-400">
                  Become a Provider <BadgeCheck className="w-4 h-4" />
                </Button>
              </Link>
            </div>
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-2xl" />
          </div>

        </div>
      </section >

      {/* 6. STATS & SOCIAL PROOF */}
      < section className="container mx-auto px-4 sm:px-6 lg:px-8 pt-6" >
        <div className="bg-card border border-border/80 rounded-2xl p-8 shadow-sm grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div>
            <p className="text-3xl sm:text-4xl font-extrabold text-primary">5,000+</p>
            <p className="text-sm text-muted-foreground mt-1">Active Rentals</p>
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-extrabold text-primary">1,200+</p>
            <p className="text-sm text-muted-foreground mt-1">Verified Providers</p>
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-extrabold text-primary">99.4%</p>
            <p className="text-sm text-muted-foreground mt-1">Positive Reviews</p>
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-extrabold text-primary">24/7</p>
            <p className="text-sm text-muted-foreground mt-1">Customer Support</p>
          </div>
        </div>
      </section >
    </div >
  );
}
