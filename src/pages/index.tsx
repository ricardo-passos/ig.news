import Head from 'next/head'

// components
import { SubscribeButton } from '../components/SubscribeButton'

// apis
import { stripe } from '../services/stripe.server'

// styles
import styles from '../styles/home.module.scss'

// types
import type { GetStaticProps } from 'next'

type Props = {
  product: {
    priceId: string
    amount: number
  }
}

function Home({ product }: Props) {
  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>

      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👋 Hey, welcome</span>
          <h1>
            News about the <span>React</span> world.
          </h1>
          <p>
            Get access to all the publications <br />
            <span>for {product.amount}/month</span>
          </p>
          <SubscribeButton priceId={product.priceId} />
        </section>

        <img src='/images/avatar.svg' alt='Girl coding' />
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const price = await stripe.prices.retrieve('price_1Jsb2EAhCVQQ94dYipVsDlST')

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price.unit_amount / 100),
  }

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24, // 24 hours
  }
}

export default Home
