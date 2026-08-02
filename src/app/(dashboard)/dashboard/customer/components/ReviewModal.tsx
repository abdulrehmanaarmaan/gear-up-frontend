"use client"

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Star } from 'lucide-react';
import Image from 'next/image';
import React, { useActionState, useCallback, useEffect, useRef, useState } from 'react';
import { useReviewModal } from '../context/ReviewModalContext';
import { leaveReview } from '../customer.actions';
import { toast } from 'sonner';

const ReviewModal = () => {

    const { isReviewOpen, selectedOrderForReview, closeReviewModal } = useReviewModal()

    const [rating, setRating] = useState<number>(5)
    const [hoveredRating, setHoveredRating] = useState<number>(0)
    const [reviewText, setReviewText] = useState<string>("")

    const [state, action, pending] = useActionState(leaveReview, null)

    const resetReviewForm = () => {
        setRating(5);
        setHoveredRating(0);
        setReviewText("");
    };

    const handleClose = useCallback(() => {
        resetReviewForm();
        closeReviewModal();
    }, [closeReviewModal]);

    useEffect(() => {

        if (!state) return

        if (state.success) {

            toast.success(state.message);

            queueMicrotask(() => {
                handleClose();
            });

            return;
        }

        if (!state?.success) {
            toast.error(state?.message)
        }
    }, [state, handleClose])

    return (
        <Dialog open={isReviewOpen} onOpenChange={(open) => !open && handleClose()}>
            <DialogContent className="sm:max-w-[540px] p-0 overflow-hidden border-border/80 shadow-2xl bg-card/95 backdrop-blur-md rounded-xl sm:rounded-2xl transition-all">

                {/* Modal Header */}
                <DialogHeader className="p-5 sm:p-6 pb-4 bg-gradient-to-b from-muted/50 to-transparent border-b border-border/60 relative">
                    <div className="flex items-center gap-2">
                        <Badge
                            variant="outline"
                            className="border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold text-[10px] tracking-wider uppercase px-2.5 py-0.5 rounded-full"
                        >
                            Verified Rental Experience
                        </Badge>
                    </div>
                    <DialogTitle className="text-xl sm:text-2xl font-black tracking-tight text-foreground mt-2">
                        Leave a Gear Review
                    </DialogTitle>
                    <DialogDescription className="text-xs sm:text-sm text-muted-foreground leading-relaxed mt-1">
                        Share your experience to help the community make better rental choices.
                    </DialogDescription>
                </DialogHeader>

                {selectedOrderForReview && (
                    <form action={action}>
                        <div className="p-5 sm:p-6 space-y-6">

                            {/* Rented Gear Summary Preview */}
                            <div className="flex items-center gap-4 p-3.5 sm:p-4 rounded-xl bg-muted/30 border border-border/70 hover:border-border transition-colors">
                                <div className="relative h-16 w-16 sm:h-16 sm:w-20 rounded-lg bg-muted border border-border/80 overflow-hidden shrink-0 shadow-xs">
                                    {selectedOrderForReview.gear.images[0] &&
                                        <Image
                                            unoptimized
                                            src={selectedOrderForReview.gear.images[0]}
                                            alt={selectedOrderForReview.gear.title}
                                            fill
                                            className="object-cover transition-transform duration-300 hover:scale-105"
                                        />
                                    }
                                </div>
                                <div className="flex flex-col min-w-0">
                                    <span className="font-mono text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                                        Order #{selectedOrderForReview.id.slice(0, 8)}
                                    </span>
                                    <h4 className="text-xs sm:text-sm font-bold text-foreground truncate mt-0.5">
                                        {selectedOrderForReview.gear.title}
                                    </h4>
                                    <p className="text-[11px] sm:text-xs text-muted-foreground mt-0.5 truncate">
                                        Rented from <strong className="text-foreground font-semibold">{selectedOrderForReview.provider.name}</strong>
                                    </p>
                                </div>
                            </div>

                            {/* Interactive Star Rating Selector */}
                            <div className="space-y-2.5">
                                <div className="flex items-center justify-between">
                                    <Label className="text-xs font-bold text-foreground tracking-wide">
                                        Overall Rating <span className="text-rose-500">*</span>
                                    </Label>
                                    <span className="text-xs font-bold text-amber-600 dark:text-amber-400 font-mono bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                                        {hoveredRating || rating} / 5 Stars
                                    </span>
                                </div>

                                <div className="flex flex-col items-center justify-center p-4 sm:p-5 rounded-xl bg-gradient-to-b from-muted/20 to-muted/40 border border-border/70 gap-2">
                                    <div className="flex items-center justify-center gap-1.5 sm:gap-2">
                                        {[1, 2, 3, 4, 5].map((star) => {
                                            const activeStar = star <= (hoveredRating || rating);
                                            return (
                                                <button
                                                    disabled={pending}
                                                    key={star}
                                                    type="button"
                                                    onClick={() => setRating(star)}
                                                    onMouseEnter={() => setHoveredRating(star)}
                                                    onMouseLeave={() => setHoveredRating(0)}
                                                    className="cursor-pointer p-1.5 sm:p-2 rounded-lg hover:bg-amber-500/15 transition-all duration-200 active:scale-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/50"
                                                >
                                                    <Star
                                                        className={`w-7 h-7 sm:w-8 sm:h-8 transition-all duration-200 ${activeStar
                                                            ? "text-amber-500 fill-amber-500 drop-shadow-[0_2px_8px_rgba(245,158,11,0.35)] scale-105"
                                                            : "text-muted-foreground/30 fill-muted-foreground/10 hover:text-amber-500/50"
                                                            }`}
                                                    />
                                                </button>
                                            );
                                        })}
                                    </div>
                                    <span className="text-[11px] font-medium text-muted-foreground transition-all">
                                        {(hoveredRating || rating) === 5 && "Excellent! Exceeded expectations"}
                                        {(hoveredRating || rating) === 4 && "Very Good! Minor issues if any"}
                                        {(hoveredRating || rating) === 3 && "Average rental experience"}
                                        {(hoveredRating || rating) === 2 && "Below average, needs improvement"}
                                        {(hoveredRating || rating) === 1 && "Poor experience or damaged item"}
                                    </span>
                                </div>
                            </div>

                            {/* Review Description */}
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="review-text" className="text-xs font-bold text-foreground tracking-wide">
                                        Your Written Review <span className="text-rose-500">*</span>
                                    </Label>
                                    <span className="text-[11px] font-mono text-muted-foreground">
                                        {reviewText.length} / 500
                                    </span>
                                </div>
                                <input
                                    type="hidden"
                                    name="gearId"
                                    value={selectedOrderForReview.gear.id}
                                />
                                <input
                                    type="hidden"
                                    name="rentalOrderId"
                                    value={selectedOrderForReview.id}
                                />
                                <input
                                    type="hidden"
                                    name="rating"
                                    value={rating}
                                />
                                {
                                    state?.errors?.rating && (
                                        <p className="text-xs text-destructive">
                                            {state.errors.rating[0]}
                                        </p>
                                    )
                                }
                                <Textarea
                                    disabled={pending}
                                    id="review-text"
                                    maxLength={500}
                                    rows={4}
                                    placeholder="How was the equipment condition? Was pickup smooth? Share details that help future renters..."
                                    value={reviewText}
                                    name="review"
                                    onChange={(e) => setReviewText(e.target.value)}
                                    className={`text-xs sm:text-sm bg-background/80 border-border/80 focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary resize-none p-3.5 rounded-lg transition-shadow shadow-xs placeholder:text-muted-foreground/60 ${reviewText.length > 450
                                        ? "text-amber-500"
                                        : "text-muted-foreground"}`}
                                />
                                {
                                    state?.errors?.review && (
                                        <p className="text-xs text-destructive">
                                            {state.errors.review[0]}
                                        </p>
                                    )
                                }
                            </div>

                        </div>

                        {/* Modal Footer Actions */}
                        <DialogFooter className="p-4 sm:p-5 px-5 sm:px-6 bg-muted/40 border-t border-border/60 flex flex-row items-center justify-end gap-3">
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => handleClose()}
                                className="cursor-pointer text-xs font-semibold h-9 px-4 hover:bg-muted/80 rounded-lg transition-colors"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                size="sm"
                                disabled={pending ||
                                    reviewText.trim().length < 20}
                                className="cursor-pointer text-xs font-bold h-9 px-5 bg-primary hover:bg-primary/90 text-primary-foreground shadow-md transition-all active:scale-98 disabled:opacity-50 rounded-lg min-w-[120px]"
                            >
                                {pending ? (
                                    <span className="flex items-center gap-2">
                                        <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                                        Submitting...
                                    </span>
                                ) : (
                                    "Submit Review"
                                )}
                            </Button>
                        </DialogFooter>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default ReviewModal;