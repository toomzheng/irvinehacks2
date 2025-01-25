"use client";

import Image from "next/image";

export default function Home() {
  return (
    <div className="relative grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-600 animate-gradient-flow"></div>

      {/* Hero Section */}
      <header className="row-start-1 w-full bg-black/60 backdrop-blur-md text-white p-6 rounded-lg text-center">
        <h1 className="text-3xl sm:text-5xl font-bold">Melissa's Nonprofits</h1>
        <p className="mt-2 text-lg sm:text-xl">
          Find Nonprofits around you to donate to!
        </p>
      </header>

      {/* Main Content */}
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-center">
        {/* Search Section */}
        <section className="flex flex-col sm:flex-row gap-4 items-center w-full max-w-xl">
          <input
            type="text"
            placeholder="Enter your postal code"
            className="flex-grow px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={() => console.log("Search triggered")}
          >
            Search
          </button>
        </section>
      </main>

      {/* Footer */}
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
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
