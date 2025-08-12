import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ModalProvider } from "@/components/providers/modal-provider";

import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

// UploadThing SSR plugin
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "@/app/api/uploadthing/core";

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  weight: ["400", "500", "600", "700"]
});

export const metadata: Metadata = {
  title: "Yappr",
  description: "A real-time chat experience",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn(openSans.variable, "bg-white dark:bg-[#313338] min-h-screen")}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            storageKey="discord-theme"
          >
            {/* UploadThing SSR hydration */}
            <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />

            {/* Global Providers */}
              <ModalProvider />
                {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
