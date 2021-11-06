import { useSession, signIn } from 'next-auth/client'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

// services
import { api } from '../../services/api'
import { getStripeClient } from '../../services/stripe.client'

// styles
import styles from './styles.module.scss'

type Props = {
  priceId: string
}

function SubscribeButton({ priceId }: Props) {
  const [session] = useSession()
  const router = useRouter()

  console.log({session})

  async function handleSubscribe() {
    if (!session) {
      signIn('github')

      return
    }

    if (session.activeSubscription) {
      router.push('/posts')

      return
    }

    try {
      const response = await api.post('/subscribe')

      const { sessionId } = response.data

      const stripe = await getStripeClient()

      await stripe.redirectToCheckout({ sessionId })
    } catch (err) {
      toast.error(err.message)
    }
  }

  return (
    <button
      type='button'
      className={styles.subscribeButton}
      onClick={handleSubscribe}
    >
      Subscribe now
    </button>
  )
}

export { SubscribeButton }
