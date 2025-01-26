"use client";

import Image from "next/image";

export default function Home() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-600 animate-gradient-flow"></div>

      {/* Main Content */}
      <main className="flex flex-col items-center w-full max-w-3xl">
        {/* Video Container */}
        <div className="w-full aspect-video bg-black rounded-lg overflow-hidden">
          <video
            className="w-full h-full object-cover"
            controls
            src="Lebron_vids/vid1.mp4"
          >
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Loading Message */}
        <p className="mt-8 text-xl text-white">Loading Nonprofits...</p>
      </main>

      {/* Footer */}
      <footer className="mt-auto flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4 text-white"
          href="https://github.com/toomzheng/irvinehacks2"
          target="_blank"
          rel="noopener noreferrer"
        >
          © 2025 Melissa's Nonprofits.
        </a>
      </footer>
    </div>
  );
}
