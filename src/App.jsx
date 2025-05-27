import React, { useState, useEffect } from 'react';

export default function App() {
  const [connected, setConnected] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [duration, setDuration] = useState("00:00");

  useEffect(() => {
    if (!connected) return;
    const interval = setInterval(() => {
      const seconds = Math.floor((Date.now() - startTime) / 1000);
      const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
      const secs = String(seconds % 60).padStart(2, "0");
      setDuration(`${mins}:${secs}`);
    }, 1000);
    return () => clearInterval(interval);
  }, [connected, startTime]);

  return (
    <div className="min-h-screen bg-sky-50 text-gray-800 flex items-center justify-center">
      <div className="w-full max-w-md px-8 py-16 bg-white rounded-lg shadow-md text-center">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">Maya {connected ? duration : ""}</h1>
          <p className="text-sm text-gray-500">by Wildflower</p>
          <div className="w-24 h-24 bg-sky-100 rounded-full animate-pulse mx-auto my-8" />
          {!connected ? (
            <button
              onClick={() => {
                setConnected(true);
                setStartTime(Date.now());
              }}
              className="w-full py-3 bg-sky-500 text-white rounded-md hover:bg-sky-600 transition"
            >
              Call Maya
            </button>
          ) : (
            <div className="flex justify-between space-x-4">
              <button className="flex-1 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                🎙️ Mute
              </button>
              <button
                onClick={() => window.location.reload()}
                className="flex-1 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                ❌ End Call
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}