"use client"

import Link from "next/link"
import { ArrowRight, ShoppingCart, Lock, Heart, Radio, Activity } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="relative py-24 px-4 max-w-7xl mx-auto">
      {/* Soft background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-amber-300/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-300/20 rounded-full blur-3xl" />
      </div>

      <div className="text-center max-w-3xl mx-auto space-y-8">
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 text-amber-800 text-sm font-medium">
          <Activity size={16} /> Live Testbench
        </span>

        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
          MNEE Pay Integration
        </h1>

        <p className="text-lg text-neutral-600 dark:text-neutral-400">
          Test checkout flows, webhooks, paywalls, and e-commerce with a
          production-grade SDK.
        </p>
      </div>

      <div className="grid mt-16 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card href="/webhook" title="Webhook Inspector" icon={<Radio />} />
        <Card href="/donation" title="Donation Flow" icon={<Heart />} />
        <Card href="/paywall" title="Paywall Access" icon={<Lock />} />
        <Card href="/ecommerce" title="E-commerce" icon={<ShoppingCart />} />
      </div>
    </div>
  )
}

function Card({ href, title, icon }: any) {
  return (
    <Link
      href={href}
      className="group rounded-2xl bg-white dark:bg-neutral-800 p-6 border border-amber-200 dark:border-neutral-700 hover:shadow-xl hover:-translate-y-1 transition"
    >
      <div className="w-12 h-12 mb-4 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white">
        {icon}
      </div>

      <h3 className="font-bold text-lg">{title}</h3>

      <div className="mt-4 flex items-center text-amber-600 font-semibold">
        Launch <ArrowRight className="ml-1 group-hover:translate-x-1 transition" />
      </div>
    </Link>
  )
}
