// src/components/common/Providers.tsx
"use client";

import { ThemeProvider } from "@/components/common/ThemeProvider";
import { SessionProvider } from "next-auth/react";
import { AuthProvider } from "@/contexts/AuthContext";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import { Toaster } from "sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SessionProvider>
        <AuthProvider>
          <LanguageProvider>
            <div className="flex flex-col min-h-screen">
              <main className="flex-1">
                {children}
                <Toaster position="bottom-right" richColors duration={4000} />
              </main>
            </div>
          </LanguageProvider>
        </AuthProvider>
      </SessionProvider>
    </ThemeProvider>
  );
}
