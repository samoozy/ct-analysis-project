import Stripe from "stripe"

export async function stripeWebhook(req, res) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
    const signature = req.headers["stripe-signature"]

    const event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    )

    // check which event to trigger webhook
    if(event.type === "check.session.completed") {
      
    }


  } catch(err) {
    console.log('Error processing webhook event', err)
    return res.status(400).send(`Webhook Error: ${err.message}`)
  }
}