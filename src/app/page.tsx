'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Image from 'next/image'

type BlogPost = {
  userId: number
  id: number
  title: string
  body: string
}

export default function HomePage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [search, setSearch] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=12')
        const data = await res.json()
        setPosts(data)
      } catch (error) {
        console.error('Failed to load posts', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  const filtered = posts.filter(post =>
    post.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <main className="min-h-screen bg-[#141414] text-white px-4 sm:px-6 lg:px-12 py-12">
      {/* Header */}
      <header className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
          Blogflix
        </h1>
        <p className="mt-4 text-lg text-neutral-400 max-w-2xl mx-auto">
          Your personal streaming feed of thoughts, guides, and developer deep-dives.
        </p>
      </header>

      {/* Search */}
      <div className="max-w-md mx-auto mb-10">
        <input
          type="text"
          placeholder="Search posts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-5 py-3 rounded-full bg-neutral-800 text-white border border-neutral-600 focus:outline-none focus:ring-2 focus:ring-red-600 transition"
        />
      </div>

      {/* Blog Grid or Loading Skeletons */}
      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="animate-pulse bg-neutral-900 rounded-xl h-80 w-full" />
          ))
        ) : filtered.length > 0 ? (
          filtered.map((post, index) => {
            const imageUrl = `https://picsum.photos/seed/${post.id}/800/600`

            return (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                whileHover={{ scale: 1.03 }}
                className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden shadow-xl transition-all duration-300"
              >
                <Link href={`/posts/${post.id}`}>
                  <div className="relative w-full h-48 sm:h-56">
                    <Image
                      src={imageUrl}
                      alt={post.title}
                      fill
                      className="object-cover"
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                </Link>
                <div className="p-5 flex flex-col h-full">
                  <Link href={`/posts/${post.id}`}>
                    <h2 className="text-xl font-semibold hover:text-red-500 transition line-clamp-2">
                      {post.title}
                    </h2>
                  </Link>
                  <p className="mt-2 text-sm text-neutral-400 line-clamp-3">
                    {post.body}
                  </p>
                  <div className="mt-auto flex justify-between items-center pt-4 text-neutral-500 text-sm">
                    <span>{new Date().toLocaleDateString()}</span>
                    <Link
                      href={`/posts/${post.id}`}
                      className="text-red-500 font-medium hover:underline"
                    >
                      Read more →
                    </Link>
                  </div>
                </div>
              </motion.div>
            )
          })
        ) : (
          <p className="text-center col-span-full text-neutral-500">No posts found.</p>
        )}
      </section>

      {/* CTA Section */}
      <section className="mt-24 text-center py-10 px-6 rounded-xl bg-gradient-to-r from-red-800 to-red-600 shadow-lg">
        <h3 className="text-2xl sm:text-3xl font-bold">Get the latest episodes</h3>
        <p className="mt-2 text-base text-white/80">
          Subscribe now to receive weekly updates straight to your inbox.
        </p>
        <Link
          href="/subscribe"
          className="mt-5 inline-block px-6 py-3 bg-white text-red-700 font-bold rounded-full shadow hover:bg-gray-100 transition"
        >
          Subscribe Now
        </Link>
      </section>
    </main>
  )
}
