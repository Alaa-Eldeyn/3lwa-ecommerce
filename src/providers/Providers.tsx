"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ThemeProvider } from "next-themes"
import { Toaster } from "react-hot-toast";
import WishlistInitializer from "@/src/effects/WishlistInitializer";
import ScrollToTop from "@/src/effects/ScrollToTop";

const Providers = ({ children }: { children: React.ReactNode }) => {
    const queryClient = new QueryClient();
    
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider
                attribute="data-theme"
                defaultTheme="system"
                enableSystem={true}
                disableTransitionOnChange={false}
            >
                <WishlistInitializer />
                <ScrollToTop />
                {children}
                <Toaster position="top-right" reverseOrder={false} />
            </ThemeProvider>
        </QueryClientProvider>
    )
}
export default Providers