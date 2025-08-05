import { notFound } from 'next/navigation'

type BlogPost = {
  userId: number
  id: number
  title: string
  body: string
}

type Props = {
  params: {
    id: string
  }
}

export default async function PostPage({ params }: Props) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`)

  if (!res.ok) return notFound()

  const post: BlogPost = await res.json()

  return (
    <main className="min-h-screen bg-black text-white px-4 py-12">
      <div className="max-w-3xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-red-500">{post.title}</h1>
        <p className="text-gray-400 text-sm">
          Published on{' '}
          <time dateTime={new Date().toISOString()}>
            {new Date().toLocaleDateString('en-US')}
          </time>
        </p>
        <p className="text-gray-200 text-lg leading-relaxed whitespace-pre-line">
          {post.body}
        </p>
        <p className="text-gray-500 text-sm mt-10">Post ID: {post.id} | Author ID: {post.userId}</p>
      </div>
    </main>
  )
}
