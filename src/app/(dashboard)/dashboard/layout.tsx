import * as React from "react";
import SidebarSkeleton from "../components/SidebarSkeleton";
import SidebarServer from "../components/SidebarServer";

export default async function DashboardLayout({ children }: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <div className="min-h-screen bg-background text-foreground flex">

            {/* DESKTOP SIDEBAR */}
            <aside className="hidden lg:block w-72 inset-y-0 z-30">
                <React.Suspense fallback={<SidebarSkeleton />}>
                    <SidebarServer />
                </React.Suspense>
            </aside>

            {/* MAIN CONTAINER */}
            <div className="flex-1 flex flex-col min-w-0">

                {/* DASHBOARD PAGE CONTENT */}
                <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
                    {children}
                </main>

            </div>

        </div >
    );
}