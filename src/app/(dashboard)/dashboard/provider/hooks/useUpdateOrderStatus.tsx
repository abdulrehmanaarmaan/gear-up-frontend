// hooks/use-update-order-status.ts
"use client";

import { toast } from "sonner";
import { updateOrderStatus } from "../provider.actions";

export const useUpdateOrderStatus = () => {
    const handleOrderStatus = async (
        orderId: string,
        status: string
    ) => {
        const result = await updateOrderStatus(orderId, { status });

        if (result?.success) {
            toast.success(result.message);
        } else {
            toast.error(result?.message);
        }
    };

    return { handleOrderStatus };
};