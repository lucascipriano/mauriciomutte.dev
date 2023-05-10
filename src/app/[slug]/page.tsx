import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { useMDXComponent } from 'next-contentlayer/hooks'

import { allPosts } from '@/contentlayer/generated'
import styles from '@/styles/Post.module.css'
import { formatDate } from '@/lib/utils'
import '@/styles/mdx.css'

type PostPageProps = {
  params: {
    slug: string
  }
}

async function getPostFromParams(params: PostPageProps['params']) {
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug)

  if (!post) return null

  return post
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const post = await getPostFromParams(params)

  if (!post) return {}

  const url = process.env.NEXT_PUBLIC_APP_URL

  const ogUrl = new URL(`${url}/api/og`)
  ogUrl.searchParams.set('title', post.title)

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      url: `${url}${post.slug}`,
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [ogUrl.toString()],
    },
  }
}

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post._raw.flattenedPath,
  }))
}

export default function PostPage({ params }: PostPageProps) {
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug)

  if (!post) notFound()

  const MDXContent = useMDXComponent(post.body.code)

  return (
    <div>
      <article className={styles.post__article}>
        <header className={styles.post__header}>
          <h1 className={`${styles.post__title} gradient`}>{post.title}</h1>
          <time className={styles.post__date}>{formatDate(post.date)}</time>
        </header>
        <section className={styles.post__content}>
          <MDXContent />
        </section>
      </article>
    </div>
  )
}
