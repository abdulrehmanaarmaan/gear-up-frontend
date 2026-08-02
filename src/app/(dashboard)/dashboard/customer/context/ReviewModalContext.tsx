// customer/context/ReviewModalContext.tsx
"use client"

import { createContext, useContext, useState } from "react"
import { IRentalOrder } from "../customer.interfaces"

interface ReviewModalContextValue {
    isReviewOpen: boolean
    selectedOrderForReview: IRentalOrder | null
    openReviewModal: (order: IRentalOrder) => void
    closeReviewModal: () => void
}

const ReviewModalContext = createContext<ReviewModalContextValue | null>(null)

export const ReviewModalProvider = ({ children }: { children: React.ReactNode }) => {
    const [isReviewOpen, setIsReviewOpen] = useState(false)
    const [selectedOrderForReview, setSelectedOrderForReview] = useState<IRentalOrder | null>(null)

    const openReviewModal = (order: IRentalOrder) => {
        setSelectedOrderForReview(order)
        setIsReviewOpen(true)
    }

    const closeReviewModal = () => {
        setIsReviewOpen(false)
        setSelectedOrderForReview(null)
    }

    return (
        <ReviewModalContext.Provider value={{ isReviewOpen, selectedOrderForReview, openReviewModal, closeReviewModal }}>
            {children}
        </ReviewModalContext.Provider>
    )
}

export const useReviewModal = () => {
    const ctx = useContext(ReviewModalContext)
    if (!ctx) throw new Error("useReviewModal must be used within a ReviewModalProvider")
    return ctx
}