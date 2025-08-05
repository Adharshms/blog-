import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

interface BlogPost {
  userId: number
  id: number
  title: string
  body: string
}

// ✅ No PageProps import, define inline
export async function generateMetadata({
  params,
}: {
  params: { id: string }
}): Promise<Metadata> {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`)
  if (!res.ok) return {}
  const post: BlogPost = await res.json()

  return {
    title: `${post.title} | Adharsh's Blogflix`,
    description: post.body.slice(0, 160),
  }
}

export default async function PostPage({
  params,
}: {
  params: { id: string }
}) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`)
  if (!res.ok) return notFound()
  const post: BlogPost = await res.json()

  return (
    <main className="min-h-screen bg-[#141414] text-white px-4 py-10 sm:px-6 lg:px-8">
      <article className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-4xl sm:text-5xl font-bold text-red-600 leading-tight tracking-tight">
          {post.title}
        </h1>

        <p className="text-gray-400 text-sm">
          Published on{' '}
          <time dateTime={new Date().toISOString()}>
            {new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
        </p>

        <section className="prose prose-invert prose-lg max-w-none text-gray-200">
          <p>This is a sample blog post. Content is coming from a mock API.</p>
        </section>
      </article>
    </main>
  )
}
