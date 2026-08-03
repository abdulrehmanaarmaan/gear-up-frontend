import * as React from "react";
import MyPaymentsServer from "../components/PaymentServer";

export default async function MyPayments() {
    // const [searchQuery, setSearchQuery] = React.useState("");
    // const [activeTab, setActiveTab] = React.useState("ALL");

    return (
        <React.Suspense fallback={<>Loading...</>}>
            <MyPaymentsServer />
        </React.Suspense>
    );
}

