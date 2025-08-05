import { notFound } from 'next/navigation'
import { Metadata } from 'next'

type BlogPost = {
  userId: number
  id: number
  title: string
  body: string
}

// ✅ SEO metadata
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
    description: post.body.slice(0, 150),
  }
}

// ✅ Blog post page
export default async function PostPage({
  params,
}: {
  params: { id: string }
}) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`)

  if (!res.ok) return notFound()

  const post: BlogPost = await res.json()

  return (
    <main className="min-h-screen bg-black text-white px-4 py-10">
      <article className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-red-500">{post.title}</h1>

        <p className="text-gray-400 text-sm">
          Published on{" "}
          <time dateTime={new Date().toISOString()}>
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        </p>

        <div className="text-gray-300 space-y-4">
          <p>{post.body}</p>

          <p>
            This blog post shows how to fetch and render content dynamically using Next.js App Router.
          </p>

          <p>
            Everything works with server-side rendering, dynamic routes, and metadata for SEO.
          </p>

          <p>Deployed on Vercel — error-free!</p>
        </div>
      </article>
    </main>
  )
}
