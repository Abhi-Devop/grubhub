import { ReactNode } from "react";
import FooterWrapper from "@/components/FooterWrapper";

// import AuthGuard from "@/components/AuthGuard"; 
// We might want public access to restaurants, so maybe only protect specific routes like checkout/profile
// For now, this layout just groups them.

export default function CustomerLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-0 flex flex-col">
      {/* Header is global in RootLayout, but we could add customer-specific sub-nav here if needed */}
      <div className="flex-grow">
        {children}
      </div>
      <FooterWrapper />
    </div>
  );
}
