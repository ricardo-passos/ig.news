import Head from 'next/head'
import Prismic from '@prismicio/client'
import { RichText } from 'prismic-dom'
import Link from 'next/link'
import { useSession } from 'next-auth/client'

// services
import { getPrismicClient } from '../../services/prismic'

// styles
import styles from '../../styles/posts.module.scss'

// types
import { GetStaticProps } from 'next'

type Post = {
  id: string
  slug: string
  title: string
  excerpt: string
  updatedAt: string
}

const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient()

  const response = await prismic.query(
    [Prismic.predicates.at('document.type', 'publication')],
    { fetch: ['title', 'content'], pageSize: 20 }
  )

  const posts = response.results.map((post) => {
    return {
      id: post.id,
      slug: post.uid,
      title: RichText.asText(post.data.title),
      exerpt:
        post.data.content.find((content) => content.type === 'paragraph')
          ?.text ?? '',
      updatedAt: new Date(post.last_publication_date).toLocaleDateString(
        'pt-BR',
        {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        }
      ),
    }
  })

  return {
    props: { posts },
  }
}

type Props = {
  posts: Post[]
}

function Post({ posts }: Props) {
  const [session] = useSession()

  return (
    <>
      <Head>
        <title>Posts | Ig.news</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          {posts.map(({ id, slug, title, excerpt, updatedAt }) => (
            <Link
              key={id}
              href={session ? `/posts/${slug}` : `/posts/preview/${slug}`}
            >
              <a>
                <time>{updatedAt}</time>
                <strong>{title}</strong>
                <p>{excerpt}</p>
              </a>
            </Link>
          ))}
        </div>
      </main>
    </>
  )
}

export { getStaticProps }

export default Post
