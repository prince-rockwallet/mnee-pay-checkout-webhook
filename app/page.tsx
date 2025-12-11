"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const ReactJson = dynamic(() => import("react-json-view"), { ssr: false });

interface WebhookLog {
  id: string;
  receivedAt: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}

export default function Home() {
  const [logs, setLogs] = useState<WebhookLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLive, setIsLive] = useState(true);

  const fetchLogs = async () => {
    try {
      const res = await fetch("/api/mnee-pay-webhook");
      if (res.ok) {
        const json = await res.json();
        setLogs(json.logs);
      }
    } catch (error) {
      console.error("Failed to fetch logs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isLive) {
      fetchLogs();
      // Start polling
      intervalId = setInterval(fetchLogs, 2000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isLive]);

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 p-8 font-sans transition-colors duration-300">
      <main className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            Mnee Pay Webhook Inspector
          </h1>
          <p className="text-neutral-500 dark:text-neutral-400">
            Send POST requests to:{" "}
            <code className="bg-neutral-200 dark:bg-neutral-800 px-2 py-1 rounded text-sm font-mono text-pink-600 dark:text-pink-400">
              /api/mnee-pay-webhook
            </code>
          </p>
        </div>

        {/* Control Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center bg-white dark:bg-neutral-800 p-4 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700 gap-4">
          
          {/* Status Indicator */}
          <div className="flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              {isLive && (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              )}
              <span 
                className={`relative inline-flex rounded-full h-3 w-3 ${
                  isLive ? "bg-green-500" : "bg-red-500"
                }`}
              ></span>
            </span>
            <span className="text-sm font-medium text-neutral-600 dark:text-neutral-300">
              {isLive ? "Live Polling Active" : "Polling Paused"}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsLive(!isLive)}
              className={`text-sm font-semibold px-4 py-2 rounded-md transition border ${
                isLive
                  ? "border-neutral-300 text-neutral-700 hover:bg-neutral-100 dark:border-neutral-600 dark:text-neutral-200 dark:hover:bg-neutral-700"
                  : "bg-green-600 text-white hover:bg-green-700 border-transparent"
              }`}
            >
              {isLive ? "Stop Live" : "Go Live"}
            </button>
            
            <button
              onClick={() => setLogs([])}
              className="text-sm text-red-500 hover:text-red-700 font-semibold px-4 py-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition"
            >
              Clear View
            </button>
          </div>
        </div>

        {/* Logs Feed */}
        <div className="space-y-4">
          {loading ? (
            // Loading Skeletons
            <>
              <LoadingSkeleton />
              <LoadingSkeleton />
              <LoadingSkeleton />
            </>
          ) : logs.length === 0 ? (
            // Empty State
            <div className="text-center py-20 border-2 border-dashed border-neutral-300 dark:border-neutral-700 rounded-xl">
              <p className="text-neutral-400">No webhook events received yet.</p>
            </div>
          ) : (
            // Logs List
            logs.map((log) => (
              <div
                key={log.id}
                className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 overflow-hidden"
              >
                {/* Log Header */}
                <div className="bg-neutral-50 dark:bg-neutral-700/50 px-6 py-3 border-b border-neutral-200 dark:border-neutral-700 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-neutral-500 dark:text-neutral-400">
                      ID: {log.id}
                    </span>
                  </div>
                  <span className="text-xs font-medium px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full w-fit">
                    {new Date(log.receivedAt).toLocaleString()}
                  </span>
                </div>

                {/* JSON Viewer */}
                <div className="p-4 bg-[#1e1e1e] overflow-hidden">
                  <ReactJson
                    src={log.data}
                    theme="monokai"
                    collapsed={false}
                    displayDataTypes={false}
                    enableClipboard={true}
                    style={{ backgroundColor: "transparent" }}
                    name={false}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}

// Simple Skeleton Loader Component
function LoadingSkeleton() {
  return (
    <div className="w-full h-32 bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 p-6 space-y-4 animate-pulse">
      <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-1/4"></div>
      <div className="space-y-2">
        <div className="h-3 bg-neutral-200 dark:bg-neutral-700 rounded w-3/4"></div>
        <div className="h-3 bg-neutral-200 dark:bg-neutral-700 rounded w-1/2"></div>
      </div>
    </div>
  );
}