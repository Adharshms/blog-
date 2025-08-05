// src/app/about/page.tsx
import Link from 'next/link'

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">About Blogflix</h1>
        <p className="text-gray-300">
          Blogflix is your daily source of tech blogs and news.
        </p>

        <Link
          href="/"
          className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
