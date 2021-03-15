import Stripe from 'stripe'

export async function createCheckoutSession(req, res) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

    // Create info object with reuqest body

    const info = {
      pricingPlanId: req.body.pricingPlanId,
      callbackUrl: req.body.callbackUrl
    }

    // User Authentication

    // Firestore

    // Initiate Stripe checkout session
    const sessionConfig = setupSubscription(info)
    const session = await stripe.checkout.sessions.create(sessionConfig)

    // Send back the response data to front-end
    res.status(200).json({
      id: session.id,
      stripePublicKey: process.env.STRIPE_PUBLIC_KEY
    })

  } catch(error) {
    console.log("Unexpected error occured while purchasing: " + error)
    res.status(500).json({
      error: "Could not initiate Stripe checkout"
    })
  }
}

function setupSubscription(info) {
  const sessionConfig = {
    payment_method_types: ['card'],
    success_url: `${info.callbackUrl}/?purchaseResult=success`,
    cancel_url: `${info.callbackUrl}/?purchaseResult=failed`,
    locale: 'ja',
    subscription_data: {
      items: [
        {plan: info.pricingPlanId}
      ]
    }
  }

  return sessionConfig
}

