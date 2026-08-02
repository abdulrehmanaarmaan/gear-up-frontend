import { IUserAccount } from "../(auth)/auth.types"

export interface IGear {
    id: string
    providerId: string
    categoryId: string
    title: string
    slug: string
    description: string
    brand: string
    model: string
    condition: string
    pricePerDay: number
    quantity: number
    availableQuantity: number
    images: string[]
    location: string
    isAvailable: boolean
    status: string
    createdAt: string
    updatedAt: string
}

export interface ICategory {
    id: string
    name: string
    slug: string
    description: string
    image: string
    gearItems: IGear[]
    createdAt: string
    updatedAt: string
}

export interface IReview {
    customer?: IUserAccount
    createdAt?: string
    id: string
    gearId: string
    rentalOrderId: string
    rating: number
    review: string
}
