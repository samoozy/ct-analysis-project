import environments from '@/environments/environments'
import {loadStripe} from '@stripe/stripe-js'

export default class CheckoutService {
  constructor(pricingPlanId) {
    this.protocol = window.location.protocol,
    this.hostname = window.location.hostname,
    this.port = window.location.port
    this.endpoint = environments.api.url
    this.pricingPlanId = pricingPlanId
  }

  async startSubscriptionCheckoutSession() {
    try {
      const data = {
        pricingPlanId: this.pricingPlanId,
        callbackUrl: this.buildCallbackUrl()
      }

      const response = await fetch(`${this.endpoint}/api/checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      // The response should be the checkout session recieved from Stripe
      const session = await response.json()

      return session

    } catch(err) {
      
      console.log("ERROR 1: " + err)
    }
  }
  
  buildCallbackUrl() {
    let callbackUrl = `${this.protocol}//${this.hostname}`

    return this.port ? callbackUrl += `:${this.port}/stripe-checkout` : `${callbackUrl}/stripe-checkout`
  }

  async redirectToCheckout(session) {
    try {
      const stripe = await loadStripe(session.stripePublicKey)

      stripe.redirectToCheckout({
        sessionId: session.id
      })
    } catch(err) {
      console.log("ERROR 2: " + err)
    }
  }
}