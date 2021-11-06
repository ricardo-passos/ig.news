import Head from 'next/head'
import { getSession } from 'next-auth/client'
import { RichText } from 'prismic-dom'

// services
import { getPrismicClient } from '../../services/prismic'

// styles
import styles from '../../styles/post.module.scss'

// types
import type { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  const session = await getSession({ req })
  const { slug } = params

  if (!session?.activeSubscription) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const prismic = getPrismicClient(req)

  const response = await prismic.getByUID('publication', String(slug), {})

  const post = {
    slug,
    title: RichText.asText(response.data.title),
    content: RichText.asHtml(response.data.content),
    updatedAt: new Date(response.last_publication_date).toLocaleDateString(
      'pt-BR',
      {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }
    ),
  }

  return {
    props: {
      post,
    },
  }
}

type Props = {
  post: {
    slug: string
    title: string
    content: string
    updatedAt: string
  }
}

function Post({ post }: Props) {
  return (
    <>
      <Head>
        <title>{post.title} | Ig.news</title>
      </Head>

      <main className={styles.container}>
        <article className={styles.post}>
          <h1>{post.title}</h1>
          <time>{post.updatedAt}</time>
          <div
            className={styles.postContent}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </main>
    </>
  )
}

export default Post
