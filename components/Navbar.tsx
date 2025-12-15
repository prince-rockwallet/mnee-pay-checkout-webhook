"use client"

import Link from "next/link"
import { Sun, Moon } from "lucide-react"
import { useTheme } from "@/components/theme-provider"

export default function Navbar() {
  const { theme, toggleTheme } = useTheme()

  return (
    <nav className="sticky top-0 z-50 border-b border-amber-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-950/80 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
            <span className="text-white font-bold">M</span>
          </div>
          <span className="font-bold text-lg bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
            MNEE Pay
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <NavLink href="/webhook">Webhook</NavLink>
          <NavLink href="/donation">Donation</NavLink>
          <NavLink href="/paywall">Paywall</NavLink>
          <NavLink href="/ecommerce">E-commerce</NavLink>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-amber-100 dark:bg-neutral-800 hover:bg-amber-200 dark:hover:bg-neutral-700"
          >
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </button>
        </div>
      </div>
    </nav>
  )
}

function NavLink({ href, children }: any) {
  return (
    <Link
      href={href}
      className="text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-amber-600 dark:hover:text-amber-400"
    >
      {children}
    </Link>
  )
}
