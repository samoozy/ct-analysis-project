import environments from '@/environments/environments'
import {loadStripe} from '@stripe/stripe-js'
import firebase from 'firebase/app'
import 'firebase/auth'

export default class CheckoutService {
  constructor(pricingPlanId) {
    this.protocol = window.location.protocol
    this.hostname = window.location.hostname
    this.port = window.location.port
    this.endpoint = environments.api.url
    this.pricingPlanId = pricingPlanId
    this.jwt = null
  }

  async startSubscriptionCheckoutSession() {
    try {

      this.jwt = await this.getAccessToken()

      if(!this.jwt) {
        return
      }

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
      
      console.log("startSubscriptionSession ERROR : " + err)
    }
  }

  async redirectToCheckout(session) {
    try {
      const stripe = await loadStripe(session.stripePublicKey)

      stripe.redirectToCheckout({
        sessionId: session.id
      })
    } catch(err) {
      console.log("redirectToCheckout ERROR: " + err)
    }
  }

  buildCallbackUrl() {
    let callbackUrl = `${this.protocol}//${this.hostname}`

    return this.port ? callbackUrl += `:${this.port}/stripe-checkout` : `${callbackUrl}/stripe-checkout`
  }

  async getAccessToken() {
    try {
      const user = firebase.auth().currentUser 
      if(user) {
        return await user.getIdToken()
      }
      console.log("not logged in")
      return null

    } catch(err) {
      console.log(err)
    }
  }
}