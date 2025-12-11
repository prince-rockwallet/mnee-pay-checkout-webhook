/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from 'next/link';
import { ArrowRight, ShoppingCart, Lock, Heart, Radio } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-neutral-50 dark:bg-neutral-900 flex flex-col items-center justify-center p-8">
      <div className="text-center space-y-6 max-w-3xl">
        <h1 className="text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
          MNEE Pay Testbench
        </h1>
        <p className="text-xl text-neutral-600 dark:text-neutral-400">
          Select a functionality to test the Checkout SDK and visualize webhooks in real-time.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 w-full">
          <Card 
             href="/webhook" 
             title="Webhook Inspector" 
             icon={<Radio className="w-8 h-8 text-pink-500"/>}
             desc="View real-time events"
          />
          <Card 
             href="/donation" 
             title="Donation" 
             icon={<Heart className="w-8 h-8 text-red-500"/>}
             desc="Test custom amounts"
          />
          <Card 
             href="/paywall" 
             title="Paywall" 
             icon={<Lock className="w-8 h-8 text-purple-500"/>}
             desc="Test content locking"
          />
          <Card 
             href="/ecommerce" 
             title="E-commerce" 
             icon={<ShoppingCart className="w-8 h-8 text-blue-500"/>}
             desc="Test shopping cart"
          />
        </div>
      </div>
    </div>
  );
}

function Card({ href, title, icon, desc }: any) {
  return (
    <Link href={href} className="group block p-6 bg-white dark:bg-neutral-800 rounded-2xl shadow-sm border border-neutral-200 dark:border-neutral-700 hover:shadow-md hover:border-indigo-500 transition-all text-left">
      <div className="mb-4">{icon}</div>
      <h3 className="font-bold text-lg text-neutral-900 dark:text-white group-hover:text-indigo-600 transition-colors">{title}</h3>
      <p className="text-sm text-neutral-500 mt-2">{desc}</p>
      <div className="mt-4 flex items-center text-xs font-semibold text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity">
        Open <ArrowRight className="w-3 h-3 ml-1" />
      </div>
    </Link>
  );
}