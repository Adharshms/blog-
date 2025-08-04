import { notFound } from 'next/navigation'
import { Metadata } from 'next'

interface PostPageProps {
  params: {
    id: string
  }
}

type BlogPost = {
  userId: number
  id: number
  title: string
  body: string
}

// SEO metadata
export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`)

  if (!res.ok) return {}

  const post: BlogPost = await res.json()

  return {
    title: `${post.title} | Adharsh's Blogflix`,
    description: post.body.slice(0, 160),
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`)

  if (!res.ok) return notFound()

  const post: BlogPost = await res.json()

  return (
    <main className="min-h-screen bg-[#141414] text-white px-4 py-10 sm:px-6 lg:px-8">
      <article className="max-w-3xl mx-auto space-y-6">
        {/* Title */}
        <h1 className="text-4xl sm:text-5xl font-bold text-red-600 leading-tight tracking-tight">
          {post.title}
        </h1>

        {/* Date */}
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

        {/* Blog Content */}
        <section className="prose prose-invert prose-lg max-w-none text-gray-200">
          <p>
            In today's ever-evolving landscape of technology, it's more important than ever to stay ahead of the curve. Whether you're a beginner or an experienced developer, the journey through code is both challenging and rewarding.
          </p>

          <p>
            This article explores key principles and practical tips that can elevate your development workflow. Along the way, we’ll touch on tools, habits, and philosophies that have helped countless developers build better software.
          </p>

          <h2>The Importance of Writing Readable Code</h2>

          <p>
            Writing code is easy. Writing readable, maintainable code is the real art. Naming conventions, consistent formatting, and meaningful comments play a huge role in making your code understandable—not just for others, but also for your future self.
          </p>

          <blockquote>
            “Any fool can write code that a computer can understand. Good programmers write code that humans can understand.” — Martin Fowler
          </blockquote>

          <h2>Essential Tools to Boost Productivity</h2>

          <ul>
            <li><strong>VS Code:</strong> Feature-rich editor with vast extensions.</li>
            <li><strong>Prettier + ESLint:</strong> Enforce clean formatting and code quality.</li>
            <li><strong>Git & GitHub:</strong> Version control and collaboration are non-negotiable.</li>
          </ul>

          <p>
            Mastering these tools will not only speed up your development but also help you collaborate effectively in teams.
          </p>

          <h2>Learning Never Ends</h2>

          <p>
            One of the most rewarding aspects of being in tech is the constant opportunity to learn. Read blogs, build side projects, contribute to open-source, and ask questions. The more curious you are, the faster you'll grow.
          </p>

          <h2>Final Thoughts</h2>

          <p>
            Remember, the best developers aren't those who know everything—they're the ones who never stop learning. Stay passionate, build what you love, and help others along the way.
          </p>

          <p>
            Thanks for reading! If you enjoyed this post, consider sharing it with a friend or subscribing to the blog.
          </p>
        </section>
      </article>
    </main>
  )
}
