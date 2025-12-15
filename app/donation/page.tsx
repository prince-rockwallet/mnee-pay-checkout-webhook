"use client";

import { useState } from "react";
import { Heart, CheckCircle2, ArrowLeft, Search, Loader2 } from "lucide-react";
import Link from "next/link";
import MneeCheckoutWrapper from "@/components/MneeCheckoutWrapper";
import { getMneePayCheckoutBaseUrl } from "@/utils/utils";
import { ButtonConfig } from "@/types/types";

export default function DonationPage() {
  const [buttonId, setButtonId] = useState("");
  const [config, setConfig] = useState<ButtonConfig | null>(null);
  const [loading, setLoading] = useState(false);
  const [donated, setDonated] = useState(false);

  const fetchConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!buttonId) return;

    setLoading(true);
    setConfig(null);
    setDonated(false);

    try {
      const res = await fetch(`${getMneePayCheckoutBaseUrl()}/buttons/public/${buttonId}/config`);
      if (!res.ok) throw new Error("Button not found");

      const data = await res.json();
      setConfig(data);
    } catch (error) {
      console.error(error);
      alert("Could not load donation button configuration. Please check the ID.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-amber-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-50 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Back link */}
      <Link 
        href="/" 
        className="absolute top-8 left-8 z-10 flex items-center gap-2 px-3 py-1 rounded shadow bg-white/80 dark:bg-neutral-950/80 text-neutral-700 dark:text-neutral-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back
      </Link>

      <div className="max-w-lg w-full relative z-10 space-y-8">

        {/* Input Form */}
        <div className="bg-white dark:bg-neutral-800 p-6 rounded-2xl border border-amber-200 dark:border-neutral-700 shadow-sm transition-colors">
          <form onSubmit={fetchConfig} className="flex gap-2">
            <input 
              type="text" 
              placeholder="Enter Donation Button ID" 
              className="flex-1 bg-amber-50 dark:bg-neutral-900 border border-amber-200 dark:border-neutral-700 rounded-lg px-4 py-2 text-sm text-neutral-900 dark:text-neutral-50 placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-colors"
              value={buttonId}
              onChange={(e) => setButtonId(e.target.value)}
            />
            <button 
              type="submit"
              disabled={loading}
              className="bg-amber-500 hover:bg-amber-400 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
            </button>
          </form>
        </div>

        {/* Donation Card */}
        {config && (
          donated ? (
            <div className="bg-white dark:bg-neutral-800 p-12 rounded-3xl shadow-lg border border-amber-200 dark:border-neutral-700 text-center space-y-6 animate-in fade-in zoom-in duration-300 transition-colors">
              <div className="w-20 h-20 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-50 mb-2">Thank You!</h2>
                <p className="text-neutral-700 dark:text-neutral-300">
                  Your support for <strong>{config.name}</strong> has been received.
                </p>
              </div>
              <button
                onClick={() => setDonated(false)}
                className="mt-4 text-sm text-amber-600 dark:text-amber-400 hover:text-amber-500 dark:hover:text-amber-300 font-medium transition-colors"
              >
                Make another donation
              </button>
            </div>
          ) : (
            <div className="bg-white dark:bg-neutral-800 p-8 rounded-3xl shadow-lg border border-amber-200 dark:border-neutral-700 space-y-8 animate-in slide-in-from-bottom-4 transition-colors">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-rose-100 dark:bg-rose-900 rounded-2xl flex items-center justify-center mx-auto">
                  <Heart className="w-8 h-8 text-rose-500 dark:text-rose-400 fill-rose-200 dark:fill-rose-700" />
                </div>
                <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-50">{config.name}</h1>
                <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  {config.description || "Support this project with a secure crypto donation."}
                </p>
              </div>

              <div className="pt-4 border-t border-amber-200 dark:border-neutral-700 text-center">
                <MneeCheckoutWrapper 
                  config={config}
                  onSuccess={() => setDonated(true)}
                  styling={{
                    buttonSize: config.buttonSize || 'full',
                    borderRadius: config.borderRadius || 'rounded',
                    primaryColor: config.primaryColor || '#f59e0b',
                    accentColor: config.accentColor,
                    buttonColor: config.buttonColor,
                    buttonTextColor: config.buttonTextColor,
                    customCSS: config.customCSS,
                    fontFamily: config.fontFamily
                  }}
                  buttonId={buttonId}
                  showConfetti={config.showConfetti}
                  theme={config.theme}
                />
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}