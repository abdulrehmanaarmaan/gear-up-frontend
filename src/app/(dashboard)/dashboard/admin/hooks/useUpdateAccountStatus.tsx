// hooks/use-update-account-status.ts
"use client";

import Swal from "sweetalert2";
import { toast } from "sonner";
import { updateAccountStatus } from "../admin.actions";

export const useUpdateAccountStatus = () => {
    const handleAccountStatus = async (
        accountId: string,
        status: "ACTIVE" | "SUSPENDED"
    ) => {

        const isSuspending = status === "SUSPENDED";

        const confirmation = await Swal.fire({
            title: isSuspending
                ? "Suspend this account?"
                : "Restore this account?",
            text: isSuspending
                ? "The user will immediately lose access until the account is restored."
                : "The user will regain access immediately.",
            icon: isSuspending ? "warning" : "question",
            showCancelButton: true,
            confirmButtonText: isSuspending
                ? "Suspend account"
                : "Restore account",
            cancelButtonText: "Cancel",
            confirmButtonColor: isSuspending ? "#dc2626" : "#16a34a",
            reverseButtons: true,
            focusCancel: true,
        });

        if (!confirmation.isConfirmed) return;

        const result = await updateAccountStatus(accountId, { status });

        if (result?.success) {
            toast.success(result.message);
        } else {
            toast.error(result?.message);
        }
    };

    return { handleAccountStatus };
};