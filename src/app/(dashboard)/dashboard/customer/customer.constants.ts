export const rentalStatusConfig = {
    PLACED: {
        label: "Awaiting Confirmation",
        className:
            "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    },

    CONFIRMED: {
        label: "Confirmed",
        className:
            "bg-sky-500/10 text-sky-600 dark:text-sky-400",
    },

    PAID: {
        label: "Paid",
        className:
            "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
    },

    PICKED_UP: {
        label: "Currently Rented",
        className:
            "bg-violet-500/10 text-violet-600 dark:text-violet-400",
    },

    RETURNED: {
        label: "Returned",
        className:
            "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    },

    CANCELLED: {
        label: "Cancelled",
        className:
            "bg-rose-500/10 text-rose-600 dark:text-rose-400",
    },
} as const;

export type RentalStatusKey = keyof typeof rentalStatusConfig;