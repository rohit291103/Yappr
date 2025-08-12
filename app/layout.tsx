import { type Metadata } from 'next'
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import { Open_Sans } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '../components/providers/theme-provider'
import { ModeToggle } from '@/components/mode-toggle'

// ⬇️ Import UploadThing SSR plugin
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "@/app/api/uploadthing/core"; // adjust path if needed
import { ModalProvider } from '@/components/providers/modal-provider'

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-open-sans',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Yappr',
  description: 'A real-time chat experience',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${openSans.variable} font-sans antialiased min-h-screen`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            storageKey='discord-theme'
          >
            <header className="flex justify-end items-center p-4 gap-4 h-16">
              <SignedOut>
                <SignInButton />
                <SignUpButton>
                  <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                    Sign Up
                  </button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <UserButton />
                <ModeToggle />
              </SignedIn>
            </header>

            {/* ⬇️ Add SSR hydration before children */}
            <NextSSRPlugin
              routerConfig={extractRouterConfig(ourFileRouter)}
            />
            <ModalProvider />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
