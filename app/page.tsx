import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {/* Hero Section */}
      <header className="row-start-1 w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-lg text-center">
        <h1 className="text-3xl sm:text-5xl font-bold">Melissa's Nonprofits</h1>
        <p className="mt-2 text-lg sm:text-xl">
          Build stunning websites with speed and efficiency.
        </p>
      </header>

      {/* Main Content */}
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
              app/page.tsx
            </code>
            .
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>

        {/* Features Section */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
            <Image
              src="/performance.svg"
              alt="Performance Icon"
              width={50}
              height={50}
            />
            <h3 className="mt-4 text-lg font-semibold">Lightning Fast</h3>
            <p className="text-sm text-gray-600">
              Experience unparalleled performance with Next.js.
            </p>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
            <Image
              src="/scalable.svg"
              alt="Scalable Icon"
              width={50}
              height={50}
            />
            <h3 className="mt-4 text-lg font-semibold">Highly Scalable</h3>
            <p className="text-sm text-gray-600">
              Build apps that grow with your needs.
            </p>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
            <Image
              src="/secure.svg"
              alt="Secure Icon"
              width={50}
              height={50}
            />
            <h3 className="mt-4 text-lg font-semibold">Secure</h3>
            <p className="text-sm text-gray-600">
              Industry-leading security for your projects.
            </p>
          </div>
        </section>

        {/* Call-to-Action Buttons */}
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
        <div className="flex gap-4">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500"
          >
            Twitter
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-800"
          >
            GitHub
          </a>
        </div>
      </footer>
    </div>
  );
}
