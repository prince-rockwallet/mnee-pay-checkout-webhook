import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import "@mnee-pay/checkout/styles.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MNEE Pay Testbench",
  description: "Testbench for MNEE Pay Checkout SDK",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-50`}
      >
        {/* Navigation Bar */}
        <nav className="border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <div className="flex items-center gap-8">
                <Link href="/" className="text-xl font-bold tracking-tight text-indigo-600 dark:text-indigo-400">
                  MNEE Pay <span className="text-neutral-500 font-normal text-sm">Testbench</span>
                </Link>
                
                <div className="hidden md:flex gap-1">
                  <NavLink href="/webhook">Webhook Inspector</NavLink>
                  <div className="w-px h-6 bg-neutral-200 dark:bg-neutral-800 mx-2 self-center" />
                  <NavLink href="/donation">Donation</NavLink>
                  <NavLink href="/paywall">Paywall</NavLink>
                  <NavLink href="/ecommerce">E-commerce</NavLink>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {children}
      </body>
    </html>
  );
}

// Simple helper for nav links
function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link 
      href={href}
      className="px-3 py-2 rounded-md text-sm font-medium text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
    >
      {children}
    </Link>
  );
}