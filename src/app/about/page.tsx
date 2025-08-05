// src/app/about/page.tsx
import Link from 'next/link'

export async function generateMetadata({ params }: { params: { id: string } }) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`)
  if (!res.ok) return {}

  const post = await res.json()

  return {
    title: post.title,
    description: post.body.slice(0, 150),
  }
}

