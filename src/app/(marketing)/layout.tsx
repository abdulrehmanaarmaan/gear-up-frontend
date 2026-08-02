import "../globals.css";
import { Footer } from "../components/Footer";
import { Suspense } from "react";
import FooterSkeleton from "../components/FooterSkeleton";

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      {children}
      <Suspense fallback={<FooterSkeleton />}>
        <Footer />
      </Suspense>
    </div >
  );
}
