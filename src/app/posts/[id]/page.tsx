import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

type BlogPost = {
  userId: number
  id: number
  title: string
  body: string
}

// ✅ Correct way to declare props inline
export async function generateMetadata({
  params,
}: {
  params: { id: string }
}): Promise<Metadata> {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`)
  if (!res.ok) return {}

  const post: BlogPost = await res.json()

  return {
    title: `${post.title} | Blogflix`,
    description: post.body.slice(0, 160),
  }
}

// ✅ Page Component
export default async function PostPage({
  params,
}: {
  params: { id: string }
}) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`)

  if (!res.ok) return notFound()

  const post: BlogPost = await res.json()

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <article className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-red-500">{post.title}</h1>
        <p className="text-gray-400">
          Published on{' '}
          <time dateTime={new Date().toISOString()}>
            {new Date().toLocaleDateString()}
          </time>
        </p>
        <p className="text-gray-300">{post.body}</p>
      </article>
    </main>
  )
}
