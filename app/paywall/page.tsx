"use client";

import { useState } from 'react';
import { Lock, ArrowLeft, Check, Search, Loader2 } from 'lucide-react';
import Link from 'next/link';
import MneeCheckoutWrapper from '@/components/MneeCheckoutWrapper';
import { ButtonConfig } from '@/types/types';
import { getMneePayCheckoutBaseUrl } from '@/utils/utils';

export default function PaywallPage() {
  const [buttonId, setButtonId] = useState("");
  const [config, setConfig] = useState<ButtonConfig | null>(null);
  const [loading, setLoading] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);

  const fetchConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!buttonId) return;

    setLoading(true);
    setConfig(null);
    setIsUnlocked(false);

    try {
      const res = await fetch(`${getMneePayCheckoutBaseUrl()}/buttons/public/${buttonId}/config`);
      if (!res.ok) throw new Error("Button not found");

      const data = await res.json();
      setConfig(data);
    } catch (error) {
      console.error(error);
      alert("Could not load paywall button configuration. Please check the ID.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-amber-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-50">
      {/* Navbar */}
      <nav className="border-b border-amber-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Hub
          </Link>

          <form onSubmit={fetchConfig} className="flex gap-2 items-center">
            <input
              type="text"
              placeholder="Paywall Button ID"
              className="bg-white dark:bg-neutral-800 border border-gray-300 dark:border-neutral-700 rounded-lg px-4 py-2 text-sm text-neutral-900 dark:text-neutral-50 placeholder-gray-500 dark:placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent w-64 transition-colors"
              value={buttonId}
              onChange={(e) => setButtonId(e.target.value)}
            />
            <button type="submit" disabled={loading} className="text-neutral-700 dark:text-neutral-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
              {loading ? <Loader2 className="w-4 h-4 animate-spin"/> : <Search className="w-4 h-4"/>}
            </button>
          </form>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-12">
        {!config ? (
          <div className="text-center py-20 text-neutral-500 dark:text-neutral-400">
            <Lock className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Enter a Button ID above to load the premium content.</p>
          </div>
        ) : (
          <>
            {/* Header */}
            <header className="mb-12 space-y-4">
              <span className="text-amber-600 dark:text-amber-400 font-mono text-sm tracking-wider uppercase">Premium Content</span>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">{config.name || "Exclusive Content"}</h1>
              <p className="text-lg text-neutral-700 dark:text-neutral-300">{config.description || "This content is locked behind a paywall."}</p>
            </header>

            {/* Content Area */}
            <article className="prose prose-amber dark:prose-invert max-w-none">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>

              <div className="relative mt-12 rounded-2xl overflow-hidden border border-amber-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-sm">
                <div className={`p-8 transition-all duration-700 ${isUnlocked ? '' : 'blur-lg opacity-30 select-none'}`}>
                  <h3 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-neutral-50">Deep Dive Analysis</h3>
                  <p className="mb-4 text-neutral-700 dark:text-neutral-300">The core of our system uses a UTXO-based model. This allows parallel transaction processing. Unlike account-based models...</p>
                  <p className="mb-4 text-neutral-700 dark:text-neutral-300">We implemented a custom SPV wallet client in the browser. This ensures that users maintain custody of their funds while interacting with the merchant...</p>
                  <div className="bg-amber-50 dark:bg-neutral-900 p-6 rounded-lg my-8 font-mono text-sm border border-amber-200 dark:border-neutral-700">
                    <span className="text-neutral-500 dark:text-neutral-400">{'// Hidden implementation details...'}</span>
                  </div>
                </div>

                {!isUnlocked && (
                  <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-gradient-to-t from-amber-50/80 dark:from-neutral-900/80 to-amber-50/50 dark:to-neutral-950/60">
                    <div className="bg-white dark:bg-neutral-800/90 backdrop-blur-xl p-8 rounded-2xl border border-amber-200 dark:border-neutral-700 shadow-2xl max-w-sm w-full text-center space-y-6">
                      <div className="w-16 h-16 bg-amber-100 dark:bg-amber-700 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Lock className="w-8 h-8 text-amber-600 dark:text-amber-200" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50">Unlock Full Access</h3>
                        <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-2">One-time payment to reveal this content.</p>
                      </div>
                      <div className="w-full">
                        <MneeCheckoutWrapper
                          config={config}
                          onSuccess={() => setIsUnlocked(true)}
                          styling={{
                            buttonSize: 'full',
                            borderRadius: 'rounded',
                            primaryColor: config.primaryColor || '#f59e0b'
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </article>

            {isUnlocked && (
              <div className="mt-12 p-6 bg-amber-50 dark:bg-neutral-800 border border-amber-200 dark:border-neutral-700 rounded-xl flex items-center gap-4 animate-in zoom-in">
                <Check className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                <div>
                  <p className="font-semibold text-neutral-900 dark:text-neutral-50">Access Granted</p>
                  <p className="text-sm text-neutral-700 dark:text-neutral-300 opacity-80">You have successfully unlocked this content.</p>
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}