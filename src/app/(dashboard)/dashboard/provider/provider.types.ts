import { IUserAccount } from "@/app/(auth)/auth.types";
import { ICategory } from "@/app/(marketing)/marketing.interfaces";
import { IReview } from "../customer/customer.interfaces";

export enum GearCondition {
    NEW = "NEW",
    EXCELLENT = "EXCELLENT",
    GOOD = "GOOD",
    FAIR = "FAIR"
}

interface GearSpecifications {
    frameMaterial?: string;
    wheelSize?: string;
    brakes?: string;
    gears?: string;
    suspension?: string;
    capacity?: string;
    waterproof?: boolean;
    material?: string;
    weight?: string;
    [key: string]: string | number | boolean | null | undefined;
}


export interface IGear {
    categoryId: string
    title: string
    description: string
    brand: string
    model?: string
    condition?: GearCondition
    pricePerDay: number
    quantity: number
    images?: string[]
    specifications?: GearSpecifications
    location: string
}

export interface IUpdateGear {
    categoryId?: string;
    title?: string;
    slug?: string;
    description?: string;
    brand?: string;
    model?: string;
    condition?: GearCondition;
    pricePerDay?: number;
    quantity?: number;
    images?: string[];
    specifications?: GearSpecifications;
    location?: string;
    isAvailable?: boolean;
}

export interface IGearResponse extends IGear {
    id: string
    status: string
    reviews: IReview[]
    provider: IUserAccount
    category: ICategory
    availableQuantity: number
    slug: string
    images: string[]
    isAvailable: boolean
}