import { loadStripe } from '@stripe/stripe-js'

async function getStripeClient() {
  const stripeJs = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)

  return stripeJs
}

export { getStripeClient }